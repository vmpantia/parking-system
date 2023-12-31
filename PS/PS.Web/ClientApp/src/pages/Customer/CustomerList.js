import axios from "axios"
import React, { useEffect, useState } from "react"
import { Button, FormCheck} from "react-bootstrap";
import { PencilSquare, PersonPlusFill, TrashFill, } from "react-bootstrap-icons";
import { NIL as emptyUuid } from 'uuid';

//Utilities
import { parseDate } from "../../utilities/parser";

//Components
import PSLoader from "../../components/Loader/PSLoader.js";
import { PSTable, PSHead, PSBody, PSRow, PSHeader, PSData, PSCustomerData } from "../../components/Table/PSTable";
import { PSStatusBadge } from "../../components/Badge/PSBadge";
import { PSSubBody, PSSubData, PSSubHead, PSSubHeader, PSSubRow, PSSubTable } from "../../components/Table/PSSubTable";
import PSNoRecordsFound from "../../components/Table/PSNoRecordsFound";
import CustomerInfo from "./CustomerInfo";
import { CustomerInfoDTO, SaveCustomerDTO } from "../../models/dto";

const CustomerList = () => {
    const [customerList, setCustomerList] = useState([]);
    const [customerInfo, setCustomerInfo] = useState();
    const [showLoader, setShowLoader] = useState(true);
    const [showModal, setShowModal] = useState(false);

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
                                        <PSSubRow key={data.id}>
                                            <PSSubData value={data.plateNo}/>
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
                                <PSRow key={data.id} subTable={loadCustomerCarsTable(data.name, data.cars)}>
                                    <PSData style="select" > 
                                        <FormCheck /> 
                                    </PSData>

                                    <PSCustomerData name={data.fullName} contactNo={data.contactNo} email={data.email} /> 

                                    <PSData style="status">
                                        <PSStatusBadge id={data.status} value={data.status}/>
                                    </PSData>

                                    <PSData style="date" value={data.createdDate} />
                                    <PSData style="date" value={data.modifiedDate} />

                                    <PSData style="action">
                                        <Button variant="outline-primary" size="sm" style={{marginRight: "5px"}} onClick={() => onClickedOpenModal(data.id)} >
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
        if(internalID === emptyUuid)
            setCustomerInfo(SaveCustomerDTO);
        else {
            axios.get(`api/Customer/GetCustomerByID?id=${internalID}`)
            .then(res => { 
                setCustomerInfo(res.data);
            })
            .catch(err => {
                console.log(err);
            });
        }
        setShowModal(true);
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
                    <Button variant="primary" size="sm" onClick={() => onClickedOpenModal(emptyUuid)}>
                        <PersonPlusFill />
                        New Customer
                    </Button>
                </div>
                {loadCustomerTable()}
            </div>
            <CustomerInfo show={showModal} 
                          data={customerInfo} 
                          handleCloseModal={onClickedCloseModal} />
        </div>
    )
}

export default CustomerList