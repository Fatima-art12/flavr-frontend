// Yeh function crop ki gayi image ko ek naye File object mein convert karta hai
export default function getCroppedImg(imageSrc, croppedAreaPixels) {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.crossOrigin = 'anonymous'
    image.src = imageSrc

    image.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = croppedAreaPixels.width
      canvas.height = croppedAreaPixels.height
      const ctx = canvas.getContext('2d')

      ctx.drawImage(
        image,
        croppedAreaPixels.x,
        croppedAreaPixels.y,
        croppedAreaPixels.width,
        croppedAreaPixels.height,
        0,
        0,
        croppedAreaPixels.width,
        croppedAreaPixels.height
      )

      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error('Canvas is empty'))
          return
        }
        const file = new File([blob], 'cropped-image.jpg', { type: 'image/jpeg' })
        resolve(file)
      }, 'image/jpeg')
    }

    image.onerror = (error) => reject(error)
  })
}