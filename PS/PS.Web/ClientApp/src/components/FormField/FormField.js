import React from "react"
import { Col, Form } from "react-bootstrap"

import '../FormField/FormField.css'

export const FormInputTextField = (props) => {
    return (
        <Form.Group className="mb-3" as={Col} md={props.mdCol} controlId={props.name}>
            <Form.Label>{props.label}</Form.Label>
            <Form.Control className="ps-field"
                type={props.type}
                name={props.name}
                placeholder={props.placeHolder}
                
                //For Form Validation
                {...props.register}
                isInvalid={props.error}
            />
            {props.error && (
                <span className="ps-field-error">
                    {props.error.message}
                </span>
            )}
        </Form.Group>
    )
}

export const FormDrownDownField = (props) => {
    return (
        <Form.Group className="mb-3" as={Col} md={props.mdCol} controlId={props.name}>
            <Form.Label>{props.label}</Form.Label>
            <Form.Control
                as="select"
                name={props.name}

                //For Form Validation
                {...props.register}
                isInvalid={props.error}>
                
                {props.options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
                ))}
            </Form.Control>
            {props.error && (
                <span className="ps-field-error">
                    {props.error.message}
                </span>
            )}
        </Form.Group>
    );
}
