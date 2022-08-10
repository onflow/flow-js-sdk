import {invariant} from "@onflow/util-invariant"
import * as sdk from "@onflow/sdk"
import * as t from "@onflow/types"
import {config} from "@onflow/config"
import {isRequired, isObject, isString, isFunc} from "./utils/is"
import {normalizeArgs} from "./utils/normalize-args"
import {retrieve} from "../document/document.js"
import {deriveDependencies} from "./utils/derive-dependencies"

/** Query the Flow Blockchain
 *
 *  @arg {Object} opts         - Query Options and configuration
 *  @arg {string} opts.cadence - Cadence Script used to query Flow
 *  @arg {ArgsFn} opts.args    - Arguments passed to cadence script
 *  @arg {Object} opts.template - Template passed to cadence transaction
 *  @arg {number} opts.limit   - Compute Limit for Query
 *  @returns {Promise<Response>}
 *
 *  Where:
 *    @callback ArgsFn
 *    @arg {ArgFn}  arg - Argument function to define a single argument
 *    @arg {Object} t   - Cadence Types object used to define the type
 *    @returns {args[]}
 *
 *    @callback ArgFn
 *    @arg {Any}  value - the value of the argument
 *    @arg {Type} type  - the cadence type of the value
 *    @returns {arg}
 *
 *  Example:
 *    const cadence = `
 *      cadence: `
 *        pub fun main(a: Int, b: Int, c: Address): Int {
 *          log(c)
 *          return a + b
 *        }
 *    `.trim()
 *
 *    const args = (arg, t) => [
 *      arg(5, t.Int),
 *      arg(7, t.Int),
 *      arg("0xb2db43ad6bc345fec9", t.Address),
 *    ]
 *
 *    await query({ cadence, args })
 */
export async function query(opts = {}) {
  await preQuery(opts)

  if (isString(opts?.template)) {
    opts.template = await retrieve({url: opts?.template})
  }

  if (opts?.template) {
    opts.template = normalizeInteractionTemplate(opts?.template)
  }

  let dependencies = {}
  if (opts?.template) {
    dependencies = await deriveDependencies({template: opts.template})
  }

  const cadence =
    opts.cadence ||
    deriveCadenceByNetwork({
      template: opts.template,
      network: await sdk.config().get("flow.network"),
    })

  return config.overload(dependencies, async () =>
    // prettier-ignore
    sdk.send([
      sdk.script(cadence),
      sdk.args(normalizeArgs(opts.args || [])),
      sdk.template(opts.template || null),
      opts.limit && typeof opts.limit === "number" && sdk.limit(opts.limit)
    ]).then(sdk.decode)
  )
}

async function preQuery(opts) {
  invariant(
    isRequired(opts.cadence),
    "query({ cadence }) -- cadence is required"
  )

  invariant(
    isString(opts.cadence),
    "query({ cadence }) -- cadence must be a string"
  )

  invariant(
    await sdk.config.get("accessNode.api"),
    `Required value for "accessNode.api" not defined in config. See: ${"https://github.com/onflow/flow-js-sdk/blob/master/packages/fcl/src/exec/query.md#configuration"}`
  )
}
