import React, { useEffect, useState } from "react"
import { Button, Container, Form, Modal, Row } from "react-bootstrap";
import { PersonPlusFill } from "react-bootstrap-icons";
import { useFieldArray, useForm } from "react-hook-form";

//Components
import { FormDrownDownField, FormInputTextField } from "../../components/FormField/FormField";

const CustomerInfo = (props) => {
    const { register, handleSubmit, formState: { errors }, control, reset, clearErrors } = useForm({  defaultValues: props.data });
    const { fields, append, remove } = useFieldArray({ control, name: "carList" });

    useEffect(() => {
        reset(props.data);
    }, [props.data, reset]);

    const onSubmit = (data) => {
        console.log(data);
    };
    const onCloseModal = () => {
        clearErrors();
        props.handleCloseModal();
    };
    
    return (
        <Modal size="lg" show={props.show} backdrop="static" keyboard={false} onHide={onCloseModal} >
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
                                register={register("middleName")}
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
                                error={errors.lastName}
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
                                    {value: "MALE", label: "MALE"},
                                    {value: "FEMALE", label: "FEMALE"}
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
                                        required: "Email Address field is required.",
                                        pattern: {
                                        value: /^\S+@\S+$/i,
                                        message: "Email Address is not valid.",
                                        },
                                    })}
                                    error={errors.email}
                                />
                        </Row>

                        <h5 className="mb-3">Cars Information</h5>
                        <Row>
                            {fields.map((field, index) => (
                                    <div key={field.id}>
                                    <FormInputTextField
                                        mdCol="6"
                                        type="text"
                                        label="* zxc"
                                        name={`carList[${index}].name`}
                                        placeHolder="Enter your zxc"
                                        register={register(`carList[${index}].name`, {
                                            required: "zxc field is required.",
                                        })}
                                        error={errors.carList?.[index]?.name}
                                    />
                                    <button type="button" onClick={() => remove(index)}>
                                        Remove
                                    </button>
                                    </div>
                                ))}
                                <button type="button" onClick={() => append({ name: "" })}>
                                    Add Item
                                </button>
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" size="sm" onClick={onCloseModal}>
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