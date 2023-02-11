import {
    useEffect,
    useState
} from 'react'
import {
    useDispatch,
    useSelector
} from "react-redux";
import DataTableHeadComponent from '../components/data-table-head'
import DataTableBodyComponent from '../components/data-table-body'
import DataTableComponent from '../components/data-table'
import SortContextProvider from '../context/sort.context'
import SpinnerLoaderComponent from '../components/spinner-loader'
import ToolbarComponent from '../components/toolbar'
import {
    AppDispatch,
    RootState
} from '../store';
import { fetchDataAction } from '../slices/actions';
import {
    Filter,
    setData
} from '../slices/data.slice';
import { data } from '../data';
import { FilterEvent } from '../helper/filter-events-handler';

const HomeView = () => {
    const dataCtx = useSelector((state: RootState) => state.dataSlice);
    const dispatch = useDispatch<AppDispatch>()

    const filters = dataCtx.filterList;

    function applyFilters(filters: Filter[]) {
        if (filters) {
            const [
                filterPrice,
                filterChange,
                filterChangePercent,
                filterPE,
                filterSector,
                filterTechnicalRating,
                filterVolume,
                filterEmployees,
                filterValueInPrice,
                filterMat_kap
            ] =
                [
                    filters.find((f) => f.filterName === "filterPrice"),
                    filters.find((f) => f.filterName === "filterChange"),
                    filters.find((f) => f.filterName === "filterChangePercent"),
                    filters.find((f) => f.filterName === "filterPE"),
                    filters.find((f) => f.filterName === "filterSector"),
                    filters.find((f) => f.filterName === "filterTechnicalRating"),
                    filters.find((f) => f.filterName === "filterVolume"),
                    filters.find((f) => f.filterName === "filterEmployees"),
                    filters.find((f) => f.filterName === "filterValueInPrice"),
                    filters.find((f) => f.filterName === "filterMat_kap"),
                ]

            const filterResult: any = new FilterEvent()
                .init(data)
                .price(filterPrice ? filterPrice : null)
                .change(filterChange ? filterChange : null)
                .changePercent(filterChangePercent ? filterChangePercent : null)
                .filterPE(filterPE ? filterPE : null)
                .filterSector(filterSector ? filterSector : null)
                .filterTechnicalRating(filterTechnicalRating ? filterTechnicalRating : null)
                .filterVolume(filterVolume ? filterVolume : null)
                .filterEmployees(filterEmployees ? filterEmployees : null)
                .filterValueInPrice(filterValueInPrice ? filterValueInPrice : null)
                .filterMatKap(filterMat_kap ? filterMat_kap : null)

            dispatch(setData(filterResult.result()));
        }

    }
    useEffect(() => {
        applyFilters(filters);
    }, [filters])

    useEffect(() => {
        getNewData();
    }, [])

    const getNewData = () => {
        dispatch(fetchDataAction());
    }

    // console.log(filters)

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

