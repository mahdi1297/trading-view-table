import React, { useEffect, useRef } from 'react'
import classNames from 'classnames'
import { CiSearch } from 'react-icons/ci'
import { IoCloseOutline } from 'react-icons/io5'
import { toolbarFilters } from '../../../models/toolbar-filters'

type Props = {
    visible: boolean,
    hideModalHandler: Function
}

const ToolbarFilterModal = ({ visible, hideModalHandler }: Props) => {

    const modalRef = useRef<HTMLDivElement>();

    useEffect(() => {

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [visible]);

    function handleClickOutside(e: Event | any) {
        if (modalRef?.current && !modalRef.current.contains(e.target)) {
            hideModalHandler();
        }
    };

    return (
        <div className={classNames({
            'toolbar-filter': true,
            'visible': visible ? true : false,
            'invisible': visible ? false : true
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
                <input type="text" placeholder="Search via filters" className='search-input' />
            </div>
            <div className="body">
                {toolbarFilters.map((f) => (
                    <div className='body-filter-items' key={f.id}>
                        <f.component />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ToolbarFilterModal