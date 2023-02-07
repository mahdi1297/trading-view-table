import { useState, useContext, MouseEvent } from 'react'
import classNames from 'classnames';
import { findInArray } from '../../utils/find-in-array';
import { tableHeads } from '../../models/table-heads-list';
import FilterModalComponent from '../filter-modal';
import { dataContext } from '../../context/data.context';
import { sortContext, SortList } from '../../context/sort.context';
import { GoSettings } from 'react-icons/go'

const DataTableHeadComponent = () => {
    const [selectedTitle, setSelectedTitle] = useState<string>(null)
    const [openSortModal, setOpenSortModal] = useState(0);

    const _sortContext = useContext(sortContext),
        getSorts = _sortContext.getSortList();

    const _dataContext = useContext(dataContext)

    const tableHeadClickHandler = (event: MouseEvent<HTMLElement>, title: string) => {
        preventEvents(event);
        addSort(title);
        setTitle(title);
        _dataContext.load();
    }

    const selectRowHandler = (event: MouseEvent<HTMLElement>, index: number) => {
        preventEvents(event);
        setOpenSortModal(index);
    }

    const preventEvents = (event: MouseEvent<HTMLElement>) => {
        event.stopPropagation()
        event.preventDefault()
    }

    const closeModalHandler = () => {
        setOpenSortModal(null);
    }

    const addSort = (title: string) => {
        _sortContext.addToSort(title)
    }

    const setTitle = (title: string) => {
        setSelectedTitle(title)
    }

    const getSortStatue = (title: string) => {
        if (getSorts !== undefined && Array.isArray(getSorts)) {
            const existsItemInSort = findInArray<SortList, string>(getSorts, title);

            if (existsItemInSort) {
                return selectedTitle === title ? existsItemInSort.order : null
            }
            return null
        }
        return null
    }

    return (
        <thead>
            <tr>
                {
                    tableHeads.map((item) => (
                        <th
                            key={item.id}
                            className={classNames({
                                'row': 'row',
                                'active-desc-sort': getSortStatue(item.title) &&
                                    getSortStatue(item.title) === 'desc' ? true : false,
                                'active-asc-sort': getSortStatue(item.title) &&
                                    getSortStatue(item.title) === 'asc' ? true : false,
                            })}
                        >
                            <div className='row-head-item-inner' onClick={(event) => tableHeadClickHandler(event, item.title)}>
                                {item.title}
                                {item.children ? item.children : null}
                            </div>
                            <div className="filter-modal-btn" onClick={(event) => { selectRowHandler(event, item.id) }}>
                                <GoSettings />
                            </div>
                            {item.component ?
                                <FilterModalComponent
                                    isOpen={openSortModal === item.id}
                                    component={item.component}
                                    modalClassName={item.modalClassName ? item.modalClassName : null}
                                    closeModalHandler={closeModalHandler}
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