import commonSql from "./commonSql.js"

const selectQueryHistoryItems = async () => {
	try {
		return await commonSql.selectAll('history_item')
	} catch (error) {
		console.error(error)
	}
}

export {
	selectQueryHistoryItems
}