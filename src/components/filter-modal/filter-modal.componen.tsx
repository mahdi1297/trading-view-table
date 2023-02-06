import { FC } from 'react'
import './filter-modal.style.css'

type Props = {
    component: FC,
    modalCloseHandler: Function,
    isOpen: boolean
}

const FilterModalComponent = (props: Props) => {
    return (
        <>
            {props.isOpen &&
                <>
                    <div className="open-modal-page-wrapper" onClick={() => props.modalCloseHandler()}></div>
                    <div className="filter-modal ">
                        <props.component />
                    </div>
                </>
            }
        </>
    )
}

export default FilterModalComponent