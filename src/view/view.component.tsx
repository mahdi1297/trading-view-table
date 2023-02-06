import { useContext } from 'react'
import DataTableHeadComponent from '../components/data-table-head/data-table-head.component'
import DataTableBodyComponent from '../components/data-table-body/data-table-body.component'
import DataTableComponent from '../components/data-table/data-table.component'
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
        </>
    )
}

export default HomeView

