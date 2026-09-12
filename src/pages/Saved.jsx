import { Link } from 'react-router-dom'
import RecipeCard from '../components/RecipeCard'
import { useRecipes } from '../context/RecipesContext'
import { useSaved } from '../context/SavedContext'
import './Recipes.css'

function Saved() {
  const { recipes, loading } = useRecipes()
  const { savedIds } = useSaved()

  const savedRecipes = recipes.filter((recipe) => savedIds.includes(recipe.id))

  if (loading) return <p className="no-results">Loading recipes...</p>

  return (
    <div className="recipes-page">
      <h1>Saved Recipes</h1>
      <div className="recipes-grid">
        {savedRecipes.map((recipe) => (
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
      {!loading && savedRecipes.length === 0 && (
        <p className="no-results">You haven't saved any recipes yet.</p>
      )}
    </div>
  )
}

export default Saved