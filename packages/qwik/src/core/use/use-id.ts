import type { QRL } from '..';
import { hashCode } from '../shared/utils/hash_code';
import { OnRenderProp } from '../shared/utils/markers';
import { useSequentialScope } from './use-sequential-scope';
import { getNextUniqueIndex } from '../shared/utils/unique-index-generator';

/** @public */
export const useId = (): string => {
  const { val, set, iCtx } = useSequentialScope<string>();
  if (val != null) {
    return val;
  }
  const containerBase = iCtx.$container$.$buildBase$ || '';
  const base = containerBase ? hashCode(containerBase) : '';
  const componentQrl = iCtx.$container$.getHostProp<QRL>(iCtx.$hostElement$, OnRenderProp);
  const hash = componentQrl?.getHash() || '';
  const counter = getNextUniqueIndex(iCtx.$container$) || '';
  let id = `${base}-${hash}-${counter}`;

  // add `_` if starts with a number, because CSS does not allow class names to start with a number
  if (id.charCodeAt(0) >= 48 /* 0 */ && id.charCodeAt(0) <= 57 /* 9 */) {
    id = `_${id}`;
  }
  return set(id);
};
