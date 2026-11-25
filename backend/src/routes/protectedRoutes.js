import express from 'express'

import { authenticateUser } from '../middleware/authMiddleware.js'
import { authorizeRoles } from '../middleware/authorizeRoles.js'

const router = express.Router()

// Any authenticated user can access this route
router.get('/me', authenticateUser, (req, res) => {
  res.json({
    success: true,
    message: 'You accessed a protected route',
    user: req.user,
  })
})

// Only admins can access this route
router.get(
  '/admin',
  authenticateUser,
  authorizeRoles('admin'),
  (req, res) => {
    res.json({
      success: true,
      message: 'Welcome to the InspectAI admin area',
    })
  }
)

export default router