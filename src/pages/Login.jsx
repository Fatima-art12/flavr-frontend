import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Login.css'

function Login() {
  const [isSignup, setIsSignup] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const { signup, login } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (isSignup) {
        // Pehle signup karen
        await signup(formData.name, formData.email, formData.password)
        // Phir turant login kar den (taake user ko dobara form na bharna pade)
        await login(formData.email, formData.password)
      } else {
        await login(formData.email, formData.password)
      }
      // Successful — Home page pe bhej den
      navigate('/')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <h1>{isSignup ? 'Create Account' : 'Welcome Back'}</h1>
        <p className="login-subtitle">
          {isSignup ? 'Sign up to start saving your favorite recipes.' : 'Log in to continue to Flavr.'}
        </p>

        {error && <p className="login-error">{error}</p>}

        <form onSubmit={handleSubmit} className="login-form">
          {isSignup && (
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          <button type="submit" className="login-submit" disabled={loading}>
            {loading ? 'Please wait...' : isSignup ? 'Sign Up' : 'Log In'}
          </button>
        </form>

        <p className="toggle-text">
          {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
          <span className="toggle-link" onClick={() => setIsSignup(!isSignup)}>
            {isSignup ? 'Log In' : 'Sign Up'}
          </span>
        </p>
      </div>
    </div>
  )
}

export default Login