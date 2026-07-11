import express from 'express'
import Skill from '../models/Skill.js'
import { createGenericController } from '../controllers/genericController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()
const { getAll, getOne, create, update, remove } = createGenericController(Skill)

router.get('/', getAll)
router.get('/:id', getOne)
router.post('/', protect, create)
router.put('/:id', protect, update)
router.delete('/:id', protect, remove)

export default router