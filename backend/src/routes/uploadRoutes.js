
import express from 'express'

import upload from '../middleware/uploadMiddleware.js'
import { authenticateUser } from '../middleware/authMiddleware.js'
import { uploadProductImage } from '../controllers/uploadController.js'

const router = express.Router()

router.post(
  '/image',
  authenticateUser,
  upload.single('image'),
  uploadProductImage
)

export default router
