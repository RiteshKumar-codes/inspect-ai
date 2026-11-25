
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'

import authRoutes from './routes/authRoutes.js'
import protectedRoutes from './routes/protectedRoutes.js'

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

// Handle unknown routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'API route not found',
  })
})

export default app
