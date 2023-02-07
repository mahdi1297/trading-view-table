import React, { useEffect, useRef } from 'react'
import classNames from 'classnames'
import { CiSearch } from 'react-icons/ci'
import { IoCloseOutline } from 'react-icons/io5'
import PriceFilterComponent from '../../data-table-head/filters/price-filter'
import ChangeFilterComponent from '../../data-table-head/filters/change-filter'
import ChangePercentFilterComponent from '../../data-table-head/filters/change-percent-filter'
import TechnicalRatingFilterComponent from '../../data-table-head/filters/technical-rating-filter'
import VolumeFilterComponent from '../../data-table-head/filters/volume-filter'
import MarketCapitalizationFilterComponent from '../../data-table-head/filters/market-capitalization-filter'
import VolumeInPriceFilterComponent from '../../data-table-head/filters/volume-in-price-filter'
import PEFilterComponent from '../../data-table-head/filters/p-e-filter'
import EmpeloyeeFilterFilterComponent from '../../data-table-head/filters/empeloyee-filter'
import SectorRatingFilterComponent from '../../data-table-head/filters/sector-filter'

type Props = {
    visible: boolean,
    hideModalHandler: Function
}

const filters = [


    {
        id: 7,
        title: "MKT CAP",
        component: MarketCapitalizationFilterComponent
    },
    {
        id: 4,
        title: "CHG%",
        component: ChangePercentFilterComponent
    },
    {
        id: 6,
        title: "VOL",
        component: VolumeFilterComponent
    },

    {
        id: 3,
        title: "CHG",
        component: ChangeFilterComponent
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
    {
        id: 2,
        title: "Price",
        component: PriceFilterComponent,
    },

    {
        id: 5,
        title: "TECHNICAL RATING",
        component: TechnicalRatingFilterComponent,
    },


]

const ToolbarFilterModal = ({ visible, hideModalHandler }: Props) => {

    const modalRef = useRef<HTMLDivElement>();

    useEffect(() => {

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [visible]);

    function handleClickOutside(e: Event | any) {
        if (modalRef?.current && !modalRef.current.contains(e.target)) {
            hideModalHandler();
        }
    };

    return (
        <div className={classNames({
            'toolbar-filter': true,
            'visible': visible ? true : false,
            'invisible': visible ? false : true
        })}
            ref={modalRef}
        >
            <div className="head">
                <span className='modal-closer' onClick={() => hideModalHandler()}>
                    <IoCloseOutline />
                </span>
            </div>
            <div className="search-bar">
                <span>
                    <CiSearch />
                </span>
                <input type="text" placeholder="Search via filters" className='search-input' />
            </div>
            <div className="body">
                {filters.map((f) => (
                    <div className='body-filter-items' key={f.id}>
                        <f.component />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ToolbarFilterModal