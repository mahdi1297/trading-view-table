import { useState } from 'react'
import { GoSettings } from 'react-icons/go'
import { tableHeads } from '../../models/table-heads-list';
import FilterModalComponent from '../filter-modal/filter-modal';

const DataTableHeadComponent = () => {
    const [selectedRow, setSelectedRow] = useState<number>(null);
    const [openSortModal, setOpenSortModal] = useState(0);

    const selectRowHandler = (index: number) => {
        setOpenSortModal(index);
        setSelectedRow(index);
    }

    const modalCloseHandler = () => {
        setOpenSortModal(null);
    }

    return (
        <thead>
            <tr>
                {
                    tableHeads.map((item) => (
                        <th key={item.id} className={selectedRow === item.id ? 'active-row' : 'disabled-row'}>
                            {item.title}
                            {item.children ? item.children : null}
                            <div className="filter-modal-btn" onClick={() => { selectRowHandler(item.id) }}>
                                <GoSettings />
                            </div>
                            {item.component ?
                                <FilterModalComponent
                                    isOpen={openSortModal === item.id}
                                    component={item.component}
                                    modalCloseHandler={modalCloseHandler}
                                    modalClassName={item.modalClassName ? item.modalClassName : null}
                                />
                                : null}
                        </th>
                    ))
                }
            </tr >
        </thead>
    )
}

export default DataTableHeadComponent