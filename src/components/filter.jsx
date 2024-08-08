import React from 'react'
import { Form, Row, Col } from 'react-bootstrap'

const filter = () => {
    return (
        <>
            <Row>
                <Col>
                    <h4>Filter By Price</h4>
                </Col>
                <Col></Col>
                <Col></Col>

            </Row>
            <Form.Range />
        </>
    )
}

export default filter