import { createContext, useEffect, useState } from "react";
import { DataTableBody } from "../types/data-table-body";
import { formatTwoDigitsAfterDecimal, numberFormatter } from "../utils/number-formatter";
import { fetchCoinData } from "../view/fetch-data";

type Props = {
    children: React.ReactNode
}



export const DataContext = createContext({
    getDataList: function () { },
    setDataList: function () { },
    isLoading: function () { }
})


export const DataContextProvider: React.FC<Props> = ({ children }) => {
    const [data, setData] = useState<DataTableBody[]>(null);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setDataListHandler();
    }, [])

    const getDataListHandler = (): DataTableBody[] => {
        return data
    }

    const isLoadingHandler = () => {
        return loading
    }


    const setDataListHandler = async () => {
        setLoading(true)
        await fetchCoinData().then((result) => {
            if (result && result.length) {
                let columnItems = [];
                for (const item of result) {
                    let eachItem = {
                        ...item,
                        EMPLOYEES: numberFormatter(item.EMPLOYEES, 2),
                        CHG: formatTwoDigitsAfterDecimal(item.CHG),
                        VOLUME: numberFormatter(item.VOLUME, 3),
                        MKT_CAP: numberFormatter(item.MKT_CAP, 3),
                        "CHG%": formatTwoDigitsAfterDecimal(item["CHG%"]),
                        "P/E": formatTwoDigitsAfterDecimal(item["P/E"]),
                        "VOLUME*PRICE": numberFormatter(item["VOLUME*PRICE"], 2),
                    }
                    columnItems.push(eachItem)
                }
                setData(columnItems)
            }
        }).finally(() => setLoading(false))
    }

    const store = {
        getDataList: getDataListHandler,
        setDataList: setDataListHandler,
        isLoading: isLoadingHandler
    };

    return (
        <DataContext.Provider value={store}>
            {children}
        </DataContext.Provider>
    )
}