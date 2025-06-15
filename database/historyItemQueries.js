import commonSql from "./commonSql.js"

const selectQueryHistoryItems = async () => {
	try {
		return await commonSql.selectAll('history_item')
	} catch (error) {
		throw new Error('historyItemQueries select all historyItems' + error)
	}
}

const selectQueryHistoryItemById = async id => {
	try {
		return await commonSql.selectById('history_item', id)
	} catch (error) {
		throw new Error('historyItemQueries select historyItem by id' + error)
	}
}

const selectQueryHistoryItemByName = async name => {
	try {
		return await commonSql.selectByColumnIsEqualTo('history_item', 'history_item_name', name)
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
const insertQueryHistoryItem = async newHistoryItem => {
	try {
		await commonSql.insert('history_item', newHistoryItem)
	} catch (error) {
		throw new Error('historyItemQueries insert history_item' + error)
	}
}

const updateQueryHistoryItem = async updateHistoryItem => {
	try {
		await commonSql.update('history_item', updateHistoryItem)
	} catch (error) {
		throw new Error('historyItemQueries update history item name' + error)
	}
}

export {
	selectQueryHistoryItems,
	selectQueryHistoryItemById,
	selectQueryHistoryItemByName,
	insertQueryHistoryItem,
	updateQueryHistoryItem
}