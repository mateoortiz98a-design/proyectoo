import React from 'react'
import { Route, Routes } from 'react-router'
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
function App() {

    return (
        <div >
            <ContactsContextProvider >
                <Routes>

                    <Route
                        path='/'
                        element={

                            <HomeScreen />

                        }
                    />
                    <Route
                        path='/contact/:contact_id'
                        element={
                            <ContactScreen />
                        }
                    />
                    <Route
                        path='*'
                        element={<ErrorNotFoundScreen />}
                    />
                    <Route
                        path='/settings'
                        element={
                            <SidebarLayout>
                                <SettingsScreen />
                            </SidebarLayout>
                        }
                    />
                    <Route path='/estados' element={
                        <SidebarLayout>
                            <EstadosScreen />
                        </SidebarLayout>
                    } />
                    <Route path='/llamadas' element={
                        <SidebarLayout>
                            <LlamadasScreen />
                        </SidebarLayout>
                    } />
                </Routes>
           <MenuMobile />
            </ContactsContextProvider>
        </div>
    )
}

export default App