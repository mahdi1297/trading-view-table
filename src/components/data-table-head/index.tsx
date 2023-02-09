import { useState, MouseEvent } from 'react'
import classNames from 'classnames';
import { findInArray } from '../../utils/find-in-array';
import { tableHeads } from '../../models/table-head';
import FilterModalComponent from '../filter-modal';
import { SortList } from '../../context/sort.context';
import { GoSettings } from 'react-icons/go'
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { load, stopLoad } from '../../slices/data.slice';

const DataTableHeadComponent = () => {
    const [selectedTitle, setSelectedTitle] = useState<string>(null)
    const [openSortModal, setOpenSortModal] = useState(0);
    const [sortList, setSortList] = useState<SortList[]>()

    const dispatch = useDispatch<AppDispatch>();

    function getFilterOrder(filter: string) {
        if (sortList && typeof Array.isArray(sortList)) {
            const existsInSorts = findInArray<SortList, string>(sortList, filter);

            if (existsInSorts) {
                return existsInSorts.order === 'desc' ? 'asc' : 'desc'
            }
            return 'asc'
        }
        return 'asc'
    }

    function addToSortHandler(filter: string) {
        if (typeof sortList !== 'undefined') {
            const existsItem = findInArray<SortList, string>(sortList, filter)
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

    const tableHeadClickHandler = (event: MouseEvent<HTMLElement>, title: string, sorterFunction: Function) => {
        preventEvents(event);
        setTitle(title);
        addToSortHandler(title);
        const order = getFilterOrder(title);

        if (sorterFunction) {
            dispatch(load())
            dispatch(sorterFunction(order));
            setTimeout(() => {
                dispatch(stopLoad())
            }, 500)
        }
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

    const setTitle = (title: string) => {
        setSelectedTitle(title);
    }


    const tableHeadContent = (
        <>
            {
                tableHeads.map((item) => (
                    <th
                        key={item.id}
                        className={classNames({
                            'row': 'row',
                            'active-desc-sort': item.sorterFunction && selectedTitle === item.title && getFilterOrder(item.title) &&
                                getFilterOrder(item.title) === 'desc' ? true : false,
                            'active-asc-sort': item.sorterFunction && selectedTitle === item.title && getFilterOrder(item.title) &&
                                getFilterOrder(item.title) === 'asc' ? true : false,
                        })}
                    >
                        <div className='row-head-item-inner' onClick={(event) => tableHeadClickHandler(event, item.title, item.sorterFunction)}>
                            {item.title}
                            {item.children ? item.children : null}
                        </div>
                        <div
                            className="filter-modal-btn"
                            onClick={(event) => { selectRowHandler(event, item.id) }}
                        >
                            <GoSettings />
                        </div>
                        {
                            item.component ?
                                <FilterModalComponent
                                    isOpen={openSortModal === item.id}
                                    component={item.component}
                                    modalClassName={item.modalClassName ? item.modalClassName : null}
                                    closeModalHandler={closeModalHandler}
                                />
                                : null
                        }
                    </th>
                ))
            }
        </>
    )

    return (
        <thead>
            <tr>
                {tableHeadContent}
            </tr >
        </thead >
    )
}

export default DataTableHeadComponent