import React from 'react'
import { FloatingLabel, Form, Carousel, Container, Button } from 'react-bootstrap'
import { FaCartShopping, FaStar, FaStarHalf, FaRegStar } from "react-icons/fa6";
import Suggest from './suggestProduct'
import Delivery from './delivery'
import useCartAdd from '../hooks/useAdd'

const productdet = ({ product, suggested, delivery }) => {
    
    const { addToCart, loading, error, success } = useCartAdd()

    let handleAddToCart = () => {
        addToCart(product.id, 1)
    }

    return (
        <Container fluid>
            <Carousel data-bs-theme="dark" >
                {product?.images.map((image, index) => (
                    <Carousel.Item>
                        <img className="d-block product-detail-img" key={index} src={`https://vertt.pythonanywhere.com${image.image}`} alt={product.name} />
                    </Carousel.Item>
                ))}
            </Carousel>
            <div style={{'margin':'10px 40px'}}>
                <div>
                    <div className='flex-space-between'>
                        <h1>{product?.name}</h1>
                        <div>
                            <div><FaStar/><FaStar/><FaStar/><FaStarHalf/><FaRegStar/></div>
                        </div>
                    </div>
                    <div className='flex-space-between'>
                        {(product?.new_price !== '0.00') ?
                            <div className='pl-20'>
                                <h6>{product?.formatted_new_price}</h6>
                                <h5 style={{'textDecoration':'line-through'}}>{product?.formatted_price}</h5>
                            </div> :
                            <h5 className='pl-20'>{product?.formatted_price}</h5>
                        }
                        <Button onClick={handleAddToCart} disabled={loading}>{loading ? 'Adding ...' : <FaCartShopping />}</Button>
                    </div>
                </div>
                <hr />
                <div>
                    <h5 style={{'textDecoration':'underline','color':'#082e42'}}>About The Product</h5>
                    <p className='descrition'>{product?.description}</p>
                </div>
                <div className='product-delivery'>
                    <h5 style={{ 'textDecoration': 'underline', 'color': '#082e42' }}>Delivery</h5>
                    <Delivery />
                </div>
                <hr />
                <div>
                    <h4 style={{ 'textDecoration': 'underline', 'color': '#082e42' }}>Suggested Products</h4>
                    <div style={{ 'display':'grid','gridTemplateColumns':'repeat(4, 1fr)','gap':'5px'}}>
                        {suggested.map((suggest, index) => {
                            return (<Suggest suggest={suggest} />)
                        })}
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default productdet
