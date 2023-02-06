import ChangeFilterComponent from '../components/filters/change-filter';
import ChangePercentFilterComponent from '../components/filters/change-percent-filter';
import EmpeloyeeFilterFilterComponent from '../components/filters/empeloyee-filter';
import MarketCapitalizationFilterComponent from '../components/filters/market-capitalization-filter';
import PEFilterComponent from '../components/filters/p-e-filter';
import PriceFilterComponent from "../components/filters/price-filter";
import SectorRatingFilterComponent from '../components/filters/sector-filter';
import TechnicalRatingFilterComponent from "../components/filters/technical-rating-filter";
import VolumeFilterComponent from '../components/filters/volume-filter';
import VolumeInPriceFilterComponent from '../components/filters/volume-in-price-filter';
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
  },

  {
    id: 3,
    title: "CHG",
    component: ChangeFilterComponent
  },

  {
    id: 4,
    title: "CHG%",
    component: ChangePercentFilterComponent
  },
  {
    id: 5,
    title: "TECHNICAL RATING",
    component: TechnicalRatingFilterComponent,
  },
  {
    id: 6,
    title: "VOL",
    component: VolumeFilterComponent
  },
  {
    id: 7,
    title: "MKT CAP",
    component: MarketCapitalizationFilterComponent
  },
  {
    id: 8,
    title: "VOLUME*PRICE",
    component: VolumeInPriceFilterComponent,
    modalClassName: 'volume-in-price-filter-modal'

  },
  {
    id: 10,
    title: "P/E",
    component: PEFilterComponent,
    modalClassName: 'p-e-filter-modal'

  },
  {
    id: 11,
    title: "EMPLOYEES",
    component: EmpeloyeeFilterFilterComponent,
    modalClassName: 'empeloyees-filter-modal'

  },
  {
    id: 12,
    title: "SECTOR",
    component: SectorRatingFilterComponent,
    modalClassName: 'sector-filter-modal'
  },
];
