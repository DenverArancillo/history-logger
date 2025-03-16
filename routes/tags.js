import { Router } from 'express'
import { getAllTags, getTag } from '../controllers/tagController.js'

const router = Router()

// get all tags
router.get('/', getAllTags)

// get tag by id
// to implement logic
router.get('/:id', getTag)

export default router