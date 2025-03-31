import { 
	selectQueryAllTags, 
	selectQueryTagById,
	insertQueryTag,
	updateQueryTag,
	deleteQueryTag
} from '../database/tagQueries.js'

const getAllTags = async (req, res) => {
	let tags = await selectQueryAllTags()
	res.status(200).json(tags)
}

const getTag = async (req, res, next) => {
	const id = parseInt(req.params.id)
	let tag = await selectQueryTagById(id)

	if (!tag) {
		const error = new Error(`A tag with id of ${id} was not found`)
		error.status = 404
		return next(error)
	} else {
		res.status(200).json(tag)
	}
}

const createTag = async (req, res, next) => {
	const newTag = { tag_name: req.body.tag_name }

	if (!newTag.tag_name) {
		const error = new Error('Please include a tag name')
		error.status = 400
		return next(error)
	}

	try {
		await insertQueryTag(newTag)

		let tags = await selectQueryAllTags()
		res.status(201).json(tags)
	} catch (error) {
		console.error(error)

		const errorMessage = new Error(`Create new tag failed`)
		errorMessage.status = 500
		return next(errorMessage)
	}
}

const updateTag = async (req, res, next) => {
	const id = parseInt(req.params.id)
	const updateTag = { id, tag_name: req.body.tag_name }

	let tag = await selectQueryTagById(id)
	if (!tag) {
		const error = new Error(`A tag with id of ${id} was not found`)
		error.status = 404
		return next(error)
	}

	try {
		await updateQueryTag(updateTag)

		let updatedTag = await selectQueryTagById(id)
		res.status(200).json(updatedTag)
	} catch (error) {
		console.error(error)

		const errorMessage = new Error(`Update new tag failed`)
		errorMessage.status = 500
		return next(errorMessage)
	}
}

const deleteTag = async (req, res, next) => {
	const id = parseInt(req.params.id)

	let tag = await selectQueryTagById(id)
	if (!tag) {
		const error = new Error(`A tag with id of ${id} was not found`)
		error.status = 404
		return next(error)
	}
	
	try {
		await deleteQueryTag(id)
		res.status(200).json({ message: 'Successfully deleted' })
	} catch (error) {
		console.error(error)

		const errorMessage = new Error(`Delete tag failed`)
		errorMessage.status = 500
		return next(errorMessage)
	}
}

export {
	getAllTags,
	getTag,
	createTag,
	updateTag,
	deleteTag
}