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

    const generateSubTableForCustomerCars = (cars) => {
        return (
            <tr>
                <td colSpan='6'>
                    <div className='cstm-sub-table'>
                        <span>Car List</span>
                        <table>
                            <thead>
                                <tr>
                                    <th>Plane No.</th>
                                    <th>Year Model</th>
                                    <th>Color</th>
                                    <th>Type</th>
                                    <th>Make</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>NBW6933</td>
                                    <td>2016</td>
                                    <td>Gray</td>
                                    <td>MUV</td>
                                    <td>Toyota</td>
                                </tr>
                                <tr>
                                    <td>NBW6933</td>
                                    <td>2016</td>
                                    <td>Gray</td>
                                    <td>MUV</td>
                                    <td>Toyota</td>
                                </tr>
                                <tr>
                                    <td>NBW6933</td>
                                    <td>2016</td>
                                    <td>Gray</td>
                                    <td>MUV</td>
                                    <td>Toyota</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    
                </td>
            </tr>
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
                            <PSRow key={data.internalID} subTable={generateSubTableForCustomerCars(data.cars)}>
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