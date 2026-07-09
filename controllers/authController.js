import jwt from 'jsonwebtoken'
import Admin from '../models/Admin.js'

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' })
}

export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' })
    }

    const admin = await Admin.findOne({ email: email.toLowerCase() })

    if (!admin) {
      return res.status(401).json({ error: 'Invalid email or password' })
    }

    const isMatch = await admin.comparePassword(password)

    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password' })
    }

    const token = generateToken(admin._id)

    res.status(200).json({
      success: true,
      token,
      admin: {
        id: admin._id,
        email: admin.email,
      },
    })
  } catch (error) {
    console.error('Login error:', error.message)
    res.status(500).json({ error: 'Something went wrong. Please try again later.' })
  }
}