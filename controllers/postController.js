let posts = [
	{ id: 1, title: 'Post one'},
	{ id: 2, title: 'Post two'},
	{ id: 3, title: 'Post three'},
]

/**
 * Get all posts
 * 
 * GET /api/posts
 */
const getAllPosts = (req, res) => {
	const limit = parseInt(req.query.limit)

	if (!isNaN(limit) && limit > 0) {
		res.status(200).json(posts.slice(0, limit))
	} else {
		res.status(200).json(posts)
	}
}

/**
 * Get single post
 * 
 * GET /api/posts/:id
 */
const getPost = (req, res, next) => {
	const id = parseInt(req.params.id)
	const post = posts.find(post => post.id === id)

	if (!post) {
		const error = new Error(`A post with id of ${id} was not found`)
		error.status = 404
		next(error)
	} else {
		res.status(200).json(post)
	}
}

/**
 * Create a new post
 * 
 * POST /api/posts
 */
const createPost = (req, res, next) => {
	const newPosts = { 
		id: posts.length + 1,
		title: req.body.title
	}

	if (!newPosts.title) {
		const error = new Error("Please include a title")
		error.status = 400
		next(error)

	} else {
		posts.push(newPosts)
		res.status(201).json(posts)
	}
}


/**
 * Update post
 * 
 * PUT /api/posts/:id
 */
const updatePost = (req, res, next) => {
	const id = parseInt(req.params.id)
	const post = posts.find(post => post.id === id)

	if (!post) {
		const error = new Error(`A post with id of ${id} was not found`)
		error.status = 404
		next(error)
	} else {
		post.title = req.body.title
		res.status(200).json(posts)
	}
}

/**
 * Delete post
 * 
 * DELETE /api/posts/:id
 */
const deletePost =  (req, res, next) => {
	const id = parseInt(req.params.id)
	const post = posts.find(post => post.id === id)

	if (!post) {
		const error = new Error(`A post with id of ${id} was not found`)
		error.status = 404
		next(error)
	} else {
		posts = posts.filter(post => post.id !== id)
		res.status(200).json(posts)
	}
}

export {
	getAllPosts,
	getPost,
	createPost,
	updatePost,
	deletePost
}