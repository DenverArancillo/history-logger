import sqlite3 from 'sqlite3'

sqlite3.verbose()

let sql

let db = new sqlite3.Database('./historylog.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, error => {
	if (error) return console.error('db connection', error.message)
})

db.serialize(() => {

	db.run("PRAGMA foreign_keys=ON");

	sql = `CREATE TABLE IF NOT EXISTS tag (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		tag_name TEXT NOT NULL
	)`

	db.run(sql, (error) => {
		if (error) return console.error('create table tag', error)
	}); 

	sql = `INSERT INTO tag (tag_name) VALUES(?)`

	db.run(sql, ['sql test'], error => {
		if (error) return console.error('insert table tag', error)
	})

	sql = `CREATE TABLE IF NOT EXISTS history_item (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			history_item_name TEXT NOT NULL,
			history_item_type TEXT NOT NULL
		)`

	db.run(sql, (error) => {
		if (error) return console.error('create table history_item', error)
	})

	sql = `CREATE TABLE IF NOT EXISTS history_item_tag (
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
		)`

	db.run(sql, (error) => {
		if (error) return console.error('create history_item_tag', error)
	})

})


// sql = `UPDATE users SET first_name = ? WHERE id = ?`;

// db.run(sql, ["Jake", 1], (error) => {
// 	if (error) return console.error(error.message);
// });

// sql = `SELECT * FROM users`; 


// db.all(sql, [], (error, rows) => {
// 	if (error) return console.error(error.message);
// 	rows.forEach((row) => {
// 		console.log(row);
// 	})
// })

// sql = `DELETE FROM users WHERE id = ?`;

// db.run(sql, [1], (error) => {
// 	if (error) return console.error(error.message);
// });