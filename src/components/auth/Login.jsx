import React from 'react'
import { useState } from 'react'
import { login } from '../utils/ApiFunctions';
import { Link, useNavigate } from '../../../node_modules/react-router-dom/dist/index';
import { useContext } from 'react';
import { AuthContext } from './AuthProvider';

const Login = () => {
  const [errorMessage, setErrorMessage] = useState("")
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  })

  const navigate = useNavigate()

  const {handleLogin} = useContext(AuthContext)

  const handleInputChange = (e) => {
    setLoginData({...loginData, [e.target.name]: e.target.value})
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    const success = await login(loginData)
    if (success) {
      const token = success.token
      handleLogin(token)
      navigate("/")
      // window.location.reload()
    } else {
      setErrorMessage("Invalid username or password. Please try again")
    }
    setTimeout(() => {
      setErrorMessage("")
    }, 4000)
  }

  return (
    <section className='container col-6 mt-5 mb-5'>
      {errorMessage && <p className='alert alert-danger'>{errorMessage}</p>}
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className='row mb-3'>
          <label htmlFor="email" className='col-sm-2 col-form-label'>Email</label>
          <div>
            <input
              id='email'
              name='email' 
              type="email"
              className='form-control'
              value={loginData.email}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className='row mb-3'>
          <label htmlFor="password" className='col-sm-2 col-form-label'>Password</label>
          <div>
            <input
              id='password'
              name='password' 
              type="password"
              className='form-control'
              value={loginData.password}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className='mb-3'>
          <button 
            type='submit' 
            className='btn btn-hotel'
            style={{marginRight: "10px"}}
          >
            Login
          </button>
          <span style={{marginLeft: "10px"}}>
            Don't have an account yet?<Link to={"/register"}>Register</Link>
          </span>
        </div>
      </form>
    </section>
  )
}

export default Login