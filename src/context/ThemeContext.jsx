import { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false)

  // Jab app load ho, localStorage se pehli preference check karen
  useEffect(() => {
    const saved = localStorage.getItem('flavr_dark_mode')
    if (saved === 'true') {
      setDarkMode(true)
    }
  }, [])

  // Jab darkMode badle, HTML tag pe class add/remove karen aur localStorage update karen
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('flavr_dark_mode', darkMode)
  }, [darkMode])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}