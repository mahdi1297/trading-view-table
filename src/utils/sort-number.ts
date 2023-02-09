import { Data } from "../types/data-table-body";

export function sortNumber(dataList: Data[], sortFactor: string): Data[] {
  function comparePrice(a: any, b: any) {
    if (a[sortFactor] < b[sortFactor]) {
      return -1;
    }
    if (a[sortFactor] > b[sortFactor]) {
      return 1;
    }
    return 0;
  }

  const sortedList: Data[] = dataList.sort(comparePrice);

  return sortedList;
}

export function numberSorterHelper(
  list: Data[],
  order: "desc" | "asc",
  param: string
) {
  let sortedList = sortNumber(list, param);
  if (order === "asc") {
    sortedList.reverse();
  }
  return sortedList;
}
