import { Router } from 'express'
import { 
	getAllTags, 
	getTag,
	createTag
} from '../controllers/tagController.js'

const router = Router()

// get all tags
router.get('/', getAllTags)

// get tag by id
router.get('/:id', getTag)

// create new tag
router.post('/', createTag)

export default router