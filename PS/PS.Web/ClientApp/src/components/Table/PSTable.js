import { useState } from 'react'
import { EnvelopeFill, TelephoneFill } from 'react-bootstrap-icons'

import './PSTable.css'

export const PSTable = (props) => {
    return (
        <div className='ps-tbl-container'>
            <table className='ps-tbl'>
                {props.children}
            </table>
        </div>
    )
}

export const PSHead = (prop) => {
    return (
        <thead>
            {prop.children}
        </thead>
    )
}

export const PSBody = (props) => {
    return (
        <tbody>
            {props.children}
        </tbody>
    )
}

export const PSRow = (props) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpanded = () => {
        setIsExpanded(!isExpanded);
    }

    return (
        <>
            <tr onClick={toggleExpanded}>
                {props.children}
            </tr>
            { isExpanded &&  props.subTable }
        </>
    )
}

export const PSHeader = (props) => {
    return (
        <th className={`ps-tbl-header ${props.id && `ps-tbl-col-${props.style}`}`}>
            {props.children}
            {props.value}
        </th>
    )
}

export const PSData = (props) => {
    return (
        <td className={`ps-tbl-data ${props.id && `ps-tbl-col-${props.style}`}`} colSpan={props.colSpan}>
            {props.children}
            {props.value}
        </td>
    )
}

export const PSCustomerData = (props) => {
    return (
        <PSData>
            <div className='customer-data'>
                <span className='name'>
                    {props.name}
                </span>
                <div className='other'>
                    <span>
                        <TelephoneFill style={{marginRight: '5px'}} />
                        {props.contactNo}
                    </span>

                    <span>
                        <EnvelopeFill style={{marginRight: '5px'}} />
                        {props.email}
                    </span>
                </div>
            </div>
        </PSData>
    )
}