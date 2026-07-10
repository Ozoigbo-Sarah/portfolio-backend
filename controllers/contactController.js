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

export const getMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 })
    res.status(200).json({ success: true, data: messages })
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch messages' })
  }
}

export const markAsRead = async (req, res) => {
  try {
    const message = await Message.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    )
    if (!message) {
      return res.status(404).json({ error: 'Message not found' })
    }
    res.status(200).json({ success: true, data: message })
  } catch (error) {
    res.status(500).json({ error: 'Failed to update message' })
  }
}

export const deleteMessage = async (req, res) => {
  try {
    const message = await Message.findByIdAndDelete(req.params.id)
    if (!message) {
      return res.status(404).json({ error: 'Message not found' })
    }
    res.status(200).json({ success: true, data: {} })
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete message' })
  }
}