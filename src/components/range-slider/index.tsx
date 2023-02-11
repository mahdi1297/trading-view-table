import {
    ChangeEvent,
    FC,
    useCallback,
    useEffect,
    useState,
    useRef,
    useMemo
} from "react";
import classnames from "classnames";
import { convertToString } from "../../utils/convert-to-string";
import { numberFormatter } from "../../utils/number-formatter";
import { debounce } from "../../utils/debounce";

interface Props {
    min: number;
    max: number;
    onChange: Function;
}

const RangeSliderComponent: FC<Props> = ({
    min,
    max,
    onChange
}) => {
    const [minVal, setMinVal] = useState(min);
    const [maxVal, setMaxVal] = useState(max);

    const minValRef = useRef<HTMLInputElement>(null);
    const maxValRef = useRef<HTMLInputElement>(null);
    const range = useRef<HTMLDivElement>(null);

    // Convert to percentage
    const getPercent = useCallback(
        (value: number) => Math.round(((value - min) / (max - min)) * 100),
        [min, max]
    );

    // Set width of the range to decrease from the left side
    useEffect(() => {
        if (maxValRef.current) {
            const minPercent = getPercent(minVal);
            const maxPercent = getPercent(+maxValRef.current.value); // Precede with '+' to convert the value from type string to type number

            if (range.current) {
                range.current.style.left = `${minPercent}%`;
                range.current.style.width = `${maxPercent - minPercent}%`;
            }
        }
    }, [minVal, getPercent]);

    // Set width of the range to decrease from the right side
    useEffect(() => {
        if (minValRef.current) {
            const minPercent = getPercent(+minValRef.current.value);
            const maxPercent = getPercent(maxVal);

            if (range.current) {
                range.current.style.width = `${maxPercent - minPercent}%`;
            }
        }
    }, [maxVal, getPercent]);

    // Get min and max values when their state changes
    useEffect(() => {
        onChange({ min: minVal, max: maxVal });
    }, [minVal, maxVal]);

    const formattedMinNumber = numberFormatter(convertToString(minVal), 0)
    const formattedMaxNumber = numberFormatter(convertToString(maxVal), 0)

    const handleMinVal = useMemo(() =>
        debounce((event: ChangeEvent<HTMLInputElement>) => {
            const value = Math.min(+event.target.value, maxVal - 1);
            setMinVal(value);
            event.target.value = value.toString();
        }, 1000),
        []);

    const handleMsxVal = useMemo(() =>
        debounce((event: ChangeEvent<HTMLInputElement>) => {
            const value = Math.max(+event.target.value, minVal + 1);
            setMaxVal(value);
            event.target.value = value.toString();
        }, 1000),
        []);


    return (
        <div className="containers">
            <input
                type="range"
                min={min}
                max={max}
                defaultValue={minVal ? minVal : 0}
                ref={minValRef}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    handleMinVal(event)
                }}
                className={classnames("thumb thumb--zindex-3", {
                    "thumb--zindex-5": minVal > max - 100
                })}
            />
            <input
                type="range"
                min={min}
                max={max}
                defaultValue={maxVal ? maxVal : 100}
                ref={maxValRef}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    handleMsxVal(event)
                }}
                className="thumb thumb--zindex-4"
            />

            <div className="slider">
                <div className="slider__track"></div>
                <div ref={range} className="slider__range"></div>
                <div className="slider__left-value">{formattedMinNumber}</div>
                <div className="slider__right-value">{formattedMaxNumber}</div>
            </div>
        </div>
    );
};

export default RangeSliderComponent;
