import { selectAllTags, selectTag } from '../database/tagQueries.js'

const getAllTags = async (req, res) => {
	let tags = await selectAllTags()
	res.status(200).json(tags)
}

const getTag = async (req, res, next) => {
	// const id = parseInt(req.params.id)


	let tag = await selectTag()
	res.status(200).json(tag)
}

export {
	getAllTags,
	getTag
}