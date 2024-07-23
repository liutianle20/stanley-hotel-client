import React, { useState } from 'react'
import { createContext } from 'react'
import jwt_decode from 'jwt-decode';
import { Children } from 'react';

export const AuthContext = createContext({
  user: null,
  handleLogin: (token) => {},
  handleLogout: () => {}
})

const AuthProvider = ({children}) => {

  const [user, setUser] = useState(null) 

  const handleLogin = (token) => {
    const decodeToken = jwt_decode(token)
    localStorage.setItem("userId", decodeToken.sub)
    localStorage.setItem("userRole", decodeToken.roles)
    localStorage.setItem("token", token)
    setUser(decodeToken)
  }

  const handleLogout = () => {
    localStorage.removeItem("userId")
    localStorage.removeItem("userRole")
    localStorage.removeItem("token")
    setUser(null)
  }

  
  return (
    <AuthContext.Provider value={{user, handleLogin, handleLogout}}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider