export function findInArray<T, S>(list: T[] | any, filter: S) {
  return list.find((f: T | any) => f.filter === filter);
}
