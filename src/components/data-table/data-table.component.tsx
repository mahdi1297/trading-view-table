import React, { ReactNode, useEffect, useState } from 'react'
import { GoSettings } from 'react-icons/go'
import './data-table.style.css'



type Props = {
    children: ReactNode
}

const DataTableComponent = ({ children }: Props) => {
    return (
        <div className='table-container'>
            <table>
                {children}
            </table>
        </div>
    )
}

export default DataTableComponent