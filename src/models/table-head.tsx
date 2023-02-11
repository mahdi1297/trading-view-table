import ConditionalFilterComponent from '../components/data-table-head/filters/conditional-filter';
import RangeNumberComponent from '../components/data-table-head/filters/range-number-filter';
import SelectiveFilterComponent from '../components/data-table-head/filters/selective-filter';
import { TableHead } from "../types/table-head";
import { sectorSortFilters } from './sector-filter-sort-list';
import { technicalRateFilters } from './technical-rating-list';
import {
  CHANGE,
  CHANGE_PERCENT,
  EMPLOYEE,
  EMPLOYEE_RANGE_SLIDER_MAX_VALUE,
  EMPLOYEE_RANGE_SLIDER_MIN_VALUE,
  MARKET_CAPITALIZATION,
  MARKET_KAP_RANGE_SLIDER_MAX_VALUE,
  MARKET_KAP_RANGE_SLIDER_MIN_VALUE,
  PRICE_IN_VOLUME_RANGE_SLIDER_MIN_VALUE,
  PRICE_IN_VOLUME_SLIDER_MAX_VALUE,
  PRICE_TO_EARNING_RATIO,
  SECTOR,
  TECHNICAL_RATING,
  VOLUME,
  VOLUME_IN_PRICE,
  VOLUME_RANGE_SLIDER_MAX_VALUE,
  VOLUME_RANGE_SLIDER_MIN_VALUE
} from '../constaints';
import {
  sortChange,
  sortChangePercent,
  sortEmployees,
  sortMarketCap,
  sortPE,
  sortPrice,
  sortSector,
  sortTechnicalRating,
  sortVolume,
  sortVolumeInPrice
} from '../slices/data.slice';


export const tableHeads: TableHead[] = [
  {
    id: 1,
    title: "TICKERS",
  },

  {
    id: 2,
    title: "Price",
    component: () => <ConditionalFilterComponent
      componentSignature="filterPrice"
      componentTitle="Price"
    />,
    sorterFunction: sortPrice
  },

  {
    id: 3,
    title: "CHG",
    component: () => <ConditionalFilterComponent
      componentSignature="filterChange"
      componentTitle={CHANGE}
    />,
    sorterFunction: sortChange
  },

  {
    id: 4,
    title: "CHG%",
    component: () => <ConditionalFilterComponent
      componentSignature="filterChangePercent"
      componentTitle={CHANGE_PERCENT}
    />,
    sorterFunction: sortChangePercent
  },
  {
    id: 5,
    title: "TECHNICAL RATING",
    component: () => <SelectiveFilterComponent
      componentSignature="filterTechnicalRating"
      componentTitle={TECHNICAL_RATING}
      filterList={technicalRateFilters}
    />,
    sorterFunction: sortTechnicalRating
  },
  {
    id: 6,
    title: "VOL",
    component: () => <RangeNumberComponent
      RANGE_SLIDER_MIN_VALUE={VOLUME_RANGE_SLIDER_MIN_VALUE}
      RANGE_SLIDER_MAX_VALUE={VOLUME_RANGE_SLIDER_MAX_VALUE}
      componentSignature="filterVolume"
      componentTitle={VOLUME}
    />,
    sorterFunction: sortVolume
  },
  {
    id: 7,
    title: "MKT CAP",
    component: () => <RangeNumberComponent
      RANGE_SLIDER_MIN_VALUE={MARKET_KAP_RANGE_SLIDER_MIN_VALUE}
      RANGE_SLIDER_MAX_VALUE={MARKET_KAP_RANGE_SLIDER_MAX_VALUE}
      componentSignature="filterMat_kap"
      componentTitle={MARKET_CAPITALIZATION}
    />,
    sorterFunction: sortMarketCap
  },
  {
    id: 8,
    title: "VOLUME*PRICE",
    component: () => <RangeNumberComponent
      componentSignature="filterValueInPrice"
      RANGE_SLIDER_MIN_VALUE={PRICE_IN_VOLUME_RANGE_SLIDER_MIN_VALUE}
      RANGE_SLIDER_MAX_VALUE={PRICE_IN_VOLUME_SLIDER_MAX_VALUE}
      componentTitle={VOLUME_IN_PRICE}
    />,
    modalClassName: 'volume-in-price-filter-modal',
    sorterFunction: sortVolumeInPrice
  },
  {
    id: 10,
    title: "P/E",
    component: () => <ConditionalFilterComponent
      componentSignature="filterPE"
      componentTitle={PRICE_TO_EARNING_RATIO}
    />,
    modalClassName: 'p-e-filter-modal',
    sorterFunction: sortPE
  },
  {
    id: 11,
    title: "EMPLOYEES",
    component: () => <RangeNumberComponent
      componentSignature="filterEmployees"
      RANGE_SLIDER_MIN_VALUE={EMPLOYEE_RANGE_SLIDER_MIN_VALUE}
      RANGE_SLIDER_MAX_VALUE={EMPLOYEE_RANGE_SLIDER_MAX_VALUE}
      componentTitle={EMPLOYEE}
    />,
    modalClassName: 'empeloyees-filter-modal',
    sorterFunction: sortEmployees
  },
  {
    id: 12,
    title: "SECTOR",
    modalClassName: 'sector-filter-modal',
    sorterFunction: sortSector,
    component: () => <SelectiveFilterComponent
      componentSignature="filterSector"
      componentTitle={SECTOR}
      filterList={sectorSortFilters}
    />,
  },
];
