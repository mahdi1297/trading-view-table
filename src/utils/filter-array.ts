export function filterArray<T, S>(list: T[], item: S): any {
  return list.filter((s: T | S) => s !== item);
}

export function filterInArray<T, S>(list: T[], item: S): any {
  return list.filter((s: T | S) => s === item);
}
