
const global_path = process.cwd();
const pHash = require('password-hash');

/**
 * Initiates database, returns the database object
 * @param {string} file database file name with absolute path
 * @param {string} mode whether read (default), write or create 
 */
function initDB(file, db_mode = 'read') {
    const sqlite3 = require('sqlite3').verbose();
    const mode = {
        read: sqlite3.OPEN_READONLY,
        write: sqlite3.OPEN_READWRITE,
        create: sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE
    };
    const db = new sqlite3.Database(file, mode[db_mode], (err) => {
        if (err) console.log('Failed to initialise database.\n' + err);
        else console.log(`Database initialised: ${file}`);
    });
    return db;
};

const db_file = `${global_path}/db/main.db`;

const loginUser = input_obj => {
    const db = initDB(db_file, 'read');
    console.log(input_obj);
};

const registerUser = input_obj => {
    let status_code = 200;

    const { first, last, email, peewee } = input_obj;
    console.log(input_obj);
    // const db = initDB(db_file, 'write');
    // db.run('INSERT INTO users () VALUES ()', []);
    // db.close();
    return status_code;
};

module.exports = {
    loginUser, registerUser
}