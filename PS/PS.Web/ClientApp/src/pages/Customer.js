import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { parseDate } from '../utilities/parser';
import $ from 'jquery';
import Loader from '../components/Loader';

const Customer = () => {
    const [customerList, setCustomerList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            getCustomers();
            setIsLoading(false);
        }, 1000);
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

    function loadRow(){
        return (
            customerList.map((data) => (
                <>
                    <tr key={data.internalID}>
                        {/* Select Column */}
                        <td className='cstm-column-select'>
                            <input class='form-check-input' type='checkbox' value='' id='flexCheckDefault' />
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
                        <td className='cstm-column-date'>{parseDate(data.createdDate)}</td>
                        <td className='cstm-column-date'>{parseDate(data.modifiedDate)}</td>
                        <td className='cstm-column-action'>
                            <button type='button' className='btn btn-outline-primary btn-sm me-2' title='Edit Customer'>
                                <i className='bi bi-pencil-square'></i>
                            </button>
                            <button type='button' className='btn btn-outline-danger btn-sm' title='Delete Customer'>
                                <i className='bi bi-trash-fill'></i>
                            </button>
                        </td>
                    </tr>
                </>
            ))
        )
    }

    return (
        <div>
            <h1>Customers</h1>
            <table className='cstm-table'>
                <thead>
                    <tr>
                        <th className='cstm-column-select'>
                            <input class='form-check-input' type='checkbox' value='' id='flexCheckDefault' />
                        </th>
                        <th>Customer</th>
                        <th className='cstm-column-status'>Status</th>
                        <th className='cstm-column-date'>Created Date</th>
                        <th className='cstm-column-date'>Modified Date</th>
                        <th className='cstm-column-action'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {isLoading ? 
                        <tr>
                            <td colSpan={6}>
                                <Loader />
                            </td>
                        </tr>
                    :
                        loadRow()
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Customer