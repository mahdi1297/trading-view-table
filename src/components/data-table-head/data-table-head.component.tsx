import React, { useState } from 'react'
import { GoSettings } from 'react-icons/go'
import FilterModalComponent from '../filter-modal/filter-modal.componen';
import PriceFilterComponent from '../filters/price-filter.component';
import TechnicalRatingFilterComponent from '../filters/technical-rating-filter.component';
import './data-table-head.style.css'

const filters = [
    {
        id: 1,
        title: "TICKERS",
        component: PriceFilterComponent,
        children: <input type="text" />
    },

    {
        id: 2,
        title: "Price",
        component: PriceFilterComponent
    },

    {
        id: 3,
        title: "CHG",
        // component: PriceFilterComponent
    },

    {
        id: 4,
        title: "CHG%",
        // component: PriceFilterComponent
    },
    {
        id: 5,
        title: "TECHNICAL RATING",
        component: TechnicalRatingFilterComponent
    },
    {
        id: 6,
        title: "VOL",
        // component: TechnicalRatingFilterComponent
    },
    {
        id: 7,
        title: "MKT CAP",
        // component: TechnicalRatingFilterComponent
    },
    {
        id: 8,
        title: "VOLUME*PRICE",
        // component: TechnicalRatingFilterComponent
    },
    {
        id: 9,
        title: "VOLUME*PRICE",
        // component: TechnicalRatingFilterComponent
    },
    {
        id: 10,
        title: "P/E",
        // component: TechnicalRatingFilterComponent
    },
    {
        id: 11,
        title: "EMPLOYEES",
        // component: TechnicalRatingFilterComponent
    },
    {
        id: 12,
        title: "SECTOR",
        // component: TechnicalRatingFilterComponent
    },

]

const DataTableHeadComponent = () => {
    const [selectedRow, setSelectedRow] = useState<number>(null);
    const [openSortModal, setOpenSortModal] = useState(0);


    const selectRowHandler = (index: number) => {
        setOpenSortModal(index);
        setSelectedRow(index);
    }

    const modalCloseHandler = () => {
        setOpenSortModal(null);
    }

    return (
        <thead>
            <tr>
                {
                    filters.map((item) => (
                        <th key={item.id} className={selectedRow === item.id ? 'active-row' : 'disabled-row'}>
                            {item.title}
                            {item.children ? item.children : null}
                            <div className="filter-modal-btn" onClick={() => { selectRowHandler(item.id) }}>
                                <GoSettings />
                            </div>
                            {item.component ?
                                <FilterModalComponent
                                    isOpen={openSortModal === item.id}
                                    component={item.component}
                                    modalCloseHandler={modalCloseHandler}
                                />
                                : null}
                        </th>
                    ))
                }
            </tr >
        </thead>
    )
}

export default DataTableHeadComponent