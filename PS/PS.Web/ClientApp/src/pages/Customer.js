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
                            <PSRow key={data.internalID}>
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
                                <PSColumnData>
                                    <Button variant='outline-primary' style={{marginRight: '5px'}} size='sm'>
                                        <PencilSquare />
                                    </Button>
                                    <Button variant='outline-danger' size='sm'>
                                        <TrashFill />
                                    </Button>
                                </PSColumnData>
                            </PSRow>
                    ))}
                </PSBody>
            </PSTable>
        </div>
    )
}

export default Customer