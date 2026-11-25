
import dotenv from 'dotenv'
dotenv.config()

import app from './app.js'
import pool from './config/db.js'

const PORT = process.env.PORT || 5000

async function startServer() {
  try {
    // Check database connection
    await pool.query('SELECT NOW()')

    console.log('PostgreSQL connected successfully')

    app.listen(PORT, () => {
      console.log(`InspectAI server running on port ${PORT}`)
    })
  } catch (error) {
    console.error('Server startup failed:', error.message)
    process.exit(1)
  }
}

startServer()
