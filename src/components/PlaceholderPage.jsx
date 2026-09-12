import './PlaceholderPage.css'

function PlaceholderPage({ title, message }) {
  return (
    <div className="placeholder-page">
      <h1>{title}</h1>
      <p>{message}</p>
    </div>
  )
}

export default PlaceholderPage