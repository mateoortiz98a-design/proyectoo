

import { Link, useLocation } from 'react-router-dom'
import './menuMobile.css'

export default function MenuMobile() {
    const location = useLocation()
    const path = location.pathname
const isInChat = path.startsWith('/contact/')
if (isInChat) return null
    const tabs = [
        {
            to: '/',
            label: 'Chats',
            icon: (
                <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                    <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/>
                </svg>
            ),
        },
        {
            to: '/estados',
            label: 'Estados',
            icon: (
                <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
                </svg>
            ),
        },
        {
            to: '/llamadas',
            label: 'Llamadas',
            icon: (
                <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                    <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.61 21 3 13.39 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.58a1 1 0 0 1-.25 1.01l-2.2 2.2z"/>
                </svg>
            ),
        },
       
        {
            to: '/settings',
            label: 'Ajustes',
            icon: (
                <svg viewBox="0 0 16 16" fill="currentColor" width="24" height="24">
                    <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z"/>
                </svg>
            ),
        },
    ]

    return (
        <nav className="menu_mobile">
            {tabs.map((tab) => {
                const isActive = path === tab.to || (tab.to !== '/' && path.startsWith(tab.to))
                return (
                    <Link
                        key={tab.to}
                        to={tab.to}
                        className={`menu_mobile__tab ${isActive ? 'menu_mobile__tab--active' : ''}`}
                    >
                        <span className="menu_mobile__icon">{tab.icon}</span>
                        <span className="menu_mobile__label">{tab.label}</span>
                        {isActive && <span className="menu_mobile__indicator" />}
                    </Link>
                )
            })}
        </nav>
    )
}