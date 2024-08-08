import { useState, useContext } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import AuthContext from '../context/authContext'

const useCartAdd = () => {
	let [loading, setLoading] = useState(false);
	let [error, setError] = useState(null)
	let [success, setSuccess] = useState(null)
	let { user, authTokens } = useContext(AuthContext)
    const navigate = useNavigate()
	

	let addToCart = async (productId, quantity = 1) => {
		
		if (authTokens === null) {
			navigate('/api/account/login')
		} else {
			setLoading(true)
			setError(null)
			setSuccess(null)
			try {
				let response = await fetch('https://vertt.pythonanywhere.com/api/cart', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${authTokens.access}`
					},
					body: JSON.stringify({product_id: productId, quantity})
				})
				if (response.ok) {
					setSuccess('Product added to Cart')
				} else {
					const errorData = await response.json()
					setError(errorData.error || 'Failed to add product')
				}
			} catch (error) {
				console.log('Error: ', error)
				setError('Network error')
			} finally {
				setLoading(false)
			}
		}
		
	}
	
	return { addToCart, loading, error, success }
	
}

export default useCartAdd;
