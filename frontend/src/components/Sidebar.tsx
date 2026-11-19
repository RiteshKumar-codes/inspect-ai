import { BarChart3, ClipboardCheck, LayoutDashboard, Plus, Settings, ShieldCheck, FileText } from 'lucide-react'
import { NavLink } from 'react-router-dom'

const links = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/inspections', label: 'Inspections', icon: ClipboardCheck },
  { to: '/new-inspection', label: 'New Inspection', icon: Plus },
  { to: '/analytics', label: 'Analytics', icon: BarChart3 },
  { to: '/reports', label: 'Reports', icon: FileText },
]

export function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-mark"><ShieldCheck size={22} /></div>
        <span>InspectAI</span>
      </div>
      <nav className="nav-list" aria-label="Main navigation">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink key={to} to={to} end={to === '/'} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            <Icon size={19} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
      <NavLink to="/settings" className={({ isActive }) => `nav-link settings-link ${isActive ? 'active' : ''}`}>
        <Settings size={19} />
        <span>Settings</span>
      </NavLink>
      <div className="profile">
        <div className="avatar">AR</div>
        <div><strong>Alex Rivera</strong><span>Quality Inspector</span></div>
      </div>
    </aside>
  )
}
