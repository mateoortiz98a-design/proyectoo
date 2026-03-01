import React from 'react'
import ContactSidebar from '../../Components/ContactSidebar/ContactSidebar'
import './HomeScreen.css'
import MenuSidebar from '../../Components/menuSide/menuSidebar/menuSidebar'
export default function HomeScreen() {
  return (
    <div className='home_screen'>
      <MenuSidebar />
      <ContactSidebar />

      <div className='home_chat'>
        <h1>Bienvenido a Whatsapp Clone</h1>
        <p>Selecciona un contacto para comenzar a chatear</p>
      </div>
    </div>
  )
}