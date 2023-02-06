import { useState } from 'react'
import SelectComponent from '../select/select'
import TitleComponent from '../title/title'
import { amoungSortList } from '../../models/amoung-sort'
import { priceSortList } from '../../models/price-sort-list'

const ChangePercentFilterComponent = () => {
    const [priceModalValue, setPriceModalValue] = useState<string>(null)
    const [valueModalValue, setValueModalValue] = useState<string>(priceSortList[0].value)

    const selectItemHandler = (value: string) => {
        setPriceModalValue(value)
    }

    const selectValueHandler = (value: string) => {
        setValueModalValue(value)
    }

    return (
        <>
            <TitleComponent text="Change %" />
            <div className="filter-modal-body">
                <div>
                    <SelectComponent
                        selectList={amoungSortList}
                        selectItemHandler={selectItemHandler}
                        selectedItem={priceModalValue}
                    />
                </div>
                <div>
                    <SelectComponent
                        selectList={priceSortList}
                        selectItemHandler={selectValueHandler}
                        selectedItem={valueModalValue}
                    />
                </div>
                <div>
                    {valueModalValue === 'Value' ? <input className="filter-input" type="text" /> : <></>}
                </div>
            </div>
        </>
    )
}

export default ChangePercentFilterComponent