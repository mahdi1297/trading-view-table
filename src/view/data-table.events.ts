import { DataTableBody } from "../types/data-table-body";

export class DataTableEventsHandler {
  // private _data: DataTableBody[];
  private _data: any;

  // constructor(tableData: DataTableBody[]) {
  //   this._data = tableData;
  // }

  constructor(data: any) {}

  searchClickHandler() {
    console.log("searchClickHandler");
  }

  priceClickHandler() {
    console.log("priceClickHandler");
  }

  chgPercentClickHandler() {
    console.log("chgPercentClickHandler");
  }

  chgClickHandler() {
    console.log("chgClickHandler");
  }

  technicalRatingClickHandler() {
    console.log("technicalRatingClickHandler");
  }

  volClickHandler() {
    console.log("volClickHandler");
  }

  volInPriceClickHandler() {
    console.log("volInPriceClickHandler");
  }

  mktCapClickHandler() {
    console.log("mktCapClickHandler");
  }

  pEClickHandler() {
    console.log("pEClickHandler");
  }

  employeesClickHandler() {
    console.log("employeesClickHandler");
  }

  sectorClickHandler() {
    console.log("sectorClickHandler");
  }
}
