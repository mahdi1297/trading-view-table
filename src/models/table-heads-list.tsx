import ChangeFilterComponent from '../components/data-table-head/filters/change-filter';
import ChangePercentFilterComponent from '../components/data-table-head/filters/change-percent-filter';
import EmpeloyeeFilterFilterComponent from '../components/data-table-head/filters/empeloyee-filter';
import MarketCapitalizationFilterComponent from '../components/data-table-head/filters/market-capitalization-filter';
import PEFilterComponent from '../components/data-table-head/filters/p-e-filter';
import PriceFilterComponent from "../components/data-table-head/filters/price-filter";
import SectorRatingFilterComponent from '../components/data-table-head/filters/sector-filter';
import TechnicalRatingFilterComponent from "../components/data-table-head/filters/technical-rating-filter";
import VolumeFilterComponent from '../components/data-table-head/filters/volume-filter';
import VolumeInPriceFilterComponent from '../components/data-table-head/filters/volume-in-price-filter';
import { sortChange, sortChangePercent, sortEmployees, sortMarketCap, sortPE, sortPrice, sortSector, sortVolume, sortVolumeInPrice } from '../slices/data.slice';
import { TableHead } from "../types/table-head";

export const tableHeads: TableHead[] = [
  {
    id: 1,
    title: "TICKERS",
    component: PriceFilterComponent,
    children: <input type="text" className='filter-input' />,
  },

  {
    id: 2,
    title: "Price",
    component: PriceFilterComponent,
    sorterFunction: sortPrice
  },

  {
    id: 3,
    title: "CHG",
    component: ChangeFilterComponent,
    sorterFunction: sortChange
  },

  {
    id: 4,
    title: "CHG%",
    component: ChangePercentFilterComponent,
    sorterFunction: sortChangePercent
  },
  {
    id: 5,
    title: "TECHNICAL RATING",
    component: TechnicalRatingFilterComponent,
    // sorterFunction: sortEvent.technicalRatingSortHandler
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
    component: PEFilterComponent,
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
