import { useParams, Link } from 'react-router-dom'
import { useRecipes } from '../context/RecipesContext'
import './RecipeDetail.css'

function RecipeDetail() {
  const { id } = useParams()
  const { recipes, loading } = useRecipes()

  if (loading) return <p className="not-found">Loading...</p>

  const recipe = recipes.find((r) => r.id === parseInt(id))

  if (!recipe) {
    return <p className="not-found">Recipe not found.</p>
  }

  return (
    <div className="recipe-detail">
      <Link to="/recipes" className="back-link">← Back to Recipes</Link>
      <img src={recipe.image} alt={recipe.title} className="detail-image" />
      <h1>{recipe.title}</h1>
      <div className="detail-tags">
        <span>{recipe.time}</span>
        <span>{recipe.difficulty}</span>
        <span>{recipe.cuisine}</span>
      </div>

      <div className="detail-section">
        <h2>Ingredients</h2>
        <ul>
          {recipe.ingredients.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="detail-section">
        <h2>Steps</h2>
        <ol>
          {recipe.steps.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </div>
    </div>
  )
}

export default RecipeDetail