import React from 'react'
import { Button, Col, Container, Form, Modal, Row } from 'react-bootstrap';
import { PersonPlusFill } from 'react-bootstrap-icons';

const CustomerInfo = (props) => {
    return (
        <Modal size='xl' show={props.show} backdrop="static" keyboard={false} onHide={props.handlerCloseModal} >
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
                        <Col className='mb-3' sm={12} lg={4}>
                            <Form.Label>* First Name:</Form.Label>
                            <Form.Control type='text' placeholder='Enter your First Name' />
                        </Col>
                        <Col className='mb-3'  sm={12} lg={4}>
                            <Form.Label>Middle Name:</Form.Label>
                            <Form.Control type='text' placeholder='Enter your Middle Name' />
                        </Col>
                        <Col className='mb-3'  sm={12} lg={4}>
                            <Form.Label>* Last Name:</Form.Label>
                            <Form.Control type='text' placeholder='Enter your Last Name' />
                        </Col>
                        <Col className='mb-3'  sm={12} lg={4}>
                            <Form.Label>Select Gender:</Form.Label>
                            <Form.Select>
                                <option>Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </Form.Select>
                        </Col>
                    </Row>
                    <h5 className='mb-3'>Contact Information</h5>
                    <Row>
                        <Col className='mb-3'  sm={12} lg={6}>
                            <Form.Label>* Contact No.:</Form.Label>
                            <Form.Control type='text' placeholder='Enter your Contact Number' />
                        </Col>
                        <Col className='mb-3'  sm={12} lg={6}>
                            <Form.Label>* Email Address:</Form.Label>
                            <Form.Control type='email' placeholder='Enter your Email Address' />
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" size="sm" onClick={props.handlerCloseModal}>
                    Close
                </Button>
                <Button type='submit' variant="primary" size="sm" onClick={props.handlerCloseModal}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default CustomerInfo