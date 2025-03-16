import commonSql from "./commonSql.js"

const selectAllTags = async () => {
	try {
		return await commonSql.all('SELECT * FROM tag')
	} catch (error) {
		console.error('tagQueries select all tags', error)
	}
}

const selectTag = async () => {
	try {
		return await commonSql.get('SELECT * FROM tag')
	} catch (error) {
		console.error('tagQueries select tag', error)		
	}
}

export {
	selectAllTags,
	selectTag
}