import './RecipeCard.css'
import { useSaved } from '../context/SavedContext'

function RecipeCard({ id, image, title, time, difficulty, cuisine }) {
  const { savedIds, toggleSaved } = useSaved()
  const isSaved = savedIds.includes(id)

  const handleHeartClick = (e) => {
    e.preventDefault()
    toggleSaved(id)
  }

  return (
    <div className="recipe-card">
      <div className="recipe-image">
        <img src={image} alt={title} className="recipe-photo" />
        <span className="time-badge">{time}</span>
      </div>
      <h3 className="recipe-title">{title}</h3>
      <div className="recipe-footer">
        <p className="recipe-tags">{difficulty} · {cuisine}</p>
        <button className="heart-btn" onClick={handleHeartClick}>
          {isSaved ? '❤️' : '🤍'}
        </button>
      </div>
    </div>
  )
}

export default RecipeCard