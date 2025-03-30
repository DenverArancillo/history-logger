import commonSql from "./commonSql.js"

const selectAllTags = async () => {
	try {
		return await commonSql.selectAll('tag')
	} catch (error) {
		console.error('tagQueries select all tags', error)
	}
}

const selectTagById = async id => {
	try {
		return await commonSql.selectById('tag', id)
	} catch (error) {
		console.error('tagQueries select tag', error)
	}
}

 /**
  * Insert new tag object to the database
  * @param {object} newTag Information about the user
  * @param {string} newTag.tag_name The name of the user
  */
const inserTag = async newTag => {
	try {
		await commonSql.insert('tag', newTag)
	} catch (error) {
		throw new Error('tagQueries insert tag' + error)
	}
}

export {
	selectAllTags,
	selectTagById,
	inserTag
}