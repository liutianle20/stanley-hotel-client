import axios from "axios"

// Create an instance of axios
export const api = axios.create({
  baseURL : "http://localhost:8080"
})

// used to define a function as asynchronous, 
// which means the function can perform operations 
// that may take some time to complete, such as making network requests or reading files. 
//This function adds a new room to the database
export async function addRoom(photo, roomType, roomPrice) {
  const formData = new FormData() //to construct a set of key/value pairs representing form fields and their values, which can be sent using XMLHttpRequest.
  formData.append("photo", photo)
  formData.append("roomType", roomType)
  formData.append("roomPrice", roomPrice)

  const response = await api.post("/rooms/add/new-room", formData) //used in async functions to pause the execution of the function until a Promise is resolved or rejected.
  if (response.status === 201) {
    return true
  } else {
    return false
  }
} 

// get all room types from database
export async function getRoomTypes() {
  try {
    const response = await api.get("/rooms/room-types")
    return response.data
  } catch (error) {
    throw new Error("Error fetching room types")
  }
}

// gets all rooms from database
export async function getAllRooms() {
  try {
    const result = await api.get("/rooms/all-rooms")
    return result.data
  } catch (error) {
    throw new Error("Error fetching rooms");
  }
}

// deletes room by id
export async function deleteRoom(id) {
  try {
    const result = await api.delete(`/rooms/delete-room/${id}` )
    return result.data
  } catch (error) {
    throw new Error(`Error deleting room ${error.message}`)
  }
}

//updates a room
export async function updateRoom(id, roomData) {
  const formData = new FormData()
  formData.append("roomType", roomData.roomType)
  formData.append("roomPrice", roomData.roomPrice)
  formData.append("photo", roomData.photo)
  const response = await api.put(`/rooms/update-room/${id}`, formData)
  return response
}

//gets a room by id
export async function getRoomById(id) {
  try {
    const result = await api.get(`/rooms/room/${id}`)
    return result.data
  } catch (error) {
    throw new Error(`Error fetching room ${id} ${error.message}`)
  }
}
 
// saves a new booking to the database
export async function bookRoom(roomId, booking) {
  try {
    const response = await api.post(`/bookings/room/${roomId}/booking`, booking)
    return response.data
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data)
    } else {
      throw new Error(`Error booking room: ${error.message}`)
    }
  }
}
 
// gets all bookings from the database
export async function getAllBookings() {
  try {
    const result = await api.get("/bookings/all-bookings")
    return result.data
  } catch (error) {
    throw new Error(`Error fetching bookings: ${error.message}`)
  }
}

// gets the booking by the confirmation code
export async function getBookingByConfirmationCode(confirmationCode) {
  try {
    const result = await api.get(`/bookings/confirmation/${confirmationCode}`)
    return result
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data)
    } else {
      throw new Error(`Error finding booking: ${error.message}`)
    }
  }
}

// cancels a booking
export async function cancelBooking(bookingId) {
  try {
    const result = await api.delete(`/bookings/booking/${bookingId}/delete`)
    return result.data
  } catch (error) {
    throw new Error(`Error cancelling booking: ${error.message}`)
  }
}