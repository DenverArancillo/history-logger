import {
	selectQueryHistoryItems,
	selectQueryHistoryItemById,
	insertQueryHistoryItem
} from '../database/historyItemQueries.js'
import { errorHandler } from './commonController.js'

const historyItemType = process.env.HISTORY_ITEM_TYPES.split('|')

const getAllHistoryItems = async (req, res) => {
	let historyItems = await selectQueryHistoryItems()
	res.status(200).json(historyItems)
}

const getHistoryItem = async (req, res, next) => {
	let id = parseInt(req.params.id)
	let historyItem = await selectQueryHistoryItemById(id)

	if (!historyItem) {
		return next(errorHandler(`A history item with id of ${id} was not found`, 404))
	} else {
		res.status(200).json(historyItem)
	}
}

const createHistoryItem = async (req, res, next) => {
	const newHistoryItem = { 
		history_item_name: req.body.history_item_name,
		history_item_type: req.body.history_item_type
	}

	if (!newHistoryItem.history_item_name) 
		return next(errorHandler('Please include a history item name', 400))

	if (!newHistoryItem.history_item_type)
		return next(errorHandler('Please include a history item type', 400))

	if (!historyItemType.find(i => i === newHistoryItem.history_item_type))
		return next(errorHandler('Please include correct history item type', 400))
	
	try {
		await insertQueryHistoryItem(newHistoryItem)

		res.status(201).json({ message: "Successfully created new history item" })
	} catch (error) {
		console.error(error)

		return next(errorHandler('Create new history item failed', 500))
	}
}

const updateHistoryItem = async (req, res, next) => {

}

const deleteHistoryItem = async (req, res, next) => {

}

export {
	getAllHistoryItems,
	getHistoryItem,
	createHistoryItem,
	updateHistoryItem,
	deleteHistoryItem
}