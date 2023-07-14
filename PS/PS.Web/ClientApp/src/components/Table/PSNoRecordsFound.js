import { Trash2} from "react-bootstrap-icons"

import "./PSNoRecordsFound.css"

const PSNoRecordsFound = () => {
    return (
        <div className="ps-no-records-container">
            <div className="ps-no-records">
                <span className="icon">
                    <Trash2 />
                </span>
                <span className="message">No records found in the system.</span>
            </div>
        </div>
    )
}

export default PSNoRecordsFound