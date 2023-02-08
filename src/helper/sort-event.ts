import { getSortStatue } from "../utils/sort-statue";

export type SortEventType = {
  _sortCtx: any;
  _dataCtx: any;
  title: string;
};

export class SortEvent {
  constructor() {}

  priceSortHandler({
    _dataCtx,
    _sortCtx,
    title,
  }: {
    _dataCtx: any;
    _sortCtx: any;
    title: string;
  }) {
    const sortList = _sortCtx.getSortList();

    const order = getSortStatue(sortList, title);

    _dataCtx.sortByPrice(order);
  }

  changeSortHandler({ _sortCtx, _dataCtx, title }: SortEventType) {
    console.log("changeSortHandler");
  }

  changePercentSortHandler({ _sortCtx, _dataCtx, title }: SortEventType) {
    console.log("changePercentSortHandler");
  }

  technicalRatingSortHandler({ _sortCtx, _dataCtx, title }: SortEventType) {}

  volumeSortHandler({ _sortCtx, _dataCtx, title }: SortEventType) {}

  mktCapSortHandler({ _sortCtx, _dataCtx, title }: SortEventType) {}

  volumeInPriceSortHandler({ _sortCtx, _dataCtx, title }: SortEventType) {}

  pESortHandler({ _sortCtx, _dataCtx, title }: SortEventType) {}

  empeloyeesSortHandler({ _sortCtx, _dataCtx, title }: SortEventType) {}

  sectorSortHandler({ _sortCtx, _dataCtx, title }: SortEventType) {}
}
