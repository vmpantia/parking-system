import React from "react"
import { Button, Col, Container, Form, InputGroup, Modal, Row } from "react-bootstrap";
import { PersonPlusFill } from "react-bootstrap-icons";
import { useForm } from "react-hook-form";
import { FormDrownDownField, FormEmailTextField, FormInputTextField } from "../../components/FormField/FormField";

const CustomerInfo = (props) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } =  useForm();

    const onSubmit = (data) => {
        console.log(data);
    };
    
    return (
        <Modal size="xl" show={props.show} backdrop="static" keyboard={false} onHide={props.handlerCloseModal} >
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <PersonPlusFill />
                        New Customer
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <h5 className="mb-3">Customer Information</h5>
                        <Row className="mb-3">
                            <FormInputTextField
                                mdCol="4"
                                type="text"
                                label="* First Name"
                                name="firstName"
                                placeHolder="Enter your First Name"
                                register={register("firstName", {
                                    required: "First Name field is required.",
                                })}
                                error={errors.firstName}
                            />
                            <FormInputTextField
                                mdCol="4"
                                type="text"
                                label="Middle Name"
                                name="middleName"
                                placeHolder="Enter your Middle Name"
                            />
                            <FormInputTextField
                                mdCol="4"
                                type="text"
                                label="* Last Name"
                                name="lastName"
                                placeHolder="Enter your Last Name"
                                register={register("lastName", {
                                    required: "Last Name field is required.",
                                })}
                                error={errors.firstName}
                            />
                            <FormDrownDownField 
                                mdCol="4"
                                label="* Gender"
                                name="gender"
                                register={register("gender", {
                                    required: "Please select your gender.",
                                })}
                                error={errors.gender}
                                options={[ 
                                    {value: "", label: "Select Gender"},
                                    {value: "Male", label: "Male"},
                                    {value: "Female", label: "Female"}
                                ]}
                            />
                        </Row>
                        <h5 className="mb-3">Contact Information</h5>
                        <Row className="mb-3">
                            <FormInputTextField
                                mdCol="6"
                                type="text"
                                label="* Contact Number"
                                name="contactNo"
                                placeHolder="Enter your Contact Number"
                                register={register("contactNo", {
                                    required: "Contact Number field is required.",
                                })}
                                error={errors.contactNo}
                            />
                            <FormInputTextField
                                    mdCol="6"
                                    type="email"
                                    label="* Email Address"
                                    name="email"
                                    placeHolder="Enter your Email Address"
                                    register={register("email", {
                                        required: "Email field is required.",
                                        pattern: {
                                        value: /^\S+@\S+$/i,
                                        message: "Email Address is not valid.",
                                        },
                                    })}
                                    error={errors.email}
                                />
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" size="sm" onClick={props.handlerCloseModal}>
                        Close
                    </Button>
                    <Button type="submit" variant="primary" size="sm">
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default CustomerInfo