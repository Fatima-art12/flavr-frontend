import { useState, useRef } from 'react'
import Cropper from 'react-easy-crop'
import { useAuth } from '../context/AuthContext'
import { useRecipes } from '../context/RecipesContext'
import getCroppedImg from '../utils/cropImage'
import './Admin.css'

const emptyForm = {
  title: '',
  image: '',
  ingredients: '',
  steps: '',
  time_minutes: '',
  difficulty: 'Easy',
  cuisine: ''
}

function Admin() {
  const { user } = useAuth()
  const { recipes, loading, refreshRecipes } = useRecipes()
  const [formData, setFormData] = useState(emptyForm)
  const [editingId, setEditingId] = useState(null)
  const [confirmDeleteId, setConfirmDeleteId] = useState(null)
  const [saving, setSaving] = useState(false)
  const [uploadingImage, setUploadingImage] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const fileInputRef = useRef(null)

  const [cropModalOpen, setCropModalOpen] = useState(false)
  const [imageToCrop, setImageToCrop] = useState(null)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)

  if (!user || !user.is_admin) {
    return (
      <div className="admin-page">
        <p className="admin-denied">You don't have access to this page.</p>
      </div>
    )
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleFileSelect = (e) => {
    const file = e.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => {
      setImageToCrop(reader.result)
      setCropModalOpen(true)
    }
    reader.readAsDataURL(file)
  }

  const onCropComplete = (croppedArea, croppedAreaPixelsValue) => {
    setCroppedAreaPixels(croppedAreaPixelsValue)
  }

  const handleCropConfirm = async () => {
    try {
      const croppedFile = await getCroppedImg(imageToCrop, croppedAreaPixels)
      setCropModalOpen(false)
      setImageToCrop(null)
      setCrop({ x: 0, y: 0 })
      setZoom(1)

      setUploadingImage(true)
      const uploadData = new FormData()
      uploadData.append('recipeImage', croppedFile)

      const response = await fetch('http://https://flavr-backend-production.up.railway.app/api/upload-recipe-image', {
        method: 'POST',
        body: uploadData
      })
      const data = await response.json()

      if (!response.ok) throw new Error(data.message)

      setFormData((prev) => ({ ...prev, image: data.filename }))
    } catch (err) {
      alert(err.message)
    } finally {
      setUploadingImage(false)
    }
  }

  const handleCropCancel = () => {
    setCropModalOpen(false)
    setImageToCrop(null)
    setCrop({ x: 0, y: 0 })
    setZoom(1)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)

    try {
      if (editingId) {
        const response = await fetch(`http://https://flavr-backend-production.up.railway.app/api/recipes/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        })
        if (!response.ok) throw new Error('Failed to update recipe')
      } else {
        const response = await fetch('http://https://flavr-backend-production.up.railway.app/api/recipes', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        })
        if (!response.ok) throw new Error('Failed to add recipe')
      }

      const wasEditing = editingId
      setFormData(emptyForm)
      setEditingId(null)
      await refreshRecipes()

      setSuccessMessage(wasEditing ? 'Recipe updated successfully!' : 'Recipe added successfully!')
      setTimeout(() => setSuccessMessage(''), 2500)
    } catch (err) {
      alert(err.message)
    } finally {
      setSaving(false)
    }
  }

  const handleEditClick = (recipe) => {
    setFormData({
      title: recipe.title,
      image: recipe.image,
      ingredients: Array.isArray(recipe.ingredients) ? recipe.ingredients.join(', ') : recipe.ingredients,
      steps: Array.isArray(recipe.steps) ? recipe.steps.join('. ') : recipe.steps,
      time_minutes: recipe.time_minutes,
      difficulty: recipe.difficulty,
      cuisine: recipe.cuisine
    })
    setEditingId(recipe.id)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleCancelEdit = () => {
    setFormData(emptyForm)
    setEditingId(null)
  }

  const confirmDeleteNow = async () => {
    try {
      const response = await fetch(`http://https://flavr-backend-production.up.railway.app/api/recipes/${confirmDeleteId}`, {
        method: 'DELETE'
      })
      if (!response.ok) throw new Error('Failed to delete recipe')
      setConfirmDeleteId(null)
      await refreshRecipes()
    } catch (err) {
      alert(err.message)
    }
  }

  return (
    <div className="admin-page">
      <h1>Admin Dashboard</h1>

      {successMessage && <div className="admin-success-banner">{successMessage}</div>}

      <div className="admin-form-card">
        <h2>{editingId ? 'Edit Recipe' : 'Add New Recipe'}</h2>
        <form onSubmit={handleSubmit} className="admin-form">
          <input
            type="text"
            name="title"
            placeholder="Recipe Title"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <div className="admin-image-upload">
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleFileSelect}
              style={{ display: 'none' }}
            />
            <button
              type="button"
              className="admin-btn-cancel"
              onClick={() => fileInputRef.current.click()}
              disabled={uploadingImage}
            >
              {uploadingImage ? 'Uploading...' : 'Choose Image'}
            </button>
            {formData.image && (
              <span className="admin-image-filename">{formData.image}</span>
            )}
          </div>

          <textarea
            name="ingredients"
            placeholder="Ingredients (comma separated)"
            value={formData.ingredients}
            onChange={handleChange}
            required
          />
          <textarea
            name="steps"
            placeholder="Steps"
            value={formData.steps}
            onChange={handleChange}
            required
          />
          <div className="admin-form-row">
            <input
              type="number"
              name="time_minutes"
              placeholder="Time (minutes)"
              value={formData.time_minutes}
              onChange={handleChange}
            />
            <select name="difficulty" value={formData.difficulty} onChange={handleChange}>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
            <select name="cuisine" value={formData.cuisine} onChange={handleChange} required>
              <option value="">Select Cuisine</option>
              <option value="Italian">Italian</option>
              <option value="Desi">Desi</option>
              <option value="Chinese">Chinese</option>
              <option value="Mexican">Mexican</option>
              <option value="Breakfast">Breakfast</option>
              <option value="Desserts">Desserts</option>
              <option value="Healthy">Healthy</option>
              <option value="Asian">Asian</option>
              <option value="Seafood">Seafood</option>
              <option value="Comfort">Comfort</option>
              <option value="Snacks">Snacks</option>
              <option value="Drinks">Drinks</option>
            </select>
          </div>
          <div className="admin-form-buttons">
            <button type="submit" className="admin-btn-primary" disabled={saving}>
              {saving ? 'Saving...' : editingId ? 'Update Recipe' : 'Add Recipe'}
            </button>
            {editingId && (
              <button type="button" className="admin-btn-cancel" onClick={handleCancelEdit}>
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="admin-list">
        <h2>All Recipes ({recipes.length})</h2>
        {loading && <p>Loading...</p>}
        {recipes.map((recipe) => (
          <div key={recipe.id} className="admin-recipe-row">
            <span className="admin-recipe-title">{recipe.title}</span>
            <span className="admin-recipe-cuisine">{recipe.cuisine}</span>
            <div className="admin-recipe-actions">
              <button className="admin-btn-edit" onClick={() => handleEditClick(recipe)}>
                Edit
              </button>
              <button className="admin-btn-delete" onClick={() => setConfirmDeleteId(recipe.id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {confirmDeleteId && (
        <div className="confirm-overlay" onClick={() => setConfirmDeleteId(null)}>
          <div className="confirm-box" onClick={(e) => e.stopPropagation()}>
            <p>Delete this recipe? This cannot be undone.</p>
            <div className="confirm-buttons">
              <button className="confirm-cancel" onClick={() => setConfirmDeleteId(null)}>
                Cancel
              </button>
              <button className="confirm-remove" onClick={confirmDeleteNow}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {cropModalOpen && (
        <div className="crop-modal-overlay">
          <div className="crop-modal-box">
            <div className="crop-container">
              <Cropper
                image={imageToCrop}
                crop={crop}
                zoom={zoom}
                aspect={4 / 3}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            </div>
            <input
              type="range"
              min={1}
              max={3}
              step={0.1}
              value={zoom}
              onChange={(e) => setZoom(e.target.value)}
              className="crop-zoom-slider"
            />
            <div className="crop-modal-buttons">
              <button className="confirm-cancel" onClick={handleCropCancel}>
                Cancel
              </button>
              <button className="admin-btn-primary" onClick={handleCropConfirm}>
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Admin