import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { TECHNICAL_RATING } from '../../../constaints';
import { technicalRateFilters } from '../../../models/technical-rating-sort-list';
import { addFilterhList, Filter } from '../../../slices/data.slice';
import { AppDispatch, RootState } from '../../../store';
import { filterArray } from '../../../utils/filter-array';
import CheckboxComponent from '../../checkbox'
import TitleComponent from '../../title'

const TechnicalRatingFilterComponent = () => {
  const [selectedItems, setSelectedItems] = useState<string[]>(['Any']);

  const dataCtx = useSelector((state: RootState) => state.dataSlice);

  const dipatch = useDispatch<AppDispatch>()

  const onClickHandler = (label: string) => {
    if (selectedItems.indexOf(label) > -1) {
      removeLabelFromList(label);
      return;
    }
    addLabelToList(label);

    const filters: Filter = {
      filterName: "filterTechnicalRating",
      amoung: null,
      value: selectedItems
    }

    dipatch(addFilterhList(filters))
  }

  // Add the selected item to list
  const addLabelToList = (label: string) => {
    setSelectedItems([...selectedItems, label])
  }

  // Remove selected item from list 
  const removeLabelFromList = (label: string) => {
    const filterdItems = filterArray<string, string>(selectedItems, label)
    setSelectedItems(filterdItems)
  }

  return (
    <div>
      <TitleComponent text={TECHNICAL_RATING} />
      <CheckboxComponent
        filters={technicalRateFilters}
        getSelectedItemHandler={onClickHandler}
        selectedItems={selectedItems}
      />
    </div>
  )
}

export default TechnicalRatingFilterComponent