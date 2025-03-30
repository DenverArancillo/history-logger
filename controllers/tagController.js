import { 
	selectAllTags, 
	selectTagById,
	inserTag
} from '../database/tagQueries.js'

const getAllTags = async (req, res) => {
	let tags = await selectAllTags()
	res.status(200).json(tags)
}

const getTag = async (req, res, next) => {
	const id = parseInt(req.params.id)
	let tag = await selectTagById(id)

	if (!tag) {
		const error = new Error(`A tag with id of ${id} was not found`)
		error.status = 404
		next(error)
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
		await inserTag(newTag)

		let tags = await selectAllTags()
		res.status(201).json(tags)
	} catch (error) {
		console.error(error)

		const errorMessage = new Error(`Create new tag failed`)
		errorMessage.status = 500
		return next(errorMessage)
	}
}

export {
	getAllTags,
	getTag,
	createTag
}