

import MenuSidebar from '../Components/menuSide/MenuSidebar/menuSidebar'

export default function SidebarLayout({ children }) {
    return (
        <div style={{ display: 'flex', flexDirection: 'row', height: '100vh', overflow: 'hidden' }}>
            <MenuSidebar />
            {children}
        </div>
    )
}