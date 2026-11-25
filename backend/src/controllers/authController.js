
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import pool from '../config/db.js'

// Register a new user
export const registerUser = async (req, res) => {
  try {
    const { fullName, email, password } = req.body

    // Validate required fields
    if (!fullName?.trim() || !email?.trim() || !password) {
      return res.status(400).json({
        success: false,
        message: 'Name, email and password are required',
      })
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: 'Password must contain at least 8 characters',
      })
    }

    const normalizedEmail = email.trim().toLowerCase()

    // Hash password
    const passwordHash = await bcrypt.hash(password, 12)

    // Save user in PostgreSQL
    const result = await pool.query(
      `INSERT INTO users (full_name, email, password_hash)
       VALUES ($1, $2, $3)
       RETURNING user_id, full_name, email, role, created_at`,
      [fullName.trim(), normalizedEmail, passwordHash]
    )

    return res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user: result.rows[0],
    })

  } catch (error) {
    if (error.code === '23505') {
      return res.status(409).json({
        success: false,
        message: 'Email is already registered',
      })
    }

    console.error('Registration error:', error)

    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    })
  }
}

// login user

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email?.trim() || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required',
      })
    }

    const normalizedEmail = email.trim().toLowerCase()

    // Find user by email
    const result = await pool.query(
      `SELECT user_id, full_name, email, password_hash, role
       FROM users
       WHERE email = $1`,
      [normalizedEmail]
    )

    const user = result.rows[0]

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      })
    }

    // Compare entered password with stored hash
    const isPasswordValid = await bcrypt.compare(
      password,
      user.password_hash
    )

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      })
    }

    // Create JWT token
    const token = jwt.sign(
      {
        userId: user.user_id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '1h',
        issuer: 'inspectai-api',
      }
    )

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        userId: user.user_id,
        fullName: user.full_name,
        email: user.email,
        role: user.role,
      },
    })

  } catch (error) {
    console.error('Login error:', error)

    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    })
  }
}
