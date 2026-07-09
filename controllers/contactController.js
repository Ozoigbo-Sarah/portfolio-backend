import Message from '../models/Message.js'

export const submitMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'All fields are required' })
    }

    const newMessage = await Message.create({ name, email, subject, message })

    res.status(201).json({
      success: true,
      data: newMessage,
    })
  } catch (error) {
    console.error('Error saving message:', error.message)
    res.status(500).json({ error: 'Something went wrong. Please try again later.' })
  }
}