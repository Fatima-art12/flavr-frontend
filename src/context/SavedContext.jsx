import { createContext, useContext, useState, useEffect } from 'react'

const SavedContext = createContext()

export function SavedProvider({ children }) {
  const [savedIds, setSavedIds] = useState([])
  const [loaded, setLoaded] = useState(false)

  // Jab app load ho, localStorage se purani saved list uthayen
  useEffect(() => {
    const saved = localStorage.getItem('flavr_saved_recipes')
    if (saved) {
      setSavedIds(JSON.parse(saved))
    }
    setLoaded(true)
  }, [])

  // Jab bhi savedIds badle, localStorage mein save karen — sirf load hone ke baad
  useEffect(() => {
    if (!loaded) return
    localStorage.setItem('flavr_saved_recipes', JSON.stringify(savedIds))
  }, [savedIds, loaded])

  const toggleSaved = (id) => {
    if (savedIds.includes(id)) {
      setSavedIds(savedIds.filter((savedId) => savedId !== id))
    } else {
      setSavedIds([...savedIds, id])
    }
  }

  return (
    <SavedContext.Provider value={{ savedIds, toggleSaved }}>
      {children}
    </SavedContext.Provider>
  )
}

export function useSaved() {
  return useContext(SavedContext)
}