import { Router } from 'express'
import {
	getAllHistoryItems,
	getHistoryItem,
	createHistoryItem,
	updateHistoryItemName,
	updateHistoryItemType,
	deleteHistoryItem
} from '../controllers/historyItemController'

const router = Router()

// get all history items
router.get('/', getAllHistoryItems)

// get single history item
router.get('/:id', getHistoryItem)

// create new history item
router.post('/', createHistoryItem)

// update history item name
router.put('/updateName/:id', updateHistoryItemName)

// update history item type
router.put('/updateType/:id', updateHistoryItemType)

// delete history item
router.delete('/:id', deleteHistoryItem)

export default router