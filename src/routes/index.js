
const global_path = process.cwd();
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const sqlite3 = require('sqlite3').verbose();
let db_file = `${global_path}/db/main.db`;

/**
 * Initiates database, returns the database object
 * @param {string} file database file name with absolute path
 * @param {string} mode whether readonly (default), readwrite or create 
 */
function initDB(file, mode = 'readonly') {
    const open_mode = {
        create: 'OPEN_CREATE',
        readonly: 'OPEN_READONLY',
        readwrite: 'OPEN_READWRITE'
    };

    const db = new sqlite3.Database('', open_mode[mode], (err) => {
        if (err) console.log('Failed to initialise database.');
        else console.log(`Database initialised: ${file}`);
    });

    console.log(db.run('SELECT * FROM users'));
    return db;
};

const login = require('./login.js');
const register = require('./register.js');

const router = express.Router();

module.exports = () => {
    // homepage (index) as static html:
    router.get('/', express.static(`${global_path}/dist`));
    // login:
    router.use('/login', (req, res) => {
        if (req.method === 'GET') {
            res.render('tmp', { content: 'login.html' });
            // res.end();
        } else {
            res.end();
        }
    });
    // register:
    router.use('/register', (req, res) => {
        if (req.method === 'GET') {
            res.redirect('/');
        } else {
            const db = initDB(db_file);
            console.log('POST request.');
            console.log(db);
            db.close();
            res.end();
        }
    });
    return router;
};