import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Navbar.css'

function Navbar() {
  const [searchText, setSearchText] = useState('')
  const navigate = useNavigate()
  const { user } = useAuth()

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchText.trim() !== '') {
      navigate(`/recipes?search=${searchText}`)
    }
  }

  const handleProfileClick = () => {
    if (user) {
      navigate('/settings')
    } else {
      navigate('/login')
    }
  }

  return (
    <div className="navbar">
      <div className="navbar-search">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          placeholder="Search recipes, ingredients, cuisines..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyDown={handleSearch}
        />
      </div>
      <div className="navbar-profile" onClick={handleProfileClick}>
        {user && user.profile_picture ? (
          <img
            src={`http://https://flavr-backend-production.up.railway.app/uploads/${user.profile_picture}`}
            alt="Profile"
            className="navbar-profile-img"
          />
        ) : user ? (
          user.name.charAt(0).toUpperCase()
        ) : (
          '?'
        )}
      </div>
    </div>
  )
}

export default Navbar