import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { useNavigate } from '../../../node_modules/react-router-dom/dist/index'
import Button from '../../../node_modules/react-bootstrap/esm/Button'

const BookingSummary = ({booking, payment, isFormValid, onConfirm}) => {
  const checkInDate = moment(booking.checkInDate)
  const checkOutDate = moment(booking.checkOutDate)
  const numberOfDays = checkOutDate.diff(checkInDate, "days")
  const [isBookingConfirmed, setIsBookingConfirmed] = useState(false)
  const [isProcessingPayment, setIsProcessingPayment] = useState(false)

  const navigate = useNavigate()

  const handleConfirmBooking = () => {
    setIsProcessingPayment(true)
    setTimeout(() => {
      setIsProcessingPayment(false)
      setIsBookingConfirmed(true)
      onConfirm()
    }, 3000);
  }

  useEffect(() => {
    if (isBookingConfirmed) {
      navigate("/booking-success")
    }
  }, [isBookingConfirmed, navigate])
  


  return (
    <div className='card card-body mt-5'>
      <h4>Reservation Summary</h4>
      <p>Fullname: <strong>{booking.guestFullName}</strong></p>
      <p>Email: <strong>{booking.guestEmail}</strong></p>
      <p>Check-in Date: <strong>{moment(booking.checkInDate).format("MMM Do YYYY")}</strong></p>
      <p>Check-out Date: <strong>{moment(booking.checkOutDate).format("MMM Do YYYY")}</strong></p>
      <p>Number of Days: <strong>{numberOfDays}</strong></p>
      <div>
        <h5>Number of Guests</h5>
        <strong>
          Adult{booking.numOfAdults > 1 ? "s" : "" } : {booking.numOfAdults}
        </strong>
        <strong>
          <p>Child{booking.numOfChildren > 1 ? "ren" : "" } : {booking.numOfChildren}</p>
        </strong>
      </div>
      {payment > 0 ? (
        <>
        <p>
          Total Payment : <strong>${payment}</strong>
        </p>
        {isFormValid && !isBookingConfirmed ? (
          <Button variant='success' onClick={handleConfirmBooking}>
            {isProcessingPayment ? (
              <>
              <span className='spinner-border spinner-border-sm mr-2' role='status' aria-hidden='true'> 

              </span>
              Booking confirmed, redirecting to payment...
              </>
            ) : (
              "Confirmed booking and proceed to payment"
            )}
          </Button>
        ) : isBookingConfirmed ? (
          <div className='d-flex justify-content-center align-items-center'>
            <div className='spinner-border text-primary' role='status'>
              <span className='sr-only'>Loading...</span>
            </div>
          </div>
        ) : null}
        </>
      ) : (
        <p className='text-danger'>Check-out date must be after check-in date</p>
      )}
    </div>
  )
}
 
export default BookingSummary