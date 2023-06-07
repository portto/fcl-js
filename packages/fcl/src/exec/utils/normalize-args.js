import {isFunc} from "./is"
import * as sdk from "@blocto/flow-sdk"
import * as t from "@onflow/types"

export function normalizeArgs(ax) {
  if (isFunc(ax)) return ax(sdk.arg, t)
  return []
}
