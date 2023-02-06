import { useState } from 'react'
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
  const [valueModalValue, setValueModalValue] = useState<string>(null)

  const selectItemHandler = (value: string) => {
    setPriceModalValue(value)
  }

  const selectValueHandler = (value: string) => {
    setValueModalValue(value)
  }

  return (
    <>
      <TitleComponent text="Price" />

      <div className="price-modal-body">
        <div>
          <SelectComponent
            selectList={items}
            selectItemHandler={selectItemHandler}
            disabled={false}
          />
        </div>
        <div>
          <SelectComponent
            selectList={items}
            selectItemHandler={selectItemHandler}
            disabled={priceModalValue ? false : true}
          />
        </div>
        <div></div>
      </div>
    </>
  )
}

export default PriceFilterComponent