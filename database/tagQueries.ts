import commonSql from "./commonSql"
import { Tag, PrepareTag } from '../ts/interface/database/tags'

/**
 * Select all tags
 */
const selectQueryAllTags = async (): Promise<Tag[]> => {
	try {
		return await commonSql.selectAll<Tag>('tag')
	} catch (error) {
		throw new Error('tagQueries select all tags' + error)
	}
}

/**
 * Select a tag by id
 * @param {number} id
 */
const selectQueryTagById = async (id: number): Promise<Tag>  => {
	try {
		return await commonSql.selectById<Tag>('tag', id)
	} catch (error) {
		throw new Error('tagQueries select tag by id' + error)
	}
}

/**
 * Insert new tag object to the database
 * @param {object} newTag New tag object
 * @param {string} newTag.tag_name tag name
 */
const insertQueryTag = async (newTag: PrepareTag) => {
	try {
		await commonSql.insert<PrepareTag>('tag', newTag)
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
const updateQueryTag = async (updateTag: PrepareTag) => {
	try {
		await commonSql.update<PrepareTag>('tag', updateTag)
	} catch (error) {
		throw new Error('tagQueries update tag' + error)
	}
}

/**
 * Delete existing tag
 * @param {number} id tag id
 */
const deleteQueryTag = async (id: number) => {
	try {
		await commonSql.delete('tag', id)
	} catch (error) {
		throw new Error('tagQueries delete tag' + error)
	}
}

export {
	selectQueryAllTags,
	selectQueryTagById,
	insertQueryTag,
	updateQueryTag,
	deleteQueryTag
}