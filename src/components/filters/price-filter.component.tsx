import { useState } from 'react'
import { priceSortList } from '../../models/price-sort-list'
import SelectComponent from '../select/select.component'
import TitleComponent from '../title/title.component'
import './style.css'

const items = [
  {
    id: 1,
    value: 'Below'
  },
  {
    id: 2,
    value: 'Below Or Equal'
  },
  {
    id: 3,
    value: 'Above'
  }
]

const PriceFilterComponent = () => {
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
      <TitleComponent text="Price" />

      <div className="filter-modal-body">
        <div>
          <SelectComponent
            selectList={items}
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
          {valueModalValue === 'Value' ? <input type="text" /> : <></>}
        </div>
      </div>
    </>
  )
}

export default PriceFilterComponent