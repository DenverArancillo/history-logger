import sqlite from 'aa-sqlite'

async function test() {
	try {
		await sqlite.open('./historylog.db')
	} catch (error) {
		return console.error('db connection', error)
	}

		// await sqlite.run('INSERT INTO test(test) VALUES(3)')
		// let rows = await sqlite.all('SELECT * FROM test')
		// console.log('rows', rows)

		// await sqlite.run('INSERT INTO test(test) VALUES(3)')
		// let rows = await sqlite.all('SELECT * FROM test')
		// console.log('rows', rows)

	try {
		await sqlite.run(`CREATE TABLE IF NOT EXISTS tag (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			tag_name TEXT NOT NULL
		)`)
	} catch (error) {
		return console.error('create table tag', error)
	}

	try {
		await sqlite.run(`CREATE TABLE IF NOT EXISTS history_item (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			history_item_name TEXT NOT NULL,
			history_item_type TEXT NOT NULL
		)`)

	} catch (error) {
		return console.error('create table history_item', error)
	}

	try {
		await sqlite.run(`CREATE TABLE IF NOT EXISTS history_item_tag (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			history_item_id INTEGER NOT NULL,
			tag_id INTEGER NOT NULL,
			FOREIGN KEY (history_item_id) 
				REFERENCES history_item(id)
					ON DELETE CASCADE
					ON UPDATE NO ACTION,
			FOREIGN KEY (tag_id) 
				REFERENCES tag(id)
					ON DELETE CASCADE
					ON UPDATE NO ACTION
		)`)
	} catch (error) {
		return console.error('create history_item_tag', error)
	}

	sqlite.close()
}

test()