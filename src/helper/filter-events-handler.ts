import {
  isArrayOfStrings,
  isNumber,
  isObject,
  isString,
} from "../utils/type-guards";
import { Filter } from "../slices/data.slice";
import { Data } from "../types/data-table-body";

export class FilterEvent {
  dataList: Data[];

  init(data: Data[]) {
    this.dataList = data;
    return this;
  }

  price(filter?: Filter) {
    if (!filter) {
      return this;
    }
    const { value, amoung } = filter;

    if (isString(value)) {
      this.dataList = this.dataList;
      return this;
    }
    if (isNumber(value)) {
      this.dataList = this.dataList.filter(function (f) {
        if (amoung === "Above") {
          return f.price > value;
        }
        if (amoung === "Below") {
          return f.price < value;
        }
        if (amoung === "Below Or Equal") {
          return f.price <= value;
        }
      });
      return this;
    }
    return this;
  }

  change(filter?: Filter) {
    if (!filter) {
      return this;
    }

    const { value, amoung } = filter;

    if (isString(value)) {
      this.dataList = this.dataList;
      return this;
    }
    if (isNumber(value)) {
      this.dataList = this.dataList.filter(function (f) {
        if (amoung === "Above") {
          return f.CHG > value;
        }
        if (amoung === "Below") {
          return f.CHG < value;
        }
        if (amoung === "Below Or Equal") {
          return f.CHG <= value;
        }
      });
      return this;
    }
    return this;
  }

  changePercent(filter?: Filter) {
    if (!filter) {
      return this;
    }

    const { value, amoung } = filter;

    if (isString(value)) {
      this.dataList = this.dataList;
      return this;
    }
    if (isNumber(value)) {
      this.dataList = this.dataList.filter(function (f) {
        if (amoung === "Above") {
          return f["CHG%"] > value;
        }
        if (amoung === "Below") {
          return f["CHG%"] < value;
        }
        if (amoung === "Below Or Equal") {
          return f["CHG%"] <= value;
        }
      });
      return this;
    }
    return this;
  }

  filterPE(filter: Filter) {
    if (!filter) {
      return this;
    }

    const { value, amoung } = filter;

    if (isString(value)) {
      return this;
    }
    if (isNumber(value)) {
      this.dataList = this.dataList.filter(function (f) {
        if (amoung === "Above") {
          return f["P/E"] > value;
        }
        if (amoung === "Below") {
          return f["P/E"] < value;
        }
        if (amoung === "Below Or Equal") {
          return f["P/E"] <= value;
        }
      });
      return this;
    }
    return this;
  }

  filterSector(filter: Filter) {
    if (!filter) {
      return this;
    }

    const { value } = filter;

    if (value.length === 0) {
      this.dataList = [];
      return this;
    }

    if (isArrayOfStrings(value)) {
      const stringifiedValue = value.join(" , ");

      if (stringifiedValue.includes("Any")) {
        this.dataList = this.dataList;
        return this;
      } else {
        const result = this.dataList.filter(function (f: Data) {
          return stringifiedValue.search(f.SECTOR) !== -1;
        });

        this.dataList = result;
        return this;
      }
    }
    return this;
  }

  filterTechnicalRating(filter: Filter) {
    if (!filter) {
      return this;
    }

    const { value } = filter;

    if (isArrayOfStrings(value)) {
      if (value.length === 0) {
        return this;
      }

      const stringifiedValue = value.join(" , ");

      if (stringifiedValue.includes("Any")) {
        return this;
      } else {
        const result = this.dataList.filter(function (f: Data) {
          if (stringifiedValue.includes("Any")) {
            return f;
          }
          return stringifiedValue.includes(f.TECHNICAL_RATING);
        });

        this.dataList = result;
        return this;
      }
    }
    return this;
  }

  filterVolume(filter: Filter) {
    if (!filter) {
      return this;
    }

    const { value } = filter;

    if (isObject(value)) {
      const { min, max }: { min: number; max: number } = value;
      const result = this.dataList.filter(function (f: Data) {
        return min < f.VOLUME && f.VOLUME < max;
      });

      this.dataList = result;
      return this;
    }
    return this;
  }

  filterEmployees(filter: Filter) {
    if (!filter) {
      return this;
    }

    const { value } = filter;

    if (isObject(value)) {
      const { min, max }: { min: number; max: number } = value;
      const result = this.dataList.filter(function (f: Data) {
        return min < f.EMPLOYEES && f.EMPLOYEES < max;
      });

      this.dataList = result;
      return this;
    }
    return this;
  }

  filterValueInPrice(filter: Filter) {
    if (!filter) {
      return this;
    }

    const { value } = filter;

    if (isObject(value)) {
      const { min, max }: { min: number; max: number } = value;
      const result = this.dataList.filter(function (f: Data) {
        return min < f["VOLUME*PRICE"] && f["VOLUME*PRICE"] < max;
      });

      this.dataList = result;
      return this;
    }
    return this;
  }

  filterMatKap(filter: Filter) {
    if (!filter) {
      return this;
    }

    const { value } = filter;

    if (isObject(value)) {
      const { min, max }: { min: number; max: number } = value;
      const result = this.dataList.filter(function (f: Data) {
        return min < f.MKT_CAP && f.MKT_CAP < max;
      });

      this.dataList = result;
      return this;
    }
    return this;
  }

  result(): any {
    return this.dataList;
  }
}
