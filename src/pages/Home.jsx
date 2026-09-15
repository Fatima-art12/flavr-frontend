import { useState } from 'react'
import { Link } from 'react-router-dom'
import Hero from '../components/Hero'
import TrendingRecipes from '../components/TrendingRecipes'
import CuisineFilter from '../components/CuisineFilter'
import PopularThisWeek from '../components/PopularThisWeek'
import RecipeCard from '../components/RecipeCard'
import { useRecipes } from '../context/RecipesContext'

function Home() {
  const [selectedCuisine, setSelectedCuisine] = useState('All')
  const { recipes } = useRecipes()

  const filteredRecipes = recipes.filter((r) => r.cuisine === selectedCuisine)

  return (
    <>
      <Hero />
      <TrendingRecipes />
      <CuisineFilter selected={selectedCuisine} onSelect={setSelectedCuisine} />

      {selectedCuisine !== 'All' && (
        <div className="trending-section">
          <div className="section-header">
            <h2>{selectedCuisine} Recipes</h2>
          </div>
          <div className="recipe-row">
            {filteredRecipes.length === 0 ? (
              <p style={{ padding: '0 40px' }}>No recipes found for {selectedCuisine}.</p>
            ) : (
              filteredRecipes.map((recipe) => (
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
              ))
            )}
          </div>
        </div>
      )}

      <PopularThisWeek />
    </>
  )
}

export default Home