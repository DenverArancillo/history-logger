import commonSql from "./commonSql"
import {
	PrepareInsertHistoryItem,
	PrepareUpdateHistoryItem,
	HistoryItem
} from "../ts/interface/database/historyItem"

const selectQueryHistoryItems = async (): Promise<HistoryItem[]> => {
	try {
		return await commonSql.selectAll<HistoryItem>('history_item')
	} catch (error) {
		throw new Error('historyItemQueries select all historyItems' + error)
	}
}

const selectQueryHistoryItemById = async (id: number): Promise<HistoryItem> => {
	try {
		return await commonSql.selectById<HistoryItem>('history_item', id)
	} catch (error) {
		throw new Error('historyItemQueries select historyItem by id' + error)
	}
}

const selectQueryHistoryItemByName = async (name: string): Promise<HistoryItem> => {
	try {
		return await commonSql.selectByColumnIsEqualTo<HistoryItem>('history_item', 'history_item_name', name)
	} catch (error) {
		throw new Error('historyItemQueries select historyItem by name' + error)
	}
}

/**
 * Insert new historyItem object to the database
 * @param {object} newHistoryItem New tag object
 * @param {string} newHistoryItem.history_item_name history item name
 * @param {string} newHistoryItem.history_item_type history type name
 */
const insertQueryHistoryItem = async (newHistoryItem: PrepareInsertHistoryItem): Promise<void> => {
	try {
		await commonSql.insert<PrepareInsertHistoryItem>('history_item', newHistoryItem)
	} catch (error) {
		throw new Error('historyItemQueries insert history_item' + error)
	}
}

const updateQueryHistoryItem = async (updateHistoryItem: PrepareUpdateHistoryItem) => {
	try {
		await commonSql.update<PrepareUpdateHistoryItem>('history_item', updateHistoryItem)
	} catch (error) {
		throw new Error('historyItemQueries update history item name' + error)
	}
}

const deleteQueryHistoryItem = async (id: number) => {
	try {
		await commonSql.delete('history_item', id)
	} catch (error) {
		throw new Error('historyItemQueries delete tag' + error)
	}
}

export {
	selectQueryHistoryItems,
	selectQueryHistoryItemById,
	selectQueryHistoryItemByName,
	insertQueryHistoryItem,
	updateQueryHistoryItem,
	deleteQueryHistoryItem
}