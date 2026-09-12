import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Home from './pages/Home'
import Settings from './pages/Settings'
import Trending from './pages/Trending'
import Recipes from './pages/Recipes'
import Cuisines from './pages/Cuisines'
import Saved from './pages/Saved'
import MealPlanner from './pages/MealPlanner'
import RecipeDetail from './pages/RecipeDetail'
import Login from './pages/Login'
import Admin from './pages/Admin'
import { SavedProvider } from './context/SavedContext'
import { RecipesProvider } from './context/RecipesContext'
import { AuthProvider } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <SavedProvider>
          <RecipesProvider>
            <BrowserRouter>
              <div className="app-container">
                <Sidebar />
                <div className="main-content">
                  <Navbar />
                  <div className="page-content">
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/settings" element={<Settings />} />
                      <Route path="/trending" element={<Trending />} />
                      <Route path="/recipes" element={<Recipes />} />
                      <Route path="/cuisines" element={<Cuisines />} />
                      <Route path="/saved" element={<Saved />} />
                      <Route path="/meal-planner" element={<MealPlanner />} />
                      <Route path="/recipe/:id" element={<RecipeDetail />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/admin" element={<Admin />} />
                    </Routes>
                  </div>
                </div>
              </div>
            </BrowserRouter>
          </RecipesProvider>
        </SavedProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App