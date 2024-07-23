import React, { useState } from 'react'
import { registration } from '../utils/ApiFunctions'
import { Link } from '../../../node_modules/react-router-dom/dist/index'

const Registration = () => {
  const [registrationData, setRegistrationData] = useState({
    name: "",
    email: "",
    password: "",
  })

  const [errorMessage, setErrorMessage] = useState("")
  const [successMessage, setSuccessMessage] = useState("")

  const handleInputChange = (e) => {
    setRegistrationData({...registrationData, [e.target.name]: e.target.value})
  }

  const handleRegistration = async(e) => {
    e.preventDefault()
    try {
      const result = await registration(registrationData)
      setSuccessMessage(result)
      setErrorMessage("")
      setRegistrationData({name: "", email: "", password: ""})
    } catch (error) {
      setSuccessMessage("")
      setErrorMessage(`Registration error: ${error.message}`)
    }
    setTimeout(() => {
      setErrorMessage("")
      setSuccessMessage("")
    }, 5000)
  }

  return (
    <section className='container col-6 mt-5 mb-5'>
      {errorMessage && <p className='alert alert-danger'>{errorMessage}</p>}
      {successMessage && <p className='alert alert-success'>{successMessage}</p>}
      <h2>Register</h2>
      <form onSubmit={handleRegistration}>
        <div className='row mb-3'>
          <label htmlFor="name" className='col-sm-2 col-form-label'>Name</label>
          <div>
            <input 
              id='name'
              name='name'
              type="text"
              className='form-control' 
              value={registrationData.name}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className='row mb-3'>
          <label htmlFor="email" className='col-sm-2 col-form-label'>Email</label>
          <div>
            <input 
              id='email'
              name='email'
              type="email"
              className='form-control' 
              value={registrationData.email}
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
              value={registrationData.password}
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
            Register
          </button>
          <span style={{marginLeft: "10px"}}>
            Already have an account?<Link to={"/login"}>Login</Link>
          </span>
        </div>
      </form>
    </section>
  )
}

export default Registration