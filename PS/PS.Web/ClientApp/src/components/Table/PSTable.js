import './PSTable.css'

export const PSTable = (props) => {
    return (
        <table className='cstm-table'>
            {props.children}
        </table>
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
    return (
        <tr>
            {props.children}
        </tr>
    )
}

export const PSColumnHeader = (props) => {
    return (
        <th className={props.id && `cstm-column-${props.id}`}>
            {props.children}
            {props.name}
        </th>
    )
}

export const PSColumnData = (props) => {
    return (
        <td className={props.id && `cstm-column-${props.id}`} colSpan={props.colSpan}>
            {props.children}
            {props.value}
        </td>
    )
}

export const PSIconWithSpan = (props) => {
    return (
        <span>
            {props.children}
            {props.value}
        </span>
    )
}

export const PSStatusBadge = (props) => {
    return (
        <div className={`cstm-status status-${props.id}`}>
            {props.value}
        </div>
    )
}
