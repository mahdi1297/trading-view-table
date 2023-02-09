import ConditionalFilterComponent from '../components/data-table-head/filters/conditional-filter';
import EmpeloyeeFilterFilterComponent from '../components/data-table-head/filters/empeloyee-filter';
import MarketCapitalizationFilterComponent from '../components/data-table-head/filters/market-capitalization-filter';
import SectorRatingFilterComponent from '../components/data-table-head/filters/sector-filter';
import TechnicalRatingFilterComponent from "../components/data-table-head/filters/technical-rating-filter";
import VolumeFilterComponent from '../components/data-table-head/filters/volume-filter';
import VolumeInPriceFilterComponent from '../components/data-table-head/filters/volume-in-price-filter';
import { CHANGE, CHANGE_PERCENT, PRICE_TO_EARNING_RATIO } from '../constaints';
import { sortChange, sortChangePercent, sortEmployees, sortMarketCap, sortPE, sortPrice, sortSector, sortTechnicalRating, sortVolume, sortVolumeInPrice } from '../slices/data.slice';
import { TableHead } from "../types/table-head";

export const tableHeads: TableHead[] = [
  {
    id: 1,
    title: "TICKERS",
    children: <input type="text" className='filter-input' />,
  },

  {
    id: 2,
    title: "Price",
    component: () => <ConditionalFilterComponent componentSignature="filterPrice" componentTitle="Price" />,
    sorterFunction: sortPrice
  },

  {
    id: 3,
    title: "CHG",
    component: () => <ConditionalFilterComponent componentSignature="filterChange" componentTitle={CHANGE} />,
    sorterFunction: sortChange
  },

  {
    id: 4,
    title: "CHG%",
    component: () => <ConditionalFilterComponent componentSignature="filterChangePercent" componentTitle={CHANGE_PERCENT} />,
    sorterFunction: sortChangePercent
  },
  {
    id: 5,
    title: "TECHNICAL RATING",
    component: TechnicalRatingFilterComponent,
    sorterFunction: sortTechnicalRating
  },
  {
    id: 6,
    title: "VOL",
    component: VolumeFilterComponent,
    sorterFunction: sortVolume
  },
  {
    id: 7,
    title: "MKT CAP",
    component: MarketCapitalizationFilterComponent,
    sorterFunction: sortMarketCap
  },
  {
    id: 8,
    title: "VOLUME*PRICE",
    component: VolumeInPriceFilterComponent,
    modalClassName: 'volume-in-price-filter-modal',
    sorterFunction: sortVolumeInPrice
  },
  {
    id: 10,
    title: "P/E",
    component: () => <ConditionalFilterComponent componentSignature="filterPE" componentTitle={PRICE_TO_EARNING_RATIO} />,
    modalClassName: 'p-e-filter-modal',
    sorterFunction: sortPE
  },
  {
    id: 11,
    title: "EMPLOYEES",
    component: EmpeloyeeFilterFilterComponent,
    modalClassName: 'empeloyees-filter-modal',
    sorterFunction: sortEmployees
  },
  {
    id: 12,
    title: "SECTOR",
    component: SectorRatingFilterComponent,
    modalClassName: 'sector-filter-modal',
    sorterFunction: sortSector
  },
];
