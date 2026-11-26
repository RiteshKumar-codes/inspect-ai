
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'

import authRoutes from './routes/authRoutes.js'
import protectedRoutes from './routes/protectedRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'

const app = express()

// Security headers
app.use(helmet())

// Allow requests from our React frontend
app.use(cors({
  origin: process.env.CLIENT_URL,
}))

// Parse JSON request bodies
app.use(express.json())

// Limit repeated authentication requests
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
})

app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'InspectAI backend is running',
  })
})

app.use('/api/auth', authLimiter, authRoutes)
app.use('/api/protected', protectedRoutes)
app.use('/api/uploads', uploadRoutes)

app.use((error, req, res, next) => {
  if (error.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({
      success: false,
      message: 'Image must be smaller than 5 MB.',
    })
  }

  if (error.code === 'LIMIT_FILE_COUNT') {
    return res.status(400).json({
      success: false,
      message: 'Only one image is allowed.',
    })
  }

  if (error.message === 'Only JPG, PNG and WEBP images are allowed.') {
    return res.status(400).json({
      success: false,
      message: error.message,
    })
  }

  console.error(error)

  return res.status(500).json({
    success: false,
    message: 'Something went wrong while processing the request.',
  })
})

// Handle unknown routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'API route not found',
  })
})

export default app
