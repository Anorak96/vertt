import React, { useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { FaTrashCan } from "react-icons/fa6";
import { Button } from 'react-bootstrap'
import AuthContext from '../context/authContext';

const cartList = ({ product }) => {
    const navigate = useNavigate()
    let {user, authTokens} = useContext(AuthContext)
    
    let removeProduct = async () => {
        let response = await fetch(`https://vertt.pythonanywhere.com/api/cart/${product.product.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authTokens.access}`
            },
        })
        if (!response.ok) {
            throw new Error('Response not ok', response);
        }
        console.log('Remove product: ', product.product.id);
        navigate('/api/cart')
    }

    return (
        <>
            <tr>
                <td className='flex-center'>
                    <Link to={`/api/product/${product.product.id}`}>
                        {product.product.images.length > 0 &&
                            <img className='cart-product-img' alt={product.product.name}
                                src={`https://vertt.pythonanywhere.com${product.product.images[0].image}`}  />
                        }
                    </Link>
                </td>
                <td><Link to={`/api/product/${product.product.id}`}>{product.product.name}</Link></td>
                <td>{product.product.formatted_price}</td>
                <td style={{ 'display': 'flex' }}>
                    <Button className='cart-quantity mr-5'>-</Button>
                        {product.quantity}
                    <Button className='cart-quantity ml-5'>+</Button>
                </td>
                <td>₦{parseFloat(product.product.price) * parseInt(product.quantity, 10)}</td>
                <td><Button onClick={() => removeProduct(product.product.id, navigate)}><FaTrashCan /></Button></td>
            </tr>
        </>
    )
}

export default cartList
