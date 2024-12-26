import React, { useEffect, useState } from 'react'
import { bookRoom, getRoomById } from '../utils/ApiFunctions'
import { useParams } from "react-router-dom";
import  moment  from "moment";
import {  useNavigate } from '../../../node_modules/react-router-dom/dist/index';
import BookingSummary from './BookingSummary';
import Form from '../../../node_modules/react-bootstrap/esm/Form';

const BookingForm = () => {
  const [isValidated, setIsValidated] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [roomPrice, setRoomPrice] = useState(0)
  const {roomId} = useParams()
  const navigate = useNavigate()
  const [booking, setBooking] = useState({
    guestFullName: "",
    guestEmail: "",
    checkInDate: "",
    checkOutDate: "",
    numOfAdults: "",
    numOfChildren: ""
  })


  const handleInputChange = (e) => {
    const {name, value} = e.target
    setBooking({...booking, [name]: value})
    setErrorMessage("")
  }

  const getRoomPriceById = async (roomId) => {
    try {
      const response = await getRoomById(roomId)
      setRoomPrice(response.roomPrice)
    } catch (error) {
      throw new Error(error)
    }
  }

  useEffect(() => {
    getRoomPriceById(roomId)
  }, [roomId]) 

  const calculatePayment = () => {
    const checkInDate = moment(booking.checkInDate)
    const checkOutDate = moment(booking.checkOutDate)
    const diffInDays = checkOutDate.diff(checkInDate, "days")
    const pricePerDay = roomPrice ? roomPrice : 0
    return diffInDays * pricePerDay
  }
  
  const isGuestCountValid = () => {
    const adultCount = parseInt(booking.numOfAdults)
    const childrenCount = parseInt(booking.numOfChildren)
    const totalCount = adultCount + childrenCount
    return totalCount >= 1 && adultCount >= 1
  }

  const isCheckOutDateValid = () => {
    if (!moment(booking.checkOutDate).isSameOrAfter(moment(booking.checkInDate))) {
      setErrorMessage("Check-out date must be after check-in date")
      return false
    } else {
      setErrorMessage("")
      return true
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.currentTarget
    if (form.checkValidity() === false || !isGuestCountValid() || !isCheckOutDateValid()) {
      e.stopPropagation()
    } else {
      setIsSubmitted(true)
    }
    setIsValidated(true)
  }

  const handleBooking = async () => {
    try {
      const confirmationCode = await bookRoom(roomId, booking)
      console.log(booking)
      setIsSubmitted(true)
      navigate("/booking-success", { state: {message: confirmationCode} })
    } catch (error) {
      setErrorMessage(error.message)
      console.log(error.message);
      console.log(errorMessage);
      navigate("/booking-success", { state: { error: error.message } })
    }
  }
 
  return (
    <>
    <div className='container mb-5'>
      <div className='row'>
        <div className='col-md-6'>
          <div className='card card-body mt-5'>
            <h4 className='card-title'>Reserve Room</h4>
            <Form noValidate validated={isValidated} onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label htmlFor='guestFullName' className='hotel-color'>Full Name : </Form.Label>
                <Form.Control 
                  required 
                  type='text' 
                  id='guestFullName' 
                  name='guestFullName' 
                  value={booking.guestFullName}
                  placeholder='Enter your full name'    
                  onChange={handleInputChange}
                />
                <Form.Control.Feedback type='invalid'>Please enter your full name</Form.Control.Feedback>
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor='guestEmail' className='hotel-color'>Email Address : </Form.Label>
                <Form.Control 
                  required 
                  type='email' 
                  id='guestEmail' 
                  name='guestEmail' 
                  value={booking.guestEmail}
                  placeholder='Enter your email'    
                  onChange={handleInputChange}
                />
                <Form.Control.Feedback type='invalid'>Please enter your email address</Form.Control.Feedback>
              </Form.Group>
              <fieldset style={{border: "2px"}}>
                <legend>Lodging period</legend>
                <div className='row'>
                  <div className='col-6'>
                    <Form.Label htmlFor='checkInDate' className='hotel-color'>Check-In date : </Form.Label>
                    <Form.Control 
                      required type='date' 
                      id='checkInDate' 
                      name='checkInDate' 
                      value={booking.checkInDate}
                      placeholder='Check-in date'    
                      onChange={handleInputChange}
                    />
                    <Form.Control.Feedback type='invalid'>Please select check-in date</Form.Control.Feedback>
                  </div>
                  <div className='col-6'>
                    <Form.Label htmlFor='checkOutDate' className='hotel-color'>Check-Out date : </Form.Label>
                    <Form.Control 
                      required type='date' 
                      id='checkOutDate' 
                      name='checkOutDate' 
                      value={booking.checkOutDate}
                      placeholder='Check-out date'    
                      onChange={handleInputChange}
                    />
                    <Form.Control.Feedback type='invalid'>Please select check-out date</Form.Control.Feedback>
                  </div>
                  {errorMessage && <p className='error-message text-danger'>{errorMessage}</p>}
                </div>
              </fieldset>
              <fieldset style={{border: "2px"}}>
                <legend>Number of Guests</legend>
                <div className='row'>
                  <div className='col-6'>
                    <Form.Label htmlFor='numOfAdults' className='hotel-color'>Adults : </Form.Label>
                    <Form.Control 
                      required type='number' 
                      id='numOfAdults' 
                      name='numOfAdults' 
                      value={booking.numOfAdults}
                      min={1}
                      placeholder='0'  
                      onChange={handleInputChange}
                    />
                    <Form.Control.Feedback type='invalid'>Please enter at least 1 adult</Form.Control.Feedback>
                  </div>
                  <div className='col-6'>
                    <Form.Label htmlFor='numOfChildren' className='hotel-color'>Children : </Form.Label>
                    <Form.Control 
                      required type='number' 
                      id='numOfChildren' 
                      name='numOfChildren' 
                      value={booking.numOfChildren}
                      placeholder='0'    
                      min={0}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </fieldset>
              <div className='form-group mt-2 mb-2'>
                <button type='submit' className='btn btn-hotel'>Continue</button>
              </div>
            </Form>
          </div>
        </div> 
        <div className='col-md-6'>
          {isSubmitted && (
            <BookingSummary 
              booking={booking} 
              payment={calculatePayment()} 
              isFormValid={isValidated} 
              onConfirm={handleBooking}
            />
          )}
        </div>
      </div>
    </div>
    </>
  )


}

export default BookingForm