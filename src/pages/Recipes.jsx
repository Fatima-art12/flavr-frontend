import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import RecipeCard from '../components/RecipeCard'
import './Recipes.css'
import { useRecipes } from '../context/RecipesContext'

function Recipes() {
  const { recipes, loading } = useRecipes()
  const [searchParams] = useSearchParams()
  const [searchText, setSearchText] = useState(searchParams.get('search') || '')

  useEffect(() => {
    setSearchText(searchParams.get('search') || '')
  }, [searchParams])

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(searchText.toLowerCase())
  )

  if (loading) return <p className="no-results">Loading recipes...</p>

  return (
    <div className="recipes-page">
      <h1>All Recipes</h1>
      <input
        type="text"
        className="recipes-search"
        placeholder="Search recipes..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <div className="recipes-grid">
        {filteredRecipes.map((recipe) => (
          <Link key={recipe.id} to={`/recipe/${recipe.id}`} className="card-link">
            <RecipeCard
              id={recipe.id}
              image={recipe.image}
              title={recipe.title}
              time={recipe.time}
              difficulty={recipe.difficulty}
              cuisine={recipe.cuisine}
            />
          </Link>
        ))}
      </div>
      {!loading && filteredRecipes.length === 0 && (
        <p className="no-results">No recipes found.</p>
      )}
    </div>
  )
}

export default Recipes