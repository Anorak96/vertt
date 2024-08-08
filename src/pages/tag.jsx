import React, { useState,useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import ProductList from '../components/productsList'

const tag = () => {
    const { id } = useParams()
    let [tags, setTag] = useState([])
    let [products, setProduct] = useState([])

    useEffect(() => {
        getTag()
    }, [id])

    let getTag = async () => {
        try {
            let response = await fetch(`/api/tag/${id}`)
            if (!response.ok) {
                if (response.status === 500 ) {
                    alert('Network Error!')
                } else if (response.status === 404) {
                    console.log('404 Error: ', 'Resourse not Found.');
                }
                throw new Error('Response not ok', response);
            }
            let data = await response.json()
            console.log('Tag :', data);
            console.log('Product: ', data.products)
            setTag(data)
            setProduct(data.products)
        } catch (error) {
            console.log('Error: ', error)
        }
	}

    return (
        <Container fluid>
            <img className='tag-image' src={`http://127.0.0.1:8000${tags.image}`} alt="" />
            <div style={{ 'display': 'flex', 'justifyContent': 'center', 'position': 'relative', 'top': '-60px' }}>
                <h3 style={{'backgroundColor':'white'}}>{tags.tag}</h3>
            </div>
            <div style={{ 'display': 'grid', 'gridTemplateColumns': 'repeat(5, 1fr)', 'gap': '5px' }}>
                {products.map((product, index) => {
                    return (<ProductList product={product} key={index} />)
                })}
            </div>
        </Container>
    )
}

export default tag
