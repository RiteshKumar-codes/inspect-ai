
import multer from 'multer'
import path from 'path'
import crypto from 'crypto'
import fs from 'fs'

const uploadDirectory = path.resolve('uploads')

// Create the directory if it doesn't exist.
fs.mkdirSync(uploadDirectory, { recursive: true })

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDirectory)
  },

  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname).toLowerCase()
    const uniqueName = `${crypto.randomUUID()}${extension}`

    cb(null, uniqueName)
  },
})

// Initial checks: MIME type and extension.
const allowedMimeTypes = [
  'image/jpeg',
  'image/png',
  'image/webp',
]

const allowedExtensions = ['.jpg', '.jpeg', '.png', '.webp']

const fileFilter = (req, file, cb) => {
  const extension = path.extname(file.originalname).toLowerCase()

  if (
    allowedMimeTypes.includes(file.mimetype) &&
    allowedExtensions.includes(extension)
  ) {
    cb(null, true)
  } else {
    cb(new Error('Only JPG, PNG and WEBP images are allowed.'))
  }
}

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
    files: 1,
  },
})

export default upload
