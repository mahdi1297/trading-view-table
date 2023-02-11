import ConditionalFilterComponent from '../components/data-table-head/filters/conditional-filter'
import SelectiveFilterComponent from "../components/data-table-head/filters/selective-filter";
import { technicalRateFilters } from "./technical-rating-list";
import { sectorSortFilters } from "./sector-filter-sort-list";
import RangeNumberComponent from "../components/data-table-head/filters/range-number-filter";
import {
  CHANGE,
  CHANGE_PERCENT,
  EMPLOYEE,
  EMPLOYEE_RANGE_SLIDER_MAX_VALUE,
  EMPLOYEE_RANGE_SLIDER_MIN_VALUE,
  MARKET_CAPITALIZATION,
  MARKET_KAP_RANGE_SLIDER_MAX_VALUE,
  MARKET_KAP_RANGE_SLIDER_MIN_VALUE,
  PRICE,
  PRICE_IN_VOLUME_RANGE_SLIDER_MIN_VALUE,
  PRICE_IN_VOLUME_SLIDER_MAX_VALUE,
  PRICE_TO_EARNING_RATIO,
  SECTOR,
  TECHNICAL_RATING,
  VOLUME,
  VOLUME_IN_PRICE,
  VOLUME_RANGE_SLIDER_MAX_VALUE,
  VOLUME_RANGE_SLIDER_MIN_VALUE
} from "../constaints";
import { TableHead } from '../types/table-head';

export const toolbarFilters: TableHead[] = [
  {
    id: 7,
    title: "MKT CAP",
    component: () => <RangeNumberComponent
      RANGE_SLIDER_MIN_VALUE={MARKET_KAP_RANGE_SLIDER_MIN_VALUE}
      RANGE_SLIDER_MAX_VALUE={MARKET_KAP_RANGE_SLIDER_MAX_VALUE}
      componentSignature="filterMat_kap"
      componentTitle={MARKET_CAPITALIZATION}
    />,
  },
  {
    id: 4,
    title: "CHG%",
    component: () => (
      <ConditionalFilterComponent
        componentSignature="filterChangePercent"
        componentTitle={CHANGE_PERCENT}
      />
    ),
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
  },

  {
    id: 3,
    title: "CHG",
    component: () => (
      <ConditionalFilterComponent
        componentSignature="filterChange"
        componentTitle={CHANGE}
      />
    ),
  },

  {
    id: 8,
    title: "VOLUME*PRICE",
    component: () => <RangeNumberComponent
      componentSignature="filterValueInPrice"
      RANGE_SLIDER_MIN_VALUE={PRICE_IN_VOLUME_RANGE_SLIDER_MIN_VALUE}
      RANGE_SLIDER_MAX_VALUE={PRICE_IN_VOLUME_SLIDER_MAX_VALUE}
      componentTitle={VOLUME_IN_PRICE} />,
    modalClassName: "volume-in-price-filter-modal",
  },
  {
    id: 10,
    title: "P/E",
    component: () => (
      <ConditionalFilterComponent
        componentSignature="filterPE"
        componentTitle={PRICE_TO_EARNING_RATIO}
      />
    ),
    modalClassName: "p-e-filter-modal",
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
    modalClassName: "empeloyees-filter-modal",
  },
  {
    id: 12,
    title: "SECTOR",
    modalClassName: "sector-filter-modal",
    component: () => <SelectiveFilterComponent
      componentSignature="filterSector"
      componentTitle={SECTOR}
      filterList={sectorSortFilters}
    />,
  },
  {
    id: 2,
    title: "Price",
    component: () => (
      <ConditionalFilterComponent
        componentSignature="filterPrice"
        componentTitle={PRICE}
      />
    ),
  },

  {
    id: 5,
    title: "TECHNICAL RATING",
    component: () => <SelectiveFilterComponent
      componentSignature="filterTechnicalRating"
      componentTitle={TECHNICAL_RATING}
      filterList={technicalRateFilters}
    />,
  },
];
