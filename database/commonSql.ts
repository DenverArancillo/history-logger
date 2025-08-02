// import sqlite from 'aa-sqlite'
import sqlite3, { Database } from 'sqlite3'
import { PrepareStatement, TempObject } from '../ts/interface/database/commonSql';

sqlite3.verbose()

export default class commonSql {
	static db: Database;

	static open(): Promise<boolean> {
		return new Promise((resolve, reject) => {
        	this.db = new Database('./historylog.db', error => {
				if (error) reject("common sql open: " + error.message)
				else {
					this.db.run("PRAGMA foreign_keys=ON")
					resolve(true)
				}
			})
        })
	}

	static close(): void {
		return this.db.close()
	}

	static async all<Type>(query: string, param?: string[], errorMessage?: string): Promise<Type[]> {
		await this.open()

		return new Promise((resolve, reject) => {
			this.db.all(query, param, (error, rows: Type[]) => {
				if (error) {
					// provide default error message if undefined
					errorMessage = (errorMessage) ? errorMessage : 'common sql all: '
					reject(errorMessage + error.message)
				}

				this.close()
				resolve(rows)
			})
		})
	}

	static async run(query: string, param: (string|number)[] = [], errorMessage: string): Promise<boolean> {
		await this.open()

		return new Promise((resolve, reject) => {
			this.db.run(query, param, error => {
				if (error) {
					// provide default error message if undefined
					errorMessage = (errorMessage) ? errorMessage : 'common sql all: '
					reject(errorMessage + error.message)
				}

				this.close()
				resolve(true)
			})
		})
	}

	static async get<Type>(query: string, param: (string|number)[] = []): Promise<Type> {
		await this.open()

		return new Promise((resolve, reject) => {
			this.db.get(query, param, (error, row: Type) => {
				if (error) reject('common sql get: ' + error.message)
					
				this.close()
				resolve(row)
			})
		})
	}

	static selectAll<Type>(table: string): Promise<Type[]> {
		return this.all<Type>(`SELECT * FROM ${table}`)
	}

	static selectById<Type>(table: string, id: number): Promise<Type> {
		return this.get<Type>(`SELECT * FROM ${table} WHERE id = ${id}`)
	}

	static selectByColumnIsEqualTo<Type>(table: string, column: string, value: string|number): Promise<Type> {
		return this.get<Type>(`SELECT * FROM ${table} WHERE ${column} = '${value}'`)
	}

	static prepareInsertQuery<Type extends TempObject>(table: string, columnAndValue: Type): PrepareStatement {
		let query = `INSERT INTO ${table}`
		let queryColumn = '('
		let queryValue = 'VALUES('
		let propertyCount = Object.keys(columnAndValue).length - 1
		let dataValues: string[] = []

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

	static async insert<Type extends TempObject>(table: string, columnAndValue: Type): Promise<boolean> {
		let { query, dataValues } = this.prepareInsertQuery<Type>(table, columnAndValue)

		return await this.run(query, dataValues, 'common sql insert: ')
	}

	static prepareUpdateQuery<Type extends TempObject>(table: string, columnAndValue: Type): PrepareStatement {
		let query = `UPDATE ${table} SET`
		let { id } = columnAndValue
		let columns = ''
		let whereClause = `WHERE id = ${id}`
		let propertyCount = Object.keys(columnAndValue).length - 1
		let dataValues: string[] = []
		
		Object.entries(columnAndValue).forEach(([key, value], index) => {
			if (key === 'id') return // continue to next iteration

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

	static async update<Type extends TempObject>(table: string, columnAndValue: Type): Promise<boolean> {
		let { query, dataValues } = this.prepareUpdateQuery(table, columnAndValue)

		return await this.run(query, dataValues, 'common sql update: ')
	}

	static async delete(table: string, id: number): Promise<boolean> {
		return await this.run(`DELETE FROM ${table} WHERE id = ?`, [id], 'common sql update: ')
	}
}