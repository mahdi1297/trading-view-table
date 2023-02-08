import { createContext, useEffect, useState } from "react";
import { Sort } from "../helper/sort";
import { Data } from "../types/data-table-body";
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
    getSorts: function () { },
    sortByPrice: function (order: 'asc' | 'desc') { }
})

type SortListItem = {
    filter: string,
    order: 'desc' | 'asc'
}

export const DataContextProvider: React.FC<Props> = ({ children }) => {
    const [data, setData] = useState<Data[]>(null);
    const [loading, setLoading] = useState(false)

    const sorter = new Sort(data);

    useEffect(() => {
        setDataListHandler();
    }, [])


    const getDataListHandler = (): Data[] => {
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

    const sortByPriceHandler = (order: 'asc' | 'desc') => {
        startLoad();
        let sorted = sorter.sortByPrice();
        if (order === 'asc') {
            sorted = sorted.reverse();
        }
        setData(() => sorted)
        stopLoad();
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

    const startLoad = () => {
        setLoading(true)
    }

    const stopLoad = () => {
        setTimeout(() => {
            setLoading(false)
        }, 700)
    }

    const store: any = {
        getDataList: getDataListHandler,
        setDataList: setDataListHandler,
        isLoading: isLoadingHandler,
        load: loadHandler,
        sortByPrice: sortByPriceHandler
    };

    return (
        <dataContext.Provider value={store}>
            {children}
        </dataContext.Provider>
    )
}