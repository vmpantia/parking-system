import React, { useEffect, useState } from 'react'
import axios from 'axios'

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
                        <th>Customer</th>
                        <th>Status</th>
                        <th>Created Date</th>
                        <th>Modified Date</th>
                    </tr>
                </thead>
                <tbody>
                    {customerList.map((data) => (
                        <>
                            <tr key={data.internalID}>
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
                                <td>{data.statusDescription}</td>
                                <td>{data.createdDate}</td>
                                <td>{data.modifiedDate}</td>
                            </tr>
                        </>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Customer