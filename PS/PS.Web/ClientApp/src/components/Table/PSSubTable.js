import './PSSubTable.css'

export const PSSubTable = (props) => {
    return (
        <div className='ps-sub-tbl-container'>
            <table className='ps-sub-tbl'>
                {props.children}
            </table>
        </div>
    )
}

export const PSSubHead = (prop) => {
    return (
        <thead>
            {prop.children}
        </thead>
    )
}

export const PSSubBody = (props) => {
    return (
        <tbody>
            {props.children}
        </tbody>
    )
}

export const PSSubRow = (props) => {
    return (
        <tr className='ps-sub-tbl-row'>
            {props.children}
        </tr>
    )
}

export const PSSubHeader = (props) => {
    return (
        <th className={`ps-sub-tbl-header`}>
            {props.children}
            {props.value}
        </th>
    )
}

export const PSSubData = (props) => {
    return (
        <td className='ps-sub-tbl-data'>
            {props.children}
            {props.value}
        </td>
    )
}