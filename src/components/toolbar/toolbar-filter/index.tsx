import { useEffect, useRef, useState, ChangeEvent } from 'react'
import classNames from 'classnames'
import { CiSearch } from 'react-icons/ci'
import { IoCloseOutline } from 'react-icons/io5'
import { toolbarFilters } from '../../../models/toolbar-filters'
import { TableHead } from '../../../types/table-head'

type Props = {
    visible: boolean,
    hideModalHandler: Function
}

const ToolbarFilterModal = ({ visible, hideModalHandler }: Props) => {
    const [filters, setFilters] = useState<TableHead[]>(toolbarFilters)
    const modalRef = useRef<HTMLDivElement>();

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [visible]);

    const handleClickOutside = (e: any) => {
        if (modalRef?.current && !modalRef.current.contains(e.target)) {
            hideModalHandler();
        }
    };

    const searchFiltersHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const filterResult = filters.filter((f) => f.item_name.toLowerCase().includes(e.target.value));
        if (filterResult.length) {
            setFilters(filterResult)
        }
        if (e.target.value === "") {
            setFilters(toolbarFilters)
        }
    }


    return (
        <div className={classNames({
            'toolbar-filter': true,
            'visible': true
        })}
            ref={modalRef}
        >
            <div className="head">
                <span className='modal-closer' onClick={() => hideModalHandler()}>
                    <IoCloseOutline />
                </span>
            </div>
            <div className="search-bar">
                <span>
                    <CiSearch />
                </span>
                <input
                    type="text"
                    placeholder="Search via filters"
                    className='search-input'
                    onChange={searchFiltersHandler}
                />
            </div>
            <div className="body">
                {filters.map((f) => (
                    <div className='body-filter-items' key={f.id}>
                        <f.component />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ToolbarFilterModal