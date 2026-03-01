import { useState } from "react";
import "./setting.css";

const menuItems = [
    {
        key: "account",
        label: "Cuenta",
        desc: "Notificaciones de seguridad, información de la cuenta",
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
            </svg>
        ),
    },
    {
        key: "privacy",
        label: "Privacidad",
        desc: "Contactos bloqueados, mensajes temporales",
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
            </svg>
        ),
    },
    {
        key: "chats",
        label: "Chats",
        desc: "Tema, fondo, ajustes del chat",
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
            </svg>
        ),
    },
    {
        key: "notifications",
        label: "Notificaciones",
        desc: "Mensajes, grupos, sonidos",
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>
            </svg>
        ),
    },
    {
        key: "shortcuts",
        label: "Atajos del teclado",
        desc: "Acciones rápidas",
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                <path d="M20 5H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm-9 3h2v2h-2V8zm0 3h2v2h-2v-2zM8 8h2v2H8V8zm0 3h2v2H8v-2zm-1 5H5v-2h2v2zm10 0H7v-2h10v2zm0-3h-2v-2h2v2zm0-3h-2V8h2v2zm-3 3h-2v-2h2v2zm0-3h-2V8h2v2z"/>
            </svg>
        ),
    },
    {
        key: "help",
        label: "Ayuda y comentarios",
        desc: "Centro de ayuda, contáctanos, política de privacidad",
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/>
            </svg>
        ),
    },
];

const contentMap = {
    account: { title: "Cuenta", body: "Configuraciones de seguridad e información de la cuenta." },
    privacy: { title: "Privacidad", body: "Contactos bloqueados y mensajes temporales." },
    chats: { title: "Chats", body: "Fondo, tema y configuración de conversaciones." },
    notifications: { title: "Notificaciones", body: "Sonidos y alertas de mensajes y grupos." },
    shortcuts: { title: "Atajos del teclado", body: "Acciones rápidas del teclado." },
    help: { title: "Ayuda y comentarios", body: "Centro de ayuda y soporte." },
};

export default function SettingsScreen() {
    const [section, setSection] = useState(null);

    return (
        <div className="settings_container">

            {/* ── Sidebar ── */}
            <div className="settings_sidebar">

                <h2 className="settings_title">Ajustes</h2>

                {/* Buscador */}
                <div className="settings_search">
                    <svg className="settings_search__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                        <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                    </svg>
                    <input type="text" placeholder="Buscar en los ajustes" />
                </div>

                {/* Perfil */}
                <div className="settings_profile">
                    <img src="https://i.pinimg.com/originals/69/f3/aa/69f3aac6a1f53ab51c8cf248949f4185.jpg?nii=t" alt="Perfil" />
                    <div className="settings_profile__info">
                        <span className="settings_profile__name">M</span>
                        <span className="settings_profile__about">¡Disponible!</span>
                    </div>
                </div>

                {/* Items de menú */}
                <nav className="settings_nav">
                    {menuItems.map((item) => (
                        <button
                            key={item.key}
                            className={`settings_nav__item ${section === item.key ? "settings_nav__item--active" : ""}`}
                            onClick={() => setSection(item.key)}
                        >
                            <span className="settings_nav__icon">{item.icon}</span>
                            <span className="settings_nav__text">
                                <span className="settings_nav__label">{item.label}</span>
                                <span className="settings_nav__desc">{item.desc}</span>
                            </span>
                        </button>
                    ))}
                </nav>

                {/* Cerrar sesión */}
                <button className="settings_logout">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                        <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5-5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>
                    </svg>
                    Cerrar sesión
                </button>
            </div>

            {/* ── Panel derecho ── */}
            <div className="settings_content">
                {section ? (
                    <div className="settings_content__inner">
                        <h2>{contentMap[section]?.title}</h2>
                        <p>{contentMap[section]?.body}</p>
                    </div>
                ) : (
                    <div className="settings_content__empty">
                        <svg viewBox="0 0 24 24" fill="currentColor" width="64" height="64">
                            <path d="M19.14 12.94c.04-.3.06-.61.06-.94s-.02-.64-.07-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.49.49 0 0 0-.59-.22l-2.39.96a7.02 7.02 0 0 0-1.62-.94l-.36-2.54A.484.484 0 0 0 14 2h-4c-.25 0-.46.18-.49.42l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96a.47.47 0 0 0-.59.22L2.74 8.87a.47.47 0 0 0 .12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58a.49.49 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.37 1.04.7 1.62.94l.36 2.54c.05.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.36-2.54c.59-.24 1.13-.57 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32a.47.47 0 0 0-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/>
                        </svg>
                        <p>Ajustes</p>
                    </div>
                )}
            </div>

        </div>
    );
}