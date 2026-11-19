import { Bell, Search } from 'lucide-react'
import { Outlet } from 'react-router-dom'
import { Sidebar } from '../components/Sidebar'

export function AppLayout() {
  return (
    <div className="app-shell">
      <Sidebar />
      <main className="main-area">
        <header className="topbar">
          <div className="search-box"><Search size={18} /><input aria-label="Search" placeholder="Search inspections..." /></div>
          <button className="icon-button" aria-label="Notifications"><Bell size={19} /><span className="notification-dot" /></button>
          <div className="top-avatar">AR</div>
        </header>
        <div className="page-content"><Outlet /></div>
      </main>
    </div>
  )
}
