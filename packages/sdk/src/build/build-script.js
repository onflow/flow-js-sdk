import {pipe, Ok, put, makeScript} from "../interaction/interaction"
import {template} from "@onflow/util-template"

export function script(...args) {
  return pipe([makeScript, put("ix.cadence", template(...args))])
}
