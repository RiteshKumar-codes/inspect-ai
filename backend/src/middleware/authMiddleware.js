
import jwt from 'jsonwebtoken'

export const authenticateUser = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization

    // Check Authorization header
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Authentication token required',
      })
    }

    // Extract token
    const token = authHeader.split(' ')[1]

    // Verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET,
      {
        issuer: 'inspectai-api',
      }
    )

    // Attach authenticated user to request
    req.user = {
      userId: decoded.userId,
      role: decoded.role,
    }

    next()

  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token',
    })
  }
}
