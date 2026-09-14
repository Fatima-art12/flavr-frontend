import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)

  useEffect(() => {
    const savedToken = localStorage.getItem('flavr_token')
    const savedUser = localStorage.getItem('flavr_user')
    if (savedToken && savedUser) {
      setToken(savedToken)
      setUser(JSON.parse(savedUser))
    }
  }, [])

  const signup = async (name, email, password) => {
    const response = await fetch('http://https://flavr-backend-production.up.railway.app/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    })
    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message)
    }

    return data
  }

  const login = async (email, password) => {
    const response = await fetch('http://https://flavr-backend-production.up.railway.app/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message)
    }

    setToken(data.token)
    setUser(data.user)
    localStorage.setItem('flavr_token', data.token)
    localStorage.setItem('flavr_user', JSON.stringify(data.user))

    return data
  }

  const logout = () => {
    setToken(null)
    setUser(null)
    localStorage.removeItem('flavr_token')
    localStorage.removeItem('flavr_user')
  }

  const uploadProfilePicture = async (file) => {
    const formData = new FormData()
    formData.append('profilePicture', file)
    formData.append('userId', user.id)

    const response = await fetch('http://https://flavr-backend-production.up.railway.app/api/upload-profile-picture', {
      method: 'POST',
      body: formData
    })
    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message)
    }

    // User object update karen naye picture filename ke sath
    const updatedUser = { ...user, profile_picture: data.filename }
    setUser(updatedUser)
    localStorage.setItem('flavr_user', JSON.stringify(updatedUser))

    return data
  }

  return (
    <AuthContext.Provider value={{ user, token, signup, login, logout, uploadProfilePicture }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}