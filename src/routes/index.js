
const global_path = process.cwd();
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const login = require('./login.js');
const register = require('./register.js');
const { loginUser, registerUser } = require(`${global_path}/src/utils.js`);

/* Instantiate middleware in 'router'. Note that 'body-parser' is depracated: 19 Sep 2021
The Request object body can now be parsed directly via express via the below: */
const router = express.Router();
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

module.exports = () => {
    // homepage (index) as static html:
    router.get('/', express.static(`${global_path}/dist`));
    // login:
    router.use('/login', (req, res) => {
        if (req.method === 'GET') {
            res.render('tmp', { content: 'login.html' });
            // res.end();
        } else {
            console.log('> Incoming /login POST request...');
            // pass and validate user login input:
            loginUser(req.body, db)
            res.end();
        }
    });
    // register:
    router.use('/register', (req, res) => {
        if (req.method === 'GET') {
            res.redirect('/');
        } else {
            console.log('> Incoming /register POST request...');
            // pass and validate user registration input:
            const status_code = registerUser(req.body);
            res.status(status_code);
            res.end();
        }
    });
    return router;
};