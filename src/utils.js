
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

/**
 * validations make use 'express-validator' via the 'check' function
 * @param {string} request set to 'login' by default 
 * @returns check functions run via middleware array
 */
function validations(request = 'login') {
    const { check } = require('express-validator');
    const login = [
        check('email').trim().isEmail().normalizeEmail().withMessage('Invalid email address'),
        check('peewee').trim().isLength({ min: 8 }).escape().withMessage('Password should be at least 8 characters'),
    ];
    const registration = [
        check('first').trim().isLength({ min: 2 }).isAlpha().escape().withMessage('First Name should be letters only'),
        check('last').trim().isLength({ min: 2 }).isAlpha().escape().withMessage('Last Name should be letters only'),
        check('email').trim().isEmail().normalizeEmail().withMessage('Invalid email address'),
        check('peewee').trim().isLength({ min: 8 }).escape().withMessage('Password should be at least 8 characters'),
        check('day').trim().isEmpty().escape().withMessage('Date cannot be empty'),
        check('gender').trim().isEmpty().escape().withMessage('Gender cannot be empty'),
    ];
    return request === 'login' ? login : registration;
};

const db_file = `${global_path}/db/main.db`;

const loginUser = req_body => {
    // const db = initDB(db_file, 'read');
    console.log(req_body);
    return 200;
};

const registerUser = req_body => {
    let status_code = 200;

    const { first, last, email, peewee } = req_body;
    console.log(req_body);

    // const db = initDB(db_file, 'write');
    // db.run('INSERT INTO users () VALUES ()', []);
    // db.close();
    return status_code;
};

module.exports = {
    loginUser, registerUser, validations
}