import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { technicalRateFilters } from '../../../models/technical-rating-list';
import { addFilterhList, Filter } from '../../../slices/data.slice';
import { AppDispatch, RootState } from '../../../store';
import { Checkbox } from '../../../types/technical-rating-checkbox';
import { filterArray } from '../../../utils/filter-array';
import CheckboxComponent from '../../checkbox'
import TitleComponent from '../../title'

type Props = {
  componentSignature: string,
  componentTitle: string,
  filterList: Checkbox[]
}

const SelectiveFilterComponent = ({ componentSignature, componentTitle, filterList }: Props) => {
  const [selectedItems, setSelectedItems] = useState<string[]>(['Any']);

  const dataCtx = useSelector((state: RootState) => state.dataSlice);

  const dipatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatcher();
  }, [selectedItems])

  useEffect(() => {
    getDefaultValue();
  }, [])

  const dispatcher = () => {
    const filters: Filter = {
      filterName: componentSignature,
      amoung: null,
      value: selectedItems
    }
    dipatch(addFilterhList(filters))
  }

  const getDefaultValue = () => {
    const existsItem = dataCtx?.filterList.find((f: Filter) => f.filterName === componentSignature);

    if (existsItem) {
      setSelectedItems(existsItem.value)
    }
  }

  const onClickHandler = (label: string) => {
    if (selectedItems.indexOf(label) > -1) {
      removeLabelFromList(label);
      return;
    }

    addLabelToList(label);
  }

  // Add the selected item to list
  const addLabelToList = (label: string) => {
    setSelectedItems(() => [...selectedItems, label])
  }

  // Remove selected item from list 
  const removeLabelFromList = (label: string) => {
    const filterdItems = filterArray<string, string>(selectedItems, label)
    setSelectedItems(filterdItems)
  }

  return (
    <div>
      <TitleComponent text={componentTitle} />
      <CheckboxComponent
        filters={filterList}
        getSelectedItemHandler={onClickHandler}
        selectedItems={selectedItems}
      />
    </div>
  )
}

export default SelectiveFilterComponent