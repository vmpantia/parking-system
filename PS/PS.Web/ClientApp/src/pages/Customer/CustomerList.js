import axios from "axios"
import React, { useEffect, useState } from "react"
import { Button, FormCheck} from "react-bootstrap";
import { PencilSquare, PersonPlusFill, TrashFill, } from "react-bootstrap-icons";
import { v4 as uuidv4, NIL as emptyUuid } from 'uuid';
//Utilities
import { parseDate } from "../../utilities/parser";

//Components
import PSLoader from "../../components/Loader/PSLoader.js";
import { PSTable, PSHead, PSBody, PSRow, PSHeader, PSData, PSCustomerData } from "../../components/Table/PSTable";
import { PSStatusBadge } from "../../components/Badge/PSBadge";
import { PSSubBody, PSSubData, PSSubHead, PSSubHeader, PSSubRow, PSSubTable } from "../../components/Table/PSSubTable";
import PSNoRecordsFound from "../../components/Table/PSNoRecordsFound";
import CustomerInfo from "./CustomerInfo";

const CustomerList = () => {
    const [customerList, setCustomerList] = useState([]);
    const [showLoader, setShowLoader] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [customerInternalID, setCustomerInternalID] = useState(emptyUuid);

    useEffect(() => {
        setTimeout(() => {
            getCustomers();
            setShowLoader(false);
        }, 500);
    }, [])

    const getCustomers = () => {
        axios.get("api/Customer/GetCustomers")
        .then(res => { 
            setCustomerList(res.data);
        })
        .catch(err => {
            console.log(err);
        });
    }

    const loadCustomerCarsTable = (ownerName, cars) => {
        return (
            <PSRow>
                <PSData colSpan="6">
                    <PSSubTable>
                        <PSSubHead >
                            <PSSubRow>
                                <PSSubHeader value="Plate No."/>
                                <PSSubHeader value="Year Model"/>
                                <PSSubHeader value="Color"/>
                                <PSSubHeader value="Type"/>
                                <PSSubHeader value="Make"/>
                            </PSSubRow>
                        </PSSubHead>
                        <PSSubBody>
                            {cars === null || cars.length === 0 ?
                                (<PSSubRow>
                                        <PSSubData colSpan="5">
                                            <PSNoRecordsFound /> 
                                        </PSSubData>
                                </PSSubRow>)
                                :
                                (cars.map(data => (
                                        <PSSubRow key={data.internalID}>
                                            <PSSubData value={data.yearModel}/>
                                            <PSSubData value={data.color}/>
                                            <PSSubData value={data.type}/>
                                            <PSSubData value={data.make}/>
                                        </PSSubRow>
                                    )))
                            }
                        </PSSubBody>
                    </PSSubTable>
                </PSData>
            </PSRow>
        )
    }

    const loadCustomerTable = () => {
        return (
            <PSTable>
                <PSHead>
                    <PSRow>
                        <PSHeader style="select">
                            <FormCheck />
                        </PSHeader>
                        <PSHeader value="Customer" />
                        <PSHeader style="status" value="Status" />
                        <PSHeader style="date" value="Created Date" />
                        <PSHeader style="date" value="Modified Date" />
                        <PSHeader style="action" value="Action" />
                    </PSRow>
                </PSHead>
                <PSBody>
                    {
                        customerList.length === 0 ? 
                            <PSRow>
                                <PSData colSpan="6">
                                    <PSNoRecordsFound /> 
                                </PSData>
                            </PSRow>
                        :
                        customerList.map((data) => (
                            <>
                                <PSRow key={data.internalID} subTable={loadCustomerCarsTable(data.name, data.cars)}>
                                    <PSData style="select" > 
                                        <FormCheck /> 
                                    </PSData>

                                    <PSCustomerData name={data.name} contactNo={data.contactNo} email={data.email} /> 

                                    <PSData style="status">
                                        <PSStatusBadge id={data.status} value={data.statusDescription}/>
                                    </PSData>

                                    <PSData style="date" value={parseDate(data.createdDate)} />
                                    <PSData style="date" value={parseDate(data.modifiedDate)} />

                                    <PSData style="action">
                                        <Button variant="outline-primary" size="sm" style={{marginRight: "5px"}}>
                                            <PencilSquare />
                                        </Button>
                                        <Button variant="outline-danger" size="sm">
                                            <TrashFill />
                                        </Button>
                                    </PSData>
                                </PSRow>
                            </>
                        ))
                    }
                </PSBody>
            </PSTable>
        );
    }

    const onClickedOpenModal = (internalID) => {
        setShowModal(true);
        setCustomerInternalID(internalID);
    }
    const onClickedCloseModal = () => {
        setShowModal(false);
    }

    return (
        <div>
            <PSLoader show={showLoader} />
            <h1>Customers</h1>
            <div className="ps-container">
                <div className="ps-action">
                    <Button variant="primary" size="sm" onClick={() => onClickedOpenModal(uuidv4())}>
                        <PersonPlusFill />
                        New Customer
                    </Button>
                </div>
                {loadCustomerTable()}
            </div>
            <CustomerInfo show={showModal} 
                          internalID={customerInternalID} 
                          handleCloseModal={onClickedCloseModal} />
        </div>
    )
}

export default CustomerList