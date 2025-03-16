import { Router } from 'express'
import { getAllPosts, 
	getPost, 
	createPost, 
	updatePost, 
	deletePost 
} from '../controllers/postController.js'

const router = Router()

// get all posts
router.get('/', getAllPosts)

// get single post
router.get('/:id', getPost)

// create new post
router.post('/', createPost)

// update post
router.put('/:id', updatePost)

// delete post
router.delete('/:id', deletePost)

export default router