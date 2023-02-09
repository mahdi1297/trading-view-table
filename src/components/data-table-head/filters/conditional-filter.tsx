import { useState, useEffect } from 'react'
import SelectComponent from '../../select'
import TitleComponent from '../../title'
import { amoungSortList } from '../../../models/amoung-sort'
import { priceSortList } from '../../../models/price-sort-list'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../../store'
import { addFilterhList, Filter } from '../../../slices/data.slice'
import { fetchDataAction } from '../../../slices/actions'

type Props = {
    componentSignature: string,
    componentTitle: string
}

const ConditionalFilterComponent = ({ componentSignature, componentTitle }: Props) => {
    // First dropdow [value, setValue]
    const [operatorValue, setOperatorValue] = useState<string>(null)

    // Seccond dropdow [value, setValue]
    const [functionFilterValue, setFunctionFilterValue] = useState<string>(priceSortList[0].value);

    // Input [value, setValue]
    const [searchFieldValue, setSearchFieldValue] = useState<string | any>(null);

    const dataState = useSelector((state: RootState) => state.dataSlice)
    const dispatch = useDispatch<AppDispatch>();

    // Global filterList array
    const filters = dataState.filterList

    useEffect(() => {
        applyFilterData();
    }, [])

    const applyFilterData = () => {
        if (filters.length) {

            // If filter of this componentSignature exists in filterList array
            // sets the default values to first and seccond dropdown, and the input
            const exists = filters.find((s: Filter) => s.filterName === componentSignature);
            if (exists) {
                setOperatorValue(() => exists.amoung || 'Below');
                setFunctionFilterValue(() => typeof exists.value !== 'number' ? exists.value : 'Value');
                setSearchFieldValue(() => typeof exists.value === 'number' ? exists.value : null);
            }
        }
    }

    const dispatchAddFilter = (filter: Filter) => {
        dispatch(addFilterhList(filter))
    }

    // Checks if the componentSignature filter exists in filterList array
    const checkIfFilterExists = () => {
        if (filters.length) {
            const getFilters = filters.find((f: Filter) => f.filterName === componentSignature)
            if (getFilters) {
                return true
            }
            return false
        }
        return false
    }

    // Operator value(first dropdown) click handler
    const setOperatorValueHandler = (value: string) => {
        setOperatorValue(value)


        const existsComponentSignatureInFilter = checkIfFilterExists();

        // If the componentSignature filter exists, dispatch the filter by selecting
        // the dropdown items, othervise not
        if (existsComponentSignatureInFilter) {
            const filter = {
                filterName: componentSignature,
                amoung: value,
                value: searchFieldValue ? searchFieldValue : functionFilterValue

            }
            dispatchAddFilter(filter)
        }

    }

    // Function value(seccond dropdown) click handler
    const setFunctionFilterValueHandler = (value: string) => {
        // If value was not number(means the input is empty), so it
        // fetchs the fresh data
        if (value === "" || value === "Value") {
            dispatch(fetchDataAction());
        }

        setFunctionFilterValue(value);

        const filter = {
            filterName: componentSignature,
            amoung: operatorValue || 'Below',
            value: value ? value : functionFilterValue
        }

        dispatchAddFilter(filter)
    }

    const setSearchFieldValueHandler = (value: string) => {
        // If value was not number(means the input is empty), so it
        // fetchs the fresh data
        if (value === "" || value === "Value") {
            setSearchFieldValue(null);
            dispatch(fetchDataAction());
        }
        else {
            setSearchFieldValue(() => value);
        }
        const filter = {
            filterName: componentSignature,
            amoung: operatorValue || 'Below',
            value: value ? parseFloat(value) : functionFilterValue
        }
        dispatchAddFilter(filter)
    }

    return (
        <>
            <TitleComponent text={componentTitle} />
            <div className="filter-modal-body">
                <div>
                    <SelectComponent
                        selectList={amoungSortList}
                        selectItemHandler={setOperatorValueHandler}
                        selectedItem={operatorValue}
                    />
                </div>
                <div>
                    <SelectComponent
                        selectList={priceSortList}
                        selectItemHandler={setFunctionFilterValueHandler}
                        selectedItem={
                            functionFilterValue !== 'Value' ? functionFilterValue : 'Value'}
                    />
                </div>
                <div>
                    {functionFilterValue === 'Value' ?
                        <input
                            className="filter-input sarch-filter-input"
                            type="number"
                            defaultValue={searchFieldValue ? searchFieldValue : null}
                            onChange={(e) => setSearchFieldValueHandler(e.target.value)}
                        /> : <></>}
                </div>
            </div>
        </>
    )

}

export default ConditionalFilterComponent