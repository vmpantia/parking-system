import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Col, Container, FloatingLabel, Form, FormCheck, Modal, Row } from 'react-bootstrap';
import { EnvelopeFill, PencilSquare, PersonPlusFill, TelephoneFill, TrashFill, ZoomOut } from 'react-bootstrap-icons';

//Utilities
import { parseDate } from '../utilities/parser';

//Components
import PSLoader from '../components/Loader/PSLoader.js';
import { PSTable, PSHead, PSBody, PSRow, PSHeader, PSData, PSIconWithSpan, PSCustomerData } from '../components/Table/PSTable';
import { PSStatusBadge } from '../components/Badge/PSBadge';
import { PSSubBody, PSSubData, PSSubHead, PSSubHeader, PSSubRow, PSSubTable } from '../components/Table/PSSubTable';
import PSNoRecordsFound from '../components/Table/PSNoRecordsFound';

const Customer = () => {
    const [customerList, setCustomerList] = useState([]);
    const [showLoader, setShowLoader] = useState(true);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            getCustomers();
            setShowLoader(false);
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

    const loadCustomerCarsTable = (ownerName, cars) => {
        return (
            <PSRow>
                <PSData colSpan='6'>
                    <PSSubTable>
                        <PSSubRow>
                            <PSSubHeader value='Plate No.'/>
                            <PSSubHeader value='Year Model'/>
                            <PSSubHeader value='Color'/>
                            <PSSubHeader value='Type'/>
                            <PSSubHeader value='Make'/>
                        </PSSubRow>
                        {cars === null || cars.length === 0 ?
                            (<PSSubRow>
                                    <PSSubData colSpan='5'>
                                        <PSNoRecordsFound /> 
                                    </PSSubData>
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
                    </PSSubTable>
                </PSData>
            </PSRow>
        )
    }

    const loadCustomerTable = () => {
        return (
            <PSTable>
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
                {
                    customerList.length === 0 ? 
                        <PSRow>
                            <PSData colSpan='6'>
                                <PSNoRecordsFound /> 
                            </PSData>
                        </PSRow>
                    :
                    customerList.map((data) => (
                        <>
                            <PSRow key={data.internalID} subTable={loadCustomerCarsTable(data.name, data.cars)}>
                                <PSData style='select' > 
                                    <FormCheck /> 
                                </PSData>

                                <PSCustomerData name={data.name} contactNo={data.contactNo} email={data.email} /> 

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
                    ))
                }
            </PSTable>
        );
    }

    const openModal = () => {
        setShowModal(true);
    }
    const closeModal = () => {
        setShowModal(false);
    }

    return (
        <div>
            {showLoader && <PSLoader /> /* Show Loading Screen */}
            <h1>Customers</h1>
            <div className='ps-container'>
                <div className='ps-action'>
                    <Button variant='primary' size='sm' onClick={openModal}>
                        <PersonPlusFill />
                        New Customer
                    </Button>
                </div>
                {loadCustomerTable() /* This function will load the customers table */}
            </div>

            
            <Modal size='xl' show={showModal} backdrop="static" keyboard={false} onHide={closeModal} >
                <Modal.Header closeButton>
                    <Modal.Title>
                        <PersonPlusFill />
                        New Customer
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <h5 className='mb-3'>Customer Information</h5>
                        <Row className='mb-3'>
                            <Col sm={12} lg={4}>
                                <FloatingLabel label="First Name" className="mb-3" >
                                        <Form.Control type="input" placeholder='First Name' />
                                </FloatingLabel>
                            </Col>
                            <Col sm={12} lg={4}>
                                <FloatingLabel label="Middle Name" className="mb-3" >
                                        <Form.Control type="input" placeholder='Middle Name' />
                                </FloatingLabel>
                            </Col>
                            <Col sm={12} lg={4}>
                                <FloatingLabel label="Last Name" className="mb-3" >
                                        <Form.Control type="input" placeholder='Last Name' />
                                </FloatingLabel>
                            </Col>
                            <Col sm={12} lg={4}>
                                <FloatingLabel label="Gender" className="mb-3" >
                                    <Form.Select>
                                        <option>Select Gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </Form.Select>
                                </FloatingLabel>
                            </Col>
                        </Row>
                        <h5 className='mb-3'>Contact Information</h5>
                        <Row>
                            <Col sm={12} lg={6}>
                                <FloatingLabel label="Contact Number" className="mb-3" >
                                        <Form.Control type="input" placeholder='Contact Number' />
                                </FloatingLabel>
                            </Col>
                            <Col sm={12} lg={6}>
                                <FloatingLabel label="Email Address" className="mb-3" >
                                        <Form.Control type="input" placeholder='Email Address' />
                                </FloatingLabel>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={closeModal}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Customer