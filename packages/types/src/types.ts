import {log} from "@onflow/util-logger"

export type JsonCdc<L extends string, T> = {
  type: L
  value: T
}

export interface PathValue {
  domain: "storage" | "private" | "public"
  identifier: string
}

export interface ReferenceValue {
  type: string
  address: string
}

export interface TypeDescriptor<T, L extends string, X> {
  label: string
  asArgument: (x: T) => JsonCdc<L, X>
  asInjection: (x: T) => T
}

/**
 * Creates a type descriptor for a given type
 * @param label - The label for the type
 * @param asArgument - A function that converts the type to a JsonCdcType
 * @param asInjection - A function which returns the argument as is
 * @returns A type descriptor
 * @internal
 */
const typedef = <T, L extends string, X>(
  label: L,
  asArgument: (x: T) => JsonCdc<L, X>,
  asInjection: (x: T) => T
): TypeDescriptor<T, L, X> => ({
  label,
  asArgument,
  asInjection,
})

const isArray = <T>(d: unknown): d is T[] => Array.isArray(d)
const isObj = (d: unknown): d is object => typeof d === "object"
const isNull = (d: unknown): d is null | undefined => d == null
const isBoolean = (d: unknown): d is boolean => typeof d === "boolean"
const isNumber = (d: unknown): d is number => typeof d === "number"
const isInteger = (d: unknown): d is number => Number.isInteger(d)
const isString = (d: unknown): d is string => typeof d === "string"

const throwTypeError = (msg: unknown): never => {
  throw new Error("Type Error: " + msg)
}

const numberValuesDeprecationNotice = (type: string) => {
  log.deprecate({
    pkg: "@onflow/types",
    subject: `Passing in Number as value for ${type}`,
    message: `Going forward, use String as value for ${type}.`,
    transition:
      "https://github.com/onflow/flow-js-sdk/blob/master/packages/types/WARNINGS.md#0002-[U]Int*-and-Word*-as-Number",
  })
}

export const Identity = {
  label: "Identity",
  asArgument: <T>(v: T) => v,
  asInjection: <T>(v: T) => v,
}

export const UInt = typedef(
  "UInt",
  (v: number | string) => {
    if (isNumber(v) && isInteger(v)) {
      numberValuesDeprecationNotice("UInt")
      return {
        type: "UInt",
        value: v.toString(),
      }
    }
    if (isString(v)) {
      return {
        type: "UInt",
        value: v,
      }
    }
    return throwTypeError("Expected Positive Integer for type Unsigned Int")
  },
  v => v
)

export const Int = typedef(
  "Int",
  (v: number | string) => {
    if (isNumber(v) && isInteger(v)) {
      numberValuesDeprecationNotice("Int")
      return {
        type: "Int",
        value: v.toString(),
      }
    }
    if (isString(v)) {
      return {
        type: "Int",
        value: v,
      }
    }
    return throwTypeError("Expected Integer for type Int")
  },
  v => v
)

export const UInt8 = typedef(
  "UInt8",
  (v: number | string) => {
    if (isNumber(v) && isInteger(v)) {
      numberValuesDeprecationNotice("UInt8")
      return {
        type: "UInt8",
        value: v.toString(),
      }
    }
    if (isString(v)) {
      return {
        type: "UInt8",
        value: v,
      }
    }
    return throwTypeError("Expected integer for UInt8")
  },
  v => v
)

export const Int8 = typedef(
  "Int8",
  (v: number | string) => {
    if (isNumber(v) && isInteger(v)) {
      numberValuesDeprecationNotice("Int8")
      return {
        type: "Int8",
        value: v.toString(),
      }
    }
    if (isString(v)) {
      return {
        type: "Int8",
        value: v,
      }
    }
    return throwTypeError("Expected positive integer for Int8")
  },
  v => v
)

export const UInt16 = typedef(
  "UInt16",
  (v: number | string) => {
    if (isNumber(v) && isInteger(v)) {
      numberValuesDeprecationNotice("UInt16")
      return {
        type: "UInt16",
        value: v.toString(),
      }
    }
    if (isString(v)) {
      return {
        type: "UInt16",
        value: v,
      }
    }
    return throwTypeError("Expected integer for UInt16")
  },
  v => v
)

