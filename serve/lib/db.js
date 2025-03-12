
const knex = require('knex')
const config = require('../config/db')

const db = knex(config)
module.exports = {

    table: (tableName) => db(tableName),
    
    select: (...args) => db.select(...args),
    insert: (...args) => db.insert(...args),
    update: (...args) => db.update(...args),
    delete: (...args) => db.delete(...args),
}