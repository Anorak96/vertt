import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import AuthContext from '../context/authContext';

const PrivateRoute = ({ children }) => {
    console.log('Private route works')
    let { user } = useContext(AuthContext)
    return user ? children : <Navigate to='/api/account/login' />;
}

export default PrivateRoute