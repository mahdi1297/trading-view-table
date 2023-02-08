import { useContext, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import DataTableHeadComponent from '../components/data-table-head'
import DataTableBodyComponent from '../components/data-table-body'
import DataTableComponent from '../components/data-table'
import { dataContext } from '../context/data.context'
import SortContextProvider from '../context/sort.context'
import SpinnerLoaderComponent from '../components/spinner-loader'
import ToolbarComponent from '../components/toolbar'
import { AppDispatch } from '../store';
import { fetchDataAction } from '../slices/actions';

const HomeView = () => {

    const data = useSelector((state: any) => state.dataSlice)
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        dispatch(fetchDataAction());

    }, [])


    return (
        <>
            {data.isLoading && <SpinnerLoaderComponent />}
            <SortContextProvider>
                <ToolbarComponent />
                <DataTableComponent  >
                    <DataTableHeadComponent />
                    <DataTableBodyComponent data={data.dataList} />
                </DataTableComponent>
            </SortContextProvider>
        </>
    )
}

export default HomeView

