import { Router } from 'express'
import { 
	getAllTags, 
	getTag,
	createTag,
	updateTag,
	deleteTag
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

// delete post
router.delete('/:id', deleteTag)

export default router