import React, { useState } from 'react'
import CheckboxComponent from '../components/checkbox/checkbox';
import TitleComponent from '../components/title/title';
import { technicalRateFilters } from './technical-rating-sort-list';


const TechnicalRatingFilterComponent = () => {
  const [selectedItems, setSelectedItems] = useState<string[]>(['Any']);

  const onClickHandler = (label: string) => {
    if (selectedItems.indexOf(label) > -1) {
      removeLabelFromList(label);
      return;
    }
    addLabelToList(label);
  }

  // Add the selected item to list
  const addLabelToList = (label: string) => {
    setSelectedItems([...selectedItems, label])
  }

  // Remove selected item from list 
  const removeLabelFromList = (label: string) => {
    const items = selectedItems.filter((s) => s !== label);
    setSelectedItems(items)
  }

  return (
    <div>
      <TitleComponent text="TECHNICAL RATING" />
      <CheckboxComponent
        filters={technicalRateFilters}
        getSelectedItemHandler={onClickHandler}
        selectedItems={selectedItems}
      />
    </div>
  )
}

export default TechnicalRatingFilterComponent