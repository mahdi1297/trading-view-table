import React, { createContext, ReactNode, useEffect, useState } from 'react'
import { filterArray, filterInArray } from '../utils/filter-array'
import { findInArray } from '../utils/find-in-array'


type Props = {
    children: ReactNode
}

export type SortList = {
    filter: string,
    order: 'desc' | 'asc'
}

export const sortContext = createContext({
    addToSort: function (filter: string) { },
    removeFromSort: function (filter: string) { },
    getSortList: function () { }
})

const SortContextProvider = ({ children }: Props) => {
    const [sortList, setSortList] = useState<SortList[]>()

    const addToSortHandler = (filter: string) => {
        if (typeof sortList !== 'undefined') {
            const existsItem = findInArray<SortList, string>(sortList, filter)

            // Sort exists, so just change the order
            if (existsItem) {
                const filteredList = sortList.filter((f) => f.filter !== filter);
                const itemOrder = getFilterOrder(filter);

                const newListItem: SortList = {
                    filter,
                    order: itemOrder ? itemOrder : 'desc'
                }
                filteredList.push(newListItem);

                setSortList(() => filteredList)
            }
            else {
                const newItem: SortList = {
                    filter,
                    order: 'desc'
                }
                setSortList([...sortList, newItem])
            }

            return;
        }

        const newSort: SortList = {
            filter,
            order: 'asc'
        }
        setSortList([newSort])
    }

    const removeFromSortHandler = (filter: string) => {
    }

    const getSortListHandler = () => {
        return sortList;
    }

    const getFilterOrder = (filter: string) => {
        if (sortList && typeof Array.isArray(sortList)) {
            const existsInSorts = findInArray<SortList, string>(sortList, filter);

            if (existsInSorts) {
                return existsInSorts.order === 'desc' ? 'asc' : 'desc'
            }
            return 'desc'
        }
        return 'desc'
    }


    const store = {
        addToSort: addToSortHandler,
        removeFromSort: removeFromSortHandler,
        getSortList: getSortListHandler
    }

    return (
        <sortContext.Provider value={store}>
            {children}
        </sortContext.Provider>
    )
}

export default SortContextProvider