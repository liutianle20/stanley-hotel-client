import React from 'react'
import MainHeader from '../layout/MainHeader'
import HotelService from '../common/HotelService'
import Parallax from '../common/Parallax'
import RoomCarousel from '../common/RoomCarousel'
import RoomSearch from '../common/RoomSearch'

const home = () => {
  return (
    <section>
      <MainHeader/>
      <div className='container'>
        <RoomSearch/>
        <RoomCarousel/>
        <Parallax/>
        <HotelService/>
        <Parallax/>
      </div>
    </section>
  )
}

export default home