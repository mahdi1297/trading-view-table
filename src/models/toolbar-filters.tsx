import MarketCapitalizationFilterComponent from "../components/data-table-head/filters/market-capitalization-filter"
import ConditionalFilterComponent from '../components/data-table-head/filters/conditional-filter'
import { CHANGE, CHANGE_PERCENT, PRICE, PRICE_TO_EARNING_RATIO, SECTOR, TECHNICAL_RATING } from "../constaints";
import VolumeFilterComponent from "../components/data-table-head/filters/volume-filter";
import VolumeInPriceFilterComponent from "../components/data-table-head/filters/volume-in-price-filter";
import EmpeloyeeFilterFilterComponent from "../components/data-table-head/filters/empeloyee-filter";
import SectorRatingFilterComponent from "../components/data-table-head/filters/sector-filter";
import SelectiveFilterComponent from "../components/data-table-head/filters/selective-filter";
import { technicalRateFilters } from "./technical-rating-list";
import { sectorSortFilters } from "./sector-filter-sort-list";

export const toolbarFilters = [
  {
    id: 7,
    title: "MKT CAP",
    component: MarketCapitalizationFilterComponent,
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
    component: VolumeFilterComponent,
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
    component: VolumeInPriceFilterComponent,
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
    component: EmpeloyeeFilterFilterComponent,
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
