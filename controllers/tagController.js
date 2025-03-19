import { selectAllTags, selectTagById } from '../database/tagQueries.js'

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

export {
	getAllTags,
	getTag
}