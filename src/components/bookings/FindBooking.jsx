import React, { useState } from 'react'
import { cancelBooking, getBookingByConfirmationCode } from '../utils/ApiFunctions'
import moment from "moment"
const FindBooking = () => {

  const [confirmationCode, setConfirmationCode] = useState("")
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isDeleted, setIsDeleted] = useState(false)

  const [bookingInfo, setBookingInfo] = useState({
    bookingId: "",
    room: {},
    bookingConfirmationCode: "",
    roomNumber: "",
    checkInDate: "",
    checkOutDate: "",
    guestFullName: "",
    guestEmail: "",
    numOfAdults: "",
    numOfChildren: "",
    totalNumberOfGuests: ""
  })

  const clearBookingInfo = {
    bookingId: "",
    room: {id: ""},
    bookingConfirmationCode: "",
    roomNumber: "",
    checkInDate: "",
    checkOutDate: "",
    guestFullName: "",
    guestEmail: "",
    numOfAdults: "",
    numOfChildren: "",
    totalNumberOfGuests: ""
  }

  const handleInputChange = (e) => {
    setConfirmationCode(e.target.value)

  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const data = await getBookingByConfirmationCode(confirmationCode)
      setBookingInfo(data)
      setError(null)
      console.log(data);
    } catch (error) {
      setBookingInfo(clearBookingInfo)
      if (error.response && error.response.status === 404) {
        setError(error.response.data.message)
      } else {
        setError(error.message)
      }
    }
    setTimeout(() => {
      setIsLoading(false)
    }, 2000);
  }

  const handleBookingCancellation = async (bookingId) => {
    try {
      await cancelBooking(bookingInfo.bookingId)
      setIsDeleted(true)
      setBookingInfo(clearBookingInfo)
      setConfirmationCode("")
      setError("")
    } catch (error) {
      setError(error.message)
      console.log(error);
    }
    setTimeout(() => {
      setIsDeleted(false)
    }, 2000);
  }

  return (
    <>
    <div className='container mt-5 d-flex flex-column justify-content-center align-items-center'>
      <h2>Find My Bookings</h2>
      <form onSubmit={handleFormSubmit} className='col-md-6'>
        <div className='input-group mb-3'>
          <input 
            className='form-control'
            id='confirmationCode'
            name='confirmationCode'
            value={confirmationCode}
            onChange={handleInputChange}
            placeholder='Enter the booking confirmation code'
          />
          <button className='btn btn-hotel input-group-text'>Find Booking</button>
        </div>
      </form>
      {isLoading ? (
        <div>Finding your bookings...</div>
      ) : error ? (
        <div className='text-danger'>{error}</div>
      ) : bookingInfo.bookingConfirmationCode ? (
        <div className='col-md-6 mt-4 mb-5'>
          <h3>Booking Information</h3>
          <p>Booking confirmation code: {bookingInfo.bookingConfirmationCode}</p>
          <p>Booking Id: {bookingInfo.bookingId}</p>
          <p>Room number: {bookingInfo.room.id}</p>
          <p>Room Type: {bookingInfo.room.roomType}</p>
          <p>
            Check-in date:{" "}
            {moment(bookingInfo.checkInDate).subtract(1, "month").format("MMM Do, YYYY")}
          </p>
          <p>
            Check-out date:{" "}
            {moment(bookingInfo.checkInDate).subtract(1, "month").format("MMM Do, YYYY")}
          </p>
          <p>Full name: {bookingInfo.guestFullName}</p>
          <p>Email address: {bookingInfo.guestEmail}</p>
          <p>Adults: {bookingInfo.numOfAdults}</p>
          <p>Children: {bookingInfo.numOfChildren}</p>
          <p>Total guest: {bookingInfo.totalNumberOfGuests}</p>

          {!isDeleted && (
            <button
              className='btn btn-danger'
              onClick={() => handleBookingCancellation(bookingInfo.bookingId)}
            >
              Cancel Booking
            </button>
          )}
        </div>
      ) : (
        <div>Finding your bookings...</div>
      )}
      {isDeleted && (
        <div className='alert alert-success mt-3' role='alert'>Booking has been cancelled successfully</div>
      )}
    </div> 
    </>
  )
}

export default FindBooking