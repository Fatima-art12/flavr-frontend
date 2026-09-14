import { createContext, useContext, useState, useEffect } from 'react'
import imageMap from '../data/imageMap'

const RecipesContext = createContext()

export function RecipesProvider({ children }) {
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchRecipes = () => {
    setLoading(true)
    return fetch('https://flavr-backend-production.up.railway.app/api/recipes')
      .then((res) => res.json())
      .then((data) => {
        const recipesWithImages = data.map((recipe) => ({
          ...recipe,
          image: imageMap[recipe.image] || `https://flavr-backend-production.up.railway.app/uploads/${recipe.image}`,
          time: `${recipe.time_minutes} min`,
          ingredients: recipe.ingredients.split(', '),
          steps: recipe.steps.split('. ').filter((s) => s.trim() !== ''),
        }))
        setRecipes(recipesWithImages)
        setLoading(false)
      })
      .catch((error) => {
        console.error('Failed to fetch recipes:', error)
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchRecipes()
  }, [])

  const refreshRecipes = () => {
    return fetchRecipes()
  }

  return (
    <RecipesContext.Provider value={{ recipes, loading, refreshRecipes }}>
      {children}
    </RecipesContext.Provider>
  )
}

export function useRecipes() {
  return useContext(RecipesContext)
}