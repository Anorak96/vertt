import React, { useState, useEffect, useContext } from 'react'
import { Container, Table, Row, Col, Button, Card, ListGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import CartItem from '../components/cartList'
import AuthContext from '../context/authContext';

const cart = () => {
    let [cart, setCart] = useState(null);
    let [products, setProduct] = useState([])
    let {user, authTokens} = useContext(AuthContext)
    
    useEffect(() => {
        if (authTokens) {
          getCart()  
        }
    }, [])

    let getCart = async () => {
        try {
            let response = await fetch('/api/cart', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${authTokens.access}`
                }
            })
            if (!response.ok) {
                if (response.status === 500 ) {
                    alert('Network Error!')
                } else if (response.status === 404) {
                    console.log('404 Error: ', 'Resourse not Found.');
                }
                throw new Error('Response not ok', response);
            }
            let data = await response.json()
            console.log('Cart :', data);
            console.log('Products :', data.products);
            setCart(data)
            setProduct(data.products)
        } catch (error) {
            console.log('Error: ', error)
        }
    }
    
    if (!cart) {
        return <div>failed to load data</div>
    }

    return (
        <Container fluid>
            <Row>
                <Col sm={8}>
                    <Table striped="columns">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Product</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product, index) => {
                                return (<CartItem product={product} key={index} />)
                            })}
                        </tbody>
                    </Table>
                </Col>
                <Col sm={4}>
                    <div>
                        <Card>
                            <ListGroup variant="flush">
                                <ListGroup.Item className='gray px-4 bold pe-3'>Order Summary</ListGroup.Item>
                                <ListGroup.Item className='gray p-4'>
                                    <div className='cart-total'><div>SubTotal</div> <div>{cart.total}</div></div>
                                    <div className='cart-total'><div>Shipping</div> <div>Free</div></div>

                                </ListGroup.Item>
                                <ListGroup.Item className='gray p-4 bold cart-total'>
                                    <div>Total</div> <div>{cart.total}</div>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card>
                        <div className="d-grid gap-2">
                            <Link to='/api/checkout'>
                                <Button variant="success" className='cart-checkout py-2 bold'>CHECKOUT</Button>
                            </Link>
                        </div>
                    </div>
                </Col>
            </Row>
            
        </Container>
    )
}

export default cart