export const Int16 = typedef(
  "Int16",
  (v: number | string) => {
    if (isNumber(v) && isInteger(v)) {
      numberValuesDeprecationNotice("Int16")
      return {
        type: "Int16",
        value: v.toString(),
      }
    }
    if (isString(v)) {
      return {
        type: "Int16",
        value: v,
      }
    }
    return throwTypeError("Expected positive integer for Int16")
  },
  v => v
)

export const UInt32 = typedef(
  "UInt32",
  (v: number | string) => {
    if (isNumber(v) && isInteger(v)) {
      numberValuesDeprecationNotice("UInt32")
      return {
        type: "UInt32",
        value: v.toString(),
      }
    }
    if (isString(v)) {
      return {
        type: "UInt32",
        value: v,
      }
    }
    return throwTypeError("Expected integer for UInt32")
  },
  v => v
)

export const Int32 = typedef(
  "Int32",
  (v: number | string) => {
    if (isNumber(v) && isInteger(v)) {
      numberValuesDeprecationNotice("Int32")
      return {
        type: "Int32",
        value: v.toString(),
      }
    }
    if (isString(v)) {
      return {
        type: "Int32",
        value: v,
      }
    }
    return throwTypeError("Expected positive integer for Int32")
  },
  v => v
)

export const UInt64 = typedef(
  "UInt64",
  (v: number | string) => {
    if (isNumber(v) && isInteger(v)) {
      numberValuesDeprecationNotice("UInt64")
      return {
        type: "UInt64",
        value: v.toString(),
      }
    }
    if (isString(v)) {
      return {
        type: "UInt64",
        value: v,
      }
    }
    return throwTypeError("Expected integer for UInt64")
  },
  v => v
)

export const Int64 = typedef(
  "Int64",
  (v: number | string) => {
    if (isNumber(v) && isInteger(v)) {
      numberValuesDeprecationNotice("Int64")
      return {
        type: "Int64",
        value: v.toString(),
      }
    }
    if (isString(v)) {
      return {
        type: "Int64",
        value: v,
      }
    }
    return throwTypeError("Expected positive integer for Int64")
  },
  v => v
)

export const UInt128 = typedef(
  "UInt128",
  (v: number | string) => {
    if (isNumber(v) && isInteger(v)) {
      numberValuesDeprecationNotice("UInt128")
      return {
        type: "UInt128",
        value: v.toString(),
      }
    }
    if (isString(v)) {
      return {
        type: "UInt128",
        value: v,
      }
    }
    return throwTypeError("Expected integer for UInt128")
  },
  v => v
)

export const Int128 = typedef(
  "Int128",
  (v: number | string) => {
    if (isNumber(v) && isInteger(v)) {
      numberValuesDeprecationNotice("Int128")
      return {
        type: "Int128",
        value: v.toString(),
      }
    }
    if (isString(v)) {
      return {
        type: "Int128",
        value: v,
      }
    }
    return throwTypeError("Expected positive integer for Int128")
  },
  v => v
)

export const UInt256 = typedef(
  "UInt256",
  (v: number | string) => {
    if (isNumber(v) && isInteger(v)) {
      numberValuesDeprecationNotice("UInt256")
      return {
        type: "UInt256",
        value: v.toString(),
      }
    }
    if (isString(v)) {
      return {
        type: "UInt256",
        value: v,
      }
    }
    return throwTypeError("Expected integer for UInt256")
  },
  v => v
)

export const Int256 = typedef(
  "Int256",
  (v: number | string) => {
    if (isNumber(v) && isInteger(v)) {
      numberValuesDeprecationNotice("Int256")
      return {
        type: "Int256",
        value: v.toString(),
      }
    }
    if (isString(v)) {
      return {
        type: "Int256",
        value: v,
      }
    }
    return throwTypeError("Expected integer for Int256")
  },
  v => v
)

