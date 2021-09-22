
const global_path = process.cwd();
const e = require('express');
const pHash = require('password-hash');
const users_file = `${global_path}/db/main.db`;

/**
 * Initiates database, returns the database object
 * @param {string} file database file name with absolute path
 * @param {string} mode whether read (default), write or create 
 */
function initDB(file, db_mode = 'read') {
    // const sqlite3 = require('sqlite3').verbose();
    // const mode = {
    //     read: sqlite3.OPEN_READONLY,
    //     write: sqlite3.OPEN_READWRITE,
    //     create: sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE
    // };
    // const db = new sqlite3.Database(file, mode[db_mode], (err) => {
    //     if (err) console.log('Failed to initialise database.\n' + err);
    //     else console.log(`Database initialised: ${file}`);
    // });
    const Database = require('better-sqlite3');
    const db = new Database(file, { verbose: console.log, fileMustExist: true });
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
        check('day').trim().notEmpty().escape().withMessage('Date cannot be empty'),
        check('gender').trim().notEmpty().escape().withMessage('Gender cannot be empty'),
    ];
    return request === 'login' ? login : registration;
};

function loginChain(err_obj) {
    console.log(obj);
}

const loginUser = req_body => {
    let status_code = 400;

    console.table(req_body);
    req_body['peewee'] = pHash.generate(req_body['peewee']);
    const arg_v = [];
    for (let arg in req_body) {
        arg_v.push(req_body[arg]);
    }

    const dat = {
        msg: '',
        results: null
    };
    try {
        const db = initDB(users_file, 'read');
        const rows = db.prepare('SELECT * FROM users WHERE email = (?)').all(req_body['email']);
        if (rows && rows.length == 1) {
            console.table(rows);
            status_code = 200;
        } else {
            console.log('> User not found.');
            console.log(err)
            dat.msg = 'User not found.';
        }
        db.close();

    } catch (err) {
        console.log(err);
    }
    return { status_code, dat };
};

const registerUser = req_body => {
    let status_code = 400;

    console.table(req_body);
    req_body['peewee'] = pHash.generate(req_body['peewee']);
    const arg_v = [];
    for (let arg in req_body) {
        arg_v.push(req_body[arg]);
    }
    const dat = { msg: '' };
    try {
        const db = initDB(users_file, 'write');
        const users_arr = db.prepare('SELECT * FROM users WHERE email = ?').all(req_body['email']);
        if (users_arr.length == 0) {
            console.log('> User not found. Proceed to database insertion.');
            const insert = db.prepare('INSERT INTO users (first, last, email, hash, date, gender) VALUES (?, ?, ?, ?, ?, ?)',);
            const last_id = insert.run(arg_v).lastInsertRowid;
            if (last_id) {
                console.log(`> Inserted ID: ${last_id}`);
                status_code = 200;
            } else {
                dat.msg = 'Oops! Something went wrong.';
                status_code = 500;
            }
        } else {
            dat.msg = 'Email already registered.'
            console.log(`> ${dat.msg}`);
        }
        db.close();
    } catch (err) {
        console.log(`> ${err.message}`);
        status_code = 500;
        dat.msg = 'Oops! Something went wrong.';
    }
    return { status_code, dat };
};

const pushData = () => {

};

const pullData = () => {

};

module.exports = {
    loginUser, registerUser, validations
}