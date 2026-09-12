import './Hero.css'
import img1 from '../assets/food1.jpg'
import img2 from '../assets/food2.jpg'
import img3 from '../assets/food3.jpg'
import img4 from '../assets/food4.jpg'
import img5 from '../assets/food5.jpg'

function Hero() {
  return (
    <div className="hero">
      <div className="hero-text">
        <h1>Cook something delicious today.</h1>
        <p>Discover recipes by ingredient or cuisine, follow step-by-step instructions, and save your favorites.</p>
        <div className="hero-buttons">
          <button className="btn-primary">Explore Recipes</button>
          <button className="btn-secondary">What's in my fridge?</button>
        </div>
      </div>
      <div className="hero-images">
        <img className="hero-img hero-img-1" src={img1} alt="Dish 1" />
        <img className="hero-img hero-img-2" src={img2} alt="Dish 2" />
        <img className="hero-img hero-img-3" src={img3} alt="Dish 3" />
        <img className="hero-img hero-img-4" src={img4} alt="Dish 4" />
        <img className="hero-img hero-img-5" src={img5} alt="Dish 5" />
      </div>
    </div>
  )
}

export default Hero