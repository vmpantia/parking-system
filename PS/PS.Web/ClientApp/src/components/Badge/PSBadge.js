import "./PSBadge.css"

export const PSStatusBadge = (props) => {
    return (
        <div className={`ps-badge status-${props.id.toLowerCase()}`}>
            {props.value}
        </div>
    )
}
