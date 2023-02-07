import React, { useContext, useState } from 'react'
import { TECHNICAL_RATING } from '../../../constaints';
import { dataContext } from '../../../context/data.context';
import { technicalRateFilters } from '../../../models/technical-rating-sort-list';
import { filterArray } from '../../../utils/filter-array';
import CheckboxComponent from '../../checkbox'
import TitleComponent from '../../title'


const TechnicalRatingFilterComponent = () => {
  const [selectedItems, setSelectedItems] = useState<string[]>(['Any']);

  const _context = useContext(dataContext)

  const onClickHandler = (label: string) => {
    if (selectedItems.indexOf(label) > -1) {
      removeLabelFromList(label);
      return;
    }
    addLabelToList(label);

    _context.load()
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