export const Word8 = typedef(
  "Word8",
  (v: number | string) => {
    if (isNumber(v) && isInteger(v)) {
      numberValuesDeprecationNotice("Word8")
      return {
        type: "Word8",
        value: v.toString(),
      }
    }
    if (isString(v)) {
      return {
        type: "Word8",
        value: v,
      }
    }
    return throwTypeError("Expected positive number for Word8")
  },
  v => v
)

export const Word16 = typedef(
  "Word16",
  (v: number | string) => {
    if (isNumber(v) && isInteger(v)) {
      numberValuesDeprecationNotice("Word16")
      return {
        type: "Word16",
        value: v.toString(),
      }
    }
    if (isString(v)) {
      return {
        type: "Word16",
        value: v,
      }
    }
    return throwTypeError("Expected positive number for Word16")
  },
  v => v
)

export const Word32 = typedef(
  "Word32",
  (v: number | string) => {
    if (isNumber(v) && isInteger(v)) {
      numberValuesDeprecationNotice("Word32")
      return {
        type: "Word32",
        value: v.toString(),
      }
    }
    if (isString(v)) {
      return {
        type: "Word32",
        value: v,
      }
    }
    return throwTypeError("Expected positive number for Word32")
  },
  v => v
)

export const Word64 = typedef(
  "Word64",
  (v: number | string) => {
    if (isNumber(v) && isInteger(v)) {
      numberValuesDeprecationNotice("Word64")
      return {
        type: "Word64",
        value: v.toString(),
      }
    }
    if (isString(v)) {
      return {
        type: "Word64",
        value: v,
      }
    }
    return throwTypeError("Expected positive number for Word64")
  },
  v => v
)

const UFix64AndFix64NumberDeprecationNotice = () => {
  log.deprecate({
    subject: "Passing in Numbers as values for Fix64 and UFix64 types",
    pkg: "@onflow/types",
    transition:
      "https://github.com/onflow/flow-js-sdk/blob/master/packages/types/WARNINGS.md#0001-[U]Fix64-as-Number",
  })
}

export const UFix64 = typedef(
  "UFix64",
  (v: number | string) => {
    if (isString(v)) {
      const vParts = v.split(".")
      if (vParts.length !== 2) {
        return throwTypeError(
          `Expected one decimal but found ${vParts.length} in the [U]Fix64 value. Find out more about [U]Fix64 types here: https://docs.onflow.org/cadence/json-cadence-spec/#fixed-point-numbers`
        )
      }
      if (vParts[1].length == 0 || vParts[1].length > 8) {
        return throwTypeError(
          `Expected at least one digit, and at most 8 digits following the decimal of the [U]Fix64 value but found ${vParts[1].length} digits. Find out more about [U]Fix64 types here: https://docs.onflow.org/cadence/json-cadence-spec/#fixed-point-numbers`
        )
      }

      // make sure the number is extended to 8 decimal places so it matches cadence encoding of UFix values
      vParts[1] = vParts[1].padEnd(8, "0")
      v = vParts.join(".")

      return {
        type: "UFix64",
        value: v,
      }
    } else if (isNumber(v)) {
      UFix64AndFix64NumberDeprecationNotice()
      return {
        type: "UFix64",
        value: v.toString(),
      }
    }
    return throwTypeError("Expected String for UFix64")
  },
  v => v
)

export const Fix64 = typedef(
  "Fix64",
  (v: number | string) => {
    if (isString(v)) {
      const vParts = v.split(".")
      if (vParts.length !== 2) {
        return throwTypeError(
          `Expected one decimal but found ${vParts.length} in the [U]Fix64 value. Find out more about [U]Fix64 types here: https://docs.onflow.org/cadence/json-cadence-spec/#fixed-point-numbers`
        )
      }
      if (vParts[1].length == 0 || vParts[1].length > 8) {
        return throwTypeError(
          `Expected at least one digit, and at most 8 digits following the decimal of the [U]Fix64 value but found ${vParts[1].length} digits. Find out more about [U]Fix64 types here: https://docs.onflow.org/cadence/json-cadence-spec/#fixed-point-numbers`
        )
      }

      // make sure the number is extended to 8 decimal places so it matches cadence encoding of Fix64 values
      vParts[1] = vParts[1].padEnd(8, "0")
      v = vParts.join(".")

      return {
        type: "Fix64",
        value: v,
      }
    } else if (isNumber(v)) {
      UFix64AndFix64NumberDeprecationNotice()
      return {
        type: "Fix64",
        value: v.toString(),
      }
    }
    return throwTypeError("Expected String for Fix64")
  },
  v => v
)

