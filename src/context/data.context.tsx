import { createContext, useEffect, useState } from "react";
import { DataTableBody } from "../types/data-table-body";
import { fetchCoins } from "../utils/fetcher";
import { formatNumbersOfObject } from "../utils/format-object-numbers";

type Props = {
    children: React.ReactNode
}

export const dataContext = createContext({
    getDataList: function () { },
    setDataList: function () { },
    isLoading: function () { },
    load: function () { },
    addToSort: function (filter: string, order: 'desc' | 'asc') { },
    removeFromSort: function () { },
    getSorts: function () { }
})

type SortListItem = {
    filter: string,
    order: 'desc' | 'asc'
}

export const DataContextProvider: React.FC<Props> = ({ children }) => {
    const [data, setData] = useState<DataTableBody[]>(null);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setDataListHandler();
    }, [])


    const getDataListHandler = (): DataTableBody[] => {
        return data
    }

    const isLoadingHandler = (): boolean => {
        return loading as boolean
    }

    const loadHandler = () => {
        setLoading(true);

        setTimeout(() => {
            setLoading(false)
        }, 500)
    }

    const setDataListHandler = async () => {
        setLoading(true)
        await fetchCoins().then((result) => {
            if (result && result.length) {
                let columnItems = [];
                for (const item of result) {
                    let eachItem = formatNumbersOfObject(item);
                    columnItems.push(eachItem)
                }
                setData(columnItems)
            }
        }).finally(() => setLoading(false))
    }

    const store: any = {
        getDataList: getDataListHandler,
        setDataList: setDataListHandler,
        isLoading: isLoadingHandler,
        load: loadHandler
    };

    return (
        <dataContext.Provider value={store}>
            {children}
        </dataContext.Provider>
    )
}