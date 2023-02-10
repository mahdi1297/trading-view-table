import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import DataTableHeadComponent from '../components/data-table-head'
import DataTableBodyComponent from '../components/data-table-body'
import DataTableComponent from '../components/data-table'
import SortContextProvider from '../context/sort.context'
import SpinnerLoaderComponent from '../components/spinner-loader'
import ToolbarComponent from '../components/toolbar'
import { AppDispatch, RootState } from '../store';
import { fetchDataAction } from '../slices/actions';
import { ConcreteFilterEvents, Statue } from '../helper/filter-events';
import { Filter, setData } from '../slices/data.slice';
import { data } from '../data';

const HomeView = () => {
    const dataCtx = useSelector((state: RootState) => state.dataSlice)
    const dispatch = useDispatch<AppDispatch>()

    const filters = dataCtx.filterList;

    function applyFilters(filters: Filter[]) {
        if (filters.length) {
            const filterEevents = new ConcreteFilterEvents(data);

            for (const item of filters) {
                filterEevents.distributeEvents(item.filterName, item.value, item.amoung as Statue)
            }
            const build = filterEevents.build();
            dispatch(setData(build));
        }

    }

    useEffect(() => {
        applyFilters(filters);
    }, [filters])

    useEffect(() => {
        dispatch(fetchDataAction());
    }, [])

    // console.log(dataCtx.filterList)

    return (
        <>
            {dataCtx.isLoading && <SpinnerLoaderComponent />}
            <SortContextProvider>
                <ToolbarComponent />
                <DataTableComponent  >
                    <DataTableHeadComponent />
                    <DataTableBodyComponent data={dataCtx.dataList} />
                </DataTableComponent>
            </SortContextProvider>
        </>
    )
}

export default HomeView

