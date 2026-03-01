import { useState } from 'react'
import contacts from '../../../data/contactData'
import "./estados.css"

const statusExtras = {
    1: { seen: false, time: 'Hace 2 min',  text: '¡Que la fuerza te acompañe! 🌿' },
    2: { seen: false, time: 'Hace 15 min', text: 'Dale, nos vemos mañana 👋' },
    3: { seen: true,  time: 'Hace 1 h',    text: '¡Respéctame! 😤' },
    4: { seen: true,  time: 'Hace 3 h',    text: '...' },
}

const MY_PICTURE = 'https://i.pinimg.com/originals/69/f3/aa/69f3aac6a1f53ab51c8cf248949f4185.jpg'

function StatusRing({ seen, size = 54 }) {
    const stroke = seen ? '#c5ccd1' : '#00a884'
    const r = (size - 5) / 2
    const cx = size / 2
    const circumference = 2 * Math.PI * r
    const segments = 8
    const gap = 3
    const segLen = (circumference - segments * gap) / segments

    return (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="estados_ring">
            {Array.from({ length: segments }).map((_, i) => (
                <circle
                    key={i}
                    cx={cx} cy={cx} r={r}
                    fill="none"
                    stroke={stroke}
                    strokeWidth="2.8"
                    strokeDasharray={`${segLen} ${circumference - segLen}`}
                    strokeDashoffset={circumference - i * (segLen + gap)}
                    strokeLinecap="round"
                    transform={`rotate(-90 ${cx} ${cx})`}
                />
            ))}
        </svg>
    )
}

function StatusViewer({ contact, onClose }) {
    const extra = statusExtras[contact.id]
    return (
        <div className="estados_viewer" onClick={onClose}>
            <div className="estados_viewer__card" onClick={e => e.stopPropagation()}>
                <div className="estados_viewer__bar">
                    <div className="estados_viewer__bar_fill" />
                </div>
                <div className="estados_viewer__header">
                    <img src={contact.profile_picture} alt={contact.name} />
                    <div>
                        <span className="estados_viewer__name">{contact.name}</span>
                        <span className="estados_viewer__time">{extra?.time}</span>
                    </div>
                    <button className="estados_viewer__close" onClick={onClose}>
                        <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
                            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                        </svg>
                    </button>
                </div>
                <img src={contact.profile_picture} alt="estado" className="estados_viewer__img" />
                <div className="estados_viewer__caption">{extra?.text}</div>
            </div>
        </div>
    )
}

export default function EstadosScreen() {
    const [viewing, setViewing] = useState(null)

    const noVistos = contacts.filter(c => statusExtras[c.id] && !statusExtras[c.id].seen)
    const vistos   = contacts.filter(c => statusExtras[c.id] &&  statusExtras[c.id].seen)

    return (
        <div className="estados_screen">
            <header className="estados_header">
                <h1 className="estados_header__title">Estados</h1>
                <div className="estados_header__actions">
                    <button className="estados_header__btn">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22">
                            <circle cx="12" cy="12" r="10"/>
                            <line x1="12" y1="8" x2="12" y2="12"/>
                            <line x1="12" y1="16" x2="12.01" y2="16"/>
                        </svg>
                    </button>
                    <button className="estados_header__btn">
                        <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
                            <circle cx="12" cy="5" r="1.5"/>
                            <circle cx="12" cy="12" r="1.5"/>
                            <circle cx="12" cy="19" r="1.5"/>
                        </svg>
                    </button>
                </div>
            </header>

            <div className="estados_body">
                {/* Mi estado */}
                <section className="estados_section">
                    <div className="estados_mine">
                        <div className="estados_mine__avatar_wrap">
                            <img src={MY_PICTURE} alt="yo" className="estados_mine__avatar" />
                            <button className="estados_mine__add">
                                <svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13">
                                    <path d="M19 13H13v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                                </svg>
                            </button>
                        </div>
                        <div className="estados_mine__info">
                            <span className="estados_mine__name">Mi estado</span>
                            <span className="estados_mine__hint">Toca para agregar estado</span>
                        </div>
                        <button className="estados_mine__edit">
                            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                                <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                            </svg>
                        </button>
                    </div>
                </section>

                {/* No vistos */}
                {noVistos.length > 0 && (
                    <section className="estados_section">
                        <p className="estados_section__label">Actualizaciones recientes</p>
                        <ul className="estados_list">
                            {noVistos.map((c, i) => (
                                <li key={c.id} className="estados_item" style={{ animationDelay: `${i * 0.06}s` }} onClick={() => setViewing(c)}>
                                    <div className="estados_item__ring_wrap">
                                        <StatusRing seen={false} />
                                        <img src={c.profile_picture} alt={c.name} className="estados_item__avatar" />
                                    </div>
                                    <div className="estados_item__info">
                                        <span className="estados_item__name">{c.name}</span>
                                        <span className="estados_item__time">{statusExtras[c.id].time}</span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </section>
                )}

                {/* Vistos */}
                {vistos.length > 0 && (
                    <section className="estados_section">
                        <p className="estados_section__label">Vistos</p>
                        <ul className="estados_list">
                            {vistos.map((c, i) => (
                                <li key={c.id} className="estados_item" style={{ animationDelay: `${i * 0.06}s` }} onClick={() => setViewing(c)}>
                                    <div className="estados_item__ring_wrap">
                                        <StatusRing seen={true} />
                                        <img src={c.profile_picture} alt={c.name} className="estados_item__avatar" />
                                    </div>
                                    <div className="estados_item__info">
                                        <span className="estados_item__name">{c.name}</span>
                                        <span className="estados_item__time">{statusExtras[c.id].time}</span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </section>
                )}
            </div>

            {/* FABs */}
            <div className="estados_fabs">
                <button className="estados_fab estados_fab--text">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
                        <path d="M2.5 4v3h5v12h3V7h5V4h-13zm19 5h-9v3h3v7h3v-7h3V9z"/>
                    </svg>
                </button>
                <button className="estados_fab estados_fab--camera">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                        <path d="M20 5h-3.17L15 3H9L7.17 5H4C2.9 5 2 5.9 2 7v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm-8 13c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.65 0-3 1.35-3 3s1.35 3 3 3 3-1.35 3-3-1.35-3-3-3z"/>
                    </svg>
                </button>
            </div>

            {viewing && <StatusViewer contact={viewing} onClose={() => setViewing(null)} />}
        </div>
    )
}