import { useContext, useState } from 'react'
import SelectComponent from '../../select'
import TitleComponent from '../../title'
import { amoungSortList } from '../../../models/amoung-sort'
import { priceSortList } from '../../../models/price-sort-list'
import { dataContext } from '../../../context/data.context'


const PriceFilterComponent = () => {
  const [priceModalValue, setPriceModalValue] = useState<string>(null)
  const [valueModalValue, setValueModalValue] = useState<string>(priceSortList[0].value)

  const _context = useContext(dataContext);


  const selectItemHandler = (value: string) => {
    setPriceModalValue(value)
  }

  const selectValueHandler = (value: string) => {
    setValueModalValue(value)
    _context.load();
  }

  return (
    <>
      <TitleComponent text="Price" />
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
          {valueModalValue === 'Value' ? <input className="filter-input sarch-filter-input" type="text" /> : <></>}
        </div>
      </div>
    </>
  )
}

export default PriceFilterComponent