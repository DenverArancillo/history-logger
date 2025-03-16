import sqlite from 'aa-sqlite'

export default class commonSql {
	static sql = sqlite
	static async open() {
		try {
			await this.sql.open('./historylog.db')
		} catch (error) {
			console.error('common sql open connection', error)
		}
	}

	static async close() {
		await this.sql.close()
	}

	static async all(query) {
		try {
			return await this.sql.all(query)
		} catch (error) {
			console.error('common sql all', error)
		}
	}
}