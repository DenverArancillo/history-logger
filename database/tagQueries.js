import commonSql from "./commonSql.js"

/**
 * Select all tags
 */
const selectQueryAllTags = async () => {
	try {
		return await commonSql.selectAll('tag')
	} catch (error) {
		console.error('tagQueries select all tags', error)
	}
}

/**
 * Select a tag by id
 * @param {int} id
 */
const selectQueryTagById = async id => {
	try {
		return await commonSql.selectById('tag', id)
	} catch (error) {
		console.error('tagQueries select tag', error)
	}
}

 /**
  * Insert new tag object to the database
  * @param {object} newTag New tag object
  * @param {string} newTag.tag_name tag name
  */
const insertQueryTag = async newTag => {
	try {
		await commonSql.insert('tag', newTag)
	} catch (error) {
		throw new Error('tagQueries insert tag' + error)
	}
}

 /**
  * Update new tag object to the database
  * @param {object} updateTag Update tag object
  * @param {int} updateTag.id tag id
  * @param {string} updateTag.tag_name tag name
  */
const updateQueryTag = async updateTag => {
	try {
		await commonSql.update('tag', updateTag)
	} catch (error) {
		throw new Error('tagQueries update tag' + error)
	}
}

export {
	selectQueryAllTags,
	selectQueryTagById,
	insertQueryTag,
	updateQueryTag
}