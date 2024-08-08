import React from 'react'
import { Card } from 'react-bootstrap'

const shopsList = ({shop}) => {
    return (
        <>
            <Card className='productlist-card'>
                <Card.Img className='home-product-img' src={`http://127.0.0.1:8000${shop.image}`} variant='top' alt={shop.name} />
                <Card.Body style={{'padding': '5px'}}>
                    <Card.Title>{shop?.name}</Card.Title>
                </Card.Body>
            </Card>
        </>
    )
}

export default shopsList
