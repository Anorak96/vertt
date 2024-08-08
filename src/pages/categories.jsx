import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Container, Card } from 'react-bootstrap'

const categories = () => {
    let [categories, setCategories] = useState([])

    useEffect(() => {
        getCategories()
    }, [])

    let getCategories= async () => {
        try {
            let response = await fetch('/api/category')
            if (!response.ok) {
                if (response.status === 500 ) {
                    alert('Network Error!')
                } else if (response.status === 404) {
                    console.log('404 Error: ', 'Resourse not Found.');
                }
                throw new Error('Response not ok', response);
            }
            let data = await response.json()
            console.log('Categories :', data);
            setCategories(data)
        } catch (error) {
            console.log('Error: ', error)
        }
    }

    return (
        <Container fluid>
            <div style={{ 'display': 'grid', 'gridTemplateColumns': 'repeat(5,1fr)', 'gap': '10px' }}>
                {categories.map((category, index) => {
                    return (
                        <Link to={`api/category/${category.id}`}>
                            <Card className='hover'>
                                <Card.Img style={{'height': '200px','objectFit':'contain'}} src={`http://localhost:8000${category.image}`} variant='top' alt="" />
                                <Card.Body style={{'padding': '5px'}}>
                                    <Card.Title className='home-category' style={{'display':'flex','justifyContent':'center'}}>{category.category}</Card.Title>
                                </Card.Body>
                            </Card>
                        </Link>
                    )
                })}

            </div>
        </Container>
    )
}

export default categories