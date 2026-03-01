import React, { useContext } from 'react'
import { getContacts } from '../../Services/contactService'
import { ContactsContext } from '../../Context/ContactsContext'
import { Link } from 'react-router'
import './ContacSidebar.css'
import infoContact from '../InfoContact/infoContact'

export default function ContactSidebar() {

    const { contacts, favorite_name } = useContext(ContactsContext)
    return (
        <div className='sidebar' >
            <div className='sidebar_header'>
                <h2>Whatsapp Clone</h2>
            </div>
            <div className='contacts_list'>
                {
                    contacts.map(
                        (contact) => {
                            return (
                                <Link
                                    to={`/contact/${contact.id}`}
                                    key={contact.id}
                                    className='contact_item'
                                >
                                    <img
                                        src={contact.profile_picture}
                                        alt={contact.name}

                                    />
                                    <div className='contact_info'>
                                        <div className='contact_top'>
                                            <h4>{contact.name}</h4>
                                            <span>{contact.last_time_connection}</span>
                                        </div>
                                    </div>
                                </Link>
                            )
                        }
                    )
                }
            </div>
        </div>
    )
}