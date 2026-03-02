
import React, { useState, useEffect } from 'react'
import { Route, Routes, Navigate } from 'react-router'
import HomeScreen from './Screens/HomeScreen/HomeScreen'
import ContactScreen from './Screens/ContactScreen/ContactScreen'
import ErrorNotFoundScreen from './Screens/ErrorNotFoundScreen/ErrorNotFoundScreen'
import { getContacts } from './Services/contactService.js'
import ContactsContextProvider from './Context/ContactsContext'
import ContactSidebar from './Components/ContactSidebar/ContactSidebar'
import InfoContact from './Components/InfoContact/infoContact.jsx'
import contacts from './data/contactData.js'
import './App.css'
import SettingsScreen from './Components/menuSide/configuraciones/setting.jsx'
import EstadosScreen from './Components/menuSide/estados/estadoScreen.jsx'
import SidebarLayout from './layouts/SidebarLayout.jsx'
import LlamadasScreen from './Components/menuSide/llamadas/llamadasScreen.jsx'
import MenuMobile from './Components/menuSide/menusideBarMobile/menuMobile.jsx'
import LoginScreen from './Screens/LoginScreen/LoginScreen'

const STORAGE_KEY = 'wsp_user_profile'


function App() {
    const [user, setUser] = useState(undefined)

    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY)
        setUser(saved ? JSON.parse(saved) : null)
    }, [])

    const handleLogin = (profile) => setUser(profile)

    if (user === undefined) return null

    return (
        <div >
            <ContactsContextProvider >
                <Routes>

                    <Route
                        path='/login'
                        element={user ? <Navigate to='/' replace /> : <LoginScreen onLogin={handleLogin} />}
                    />

                    <Route
                        path='/'
                        element={user ? <HomeScreen /> : <Navigate to='/login' replace />}
                    />
                    <Route
                        path='/contact/:contact_id'
                        element={user ? <ContactScreen /> : <Navigate to='/login' replace />}
                    />
                    <Route
                        path='*'
                        element={<ErrorNotFoundScreen />}
                    />
                    <Route
                        path='/settings'
                        element={
                            user
                                ? <SidebarLayout><SettingsScreen /></SidebarLayout>
                                : <Navigate to='/login' replace />
                        }
                    />
                    <Route path='/estados' element={
                        user
                            ? <SidebarLayout><EstadosScreen /></SidebarLayout>
                            : <Navigate to='/login' replace />
                    } />
                    <Route path='/llamadas' element={
                        user
                            ? <SidebarLayout><LlamadasScreen /></SidebarLayout>
                            : <Navigate to='/login' replace />
                    } />
                </Routes>
                {user && <MenuMobile />}
            </ContactsContextProvider>
        </div>
    )
}

export default App