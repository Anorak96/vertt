import React, { useState, useEffect, useContext} from 'react'
import AuthContext from '../context/authContext'
import { Container } from 'react-bootstrap'
import Skeleton from 'react-loading-skeleton'
import Buyer from '../components/buyer'
import Seller from '../components/seller'

const profile = () => {
    let { authTokens } = useContext(AuthContext)
    let [account, setAccount] = useState([])
    let [user, setUser] = useState([])

    useEffect(() => {
        if (authTokens) {
          getAccount()  
        }
    }, [])
    
    let getAccount = async () => {
        try {
            let response = await fetch('https://vertt.pythonanywhere.com/api/account', {
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
            console.log('Account :', data);
            setAccount(data.serializer)
            setUser(data.serializer.user)
        } catch (error) {
            console.log('Error: ', error)
        }
    }
    
    return (
        <Container fluid>
            {account.seller_info ? (
                <Seller acccount={account} user={user} />
            ) : (
                <Buyer acccount={account} user={user} />
            )}
        </Container>
    )
}

export default profile
