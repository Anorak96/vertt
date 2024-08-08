import React, {useContext, useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import Skeleton from 'react-loading-skeleton'
import { Row, Col, Button } from 'react-bootstrap'
import { FaGear } from "react-icons/fa6";
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'
import AuthContext from '../context/authContext';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const seller = ({ user}) => {
    let { authTokens } = useContext(AuthContext)
    let [shop, setShop] = useState([])
    let [products, setProduct] = useState([])
    let [productView, setproductView] = useState([])

    useEffect(() => {
        if (authTokens) {
          getSeller()  
        }
    }, [])
    
    let getSeller = async () => {
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
            // console.log('Seller :', data.product_view);
            setShop(data.serializer.shop)
            setProduct(data.serializer.shop.products)
            setproductView(data.product_view)
        } catch (error) {
            console.log('Error: ', error)
        }
    }

    const { month, view } = productView
    console.log('views:', productView);
    const data = {
        labels: month,
        datasets: [{
            label: 'Product Views',
            data: ['9','0'],
            borderColor: 'yellow',
            backgroundColor: 'green'
        }]
    };

    return (
        <>
            <Row>
                <Col md={1}>
                
                </Col>
                <Col md={11}>
                    <div className='flex-space-between border-bttom'>
                        <h3>DashBoard</h3>
                        <Button><FaGear /></Button>
                    </div>
                    
                    <Row className='mt-2'>
                        <Col md={2}>
                            <img className='profile-img' src={`http://127.0.0.1:8000${user.profile_pic}`} alt="" />
                            <h3 className='flex-center'>{user.first_name} {user.last_name}</h3>
                        </Col>
                        <Col md={9}>
                            <Row>
                                <Col md={4} >
                                    <h5>Shop Details</h5>
                                    <div style={{'display':'block'}}>
                                        <div>Shop Name: {shop.name}</div>
                                        <div>Address: {shop.location}</div>
                                    </div>
                                </Col>
                                <Col md={6}>
                                    <h5>Products</h5>
                                    {products.map((product, index) => {
                                        return (<ul>
                                            <Link to={`/api/product/${product.id}`}>
                                            {product.images.length > 0 &&
                                                <img className="profile-product-img" src={`http://127.0.0.1:8000${product.images[0].image}`} alt="" key={index} />
                                                }&nbsp;{product.name}</Link>
                                        </ul>)
                                    })}
                                </Col>
                            </Row>
                        </Col>
                        <div>
                            <h3 className='border-bttom'>Shop Analysis</h3>
                            <Line data={data}/>
                        </div>
                    </Row>
                </Col>
            </Row>
            
        </>
    )
}

export default seller