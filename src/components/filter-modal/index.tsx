import { FC, useEffect, useRef } from 'react'

type Props = {
    component: FC,
    isOpen: boolean,
    modalClassName?: string,
    closeModalHandler: Function
}

const FilterModalComponent = (props: Props) => {
    const modalRef = useRef<HTMLDivElement>();

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, []);

    function handleClickOutside(e: Event | any) {
        if (modalRef?.current && !modalRef.current.contains(e.target)) {
            props.closeModalHandler();
        }
    };

    return (
        <>
            {props.isOpen &&
                <>
                    <div ref={modalRef} className={`filter-modal ${props.modalClassName ? props.modalClassName : null}`}>
                        <props.component />
                    </div>
                </>
            }
        </>
    )
}

export default FilterModalComponent