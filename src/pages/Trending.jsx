import { Link } from 'react-router-dom'
import RecipeCard from '../components/RecipeCard'
import './Recipes.css'
import { useRecipes } from '../context/RecipesContext'

function Trending() {
  const { recipes, loading } = useRecipes()
  const trendingRecipes = recipes.slice(0, 6)

  if (loading) return <p className="no-results">Loading recipes...</p>

  return (
    <div className="recipes-page">
      <h1>Trending Recipes</h1>
      <div className="recipes-grid">
        {trendingRecipes.map((recipe) => (
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
    </div>
  )
}

export default Trending