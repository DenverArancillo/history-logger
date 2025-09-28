import sqlite3, { Database } from 'sqlite3'
import { faker } from '@faker-js/faker'

sqlite3.verbose()

let sql: string
const items = 50
const historyItemType: string[] =  process.env.HISTORY_ITEM_TYPES!.split('|')

const db = new Database('./historylog.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, error => {
    if (error) return console.error('db connection', error.message)
})

db.serialize(() => {

    db.run("PRAGMA foreign_keys=ON");

    // Tags
    sql = `CREATE TABLE IF NOT EXISTS tag (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        tag_name TEXT NOT NULL
    )`

    db.run(sql, (error) => {
        if (error) return console.error('create table tag', error)
    });

    sql = `INSERT INTO tag (tag_name) VALUES(?)`
    const tagStatement = db.prepare(sql)

    for (let i = 0; items > i; i++) {
        tagStatement.run(`createTagName-${faker.word.adjective()}-${Date.now()}`);
    }
    tagStatement.finalize()

    // History item
    sql = `CREATE TABLE IF NOT EXISTS history_item (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            history_item_name TEXT NOT NULL DEFAULT '',
            history_item_type TEXT CHECK( history_item_type IN ('int', 'string', 'img') ) NOT NULL DEFAULT 'int'
        )`

    db.run(sql, (error) => {
        if (error) return console.error('create table history_item', error)
    })

    sql = 'INSERT INTO history_item (history_item_name, history_item_type) VALUES (?, ?)'
    const historyItemStatement = db.prepare(sql)

    for (let i = 0; items > i; i++) {
        let randomInt = faker.number.int({ min: 0, max: historyItemType.length - 1 })

        historyItemStatement.run([
            `createTagName-${faker.word.adjective()}-${Date.now()}`,
            historyItemType[randomInt]
        ]);
    }
    historyItemStatement.finalize()

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
