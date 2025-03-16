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
				if (error) return reject('common sql all: ' + error.message)

				this.close()
				resolve(rows)
			})
		})
	}
}