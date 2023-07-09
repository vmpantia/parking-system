import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { parseDate } from '../utilities/parser';

const Customer = () => {
    const [customerList, setCustomerList] = useState([]);

    useEffect(() => {
        axios.get("api/Customer/GetCustomers")
            .then(res => { 
                setCustomerList(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    return (
        <div>
            <h1>Customers</h1>
            <table className='cstm-table'>
                <thead>
                    <tr>
                        <th className='cstm-column-select'>
                            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                        </th>
                        <th>Customer</th>
                        <th className='cstm-column-status'>Status</th>
                        <th className='cstm-column-date'>Created Date</th>
                        <th className='cstm-column-date'>Modified Date</th>
                    </tr>
                </thead>
                <tbody>
                    {customerList.map((data) => (
                        <>
                            <tr key={data.internalID}>
                                {/* Select Column */}
                                <td className='cstm-column-select'>
                                    <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                </td>
                                {/* Customer Column */}
                                <td>
                                    <div className='cstm-data-detail'>
                                        <span className='name'>{data.name}</span>
                                        <div className='other'>
                                            <span>
                                                <i class="bi bi-telephone-fill" />
                                                {data.contactNo}
                                            </span>
                                            <span>
                                                <i class="bi bi-envelope-fill"></i>
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
                            </tr>
                        </>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Customer