export const mergeDeep = (target: any, ...sources: any[]): any => {
  if (!sources.length) return target;
  const source = sources.shift();

  if (target instanceof Object && source instanceof Object) {
    for (const key in source) {
      if (source[key] instanceof Object) {
        // if (!target[key]) Object.assign(target, { [key]: {} });
        mergeDeep(target[key], source[key]);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }

  return mergeDeep(target, ...sources);
};

export const addOrRemove = (arr: any[], item: any) =>
  arr.includes(item) ? arr.filter((i) => i !== item) : [...arr, item];
