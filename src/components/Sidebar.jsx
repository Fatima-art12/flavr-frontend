import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Sidebar.css'

const menuItems = [
  { name: 'Home', icon: '🏠', path: '/' },
  { name: 'Trending', icon: '🔥', path: '/trending' },
  { name: 'Recipes', icon: '📖', path: '/recipes' },
  { name: 'Cuisines', icon: '🍽️', path: '/cuisines' },
  { name: 'Saved', icon: '❤️', path: '/saved' },
  { name: 'Meal Planner', icon: '📅', path: '/meal-planner' },
]

function Sidebar() {
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(false)
  const { user } = useAuth()

  const closeMenu = () => setIsOpen(false)

  return (
    <>
      <button className="hamburger-btn" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? '✕' : '☰'}
      </button>

      {isOpen && <div className="sidebar-overlay" onClick={closeMenu}></div>}

      <div className={isOpen ? 'sidebar sidebar-open' : 'sidebar'}>
        <div className="sidebar-brand">
          <h1 className="sidebar-logo">Flavr</h1>
          <p className="sidebar-tagline">Cook with flavr.</p>
        </div>
        <div className="sidebar-menu">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              onClick={closeMenu}
              className={location.pathname === item.path ? 'menu-item menu-item-active' : 'menu-item'}
            >
              <span className="menu-icon">{item.icon}</span>{item.name}
            </Link>
          ))}
          <Link
            to="/settings"
            onClick={closeMenu}
            className={location.pathname === '/settings' ? 'menu-item menu-item-active' : 'menu-item'}
          >
            <span className="menu-icon">⚙️</span>Settings
          </Link>
          {user && user.is_admin ? (
            <Link
              to="/admin"
              onClick={closeMenu}
              className={location.pathname === '/admin' ? 'menu-item menu-item-active' : 'menu-item'}
            >
              <span className="menu-icon">🛠️</span>Admin
            </Link>
          ) : null}
        </div>
      </div>
    </>
  )
}

export default Sidebar