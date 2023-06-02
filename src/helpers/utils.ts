import { ItemType } from "ItemType";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const mergeDeep = (target: any, ...sources: any[]): any => {
  if (!sources.length) return target;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const source = sources.shift();

  if (target instanceof Object && source instanceof Object) {
    for (const key in source) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (source[key] instanceof Object) {
        // if (!target[key]) Object.assign(target, { [key]: {} });
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        mergeDeep(target[key], source[key]);
      } else {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        Object.assign(target, { [key]: source[key] });
      }
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return mergeDeep(target, ...sources);
};

export const addOrRemove = (
  arr: Array<ItemType>,
  item: ItemType
): Array<ItemType> =>
  arr.includes(item) ? arr.filter((i) => i !== item) : [...arr, item];
