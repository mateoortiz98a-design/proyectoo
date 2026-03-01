import { useState } from 'react'
import contacts from '../../../data/contactData.js'
import "./llamadas.css"

// Historial de llamadas basado en los contactos reales
const callHistory = [
    { id: 1, contactId: 1, type: 'entrante', video: false, time: 'Hoy, 10:32' },
    { id: 2, contactId: 2, type: 'perdida',  video: false, time: 'Hoy, 09:14' },
    { id: 3, contactId: 3, type: 'saliente', video: true,  time: 'Ayer, 22:05' },
    { id: 4, contactId: 4, type: 'perdida',  video: true,  time: 'Ayer, 18:40' },
    { id: 5, contactId: 1, type: 'saliente', video: false, time: 'Lun, 15:20' },
    { id: 6, contactId: 2, type: 'entrante', video: true,  time: 'Dom, 11:00' },
    { id: 7, contactId: 3, type: 'perdida',  video: false, time: 'Sáb, 08:30' },
]

// Modal de llamada activa
function CallModal({ contact, video, onClose }) {
    return (
        <div className="llamadas_modal" onClick={onClose}>
            <div className="llamadas_modal__card" onClick={e => e.stopPropagation()}>
                <img src={contact.profile_picture} alt={contact.name} className="llamadas_modal__avatar" />
                <p className="llamadas_modal__name">{contact.name}</p>
                <p className="llamadas_modal__status">Llamando…</p>
                <div className="llamadas_modal__actions">
                    <button className="llamadas_modal__btn llamadas_modal__btn--mute" aria-label="Silenciar">
                        <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                            <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
                        </svg>
                    </button>
                    <button className="llamadas_modal__btn llamadas_modal__btn--end" onClick={onClose} aria-label="Colgar">
                        <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
                            <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.61 21 3 13.39 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.58a1 1 0 0 1-.25 1.01l-2.2 2.2z"/>
                        </svg>
                    </button>
                    {video && (
                        <button className="llamadas_modal__btn llamadas_modal__btn--video" aria-label="Cámara">
                            <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                                <path d="M17 10.5V7a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-3.5l4 4v-11l-4 4z"/>
                            </svg>
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}

// Ícono de flecha según tipo
function ArrowIcon({ type }) {
    const color = type === 'perdida' ? '#ff3b30' : '#00a884'
    const rotate = type === 'saliente' ? '180deg' : '0deg'
    return (
        <svg viewBox="0 0 24 24" fill={color} width="14" height="14" style={{ transform: `rotate(${rotate})`, flexShrink: 0 }}>
            <path d="M20 5.41L18.59 4 7 15.59V9H5v10h10v-2H8.41z"/>
        </svg>
    )
}

export default function LlamadasScreen() {
    const [calling, setCalling] = useState(null)

    // Enriquecer historial con datos del contacto
    const calls = callHistory.map(call => ({
        ...call,
        contact: contacts.find(c => c.id === call.contactId),
    })).filter(c => c.contact)

    const handleCall = (contact, video) => {
        setCalling({ contact, video })
    }

    return (
        <div className="llamadas_screen">

            {/* Header */}
            <header className="llamadas_header">
                <h1 className="llamadas_header__title">Llamadas</h1>
                <div className="llamadas_header__actions">
                    <button className="llamadas_header__btn" aria-label="Buscar">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22">
                            <circle cx="11" cy="11" r="8"/>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                        </svg>
                    </button>
                    <button className="llamadas_header__btn" aria-label="Menú">
                        <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
                            <circle cx="12" cy="5" r="1.5"/>
                            <circle cx="12" cy="12" r="1.5"/>
                            <circle cx="12" cy="19" r="1.5"/>
                        </svg>
                    </button>
                </div>
            </header>

            {/* Botón crear enlace */}
            <button className="llamadas_link_btn">
                <span className="llamadas_link_icon">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
                        <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/>
                    </svg>
                </span>
                <div className="llamadas_link_text">
                    <span>Crear enlace de llamada</span>
                    <small>Compartí el enlace para iniciar una llamada grupal</small>
                </div>
            </button>

            {/* Etiqueta */}
            <p className="llamadas_section_label">Recientes</p>

            {/* Lista */}
            <ul className="llamadas_list">
                {calls.map((call, i) => (
                    <li
                        key={call.id}
                        className="llamadas_item"
                        style={{ animationDelay: `${i * 0.05}s` }}
                    >
                        <img
                            src={call.contact.profile_picture}
                            alt={call.contact.name}
                            className="llamadas_item__avatar"
                        />
                        <div className="llamadas_item__body">
                            <span className={`llamadas_item__name ${call.type === 'perdida' ? 'llamadas_item__name--missed' : ''}`}>
                                {call.contact.name}
                            </span>
                            <div className="llamadas_item__meta">
                                <ArrowIcon type={call.type} />
                                <span className={`llamadas_item__info ${call.type === 'perdida' ? 'llamadas_item__info--missed' : ''}`}>
                                    {call.type === 'perdida' ? 'Perdida' : call.type === 'saliente' ? 'Saliente' : 'Entrante'}
                                    {call.video ? ' · Video' : ''} · {call.time}
                                </span>
                            </div>
                        </div>
                        <button
                            className="llamadas_item__call_btn"
                            aria-label={call.video ? 'Videollamada' : 'Llamar'}
                            onClick={() => handleCall(call.contact, call.video)}
                        >
                            {call.video ? (
                                <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
                                    <path d="M17 10.5V7a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-3.5l4 4v-11l-4 4z"/>
                                </svg>
                            ) : (
                                <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
                                    <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.61 21 3 13.39 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.58a1 1 0 0 1-.25 1.01l-2.2 2.2z"/>
                                </svg>
                            )}
                        </button>
                    </li>
                ))}
            </ul>

            {/* FAB nueva llamada */}
            <button className="llamadas_fab" aria-label="Nueva llamada" onClick={() => handleCall(contacts[0], false)}>
                <svg viewBox="0 0 24 24" fill="currentColor" width="26" height="26">
                    <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.61 21 3 13.39 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.58a1 1 0 0 1-.25 1.01l-2.2 2.2z"/>
                </svg>
            </button>

            {/* Modal llamada */}
            {calling && (
                <CallModal
                    contact={calling.contact}
                    video={calling.video}
                    onClose={() => setCalling(null)}
                />
            )}
        </div>
    )
}