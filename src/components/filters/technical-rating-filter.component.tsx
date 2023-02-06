import React, { useState } from 'react'
import CheckboxComponent from '../checkbox/checkbox.component'
import TitleComponent from '../title/title.component'

const technicalRateFilters = [
  {
    index: 1,
    id: 'Any',
    label: 'Any',
  },
  {
    index: 2,
    id: 'Strong Buy',
    label: 'Strong Buy'
  },
  {
    index: 3,
    id: 'Buy',
    label: 'Buy'
  },
  {
    index: 4,
    id: 'Sell',
    label: 'Sell'
  },
  {
    index: 5,
    id: 'Neutral',
    label: 'Neutral'
  },
]


const TechnicalRatingFilterComponent = () => {
  const [selectedItems, setSelectedItems] = useState<string[]>(['Any']);

  const onClickHandler = (label: string) => {
    if (selectedItems.indexOf(label) > -1) {
      removeLabelFromList(label);
      return;
    }
    addLabelToList(label);
  }

  const addLabelToList = (label: string) => {
    setSelectedItems([...selectedItems, label])
  }

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