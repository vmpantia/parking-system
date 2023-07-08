import axios from 'axios'
import React, { useEffect, useState } from 'react'

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
            <table className='table'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Contact No.</th>
                        <th>Email Address</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {customerList.map(item => (
                        <tr key={item.internalID}>
                            <td>{item.name}</td>
                            <td>{item.contactNo}</td>
                            <td>{item.email}</td>
                            <td>{item.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Customer