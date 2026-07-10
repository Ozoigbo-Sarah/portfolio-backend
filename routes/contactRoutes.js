import express from 'express'
import {
  submitMessage,
  getMessages,
  markAsRead,
  deleteMessage,
} from '../controllers/contactController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/', submitMessage)
router.get('/', protect, getMessages)
router.put('/:id/read', protect, markAsRead)
router.delete('/:id', protect, deleteMessage)

export default router