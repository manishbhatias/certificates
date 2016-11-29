const levelup = require('level');

function getDB (dbPath) {
    const db = levelup(dbPath);

    process.on('exit', function () {
        db.close();
    });

    return db;
}

module.exports = getDB;