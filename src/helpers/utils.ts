import { ItemType } from "ItemType";

export function mergeDeep<
  T extends Record<string, unknown>,
  ST extends Record<string, unknown>
>(target: T, ...sources: Array<ST>): T {
  if (!sources.length) return target;

  const source = sources.shift();

  if (target instanceof Object && source instanceof Object) {
    for (const key in source) {
      if (source[key] instanceof Object) {
        // if (!target[key]) Object.assign(target, { [key]: {} });
        mergeDeep(target[key] as T, source[key] as ST);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }
  return mergeDeep(target, ...sources);
}

export const addOrRemove = (
  arr: Array<ItemType>,
  item: ItemType
): Array<ItemType> =>
  arr.includes(item) ? arr.filter((i) => i !== item) : [...arr, item];
