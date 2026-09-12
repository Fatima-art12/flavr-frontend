import { useState, useEffect } from 'react'
import './MealPlanner.css'
import { useRecipes } from '../context/RecipesContext'

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

function MealPlanner() {
  const { recipes, loading } = useRecipes()
  const [plan, setPlan] = useState({})
  const [loaded, setLoaded] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(null) // { day, recipeId } ya null

  useEffect(() => {
    const saved = localStorage.getItem('flavr_meal_plan')
    if (saved) {
      setPlan(JSON.parse(saved))
    }
    setLoaded(true)
  }, [])

  useEffect(() => {
    if (!loaded) return
    localStorage.setItem('flavr_meal_plan', JSON.stringify(plan))
  }, [plan, loaded])

  const handleAdd = (day, recipeId) => {
    if (!recipeId) return
    const dayMeals = plan[day] || []
    if (dayMeals.includes(parseInt(recipeId))) return
    setPlan({ ...plan, [day]: [...dayMeals, parseInt(recipeId)] })
  }

  const requestRemove = (day, recipeId) => {
    setConfirmDelete({ day, recipeId })
  }

  const confirmRemoveNow = () => {
    const { day, recipeId } = confirmDelete
    const dayMeals = plan[day] || []
    setPlan({ ...plan, [day]: dayMeals.filter((id) => id !== recipeId) })
    setConfirmDelete(null)
  }

  if (loading) return <p style={{ padding: '24px 40px' }}>Loading recipes...</p>

  return (
    <div className="meal-planner-page">
      <h1>Meal Planner</h1>
      <div className="planner-list">
        {days.map((day) => {
          const dayMeals = plan[day] || []

          return (
            <div key={day} className="planner-row planner-row-column">
              <span className="planner-day">{day}</span>

              <select
                className="planner-select"
                value=""
                onChange={(e) => handleAdd(day, e.target.value)}
              >
                <option value="">Add a meal...</option>
                {recipes.map((recipe) => (
                  <option key={recipe.id} value={recipe.id}>
                    {recipe.title}
                  </option>
                ))}
              </select>

              <div className="planner-meals">
                {dayMeals.length === 0 && (
                  <span className="planner-empty">No meals planned</span>
                )}
                {dayMeals.map((recipeId) => {
                  const recipe = recipes.find((r) => r.id === recipeId)
                  if (!recipe) return null
                  return (
                    <div key={recipeId} className="planner-meal-chip">
                      <img
                        src={recipe.image}
                        alt={recipe.title}
                        className="planner-thumb"
                      />
                      <span>{recipe.title}</span>
                      <button
                        className="planner-remove-btn"
                        onClick={() => requestRemove(day, recipeId)}
                      >
                        ✕
                      </button>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      {confirmDelete && (
        <div className="confirm-overlay" onClick={() => setConfirmDelete(null)}>
          <div className="confirm-box" onClick={(e) => e.stopPropagation()}>
            <p>Remove this meal from your plan?</p>
            <div className="confirm-buttons">
              <button className="confirm-cancel" onClick={() => setConfirmDelete(null)}>
                Cancel
              </button>
              <button className="confirm-remove" onClick={confirmRemoveNow}>
                Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MealPlanner