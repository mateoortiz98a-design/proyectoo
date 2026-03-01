import React, { useContext } from 'react'
import ContactSidebar from '../../Components/ContactSidebar/ContactSidebar'
import { Link, useParams, useNavigate } from 'react-router'
import { ContactsContext } from '../../Context/ContactsContext'
import './ContactScreen.css'
import { useState } from 'react'
import InfoContact from '../../Components/InfoContact/infoContact'
import MenuSidebar from '../../Components/menuSide/menuSidebar/menuSidebar'
import Chat from '../../Components/chat/chat'
export default function ContactScreen() {
    const { contacts } = useContext(ContactsContext)
    const [showInfo, setShowInfo] = useState(false)
    const { contact_id } = useParams()
    const navigate = useNavigate()

    const contact_selected = contacts.find(contact => Number(contact.id) === Number(contact_id))

    return (
        <div className='home_screen'>
            <MenuSidebar />
            <ContactSidebar />

            {!contact_selected
                ? <div>
                    <h1>El contacto seleccionado no existe</h1>
                </div>

                // ✅ Siempre tiene home_chat_contact--visible
                // En desktop no importa porque el chat no está fixed
                // En mobile hace el slide y tapa el menu
                : <div className='home_chat_contact home_chat_contact--visible'>

                    <div className='home_chat_header'>
                        <button
                            className='mobile_back_btn'
                            onClick={() => navigate('/')}
                            aria-label='Volver'
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="22" height="22">
                                <polyline points="15 18 9 12 15 6"/>
                            </svg>
                        </button>

                        <img
                            src={contact_selected.profile_picture}
                            alt={contact_selected.name}
                            onClick={() => setShowInfo(true)}
                            style={{ cursor: 'pointer' }}
                        />

                        <div className='home_chat_header_info'>
                            <span>{contact_selected.name}</span>
                            <span>{contact_selected.last_time_connection}</span>
                        </div>

                        <Link to='/' className='volver'>Volver</Link>
                    </div>

                    {showInfo && (
                        <InfoContact
                            contact={contact_selected}
                            onClose={() => setShowInfo(false)}
                        />
                    )}   
                <Chat contact={contact_selected}/>
                </div>
            }
        </div>
    )
}
    