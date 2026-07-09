import dotenv from 'dotenv'
import mongoose from 'mongoose'
import Admin from './models/Admin.js'

dotenv.config()

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('Connected to MongoDB')

    const existingAdmin = await Admin.findOne({ email: 'ozoigbosarah@gmail.com' })

    if (existingAdmin) {
      console.log('Admin already exists. No new admin created.')
      process.exit()
    }

    const admin = await Admin.create({
      email: 'ozoigbosarah@gmail.com',
      password: 'Sarah123.',
    })

    console.log('Admin created successfully:', admin.email)
    process.exit()
  } catch (error) {
    console.error('Error creating admin:', error.message)
    process.exit(1)
  }
}

createAdmin()