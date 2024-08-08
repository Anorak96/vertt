import React from 'react'
import { Link } from 'react-router-dom'
import { Card, ListGroup, Button } from 'react-bootstrap'
import { FaRegStar, FaStar, FaStarHalf, FaCartShopping } from "react-icons/fa6";
import useCartAdd from '../hooks/useAdd'

const productsList = ({ product }) => {
    const { addToCart, loading, error, success } = useCartAdd()

    let handleAddToCart = () => {
        addToCart(product.id, 1)
    }
    return (
        
        <Card className='productlist-card hover'>
            <Link to={`/api/product/${product.id}`}>
                {product.images.length > 0 &&
                    <Card.Img className='home-product-img' src={`https://vertt.pythonanywhere.com${product.images[0].image}`} variant='top' alt={product.images[0].image} />
                }
            </Link>
            <Card.Body style={{'padding': '5px'}}>
                <Card.Title className='home-product-name'>{product?.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                    {(product?.new_price !== '0.00') ?
                        <div className='home-product-action mb-2 text-muted' style={{'alignItems':'baseline'}}>
                            <h6>{product?.formatted_new_price}</h6>
                            <h5 style={{'textDecoration':'line-through'}}>{product?.formatted_price}</h5>
                        </div> :
                        <div className='home-product-action mb-2 text-muted' style={{'alignItems':'baseline'}}>
                            <h5>{product?.formatted_price}</h5>
                        </div>
                    }
                </Card.Subtitle>
                <ListGroup variant="flush">
                    <ListGroup.Item className='home-product-action'>
                        <div>
                            <FaStar/><FaStar/><FaStar/><FaStarHalf/><FaRegStar/>
                        </div>
                        <Button onClick={handleAddToCart} disabled={loading}>{loading ? 'Adding ...' : <FaCartShopping />}</Button>
                    </ListGroup.Item>
                </ListGroup>
            </Card.Body>
        </Card>
       
    )
}

export default productsList
