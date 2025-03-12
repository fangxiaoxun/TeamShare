module.exports = {
    client: 'mysql2',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: '123456',
        database: 'collaborativedoc',
    },
    pool: {
        min: 2, 
        max: 10,
    }
}