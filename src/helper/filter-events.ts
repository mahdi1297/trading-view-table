import { Data } from "../types/data-table-body";

export type Statue = "Above" | "Below Or Equal" | "Below" ;

interface FilterEvent {
  concrete: (
    value: number | string,
    amoung: Statue,
    dataList: Data[]
  ) => Data[];
}

interface ConcreteFilter {
  distributeEvents: (
    filterName: string,
    value: string,
    amoung: Statue
  ) => void | Data[];
  build: () => Data[];
}

class FilterUtils {
  constructor() {}

  checkIfNumber(value: number | string, dataList: Data[]) {
    if (typeof value === "number") {
      return dataList;
    }
  }

  compareNumberValue(
    dataList: Data[],
    value: number | string,
    amoung: string,
    valueToCompare: string
  ) {
    return dataList.filter(function (s: any) {
      if (amoung === "Above") {
        return s[valueToCompare] > value;
      }
      if (amoung === "Below") {
        return s[valueToCompare] < value;
      }
      if (amoung === "Below Or Equal") {
        return s[valueToCompare] <= value;
      }
    });
  }
}

class FilterPrice extends FilterUtils implements FilterEvent {
  concrete(value: number | string, amoung: Statue, dataList: Data[]) {
    this.checkIfNumber(value, dataList);

    return this.compareNumberValue(dataList, value, amoung, "price");
  }
}

class FilterChange extends FilterUtils implements FilterEvent {
  concrete(value: string | number, amoung: Statue, dataList: Data[]) {
    this.checkIfNumber(value, dataList);

    return this.compareNumberValue(dataList, value, amoung, "CHG");
  }
}

class FilterChangePercent extends FilterUtils implements FilterEvent {
  concrete(value: string | number, amoung: Statue, dataList: Data[]) {
    this.checkIfNumber(value, dataList);

    return this.compareNumberValue(dataList, value, amoung, "CHG%");
  }
}

class FilterPE extends FilterUtils implements FilterEvent {
  concrete(value: string | number, amoung: Statue, dataList: Data[]) {
    this.checkIfNumber(value, dataList);

    return this.compareNumberValue(dataList, value, amoung, "P/E%");
  }
}

export class ConcreteFilterEvents implements ConcreteFilter {
  data: Data[];
  _filterPrice: FilterPrice;
  _filterChange: FilterChange;
  _filterChangePercent: FilterChangePercent;
  _filterPE: FilterPE;

  constructor(data: Data[]) {
    this._filterPrice = new FilterPrice();
    this._filterChange = new FilterChange();
    this._filterChangePercent = new FilterChangePercent();
    this._filterPE = new FilterPE();
    this.data = data;
  }

  distributeEvents(
    filterName: string,
    value: string,
    amoung: Statue
  ): void | Data[] {
    if (filterName === "filterPrice") {
      const data = this._filterPrice.concrete(value, amoung, this.data);
      this.data = data;
    }
    if (filterName === "filterChange") {
      this.data = this._filterChange.concrete(value, amoung, this.data);
    }
    if (filterName === "filterChangePercent") {
      this.data = this._filterChangePercent.concrete(value, amoung, this.data);
    }
    if (filterName === "filterPE") {
      this.data = this._filterPE.concrete(value, amoung, this.data);
    }
  }

  build() {
    return this.data;
  }
}
