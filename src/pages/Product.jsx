import React, { useState,useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ProductDet from '../components/productDetail'

const Product = () => {
    const { id } = useParams();
    let [product, setProduct] = useState(null);
    let [suggested, setSuggested] = useState([]);
    let [delivery, setDelivery] = useState([])
    
    useEffect(() => {
        getProduct()
    }, [id]);

    let getProduct = async () => {
        try {
            let response = await fetch(`https://vertt.pythonanywhere.com/api/product/${id}`)
            if (!response.ok) {
                if (response.status === 500) {
                    alert('Network Error!')
                } else if (response.status === 404) {
                    console.log('404 Error: ', 'Resourse not Found.');
                }
                throw new Error('Response not ok', response);
            }
            let data = await response.json()
            console.log('Product :', data.product);
            console.log('Suggested :', data.suggested);
            console.log('Delivery Location: ', data.delivery)
            setProduct(data.product)
            setSuggested(data.suggested)
            setDelivery(data.delivery)
        } catch (error) {
            console.log('Error: ', error)
        }
    };
    if (!product) return <div className='loading'>loading...</div>;
    return (
        <>
            <div>
                <ProductDet product={product} suggested={suggested} delivery={delivery} />
            </div>
        </>
    )
}

export default Product
