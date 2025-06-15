import { errorHandler } from './commonFunctions.js'
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
		return next(errorHandler(`A tag with id of ${id} was not found`, 404))
	} else {
		res.status(200).json(tag)
	}
}

const createTag = async (req, res, next) => {
	const newTag = { tag_name: req.body.tag_name }

	if (!newTag.tag_name) {
		return next(errorHandler('Please include a tag name', 400))
	}

	try {
		await insertQueryTag(newTag)

		let tags = await selectQueryAllTags()
		res.status(201).json(tags)
	} catch (error) {
		console.error(error)

		return next(errorHandler(`Create new tag failed`, 500))
	}
}

const updateTag = async (req, res, next) => {
	const id = parseInt(req.params.id)
	const updateTag = { id, tag_name: req.body.tag_name }

	let tag = await selectQueryTagById(id)
	if (!tag) {
		return next(errorHandler(`A tag with id of ${id} was not found`, 404))
	}

	try {
		await updateQueryTag(updateTag)

		let updatedTag = await selectQueryTagById(id)
		res.status(200).json(updatedTag)
	} catch (error) {
		console.error(error)

		return next(errorHandler(`Update new tag failed`, 500))
	}
}

const deleteTag = async (req, res, next) => {
	const id = parseInt(req.params.id)

	let tag = await selectQueryTagById(id)
	if (!tag) {
		return next(errorHandler(`A tag with id of ${id} was not found`, 404))
	}
	
	try {
		await deleteQueryTag(id)
		res.status(200).json({ message: 'Successfully deleted' })
	} catch (error) {
		console.error(error)

		return next(errorHandler(`Delete tag failed`, 500))
	}
}

export {
	getAllTags,
	getTag,
	createTag,
	updateTag,
	deleteTag
}