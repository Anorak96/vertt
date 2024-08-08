import React, { useContext, useState } from 'react'
import { Form, Button, Container } from 'react-bootstrap'
import AuthContext from '../context/authContext'

const login = () => {
	let { loginUser } = useContext(AuthContext)

	return (
		<Container className='login'>
			<Form onSubmit={loginUser}>
				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Label>Email address</Form.Label>
					<Form.Control type="email" placeholder="Enter email" name='email'/>
					<Form.Text className="text-muted">
					</Form.Text>
				</Form.Group>

				<Form.Group className="mb-3" controlId="formBasicPassword">
					<Form.Label>Password</Form.Label>
					<Form.Control type="password" placeholder="Password" name='password'/>
				</Form.Group>

				<Button variant="primary" type="submit">
					Submit
				</Button>
			</Form>
		</Container>
	)
}

export default login