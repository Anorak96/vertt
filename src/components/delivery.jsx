import React, { useState } from 'react'
import { FloatingLabel, Form } from 'react-bootstrap'

const delivery = ({ locations }) => {

    return (
        <>
            <FloatingLabel className='mb-1'>
                <Form.Select className='pt-0'>
                    <option >Lagos</option>
                    <option >Oyo</option>
                    <option >Ondo</option>

                </Form.Select>
            </FloatingLabel>
            <FloatingLabel className='mt-1'>
                <Form.Select className='pt-0' >
                    <option >Apapa</option>
                    <option >Ikorodu</option>
                    <option >Badagry</option>
                    <option >Ojoo</option>
                    <option >Idi-Ape</option>
                    <option >Iwo Road</option>
                    <option >Akure South</option>
                    <option >Akure North</option>
                    <option >Ondo Town</option>
                </Form.Select>
            </FloatingLabel>

        </>
    )
}

export default delivery