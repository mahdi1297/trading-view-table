import { FC } from 'react'

type Props = {
    component: FC,
    modalCloseHandler: Function,
    isOpen: boolean,
    modalClassName?: string
}

const FilterModalComponent = (props: Props) => {
    return (
        <>
            {props.isOpen &&
                <>
                    <div className="open-modal-page-wrapper"
                        onClick={() => props.modalCloseHandler()}></div>
                    <div className={`filter-modal ${props.modalClassName ? props.modalClassName : null}`}>
                        <props.component />
                    </div>
                </>
            }
        </>
    )
}

export default FilterModalComponent