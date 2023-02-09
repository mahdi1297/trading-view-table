import {  useState, useEffect } from 'react'
import SelectComponent from '../../select'
import TitleComponent from '../../title'
import { amoungSortList } from '../../../models/amoung-sort'
import { priceSortList } from '../../../models/price-sort-list'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../../store'
import { addFilterhList } from '../../../slices/data.slice'
import { fetchDataAction } from '../../../slices/actions'

type Props = {
    componentSignature: string,
    componentTitle: string
}

const ConditionalFilterComponent = ({ componentSignature, componentTitle }: Props) => {
    const [operatorValue, setOperatorValue] = useState<string>(null)
    const [functionFilterValue, setFunctionFilterValue] = useState<string>(priceSortList[0].value);
    const [searchFieldValue, setSearchFieldValue] = useState<string>(null);

    const dataState = useSelector((state: any) => state.dataSlice)
    const dispatch = useDispatch<AppDispatch>();

    const filters = dataState.filterList

    useEffect(() => {
        const applyFilterData = () => {
            if (filters.length) {
                const exists = filters.find((s: any) => s.filterName === componentSignature);
                if (exists) {
                    setOperatorValue(() => exists.amoung || 'Below');
                    setFunctionFilterValue(() => typeof exists.value !== 'number' ? exists.value : 'Value');
                    setSearchFieldValue(() => typeof exists.value === 'number' ? exists.value : null);
                }
            }
        }

        applyFilterData();
    }, [])


    const setOperatorValueHandler = (value: string) => {
        setOperatorValue(value)
    }

    const setFunctionFilterValueHandler = (value: string) => {
        if (value === "" || value === "Value") {
            dispatch(fetchDataAction());
        }

        setFunctionFilterValue(value);

        const filter = {
            filterName: componentSignature,
            amoung: operatorValue || 'Below',
            value: value ? value : functionFilterValue
        }

        dispatch(addFilterhList(filter))
    }

    const setSearchFieldValueHandler = (value: string) => {
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

        dispatch(addFilterhList(filter))
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