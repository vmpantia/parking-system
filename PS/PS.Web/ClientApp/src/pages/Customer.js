import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, FormCheck } from 'react-bootstrap';
import { PencilSquare, TrashFill } from 'react-bootstrap-icons';

//Utilities
import { parseDate } from '../utilities/parser';

//Components
import Loader from '../components/Loader/Loader.js';

const Customer = () => {
    const [customerList, setCustomerList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            getCustomers();
            setIsLoading(false);
        }, 500);
    }, [])

    function getCustomers(){
        axios.get('api/Customer/GetCustomers')
        .then(res => { 
            setCustomerList(res.data);
        })
        .catch(err => {
            console.log(err);
        });
    }

    return (
        <div>
            {isLoading && <Loader />}
            <h1>Customers</h1>
            <table className='cstm-table'>
                <thead>
                    <tr>
                        <th className='cstm-column-select'>
                            <FormCheck />
                        </th>
                        <th>Customer</th>
                        <th className='cstm-column-status'>Status</th>
                        <th className='cstm-column-date'>Created Date</th>
                        <th className='cstm-column-date'>Modified Date</th>
                        <th className='cstm-column-action'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        customerList.length === 0 ? 
                            <tr>
                                <td colSpan="6">No records found in the system.</td>
                            </tr>
                        :
                        customerList.map((data) => (
                            <>
                                <tr key={data.internalID}>
                                    {/* Select Column */}
                                    <td className='cstm-column-select'>
                                        <FormCheck />
                                    </td>

                                    {/* Customer Column */}
                                    <td>
                                        <div className='cstm-data-detail'>
                                            <span className='name'>{data.name}</span>
                                            <div className='other'>
                                                <span>
                                                    <i className='bi bi-telephone-fill' />
                                                    {data.contactNo}
                                                </span>
                                                <span>
                                                    <i className='bi bi-envelope-fill'></i>
                                                    {data.email}
                                                </span>
                                            </div>
                                        </div>
                                    </td>

                                    {/* Status Column */}
                                    <td className='cstm-column-status'>
                                        <div className={`cstm-status status-${data.status}`}>
                                            {data.statusDescription}
                                        </div>
                                    </td>

                                    {/* Date Column */}
                                    <td className='cstm-column-date'>{parseDate(data.createdDate)}</td>
                                    <td className='cstm-column-date'>{parseDate(data.modifiedDate)}</td>

                                    {/* Action Column */}
                                    <td className='cstm-column-action'>
                                        <Button variant='outline-primary' style={{marginRight: '5px'}} size='sm'>
                                            <PencilSquare />
                                        </Button>
                                        <Button variant='outline-danger' size='sm'>
                                            <TrashFill />
                                        </Button>
                                    </td>
                                </tr>
                            </>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Customer