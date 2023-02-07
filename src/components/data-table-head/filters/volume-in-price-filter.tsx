import React, { useContext, useEffect, useRef, useState } from 'react'
import { RANGE_SLIDER_MAX_VALUE, RANGE_SLIDER_MIN_VALUE, VOLUME_IN_PRICE } from '../../../constaints';
import { dataContext } from '../../../context/data.context';
import { RangeSlider } from '../../../types/range-slider';
import { calculateRangeSliderMaxNumber, calculateRangeSliderMinNumber } from '../../../utils/range-slider-calculator';
import RangeSliderComponent from '../../range-slider';
import TitleComponent from '../../title'


const VolumeInPriceFilterComponent = () => {
  const [value, setValue] = useState<RangeSlider>({
    min: RANGE_SLIDER_MIN_VALUE,
    max: RANGE_SLIDER_MAX_VALUE
  });

  const minInput = useRef<number | string>(RANGE_SLIDER_MIN_VALUE)
  const maxInput = useRef<number | string>(RANGE_SLIDER_MAX_VALUE)

  const _context = useContext(dataContext);

  useEffect(() => {
    minInput.current = calculateRangeSliderMinNumber(value)
    maxInput.current = calculateRangeSliderMaxNumber(value)

    loader();

    return () => {
      maxInput.current = null
      minInput.current = null
    }
  }, [value])


  const loader = () => {
    if (value.min !== RANGE_SLIDER_MIN_VALUE
      || value.max !== RANGE_SLIDER_MAX_VALUE) {
      _context.load();
    }
  }


  function setSliderValue({ min, max }: RangeSlider) {
    setValue({ min, max })
  }

  return (
    <div className='volume-filter-wrapper'>
      < TitleComponent text={VOLUME_IN_PRICE} />
      <div className="volume-filter-body">
        <div className='input-wrapper'>
          <input type="text" className='filter-input' value={minInput.current} onChange={() => { }} />
        </div>
        <div className="slider-weapper">
          <RangeSliderComponent
            min={RANGE_SLIDER_MIN_VALUE}
            max={RANGE_SLIDER_MAX_VALUE}
            onChange={({ min, max }: RangeSlider) => setSliderValue({ min, max })}
          />
        </div>
        <div className='input-wrapper'>
          <input type="text" className='filter-input' value={maxInput.current} onChange={() => { }} />
        </div>
      </div>
    </div>
  )
}

export default VolumeInPriceFilterComponent