import React, { useState, useEffect, useContext} from 'react'
import { Row, Col, Button } from 'react-bootstrap'
import { FaGear, FaPenToSquare, FaWallet } from 'react-icons/fa6'
import Card from '../assets/card2.jpg'
import ProductList from './productsList'
import Skeleton from 'react-loading-skeleton'
import AuthContext from '../context/authContext'

const buyer = ({ user }) => {
    let { authTokens } = useContext(AuthContext)
    let [shipping, setShipping] = useState([])
    let [wishlist, setWishlist] = useState([])

    useEffect(() => {
        if (authTokens) {
          getBuyer()  
        }
    }, [])
    
    let getBuyer = async () => {
        try {
            let response = await fetch('/api/account', {
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
            setShipping(data.serializer.shipping)
            setWishlist(data.wishlist.products)
        } catch (error) {
            console.log('Error: ', error)
        }
    }

    return (
        <>
            <Row>
                <Col md={2}>
                </Col>
                
                <Col md={10}>
                    <div className='flex-space-between border-bttom'>
                        <h3>Account</h3>
                        <Button><FaGear /></Button>
                    </div>
                    <Row className='mt-3 px-4'>
                        <Col md={3} className='shadow p-3'>
                            <img className='profile-img' src={`http://127.0.0.1:8000${user.profile_pic}`} alt="" />
                            <h3 className='flex-center'>{user.first_name} {user.last_name}</h3>
                            <span className='flex-center profile-balance'><FaWallet />&nbsp;&nbsp;{user.balance }</span>
                        </Col>
                        
                        <Col md={4}>
                            <div className='shadow block p-3 mb-3'>
                                <div className='flex-space-between mb-2'>
                                    <span className='bold f-s-13'>Account Details</span> <FaPenToSquare />
                                </div>
                                <div className='flex-space-between align-center'>
                                    <span className='font-100 f-s-13'>First Name</span> <span>{user.first_name}</span>
                                </div>
                                <div className='flex-space-between align-center'>
                                    <span className='font-100 f-s-13'>Last Name</span> <span>{user.last_name}</span>
                                </div>
                                <div className='flex-space-between align-center'>
                                    <span className='font-100 f-s-13 block-ruby'>Date of Birth</span> <span className='block-ruby'>10 Nov 1997</span>
                                </div>
                            </div>
                            <div className='shadow block p-3 mt-3'>
                                <div className='flex-space-between'>
                                    <span className='bold f-s-13'>Shipping Detail</span> <FaPenToSquare />
                                </div>
                                <div className='flex-space-between align-center'>
                                    <span className='font-100 f-s-15'>Address</span> <span>{shipping?.shipping_address}</span>
                                </div>
                                <div className='flex-space-between align-center'>
                                    <span className='font-100 f-s-15'>State</span> <span>{shipping?.shipping_state}</span>
                                </div>
                                <div className='flex-space-between align-center'>
                                    <span className='font-100 f-s-15'>City</span> <span>{shipping?.shipping_city}</span>
                                </div>
                            </div>
                        </Col>
                        
                        <Col md={5} className='shadow p-3'>
                            <div className='flex-space-between mb-2'>
                                <span className='bold f-s-13'>Payment Details</span> <FaPenToSquare />
                            </div>
                            <div className='flex-center'>
                                <img src={Card} alt="" style={{ 'width': '70%' }} />
                            </div>    
                            <div className='mt-3'>
                                <div className='flex-space-between align-center'>
                                    <span className='font-100'>Card Type</span> <span>Visa</span>
                                </div>
                                <div className='flex-space-between align-center'>
                                    <span className='font-100'>Card Holder</span> <span>{user.first_name} {user.last_name}</span>
                                </div>
                                <div className='flex-space-between align-center'>
                                    <span className='font-100'>Expire</span> <span>11/25</span>
                                </div>
                                <div className='flex-space-between align-center'>
                                    <span className='font-100'>Card Number</span> <span>1234 5678 1234 5678</span>
                                </div>
                            </div>
                        </Col>
                    </Row>

                    <div className='mt-4 shadow'>
                        <div className='border-bttom'>
                            <h3>Wishlist</h3>
                        </div>
                        <div style={{ 'display':'grid','gridTemplateColumns':'repeat(4, 1fr)','gap':'5px'}} className='mt-3'>
                            {wishlist.map((item, index) => {
                                return (<ProductList product={item} key={index}/>)
                            })}
                        </div>
                    </div>
                </Col>
            </Row>
        </>
    )
}

export default buyer