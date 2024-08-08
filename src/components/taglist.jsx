import React from 'react'
import { Link } from 'react-router-dom'
import { Card, ListGroup } from 'react-bootstrap'

const taglist = ({tag}) => {
    return (
        <>
            <Link to={`/api/tag/${tag.id}`}>
                <Card className='productlist-card hover'>
                    <Card.Img className='home-product-img' src={`http://127.0.0.1:8000${tag.image}`} variant='top' alt={tag.image} />
                    <Card.Body style={{'padding': '5px'}}>
                        <Card.Title className='home-tag'>{tag?.tag}</Card.Title>
                        <ListGroup variant="flush">
                            <ListGroup.Item className='home-product-action'>
                                <h6>Shop now</h6>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card.Body>
                </Card>
            </Link>
        </>
    )
}

export default taglist
