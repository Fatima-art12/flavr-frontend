import { Link } from 'react-router-dom'
import RecipeCard from './RecipeCard'
import './TrendingRecipes.css'
import { useRecipes } from '../context/RecipesContext'

function TrendingRecipes() {
  const { recipes, loading } = useRecipes()
  const trendingRecipes = recipes.slice(0, 6)

  if (loading) return <p style={{ padding: '24px 40px' }}>Loading recipes...</p>

  return (
    <div className="trending-section">
      <div className="section-header">
        <h2>Trending Recipes</h2>
        <span className="view-all">View all</span>
      </div>
      <div className="recipe-row">
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

export default TrendingRecipes