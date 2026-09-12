import { useState } from 'react'
import { Link } from 'react-router-dom'
import RecipeCard from '../components/RecipeCard'
import './Recipes.css'
import '../components/CuisineFilter.css'
import { useRecipes } from '../context/RecipesContext'

const cuisineList = ['All', 'Italian', 'Desi', 'Asian', 'Breakfast', 'Snacks', 'Dessert', 'Comfort', 'Seafood', 'Mexican', 'Drinks']

function Cuisines() {
  const { recipes, loading } = useRecipes()
  const [selected, setSelected] = useState('All')

  const filteredRecipes =
    selected === 'All' ? recipes : recipes.filter((recipe) => recipe.cuisine === selected)

  if (loading) return <p className="no-results">Loading recipes...</p>

  return (
    <div className="recipes-page">
      <h1>Cuisines</h1>
      <div className="cuisine-filter" style={{ marginBottom: '24px' }}>
        {cuisineList.map((cuisine, index) => (
          <button
            key={index}
            className={selected === cuisine ? 'pill pill-active' : 'pill'}
            onClick={() => setSelected(cuisine)}
          >
            {cuisine}
          </button>
        ))}
      </div>
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
      {filteredRecipes.length === 0 && (
        <p className="no-results">No recipes found for this cuisine.</p>
      )}
    </div>
  )
}

export default Cuisines