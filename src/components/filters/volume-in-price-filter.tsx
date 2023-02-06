import React, { useState } from 'react'
import { RangeSlider } from '../../types/range-slider';
import { convertToString } from '../../utils/convert-to-string';
import { numberFormatter } from '../../utils/number-formatter';
import RangeSliderComponent from '../range-slider/range-slider';
import TitleComponent from '../title/title'


const VolumeInPriceFilterComponent = () => {
  const [value, setValue] = useState<RangeSlider>({ min: 0, max: 100 });

  function setSliderValue({ min, max }: RangeSlider) {
    setValue({ min, max })
  }

  const defaultMinValue = value.min ? numberFormatter(convertToString(value.min), 0) : '>50K'
  const defaultMaxValue = value.max ? numberFormatter(convertToString(value.max), 0) : '>50K'

  return (
    <div className='volume-filter-wrapper'>
      < TitleComponent text="VOLUME*PRICE" />
      <div className="volume-filter-body">
        <div className='input-wrapper'>
          <input type="text" className='filter-input' value={defaultMinValue} />
        </div>
        <div className="slider-weapper">
          <RangeSliderComponent
            min={500000}
            max={60000000}
            onChange={({ min, max }: RangeSlider) =>
              setSliderValue({ min, max })
            }
          />
        </div>
        <div className='input-wrapper'>
          <input type="text" className='filter-input' value={defaultMaxValue} />
        </div>
      </div>
    </div>
  )
}

export default VolumeInPriceFilterComponent