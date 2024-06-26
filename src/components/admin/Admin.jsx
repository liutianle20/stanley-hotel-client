import React from 'react'
import { Link } from "react-router-dom";

const Admin = () => {
  return (
    <section className='container mt-5'>
      <h2>Welcome to Admin Dashboard</h2>
      <hr />
      <Link to={"/existing-rooms"}>
        Manage Rooms
      </Link>
      <p>
        <Link to={"/existing-bookings"}>
          Manage Bookings
        </Link>
      </p>

    </section>
  )
}

export default Admin