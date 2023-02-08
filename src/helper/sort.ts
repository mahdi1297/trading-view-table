import { Data } from "../types/data-table-body";

export class Sort {
  private _data: Data[];

  constructor(data: Data[]) {
    this._data = data;
  }

  sortByPrice() {
    const newData = this._data;
    const sortedList = newData.sort(comparePrice);
    this._data = sortedList;
    return this._data;
  }
}

function comparePrice(a: any, b: any) {
  if (a.price < b.price) {
    return -1;
  }
  if (a.pricce > b.pricce) {
    return 1;
  }
  return 0;
}
