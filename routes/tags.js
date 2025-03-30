import { Router } from 'express'
import { 
	getAllTags, 
	getTag,
	createTag,
	updateTag
} from '../controllers/tagController.js'

const router = Router()

// get all tags
router.get('/', getAllTags)

// get tag by id
router.get('/:id', getTag)

// create new tag
router.post('/', createTag)

// update post
router.put('/:id', updateTag)

export default router