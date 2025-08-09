import { NextFunction, Request, Response } from 'express'
import { errorHandler } from './commonFunctions'
import { 
	selectQueryAllTags,
	selectQueryTagById,
	insertQueryTag,
	updateQueryTag,
	deleteQueryTag
} from '../database/tagQueries'

import { PrepareTag, Tag } from '../ts/interface/database/tags'

const getAllTags = async (_req: Request, res: Response): Promise<void> => {
	let tags: Tag[] = await selectQueryAllTags()
	res.status(200).json(tags)
}

const getTag = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	const id: number = parseInt(req.params.id)
	let tag: Tag = await selectQueryTagById(id)

	if (!tag) {
		return next(errorHandler(`A tag with id of ${id} was not found`, 404))
	} else {
		res.status(200).json(tag)
	}
}

const createTag = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	const newTag: PrepareTag = { tag_name: req.body.tag_name }

	if (!newTag.tag_name)
		return next(errorHandler('Please include a tag name', 400))

	try {
		await insertQueryTag(newTag)

		let tags: Tag[] = await selectQueryAllTags()
		res.status(201).json(tags)
	} catch (error) {
		console.error(error)

		return next(errorHandler(`Create new tag failed`, 500))
	}
}

const updateTag = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	const id: number = parseInt(req.params.id)
	const updateTag: PrepareTag = { id, tag_name: req.body.tag_name }

	if (!updateTag.tag_name)
		return next(errorHandler('Please include a tag name', 400))

	let tag: Tag = await selectQueryTagById(id)
	if (!tag)
		return next(errorHandler(`A tag with id of ${id} was not found`, 404))

	try {
		await updateQueryTag(updateTag)

		let updatedTag: Tag = await selectQueryTagById(id)
		res.status(200).json(updatedTag)
	} catch (error) {
		console.error(error)

		return next(errorHandler(`Update new tag failed`, 500))
	}
}

const deleteTag = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	const id: number = parseInt(req.params.id)

	let tag: Tag = await selectQueryTagById(id)
	if (!tag)
		return next(errorHandler(`A tag with id of ${id} was not found`, 404))
	
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