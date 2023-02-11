import { RANGE_SLIDER_MAX_VALUE, RANGE_SLIDER_MIN_VALUE } from "../constaints";
import {
  isArrayOfStrings,
  isNumber,
  isObject,
  isString,
} from "../utils/type-guards";
import { Data } from "../types/data-table-body";

export type Statue = "Above" | "Below Or Equal" | "Below";

interface FilterEvent {
  concrete: (
    value: string[] | number | string,
    amoung: Statue,
    dataList: Data[]
  ) => Data[];
}

interface ConcreteFilter {
  distributeEvents: (
    filterName: string,
    value: string | string[],
    amoung: Statue,
    getNewData: Function
  ) => void | Data[];
  build: () => Data[];
}

class FilterUtils {
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
  concrete(
    value: string | number | string[],
    amoung: Statue,
    dataList: Data[]
  ) {
    if (isNumber(value)) {
      return this.compareNumberValue(dataList, value, amoung, "price");
    }
    return dataList;
  }
}

class FilterChange extends FilterUtils implements FilterEvent {
  concrete(
    value: string | number | string[],
    amoung: Statue,
    dataList: Data[]
  ) {
    if (isNumber(value)) {
      return this.compareNumberValue(dataList, value, amoung, "CHG");
    }
    if (isString(value)) {
      return dataList;
    }
  }
}

class FilterChangePercent extends FilterUtils implements FilterEvent {
  concrete(
    value: string | number | string[],
    amoung: Statue,
    dataList: Data[]
  ) {
    if (isNumber(value)) {
      return this.compareNumberValue(dataList, value, amoung, "CHG%");
    }
    return dataList;
  }
}

class FilterPE extends FilterUtils implements FilterEvent {
  concrete(
    value: string | number | string[],
    amoung: Statue,
    dataList: Data[]
  ) {
    if (isNumber(value)) {
      return this.compareNumberValue(dataList, value, amoung, "P/E%");
    }
    return dataList;
  }
}

class Sector extends FilterUtils implements FilterEvent {
  concrete(
    value: string | number | string[],
    amoung: Statue,
    dataList: Data[]
  ): Data[] {
    if (isArrayOfStrings(value)) {
      const stringifiedValue = value.join(" , ");

      if (stringifiedValue.includes("Any")) {
        return dataList;
      } else {
        const result = dataList.filter(function (f: Data) {
          return stringifiedValue.search(f.SECTOR) !== -1;
        });

        return result;
      }
    }
    return dataList;
  }
}

class TechnicalRating extends FilterUtils implements FilterEvent {
  concrete(
    value: string | number | string[],
    amoung: Statue,
    dataList: Data[]
  ): Data[] {
    if (isArrayOfStrings(value)) {
      const stringifiedValue = value.join(" , ");

      if (stringifiedValue.includes("Any")) {
        return dataList;
      } else {
        if (dataList) {
          const result = dataList.filter(function (f: Data) {
            if (stringifiedValue.includes("Any")) {
              return f;
            }
            return stringifiedValue.includes(f.TECHNICAL_RATING);
          });

          return result;
        }
      }
    }
  }
}

class Volume extends FilterUtils implements FilterEvent {
  concrete(
    value: string | number | string[],
    amoung: Statue,
    dataList: Data[]
  ): Data[] {
    if (isObject(value)) {
      const { min, max }: { min: number; max: number } = value;
      if (dataList) {
        const result = dataList.filter(function (f: Data) {
          return min < f.VOLUME && f.VOLUME < max;
        });

        return result;
      }
    }
    return dataList;
  }
}

export class ConcreteFilterEvents implements ConcreteFilter {
  data: Data[];
  _filterPrice: FilterPrice;
  _filterChange: FilterChange;
  _filterChangePercent: FilterChangePercent;
  _filterPE: FilterPE;
  _sector: Sector;
  _technicalRating: TechnicalRating;
  _volume: Volume;

  constructor(data: Data[]) {
    this._filterPrice = new FilterPrice();
    this._filterChange = new FilterChange();
    this._filterChangePercent = new FilterChangePercent();
    this._filterPE = new FilterPE();
    this._sector = new Sector();
    this._technicalRating = new TechnicalRating();
    this._volume = new Volume();
    this.data = data;
  }

  distributeEvents(
    filterName: string,
    value: string | number | string[],
    amoung: Statue,
    getNewData: Function
  ): void | Data[] {
    if (this.data === undefined || !this.data) {
      getNewData();
    }
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
    if (filterName === "filterSector") {
      this.data = this._sector.concrete(value, null, this.data);
    }
    if (filterName === "filterTechnicalRating") {
      this.data = this._technicalRating.concrete(value, null, this.data);
    }
    if (filterName === "filterVolume") {
      this.data = this._volume.concrete(value, null, this.data);
    }
  }

  build() {
    return this.data;
  }
}
