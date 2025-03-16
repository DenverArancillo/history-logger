import sqlite3 from 'sqlite3'

sqlite3.verbose()

let sql

let db = new sqlite3.Database('./test.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, err => {
	if (err) return console.error('db connection', err.message)
})

sql = `CREATE TABLE users (id INTEGER PRIMARY KEY, first_name, last_name, username, password, email)`;

db.run(sql, (err) => {
	if (err) return console.error('create table', err.message)
}); 

sql = `INSERT INTO users(first_name, last_name, username, password, email) VALUES(?,?,?,?,?)`

db.run(
	sql, 
	['mike', 'michaelson', 'mike_user', 'test', 'mike@gmail.com']
)

// sql = `UPDATE users SET first_name = ? WHERE id = ?`;

// db.run(sql, ["Jake", 1], (err) => {
// 	if (err) return console.error(err.message);
// });

// sql = `SELECT * FROM users`; 


// db.all(sql, [], (err, rows) => {
// 	if (err) return console.error(err.message);
// 	rows.forEach((row) => {
// 		console.log(row);
// 	})
// })

// sql = `DELETE FROM users WHERE id = ?`;

// db.run(sql, [1], (err) => {
// 	if (err) return console.error(err.message);
// });