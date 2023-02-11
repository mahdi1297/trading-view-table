import { lazy, Suspense, useState } from 'react'
import { GoKebabVertical, GoSettings } from 'react-icons/go'
import { SlRefresh } from 'react-icons/sl'
import { useDispatch, useSelector } from 'react-redux';
import { fetchDataAction } from '../../slices/actions';
import { clearFilters } from '../../slices/data.slice';
import { AppDispatch, RootState } from '../../store';

const ToolbarFilterModal = lazy(() => import('./toolbar-filter'));

const ToolbarComponent = () => {
    const [showFilterModal, setShowFilterModal] = useState(false);

    const dataCtx = useSelector((state: RootState) => state.dataSlice);
    const dispatch = useDispatch<AppDispatch>()

    const showFilterModalHandler = () => {
        setShowFilterModal(true)
    }

    const hideFilterModalHandler = () => {
        setShowFilterModal(false)
    }

    const getFreshDataHandler = () => {
        dispatch(clearFilters())
        dispatch(fetchDataAction())
    }

    return (
        <>
            <div className="toolbar">
                <div>
                    <div className="toolbar-item toolbar-refresh" onClick={getFreshDataHandler}>
                        <SlRefresh size={18} />
                    </div>
                    <div className="toolbar-item toolbar-more">
                        <GoKebabVertical size={18} />
                    </div>

                    <div className="spacer"></div>

                    <div className="toolbar-item toolbar-more overview-toolbar-item">
                        Overview
                    </div>

                    <div className="toolbar-buttons">
                        <div className="spacer"></div>
                        <div className="toolbar-button">Overview</div>
                        <div className="toolbar-button">Performance</div>
                        <div className="toolbar-button">Extended Hours</div>
                        <div className="toolbar-button">Valuations</div>
                        <div className="toolbar-button">Margins</div>
                        <div className="toolbar-button">Balance Sheet</div>
                    </div>
                </div>
                <div>
                    <div className="toolbar-item capitzlized-toolbar-button">
                        Most capitalized
                    </div>
                    <div className="toolbar-button filter-toolbar-button" onClick={showFilterModalHandler}>
                        <span>Filters</span>
                        <GoSettings size={25} />
                    </div>
                </div>
            </div>
            <Suspense fallback={<></>}>
                {showFilterModal &&
                    <ToolbarFilterModal visible={showFilterModal} hideModalHandler={hideFilterModalHandler} />
                }
            </Suspense>
        </>
    )
}

export default ToolbarComponent