import React, { useState } from 'react'
import { GoSettings } from 'react-icons/go'
import PriceFilterComponent from '../filters/price-filter.component';
import './data-table-head.style.css'

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
                <th className={selectedRow === 1 ? 'active-row' : 'disabled-row'}>
                    TICKERS
                    <input type="text" />
                    <div className="filter-modal-btn" onClick={() => { selectRowHandler(1) }}>
                        <GoSettings />
                    </div>
                    {openSortModal === 1 &&
                        <>
                            <div className="open-modal-page-wrapper" onClick={modalCloseHandler}></div>
                            <div className="sort-modal ">
                                <h2>Sample</h2>
                            </div>
                        </>
                    }
                </th>
                <th className={selectedRow === 2 ? 'active-row' : 'disabled-row'}>
                    PRICE
                    <div className="filter-modal-btn" onClick={() => { selectRowHandler(2) }}>
                        <GoSettings />
                    </div>
                    {openSortModal === 2 &&
                        <>
                            <div className="open-modal-page-wrapper" onClick={modalCloseHandler}></div>
                            <div className="sort-modal ">
                                <PriceFilterComponent />
                            </div>
                        </>
                    }
                </th>
                <th className={selectedRow === 3 ? 'active-row' : 'disabled-row'}>
                    CHG
                    <div className="filter-modal-btn" onClick={() => { selectRowHandler(3) }}>
                        <GoSettings />
                    </div>
                    {openSortModal === 3 &&
                        <>
                            <div className="open-modal-page-wrapper" onClick={modalCloseHandler}></div>
                            <div className="sort-modal ">
                                <h2>Sample</h2>
                            </div>
                        </>
                    }
                </th>
                <th className={selectedRow === 4 ? 'active-row' : 'disabled-row'}
                >
                    CHG%
                    <div className="filter-modal-btn" onClick={() => { selectRowHandler(4) }}>
                        <GoSettings />
                    </div>
                    {openSortModal === 4 &&
                        <>
                            <div className="open-modal-page-wrapper" onClick={modalCloseHandler}></div>
                            <div className="sort-modal ">
                                <h2>Sample</h2>
                            </div>
                        </>
                    }
                </th>
                <th
                    className={selectedRow === 5 ? 'active-row' : 'disabled-row'}
                >
                    TECHNICAL RATING
                    <div className="filter-modal-btn" onClick={() => { selectRowHandler(5) }}>
                        <GoSettings />
                    </div>
                    {openSortModal === 5 &&
                        <>
                            <div className="open-modal-page-wrapper" onClick={modalCloseHandler}></div>
                            <div className="sort-modal ">
                                <h2>Sample</h2>
                            </div>
                        </>
                    }
                </th>

                <th
                    className={selectedRow === 6 ? 'active-row' : 'disabled-row'}
                >
                    VOL
                    <div className="filter-modal-btn" onClick={() => { selectRowHandler(6) }}>
                        <GoSettings />
                    </div>
                    {openSortModal === 6 &&
                        <>
                            <div className="open-modal-page-wrapper" onClick={modalCloseHandler}></div>
                            <div className="sort-modal ">
                                <h2>Sample</h2>
                            </div>
                        </>
                    }
                </th>
                <th
                    className={selectedRow === 7 ? 'active-row' : 'disabled-row'}
                >
                    MKT CAP
                    <div className="filter-modal-btn" onClick={() => { selectRowHandler(7) }}>
                        <GoSettings />
                    </div>
                    {openSortModal === 7 &&
                        <>
                            <div className="open-modal-page-wrapper" onClick={modalCloseHandler}></div>
                            <div className="sort-modal ">
                                <h2>Sample</h2>
                            </div>
                        </>
                    }
                </th>
                <th
                    className={selectedRow === 8 ? 'active-row' : 'disabled-row'}
                >
                    VOLUME*PRICE
                    <div className="filter-modal-btn" onClick={() => { selectRowHandler(8) }}>
                        <GoSettings />
                    </div>
                    {openSortModal === 8 &&
                        <>
                            <div className="open-modal-page-wrapper" onClick={modalCloseHandler}></div>
                            <div className="sort-modal ">
                                <h2>Sample</h2>
                            </div>
                        </>
                    }
                </th>
                <th
                    className={selectedRow === 9 ? 'active-row' : 'disabled-row'}
                >
                    PE
                    <div className="filter-modal-btn" onClick={() => { selectRowHandler(9) }}>
                        <GoSettings />
                    </div>
                    {openSortModal === 9 &&
                        <>
                            <div className="open-modal-page-wrapper" onClick={modalCloseHandler}></div>
                            <div className="sort-modal ">
                                <h2>Sample</h2>
                            </div>
                        </>
                    }
                </th>
                <th
                    className={selectedRow === 10 ? 'active-row' : 'disabled-row'}
                >
                    EMPLEYEES
                    <div className="filter-modal-btn" onClick={() => { selectRowHandler(10) }}>
                        <GoSettings />
                    </div>
                    {openSortModal === 10 &&
                        <>
                            <div className="open-modal-page-wrapper" onClick={modalCloseHandler}></div>
                            <div className="sort-modal ">
                                <h2>Sample</h2>
                            </div>
                        </>
                    }
                </th>
                <th
                    className={selectedRow === 11 ? 'active-row' : 'disabled-row'}
                >
                    SECTOR
                    <div className="filter-modal-btn" onClick={() => { selectRowHandler(11) }}>
                        <GoSettings />
                    </div>
                    {openSortModal === 11 &&
                        <>
                            <div className="open-modal-page-wrapper" onClick={modalCloseHandler}></div>
                            <div className="sort-modal ">
                                <h2>Sample</h2>
                            </div>
                        </>
                    }
                </th>
            </tr >
        </thead>
    )
}

export default DataTableHeadComponent