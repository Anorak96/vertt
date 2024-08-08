import React, { createContext, useState, useEffect } from 'react'
import { jwtDecode } from 'jwt-decode'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext()

export default AuthContext;

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate()
    let [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    let [user, setUser] = useState(() => localStorage.getItem('authTokens') ? jwtDecode(localStorage.getItem('authTokens')) : null)
    let [loading, setLoading] = useState(true)
    let [uuser, setUuser] = useState(null)
	let [validated, setValidated] = useState(false);

    let getUser = async () => {
        try {
            let response = fetch('https://vertt.pythonanywhere.com/api/account', {
                headers: {
                    'Content-Type':'application/json',
                    'Authorization': `Bearer ${authTokens.access}`
                }
            })
            if (response.ok) {
                let data = await response.json()
                console.log('User Data: ', data)
                setUuser(data)
            } else {
                setUuser(null)
            }
        } catch (error) {
            console.log('Error: ', error)
            setUuser(null)
        } finally {
            setLoading(false)
        }
    }
	
    let loginUser = async (e) => {
        e.preventDefault()
        let response = await fetch('https://vertt.pythonanywhere.com/api/account/token/', {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                'email': e.target.email.value,
                'password': e.target.password.value
            })
        })
		let data = await response.json()
		localStorage.setItem('authTokens', JSON.stringify(data))
        console.log('User Token Data: ', jwtDecode(data.access))
		if (response.status === 200) {
            setAuthTokens(data)
            setUser(jwtDecode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
            await getUser()
            navigate('/')
        } else {
            alert('Something went wrong!')
        }
    }
    
    let logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        setUuser(null)
        localStorage.removeItem('authTokens')
        navigate('/api/account/login')
    }

    let updateToken = async () => {
        console.log('update token called!');
        let response = await fetch('https://vertt.pythonanywhere.com/api/account/token/refresh/', {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({'refresh': authTokens?.refresh})
        })
        let data = await response.json()
        if (response.status === 200) {
            setAuthTokens(data)
            setUser(jwtDecode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
        } else {
            logoutUser()
        }
        if (loading) {
            setLoading(false)
        }
    }

	let contextData = {
        user: user,
        authTokens: authTokens,
        loginUser: loginUser,
        logoutUser: logoutUser,
        uuser:uuser
	}
	
    useEffect(() => { 
        if (authTokens) {
            getUser()
        }
        if (loading) {
            updateToken()
        }
        let fourminute = 1000 * 60 * 60
        let interval = setInterval(() => {
            if (authTokens) {
                updateToken()
            }    
        }, fourminute)
        return () => clearInterval(interval)
    }, [authTokens, loading])
    
    return (
        <AuthContext.Provider value={contextData} >
            {children}
        </AuthContext.Provider>
    )
}
