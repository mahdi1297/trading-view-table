import React, { ChangeEventHandler, MouseEventHandler, useEffect, useRef, useState } from 'react'
import { GoChevronDown } from 'react-icons/go'
import './checkbox.style.css'

type Props = {
    getSelectedItemHandler?: Function,
    filters: any,
    selectedItems?: string[],
}

const CheckboxComponent = ({ getSelectedItemHandler, filters, selectedItems }: Props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [active, setActive] = useState(false);

    const checkboxRef = useRef<HTMLInputElement>();

    useEffect(() => {
        setActive(isModalOpen);

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [isModalOpen]);


    const handleClickOutside = (e: Event | any) => {
        if (checkboxRef?.current) {
            if (!checkboxRef.current.contains(e.target)) {
                closeModalHandler();
            }
        }
    };


    function openModalHandler() {
        setIsModalOpen(true)
    }

    function closeModalHandler() {
        setIsModalOpen(false)
    }

    function onClickHandler(label: string) {
        getSelectedItemHandler(label)
    }

    const titleText = selectedItems ? selectedItems.join(' , ') : 'Any'

    return (
        <>
            <p onClick={openModalHandler} className={`checkbox-select-title ${titleText === 'Value' ? 'disabled' : 'active'}`}>
                {titleText}
                <GoChevronDown className={active ? 'icon-active' : 'icon-deactive'} />
            </p>

            {isModalOpen &&
                <div className='checkbox-select' ref={checkboxRef}>
                    {filters.length && filters.map((item: any) => (
                        <label key={item.index} className="checkbox-container" htmlFor={item.id}>
                            {item.label}
                            <input
                                id={item.id}
                                type="checkbox"
                                defaultChecked={selectedItems && selectedItems.find((s) => s === item.label) ? true : false}
                                onClick={() => onClickHandler(item.label)}
                            />
                            <span className="checkbox-indicator"></span>
                        </label>
                    ))}
                </div>
            }
        </>

    )
}

export default CheckboxComponent