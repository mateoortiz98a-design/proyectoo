import './infoContact.css'
import React from 'react'
export default function InfoContact({ contact, onClose }) {
  return (
    <div className='info_contact_panel'>
      <button className='info_close_btn' onClick={onClose}>✕</button>
      <h2 className='info_title'>Info. del contacto</h2>
      <div className='info_photo_wrapper'>
        <img src={contact.profile_picture} alt={contact.name} className='info_photo' />
      </div>
      <h3 className='info_name'>{contact.name}</h3>
      <span className='info_number'>{contact.number}</span>
      <p className='info_last'>{contact.last_time_connection}</p>
    </div>
  )
}