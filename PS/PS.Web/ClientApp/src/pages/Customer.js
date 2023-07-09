import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, FormCheck } from 'react-bootstrap';
import { EnvelopeFill, PencilSquare, TelephoneFill, TrashFill } from 'react-bootstrap-icons';

//Utilities
import { parseDate } from '../utilities/parser';

//Components
import PSLoader from '../components/Loader/PSLoader.js';
import { PSTable, PSHead, PSBody, PSRow, PSColumnHeader, PSColumnData, PSIconWithSpan, PSStatusBadge  } from '../components/Table/PSTable';

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
                        <PSColumnHeader id='select'>
                            <FormCheck />
                        </PSColumnHeader>
                        <PSColumnHeader name='Customer' />
                        <PSColumnHeader id='status' name='Status' />
                        <PSColumnHeader id='date' name='Created Date' />
                        <PSColumnHeader id='date' name='Modified Date' />
                        <PSColumnHeader id='action' name='Action' />
                    </PSRow>
                </PSHead>
                <PSBody>
                    {
                        customerList.length === 0 ? 
                            <PSRow key={0}>
                                <PSColumnData colSpan='6' value='No records found in the system'/>
                            </PSRow>
                        :
                        customerList.map((data) => (
                            <>
                                <PSRow key={data.internalID} subTable={generateSubTableForCustomerCars(data.cars)}>
                                    <PSColumnData id='select' >
                                        <FormCheck />
                                    </PSColumnData>
                                    <PSColumnData>
                                        <div className='cstm-data-detail'>
                                            <span className='name'>{data.name}</span>
                                            <div className='other'>
                                                <PSIconWithSpan value={data.contactNo}>
                                                    <TelephoneFill style={{marginRight: '5px'}} />
                                                </PSIconWithSpan>
                                                <PSIconWithSpan value={data.email}>
                                                    <EnvelopeFill style={{marginRight: '5px'}} />
                                                </PSIconWithSpan>
                                            </div>
                                        </div>
                                    </PSColumnData>
                                    <PSColumnData id='status'>
                                        <PSStatusBadge id={data.status} value={data.statusDescription} />
                                    </PSColumnData>
                                    <PSColumnData id='date' value={parseDate(data.createdDate)} />
                                    <PSColumnData id='date' value={parseDate(data.modifiedDate)} />
                                    <PSColumnData id='action'>
                                        <Button variant='outline-primary' size='sm' style={{marginRight: '5px'}}>
                                            <PencilSquare />
                                        </Button>
                                        <Button variant='outline-danger' size='sm'>
                                            <TrashFill />
                                        </Button>
                                    </PSColumnData>
                                </PSRow>
                            </>
                    ))}
                </PSBody>
            </PSTable>
        </div>
    )
}

export default Customer