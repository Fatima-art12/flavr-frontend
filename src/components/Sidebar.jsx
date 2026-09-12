import { Link, useLocation } from 'react-router-dom'
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

  return (
    <div className="sidebar">
      <div className="sidebar-brand">
        <h1 className="sidebar-logo">Flavr</h1>
        <p className="sidebar-tagline">Cook with flavr.</p>
      </div>
      <div className="sidebar-menu">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className={location.pathname === item.path ? 'menu-item menu-item-active' : 'menu-item'}
          >
            <span className="menu-icon">{item.icon}</span>{item.name}
          </Link>
        ))}
        <Link
          to="/settings"
          className={location.pathname === '/settings' ? 'menu-item menu-item-active' : 'menu-item'}
        >
          <span className="menu-icon">⚙️</span>Settings
        </Link>
      </div>
    </div>
  )
}

export default Sidebar