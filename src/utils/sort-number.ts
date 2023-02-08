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

export function dynamicSort(property: string) {
  var sortOrder = 1;
  if (property[0] === "-") {
    sortOrder = -1;
    property = property.substr(1);
  }
  return function (a: any, b: any) {
    /* next line works with strings and numbers,
     * and you may want to customize it to your needs
     */
    var result =
      a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
    return result * sortOrder;
  };
}
