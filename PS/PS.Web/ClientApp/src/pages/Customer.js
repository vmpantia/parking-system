import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, FormCheck } from 'react-bootstrap';
import { EnvelopeFill, PencilSquare, TelephoneFill, TrashFill } from 'react-bootstrap-icons';

//Utilities
import { parseDate } from '../utilities/parser';

//Components
import PSLoader from '../components/Loader/PSLoader.js';
import { PSTable, PSHead, PSBody, PSRow, PSHeader, PSData, PSIconWithSpan, PSCustomerData } from '../components/Table/PSTable';
import { PSStatusBadge } from '../components/Badge/PSBadge';
import { PSSubBody, PSSubData, PSSubHead, PSSubHeader, PSSubRow, PSSubTable } from '../components/Table/PSSubTable';

const Customer = () => {
    const [customerList, setCustomerList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            getCustomers();
            setIsLoading(false);
        }, 500);
    }, [])

    const getCustomers = () => {
        axios.get('api/Customer/GetCustomers')
        .then(res => { 
            setCustomerList(res.data);
        })
        .catch(err => {
            console.log(err);
        });
    }

    const loadTableForCustomerCars = (ownerName, cars) => {
        return (
            <PSRow>
                <PSData colSpan='6'>
                    <PSSubTable>
                        <PSSubHead>
                            <PSSubRow>
                                <PSSubHeader value='Plate No.'/>
                                <PSSubHeader value='Year Model'/>
                                <PSSubHeader value='Color'/>
                                <PSSubHeader value='Type'/>
                                <PSSubHeader value='Make'/>
                            </PSSubRow>
                        </PSSubHead>
                        <PSSubBody>
                            {cars === null || cars.length === 0 ?
                                (<PSSubRow>
                                        <PSSubData colSpan='6' value='No records found in the system'/>
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

    return (
        <div>
            {/* Loading Screen */}
            {isLoading && <PSLoader />}

            <h1>Customers</h1>
            <PSTable>
                <PSHead>
                    <PSRow>
                        <PSHeader style='select'>
                            <FormCheck />
                        </PSHeader>
                        <PSHeader value='Customer' />
                        <PSHeader style='status' value='Status' />
                        <PSHeader style='date' value='Created Date' />
                        <PSHeader style='date' value='Modified Date' />
                        <PSHeader style='action' value='Action' />
                    </PSRow>
                </PSHead>
                <PSBody>
                    {
                        customerList.length === 0 ? 
                            <PSRow key={0}>
                                <PSData colSpan='6' value='No records found in the system'/>
                            </PSRow>
                        :
                        customerList.map((data) => (
                        <>
                            <PSRow key={data.internalID} subTable={loadTableForCustomerCars(data.name, data.cars)}>
                                <PSData style='select' > 
                                    <FormCheck /> 
                                </PSData>

                                <PSCustomerData 
                                    name={data.name} 
                                    contactNo={data.contactNo} 
                                    email={data.email} /> 

                                <PSData style='status'>
                                    <PSStatusBadge id={data.status} value={data.statusDescription}/>
                                </PSData>

                                <PSData style='date' value={parseDate(data.createdDate)} />
                                <PSData style='date' value={parseDate(data.modifiedDate)} />

                                <PSData style='action'>
                                    <Button variant='outline-primary' size='sm' style={{marginRight: '5px'}}>
                                        <PencilSquare />
                                    </Button>
                                    <Button variant='outline-danger' size='sm'>
                                        <TrashFill />
                                    </Button>
                                </PSData>
                                
                            </PSRow>
                        </>
                    ))}
                </PSBody>
            </PSTable>
        </div>
    )
}

export default Customer