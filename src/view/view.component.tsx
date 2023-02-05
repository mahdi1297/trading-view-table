import React, { useEffect, useState } from 'react'
import DataTableItemComponent from '../components/data-table-item/data-table-item.component'
import DataTableComponent from '../components/data-table/data-table.component'
import { DataTableBody } from '../types/data-table-body'
import { formatTwoDigitsAfterDecimal, numberFormatter, priceFormatter } from '../utils/number-formatter'
import { DataTableEventsHandler } from './data-table.events'
import { fetchCoinData } from './fetch-data'
import './view.style.css'


const HomeView = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [columnData, setColumnData] = useState<DataTableBody[]>(null)


    useEffect(() => {
        const getData = async () => {
            setIsLoading(true)
            await fetchCoinData().then((result) => {
                if (result && result.length) {
                    let columnItems = [];
                    for (const item of result) {

                        let eachItem = {
                            ...item,
                            EMPLOYEES: numberFormatter(item.EMPLOYEES, 2),
                            price: item.price,
                            CHG: formatTwoDigitsAfterDecimal(item.CHG),
                            VOLUME: numberFormatter(item.VOLUME, 3),
                            MKT_CAP: numberFormatter(item.MKT_CAP, 3),
                            "CHG%": formatTwoDigitsAfterDecimal(item["CHG%"]),
                            ["P/E"]: formatTwoDigitsAfterDecimal(item["P/E"]),
                            "VOLUME*PRICE": numberFormatter(item["VOLUME*PRICE"], 2),
                        }
                        columnItems.push(eachItem)
                    }
                    setColumnData(columnItems)
                }
            }).finally(() => setIsLoading(false))
        }

        getData();

        return () => {
            setColumnData(null)
        }

    }, [])


    const tableEnvetHandler = new DataTableEventsHandler(columnData);

    const tableHeads = [
        {
            id: 1,
            title: "TICKERS",
            children: <input type="text" />,
            onclick: tableEnvetHandler.searchClickHandler,
        },
        {
            id: 2,
            title: "PRICE",
            onclick: tableEnvetHandler.priceClickHandler,
        },
        {
            id: 3,
            title: "CHG%",
            onclick: tableEnvetHandler.chgPercentClickHandler,
        },
        {
            id: 4,
            title: "CHG",
            onclick: tableEnvetHandler.chgClickHandler,
        },
        {
            id: 5,
            title: "TECHNICAL RATING",
            onclick: tableEnvetHandler.technicalRatingClickHandler,
        },
        {
            id: 6,
            title: "VOL",
            onclick: tableEnvetHandler.volClickHandler,
        },
        {
            id: 7,
            title: "VOLUME*PRICE",
            onclick: tableEnvetHandler.volInPriceClickHandler,
        },
        {
            id: 8,
            title: "MKT CAP",
            onclick: tableEnvetHandler.mktCapClickHandler,
        },
        {
            id: 10,
            title: "PE",
            onclick: tableEnvetHandler.pEClickHandler,
        },
        {
            id: 11,
            title: "EMPLEYEES",
            onclick: tableEnvetHandler.employeesClickHandler,
        },
        {
            id: 12,
            title: "SECTOR",
            onclick: tableEnvetHandler.sectorClickHandler,
        },
    ]

    return (
        <>
            <DataTableComponent tableHead={tableHeads} >
                <DataTableItemComponent data={columnData} />
            </DataTableComponent>
        </>
    )
}

export default HomeView

