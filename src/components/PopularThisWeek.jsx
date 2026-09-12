import { Link } from 'react-router-dom'
import RecipeCard from './RecipeCard'
import './TrendingRecipes.css'
import { useRecipes } from '../context/RecipesContext'

function PopularThisWeek() {
  const { recipes, loading } = useRecipes()
  const popularRecipes = recipes.slice(6, 12)

  if (loading) return null

  return (
    <div className="trending-section">
      <div className="section-header">
        <h2>Popular This Week</h2>
        <span className="view-all">View all</span>
      </div>
      <div className="recipe-row">
        {popularRecipes.map((recipe) => (
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

export default PopularThisWeek