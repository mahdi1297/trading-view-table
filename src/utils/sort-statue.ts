import { SortList } from "../context/sort.context";
import { Sort } from "../helper/sort";
import { findInArray } from "./find-in-array";

export const getSortStatue = (sortObject: Sort[], title: string) => {
  if (sortObject !== undefined && Array.isArray(sortObject)) {
    const existsItemInSort = findInArray<SortList, string>(sortObject, title);

    if (existsItemInSort) {
      return existsItemInSort.order;
    }
    return null;
  }
  return null;
};
