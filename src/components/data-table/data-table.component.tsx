import React, { ReactNode, useEffect } from 'react'
import './data-table.style.css'

type TableHead = {
    id: number,
    title: string,
    onclick: Function
}

type TableBody = any;

type Props = {
    tableHead: TableHead[],
    children: ReactNode
    // tableBody: TableBody[],
}

const DataTableComponent = ({ tableHead, children }: Props) => {

    useEffect(() => {

    }, [])

    if (!tableHead.length) {
        return <h1>Loading...</h1>
    }

    return (
        <div className='table-container'>
            <table>
                <thead>
                    <tr>
                        {tableHead && tableHead.length &&
                            tableHead.map((head: any) => (
                                <th key={head.id} onClick={head.onclick}>
                                    {head.title}
                                    {head.children ? head.children : <></>}
                                </th>
                            ))
                        }
                    </tr>
                </thead>

                <tbody>

                    {children}
                </tbody>
            </table>
        </div>
    )
}

export default DataTableComponent