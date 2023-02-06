import React, { ChangeEventHandler, MouseEventHandler, useEffect, useRef, useState } from 'react'
import { GoChevronDown } from 'react-icons/go'
import { TechnicalRatingCheckbox } from '../../types/technical-rating-checkbox'

type Props = {
    getSelectedItemHandler?: Function,
    filters: TechnicalRatingCheckbox[],
    selectedItems?: string[],
}

const CheckboxComponent = ({ getSelectedItemHandler, filters, selectedItems }: Props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Active state is used to add transform animation for 
    // title Arrow svg
    const [active, setActive] = useState(false);

    const checkboxRef = useRef<HTMLInputElement>();

    useEffect(() => {
        setActive(isModalOpen);

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [isModalOpen]);


    // Detect outside modal click handler
    function handleClickOutside(e: Event | any) {
        if (checkboxRef?.current && !checkboxRef.current.contains(e.target)) {
            closeModalHandler();
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

    // Indicate selected checkbox items as title 
    // or default one if no item selected
    const titleText = selectedItems ? selectedItems.join(' , ') : 'Any'

    return (
        <>
            <p onClick={openModalHandler} className={`checkbox-select-title ${titleText === 'Value' ? 'disabled' : 'active'}`}>
                {titleText}
                <GoChevronDown className={active ? 'icon-active' : 'icon-deactive'} />
            </p>
            {isModalOpen &&
                <div className='checkbox-select' ref={checkboxRef}>
                    {filters.length && filters.map((item) => (
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