export const String = typedef(
  "String",
  (v: string) => {
    if (isString(v))
      return {
        type: "String",
        value: v,
      }
    return throwTypeError("Expected String for type String")
  },
  v => v
)

export const Character = typedef(
  "Character",
  (v: string) => {
    if (isString(v))
      return {
        type: "Character",
        value: v,
      }
    return throwTypeError("Expected Character for type Character")
  },
  v => v
)

export const Bool = typedef(
  "Bool",
  (v: boolean) => {
    if (isBoolean(v))
      return {
        type: "Bool",
        value: v,
      }
    return throwTypeError("Expected Boolean for type Bool")
  },
  v => v
)

export const Address = typedef(
  "Address",
  (v: string) => {
    if (isString(v))
      return {
        type: "Address",
        value: v,
      }
    return throwTypeError("Expected Address for type Address")
  },
  v => v
)

export const Void = typedef(
  "Void",
  (v?: null) => {
    if (!v || isNull(v))
      return {
        type: "Void",
        value: null, // so that it confroms to JsonCdcType interface
      }
    return throwTypeError("Expected Void for type Void")
  },
  v => v
)

export const Optional = <T, L extends string, X>(
  children: TypeDescriptor<T, L, X>
) =>
  typedef(
    "Optional",
    (v?: T | null) => ({
      type: "Optional",
      value: isNull(v) ? null : children.asArgument(v),
    }),
    v => v
  )

export const Reference = typedef(
  "Reference",
  (v: ReferenceValue) => {
    if (isObj(v))
      return {
        type: "Reference",
        value: v,
      }
    return throwTypeError("Expected Object for type Reference")
  },
  v => v
)

export const _Array = <T, L extends string, X>(
  children: TypeDescriptor<T, L, X>[] | TypeDescriptor<T, L, X> = []
) =>
  typedef(
    "Array",
    (v: T[]) => {
      return {
        type: "Array",
        value: isArray(children)
          ? children.map((c, i) => c.asArgument(v[i]))
          : v.map(x => children.asArgument(x)),
      }
    },
    v => v
  )

export {_Array as Array}

// TODO : Fix types.  Think about cases... dont think children should ever be array... not sure
export const Dictionary = <A, B extends string, C, D, E extends string, F>(
  children:
    | {
        key: TypeDescriptor<A, B, C>
        value: TypeDescriptor<D, E, F>
      }[]
    | {
        key: TypeDescriptor<A, B, C>
        value: TypeDescriptor<D, E, F>
      } = []
) =>
  typedef(
    "Dictionary",
    (v: {key: A; value: D}[] | {key: A; value: D}) => {
      const vIsArray = isArray(v)
      const childrenIsArray = isArray(children)

      if (isObj(v))
        return {
          type: "Dictionary",
          value:
            childrenIsArray && vIsArray
              ? children.map((c, i) => ({
                  key: c.key.asArgument(v[i].key),
                  value: c.value.asArgument(v[i].value),
                }))
              : vIsArray && !childrenIsArray
              ? v.map(x => ({
                  key: children.key.asArgument(x.key),
                  value: children.value.asArgument(x.value),
                }))
              : !vIsArray && !childrenIsArray
              ? [
                  {
                    key: children.key.asArgument(v.key),
                    value: children.value.asArgument(v.value),
                  },
                ]
              : throwTypeError(
                  "Invalid arguments for Dictionary. Expected an of array of key/value pairs"
                ),
        }
      return throwTypeError("Expected Object for type Dictionary")
    },
    v => v
  )

