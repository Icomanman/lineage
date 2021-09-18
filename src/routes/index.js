
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const login = require('./login.js');
const register = require('./register.js');

const global_path = process.cwd();
const router = express.Router();

module.exports = () => {
    // homepage (index) as static html:
    router.get('/', express.static(`${global_path}/dist`));
    // login page:
    router.use('/login', (req, res) => {
        if (req.method === 'GET') {
            res.end();
            // res.render('tmp', { content: 'login.html' });
        } else {
            res.end();
        }
    });
    // router.use('/register', register());
    return router;
};