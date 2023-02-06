import { useState, useEffect, useRef } from 'react'
import { GoChevronDown } from 'react-icons/go'
import { SelectList } from '../../types/select-list'

type Props = {
    selectItemHandler: Function,
    selectList: SelectList[],
    disabled?: boolean,
    selectedItem: any
}

const SelectComponent = ({ selectList, selectItemHandler, disabled = false, selectedItem }: Props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [active, setActive] = useState(false);

    const selectRef = useRef<HTMLDivElement>();

    useEffect(() => {
        setActive(isModalOpen);

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [isModalOpen]);


    // Detect ouside select clicks to close
    // modal when happend
    const handleClickOutside = (e: Event | any) => {
        if (selectRef?.current) {
            if (!selectRef.current.contains(e.target)) {
                setIsModalOpen(false);
            }
        }
    };

    function changeItemHandler(itemValue: string) {
        if (!disabled) {
            closeModalHandler()
            selectItemHandler(itemValue)
        }
    }

    function openModalHandler() {
        setIsModalOpen(true)
    }

    function closeModalHandler() {
        setIsModalOpen(false)
    }

    const listFirstItemValue = selectList[0].value ?? 'Select'
    const titleText = selectedItem ? selectedItem : listFirstItemValue

    return (
        <>
            <p onClick={openModalHandler} className={`select-title ${titleText === 'Value' ? 'disabled' : 'active'}`}>
                {titleText}
                <GoChevronDown className={active ? 'icon-active' : 'icon-deactive'} />
            </p>

            {isModalOpen &&
                <div className="select" ref={selectRef}>
                    {selectList?.length && selectList.map((item) => (
                        <span key={item.id} onClick={() => changeItemHandler(item.value)}>
                            {item.value}
                        </span>
                    ))}
                </div>
            }
        </>
    )
}

export default SelectComponent