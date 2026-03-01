import { createContext, useState } from "react";
import { getContacts } from "../Services/contactService";


export const ContactsContext = createContext(
     
    {
        contacts: [],
        favorite_name: ''
    }
)


const ContactsContextProvider = ({ children }) => {
    const contacts = getContacts()
    const [contactsState, setContactsState] = useState(contacts)

    const provider_values = {
        contacts: contactsState,
        favorite_name: 'pepe'
    }

    return (
       
        <ContactsContext.Provider 
            value={provider_values}
        >
            {children}
        </ContactsContext.Provider>
    )
}

export default ContactsContextProvider