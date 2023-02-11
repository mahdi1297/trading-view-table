import React,
{
    useEffect,
    useRef,
    useState
} from 'react'
import {
    useDispatch,
    useSelector
} from 'react-redux';
import {
    addFilterhList,
    Filter,
    load,
    stopLoad
} from '../../../slices/data.slice';
import { RangeSlider } from '../../../types/range-slider';
import RangeSliderComponent from '../../range-slider'
import TitleComponent from '../../title';
import {
    calculateRangeSliderMaxNumber,
    calculateRangeSliderMinNumber
} from '../../../utils/range-slider-calculator';
import { AppDispatch, RootState } from '../../../store';

type Props = {
    componentSignature: string,
    componentTitle: string,
    RANGE_SLIDER_MIN_VALUE: number,
    RANGE_SLIDER_MAX_VALUE: number,
}

const RangeNumberComponent = ({
    componentSignature,
    componentTitle,
    RANGE_SLIDER_MIN_VALUE,
    RANGE_SLIDER_MAX_VALUE,
}: Props) => {
    const [value, setValue] = useState<RangeSlider>({
        min: RANGE_SLIDER_MIN_VALUE,
        max: RANGE_SLIDER_MAX_VALUE
    });

    const dataCtx = useSelector((state: RootState) => state.dataSlice);
    const dispatch = useDispatch<AppDispatch>()
    const filters = dataCtx.filterList

    const minInput = useRef<number | string>(RANGE_SLIDER_MIN_VALUE)
    const maxInput = useRef<number | string>(RANGE_SLIDER_MAX_VALUE)

    useEffect(() => {
        const currentFilter: Filter = filters.find((f) => f.filterName === componentSignature);
        if (currentFilter) {
            setValue({
                min: currentFilter.value.min,
                max: currentFilter.value.max
            })
            minInput.current = calculateRangeSliderMinNumber(currentFilter.value.min)
            maxInput.current = calculateRangeSliderMaxNumber(currentFilter.value.max)
        }
    }, [])

    useEffect(() => {
        minInput.current = calculateRangeSliderMinNumber(value)
        maxInput.current = calculateRangeSliderMaxNumber(value)

        const filter: Filter = {
            filterName: componentSignature,
            amoung: null,
            value
        }

        dispatch(load())
        dispatch(addFilterhList(filter))
        setTimeout(() => dispatch(stopLoad()), 200)
    }, [value])

    function setSliderValue({ min, max }: RangeSlider) {
        setValue({ min, max })
    }

    return (
        <div className='volume-filter-wrapper'>
            <TitleComponent text={componentTitle} />
            <div className="volume-filter-body">
                <div className='input-wrapper'>
                    <input type="text" className='filter-input' value={minInput.current} onChange={() => { }} />
                </div>
                <div className="slider-weapper">
                    <RangeSliderComponent
                        min={RANGE_SLIDER_MIN_VALUE}
                        max={RANGE_SLIDER_MAX_VALUE}
                        onChange={({ min, max }: RangeSlider) => {
                            setSliderValue({ min, max })
                        }}
                    />
                </div>
                <div className='input-wrapper'>
                    <input type="text" className='filter-input' value={maxInput.current} onChange={() => { }} />
                </div>
            </div>
        </div>
    )
}


export default RangeNumberComponent