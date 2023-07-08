import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Customer = () => {
    const [customerList, setCustomerList] = useState([]);
    const getCustomers = async () => {
        var requestOpt = {
            method: "GET",
            url: "api/Customer/GetCustomers",
        };
        axios(requestOpt)
        .then(res => {
            if(res.status === 200)
                setCustomerList(res);
        })
        .catch(err => {
            console.log(err);
        })
    }

    useEffect(() => {
        getCustomers();
    }, customerList)

    return (
        <div>Customer</div>
    )
}

export default Customer