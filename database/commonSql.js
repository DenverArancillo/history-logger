// import sqlite from 'aa-sqlite'
import sqlite3 from 'sqlite3'

sqlite3.verbose()

export default class commonSql {
	static sql = sqlite3
	static db

	static open() {
		return new Promise(resolve => {
            this.db = new this.sql.Database('./historylog.db', error => {
				if (error) reject("common sql open: " + error.message)
				else {
					this.db.run("PRAGMA foreign_keys=ON");
					resolve(true)
				}
			});
        });
	}

	static close() {
		return this.db.close()
	}

	static async all(query, param = []) {
		await this.open()

		return new Promise((resolve, reject) => {
			this.db.all(query, param, (error, rows) => {
				if (error) reject('common sql all: ' + error.message)

				this.close()
				resolve(rows)
			})
		})
	}

	static async get(query, param = []) {
		await this.open()

		return new Promise((resolve, reject) => {
			this.db.get(query, param, (error, row) => {
				if (error) reject('common sql get: ' + error.message)
					
				this.close()
				resolve(row)
			})
		})
	}

	static async selectAll(table) {
		return this.all(`SELECT * FROM ${table}`)
	}

	static async selectById(table, id) {
		return this.get(`SELECT * FROM ${table} WHERE id = ${id}`)
	}

	static prepareInsertQuery(table, columnAndValue) {
		let query = `INSERT INTO ${table}`
		let queryColumn = '('
		let queryValue = 'VALUES('
		let propertyCount = Object.keys(columnAndValue).length - 1
		let dataValues = []

		Object.entries(columnAndValue).forEach(([key, value], index) => {
			if (index === propertyCount) {
				// last item
				queryColumn += `${key})`
				queryValue += `?)`
			} else {
				queryColumn += `${key},`
				queryValue += `?,`
			}
			dataValues.push(value)
		})

		return {
			query: `${query} ${queryColumn} ${queryValue}`,
			dataValues
		}
	}

	static async insert(table, columnAndValue) {
		let { query, dataValues } = this.prepareInsertQuery(table, columnAndValue)

		await this.open()

		return new Promise((resolve, reject) => {
			this.db.run(query, dataValues, error => {
				if (error) reject('common sql insert: ' + error.message)
				
				this.close()
				resolve(true)
			})
		})
	}

	static prepareUpdateQuery(table, columnAndValue) {
		let query = `UPDATE ${table} SET`
		let { id, ...others } = columnAndValue
		let columns = ''
		let whereClause = `WHERE id = ${id}`
		let propertyCount = Object.keys(others).length - 1
		let dataValues = []

		Object.entries(others).forEach(([key, value], index) => {
			if (index === propertyCount) {
				// last item 
				columns += `${key} = ?`
			} else {
				columns += `${key} = ?,`
			}
			dataValues.push(value)
		})

		return {
			query: `${query} ${columns} ${whereClause}`,
			dataValues
		}
	}

	static async update(table, columnAndValue) {
		let { query, dataValues } = this.prepareUpdateQuery(table, columnAndValue)

		await this.open()

		return new Promise((resolve, reject) => {
			this.db.run(query, dataValues, error => {
				if (error) reject('common sql update: ' + error.message)
				
				this.close()
				resolve(true)
			})
		})
	}
}