import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import './Settings.css'

function Settings() {
  const [uploading, setUploading] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const { user, logout, uploadProfilePicture } = useAuth()
  const { darkMode, toggleDarkMode } = useTheme()
  const navigate = useNavigate()
  const fileInputRef = useRef(null)

  const handleLogoutClick = () => {
    const confirmed = window.confirm('Are you sure you want to log out?')
    if (confirmed) {
      logout()
    }
  }

  const handleButtonClick = () => {
    fileInputRef.current.click()
  }

  const handleFileChange = async (e) => {
    if (!user) {
      alert('You are in Guest mode. Please log in to upload a profile picture.')
      return
    }

    const file = e.target.files[0]
    if (!file) return

    setUploading(true)
    try {
      await uploadProfilePicture(file)
    } catch (err) {
      alert(err.message)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="settings-page">
      <h1>Settings</h1>

      <div className="settings-card">
        <h2>Profile</h2>
        <div className="profile-row">
          <div
            className="profile-avatar"
            onClick={() => user && user.profile_picture && setShowPreview(true)}
            style={{ cursor: user && user.profile_picture ? 'pointer' : 'default' }}
          >
            {user && user.profile_picture ? (
              <img
                src={`https://flavr-backend-production.up.railway.app/uploads/${user.profile_picture}`}
                alt="Profile"
                className="profile-avatar-img"
              />
            ) : user ? (
              user.name.charAt(0).toUpperCase()
            ) : (
              '?'
            )}
          </div>
          <div>
            <p className="profile-name">{user ? user.name : 'Guest'}</p>
            {user ? (
              <>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                />
                <button className="btn-outline" onClick={handleButtonClick} disabled={uploading}>
                  {uploading ? 'Uploading...' : 'Change Profile Picture'}
                </button>
              </>
            ) : (
              <p className="profile-guest-note">Log in to set a profile picture</p>
            )}
          </div>
        </div>
      </div>

      <div className="settings-card">
        <h2>Appearance</h2>
        <div className="toggle-row">
          <span>Dark Mode</span>
          <div
            className={darkMode ? 'toggle-switch toggle-on' : 'toggle-switch'}
            onClick={toggleDarkMode}
          >
            <div className="toggle-circle"></div>
          </div>
        </div>
      </div>

      <div className="settings-card">
        <h2>Account</h2>
        {user ? (
          <button className="btn-danger" onClick={handleLogoutClick}>
            Log Out
          </button>
        ) : (
          <button className="btn-primary" onClick={() => navigate('/login')}>
            Log In
          </button>
        )}
      </div>

      {showPreview && (
        <div className="image-preview-overlay" onClick={() => setShowPreview(false)}>
          <img
            src={`https://flavr-backend-production.up.railway.app/uploads/${user.profile_picture}`}
            alt="Profile preview"
            className="image-preview-large"
          />
        </div>
      )}
    </div>
  )
}

export default Settings