import { useContext } from 'react'
import DataTableHeadComponent from '../components/data-table-head/data-table-head'
import DataTableBodyComponent from '../components/data-table-body/data-table-body'
import DataTableComponent from '../components/data-table/data-table'
import { DataContext } from '../context/data.context'
import './view.style.css'

const HomeView = () => {
    const _context = useContext(DataContext),
        cardItems: any = _context.getDataList(),
        isLoading = _context.isLoading();

    return (
        <>
            <DataTableComponent  >
                <DataTableHeadComponent />
                <DataTableBodyComponent data={cardItems} />
            </DataTableComponent>
            {typeof isLoading === 'boolean' && isLoading && <h1>IsLoading</h1>}
        </>
    )
}

export default HomeView

