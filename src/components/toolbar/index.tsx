import React, { lazy, Suspense, useState } from 'react'
import { GoKebabVertical, GoSettings } from 'react-icons/go'
import { SlRefresh } from 'react-icons/sl'
// import ToolbarFilterModal from './toolbar-filter';

const ToolbarFilterModal = lazy(() => import('./toolbar-filter'));


const ToolbarComponent = () => {
    const [showFilterModal, setShowFilterModal] = useState(true);


    const showFilterModalHandler = () => {
        setShowFilterModal(true)
    }

    const hideFilterModalHandler = () => {
        setShowFilterModal(false)
    }

    return (
        <>
            <div className="toolbar">
                <div>
                    <div className="toolbar-item toolbar-refresh">
                        <SlRefresh size={18} />
                    </div>
                    <div className="toolbar-item toolbar-more">
                        <GoKebabVertical size={18} />
                    </div>

                    <div className="spacer"></div>

                    <div className="toolbar-item toolbar-more">
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
                <ToolbarFilterModal visible={showFilterModal} hideModalHandler={hideFilterModalHandler} />
            </Suspense>
        </>
    )
}

export default ToolbarComponent