export const Event = <T, L extends string, X>(
  id: string,
  fields:
    | {value: TypeDescriptor<T, L, X>}[]
    | {value: TypeDescriptor<T, L, X>} = []
) =>
  typedef(
    "Event",
    (v: {fields: {name: string; value: T}[]}) => {
      if (isObj(v))
        return {
          type: "Event",
          value: {
            id: id,
            fields: isArray(fields)
              ? fields.map((c, i) => ({
                  name: v.fields[i].name,
                  value: c.value.asArgument(v.fields[i].value),
                }))
              : v.fields.map(x => ({
                  name: x.name,
                  value: fields.value.asArgument(x.value),
                })),
          },
        }
      return throwTypeError("Expected Object for type Event")
    },
    v => v
  )

export const Resource = <T, L extends string, X>(
  id: string,
  fields:
    | {value: TypeDescriptor<T, L, X>}[]
    | {value: TypeDescriptor<T, L, X>} = []
) =>
  typedef(
    "Resource",
    (v: {fields: {name: string; value: T}[]}) => {
      if (isObj(v))
        return {
          type: "Resource",
          value: {
            id: id,
            fields: isArray(fields)
              ? fields.map((c, i) => ({
                  name: v.fields[i].name,
                  value: c.value.asArgument(v.fields[i].value),
                }))
              : v.fields.map(x => ({
                  name: x.name,
                  value: fields.value.asArgument(x.value),
                })),
          },
        }
      return throwTypeError("Expected Object for type Resource")
    },
    v => v
  )

export const Struct = <T, L extends string, X>(
  id: string,
  fields:
    | {value: TypeDescriptor<T, L, X>}[]
    | {value: TypeDescriptor<T, L, X>} = []
) =>
  typedef(
    "Struct",
    (v: {fields: {name: string; value: T}[]}) => {
      if (isObj(v))
        return {
          type: "Struct",
          value: {
            id: id,
            fields: isArray(fields)
              ? fields.map((c, i) => ({
                  name: v.fields[i].name,
                  value: c.value.asArgument(v.fields[i].value),
                }))
              : v.fields.map(x => ({
                  name: x.name,
                  value: fields.value.asArgument(x.value),
                })),
          },
        }
      return throwTypeError("Expected Object for type Struct")
    },
    v => v
  )

export const Enum = <T, L extends string, X>(
  id: string,
  fields:
    | {value: TypeDescriptor<T, L, X>}[]
    | {value: TypeDescriptor<T, L, X>} = []
) =>
  typedef(
    "Enum",
    (v: {fields: {name: string; value: T}[]}) => {
      if (isObj(v))
        return {
          type: "Enum",
          value: {
            id: id,
            fields: isArray(fields)
              ? fields.map((c, i) => ({
                  name: v.fields[i].name,
                  value: c.value.asArgument(v.fields[i].value),
                }))
              : v.fields.map(x => ({
                  name: x.name,
                  value: fields.value.asArgument(x.value),
                })),
          },
        }
      return throwTypeError("Expected Object for type Enum")
    },
    v => v
  )

export const Path = typedef(
  "Path",
  (v: PathValue) => {
    if (isObj(v)) {
      if (!isString(v.domain)) {
        return throwTypeError(
          `Expected a string for the Path domain but found ${v.domain}. Find out more about the Path type here: https://docs.onflow.org/cadence/json-cadence-spec/#path`
        )
      }

      if (
        !(
          v.domain === "storage" ||
          v.domain === "private" ||
          v.domain === "public"
        )
      ) {
        return throwTypeError(
          `Expected either "storage", "private" or "public" as the Path domain but found ${v.domain}. Find out more about the Path type here: https://docs.onflow.org/cadence/json-cadence-spec/#path`
        )
      }

      if (!isString(v.identifier)) {
        return throwTypeError(
          `Expected a string for the Path identifier but found ${v.identifier}. Find out more about the Path type here: https://docs.onflow.org/cadence/json-cadence-spec/#path`
        )
      }

      return {
        type: "Path",
        value: {
          domain: v.domain,
          identifier: v.identifier,
        },
      }
    }
    return throwTypeError("Expected Object for type Path")
  },
  v => v
)
