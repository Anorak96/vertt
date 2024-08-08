import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Navbar, Nav, Container, Form, Button, Row, Col, Badge } from 'react-bootstrap'
import { FaCartShopping } from "react-icons/fa6";
import User from '../assets/user.png'
import logo from '../assets/vertt1-small.jpg'
import AuthContext from '../context/authContext';

const navbar = () => {
    let { user, logoutUser } = useContext(AuthContext)

    return (
        <>
            <Navbar collapseOnSelect expand="lg" className="mb-2" bg="dark" data-bs-theme="dark" sticky="top">
                <Container>
                    <Link to='/'><Navbar.Brand>
                        <img src={logo} width="60" height="30" className="d-inline-block align-top"/>
                    </Navbar.Brand></Link>  
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className='me-auto'>
                            <Form inline method='GET' action='/api/search?q'>
                                <Row>
                                    <Col xs="auto">
                                        <Form.Control type="text" placeholder="Search" className=" mr-sm-2" name="q" />
                                    </Col>
                                    <Col xs="auto">
                                        <Button type="submit">Submit</Button>
                                    </Col>
                                </Row>
                            </Form>
                        </Nav>
                        <Nav>
                            
                            <Nav.Link>
                                <Button><Link to='/api/cart'><FaCartShopping /><Badge bg="secondary">9</Badge></Link></Button>
                            </Nav.Link>
                            
                            {user ? (<>
                                    <Nav.Link><Button variant='secondary outline-success' className='mx-auto' onClick={logoutUser}>
                                        Logout
                                    </Button></Nav.Link>
                                <Nav.Link><Link to='/api/account'><img src={User} className='navbar-user' /></Link></Nav.Link>
                                {user.id}
                                </>
                            ) : (
                                <Nav.Link>
                                    <Button variant='secondary outline-success' className='mx-auto'>
                                        <Link to='/api/account/login'>Login</Link>
                                    </Button>
                                </Nav.Link>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default navbar