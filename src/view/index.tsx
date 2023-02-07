import { useContext } from 'react'
import DataTableHeadComponent from '../components/data-table-head'
import DataTableBodyComponent from '../components/data-table-body'
import DataTableComponent from '../components/data-table'
import { dataContext } from '../context/data.context'
import SortContextProvider from '../context/sort.context'
import SpinnerLoaderComponent from '../components/spinner-loader'
import ToolbarComponent from '../components/toolbar'

const HomeView = () => {
    const _context = useContext(dataContext),
        cardItems: any = _context.getDataList(),
        isLoading: any = _context.isLoading();

    return (
        <>
            {isLoading && <SpinnerLoaderComponent />}
            <SortContextProvider>
                <ToolbarComponent />
                <DataTableComponent  >
                    <DataTableHeadComponent />
                    <DataTableBodyComponent data={cardItems} />
                </DataTableComponent>
            </SortContextProvider>
        </>
    )
}

export default HomeView

