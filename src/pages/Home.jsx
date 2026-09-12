import Hero from '../components/Hero'
import TrendingRecipes from '../components/TrendingRecipes'
import CuisineFilter from '../components/CuisineFilter'
import PopularThisWeek from '../components/PopularThisWeek'

function Home() {
  return (
    <>
      <Hero />
      <TrendingRecipes />
      <CuisineFilter />
      <PopularThisWeek />
    </>
  )
}

export default Home