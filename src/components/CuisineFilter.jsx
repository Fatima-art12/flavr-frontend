import './CuisineFilter.css'

const cuisines = ['All', 'Italian', 'Desi', 'Chinese', 'Mexican', 'Breakfast', 'Desserts', 'Healthy']

function CuisineFilter({ selected, onSelect }) {
  return (
    <div className="cuisine-section">
      <h2>Explore by Cuisine</h2>
      <div className="cuisine-filter">
        {cuisines.map((cuisine, index) => (
          <button
            key={index}
            className={selected === cuisine ? 'pill pill-active' : 'pill'}
            onClick={() => onSelect(cuisine)}
          >
            {cuisine}
          </button>
        ))}
      </div>
    </div>
  )
}

export default CuisineFilter