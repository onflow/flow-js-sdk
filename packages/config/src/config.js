import {
  spawn,
  send,
  subscriber,
  SUBSCRIBE,
  UNSUBSCRIBE,
} from "@onflow/util-actor"
import * as logger from "@onflow/util-logger"
import { accumulate, cleanNetwork } from "../utils/utils"

const NAME = "config"
const PUT = "PUT_CONFIG"
const GET = "GET_CONFIG"
const GET_ALL = "GET_ALL_CONFIG"
const UPDATE = "UPDATE_CONFIG"
const DELETE = "DELETE_CONFIG"
const CLEAR = "CLEAR_CONFIG"
const WHERE = "WHERE_CONFIG"
const UPDATED = "CONFIG/UPDATED"

const identity = v => v

const HANDLERS = {
  [PUT]: (ctx, _letter, {key, value}) => {
    if (key == null) throw new Error("Missing 'key' for config/put.")
    ctx.put(key, value)
    ctx.broadcast(UPDATED, {...ctx.all()})
  },
  [GET]: (ctx, letter, {key, fallback}) => {
    if (key == null) throw new Error("Missing 'key' for config/get")
    letter.reply(ctx.get(key, fallback))
  },
  [GET_ALL]: (ctx, letter) => {
    letter.reply({...ctx.all()})
  },
  [UPDATE]: (ctx, letter, {key, fn}) => {
    if (key == null) throw new Error("Missing 'key' for config/update")
    ctx.update(key, fn || identity)
    ctx.broadcast(UPDATED, {...ctx.all()})
  },
  [DELETE]: (ctx, letter, {key}) => {
    if (key == null) throw new Error("Missing 'key' for config/delete")
    ctx.delete(key)
    ctx.broadcast(UPDATED, {...ctx.all()})
  },
  [CLEAR]: (ctx, letter) => {
    let keys = Object.keys(ctx.all())
    for (let key of keys) ctx.delete(key)
    ctx.broadcast(UPDATED, {...ctx.all()})
  },
  [WHERE]: (ctx, letter, {pattern}) => {
    if (pattern == null) throw new Error("Missing 'pattern' for config/where")
    letter.reply(ctx.where(pattern))
  },
  [SUBSCRIBE]: (ctx, letter) => {
    ctx.subscribe(letter.from)
    ctx.send(letter.from, UPDATED, {...ctx.all()})
  },
  [UNSUBSCRIBE]: (ctx, letter) => {
    ctx.unsubscribe(letter.from)
  },
}

spawn(HANDLERS, NAME)

function put(key, value) {
  send(NAME, PUT, {key, value})
  return config()
}

function get(key, fallback) {
  return send(NAME, GET, {key, fallback}, {expectReply: true, timeout: 10})
}

async function first(wants = [], fallback) {
  if (!wants.length) return fallback
  const [head, ...rest] = wants
  const ret = await get(head)
  if (ret == null) return first(rest, fallback)
  return ret
}

function all() {
  return send(NAME, GET_ALL, null, {expectReply: true, timeout: 10})
}

function update(key, fn = identity) {
  send(NAME, UPDATE, {key, fn})
  return config()
}

function _delete(key) {
  send(NAME, DELETE, {key})
  return config()
}

function where(pattern) {
  return send(NAME, WHERE, {pattern}, {expectReply: true, timeout: 10})
}

function subscribe(callback) {
  return subscriber(NAME, () => spawn(HANDLERS, NAME), callback)
}

export function clearConfig() {
  return send(NAME, CLEAR)
}

function resetConfig(oldConfig) {
  return clearConfig().then(config(oldConfig))
}

async function load(data) {
  const network = await get("flow.network")

  // If no network, do not continue
  if (!network) {
    logger.log({
      title: "Flow Network Required",
      message: `In order for FCL to load your contracts please define "flow.network" to "emulator", "local", "testnet", or "mainnet" in your config. See more here: https://developers.flow.com/tools/fcl-js/reference/configure-fcl`,
      level: logger.LEVELS.error,
    })
    return
  }

  const accumulatedFlowJSON = accumulate(data?.flowJSON, cleanNetwork(network))

  // Add contract mappings to config
  // Keep '0x' so that under the hood we can identify what is a contract import in config
  for (const [key, value] of Object.entries(accumulatedFlowJSON)) {
    put(`0x${key}`, value)
  }
}

function config(values) {
  if (values != null && typeof values === "object") {
    Object.keys(values).map(d => put(d, values[d]))
  }

  return {
    put,
    get,
    all,
    first,
    update,
    delete: _delete,
    where,
    subscribe,
    overload,
    load,
  }
}

config.put = put
config.get = get
config.all = all
config.first = first
config.update = update
config.delete = _delete
config.where = where
config.subscribe = subscribe
config.overload = overload
config.load = load

export {config}

const noop = v => v
function overload(opts = {}, callback = noop) {
  return new Promise(async (resolve, reject) => {
    const oldConfig = await all()
    try {
      config(opts)
      var result = await callback(await all())
      await resetConfig(oldConfig)
      resolve(result)
    } catch (error) {
      await resetConfig(oldConfig)
      reject(error)
    }
  })
}
