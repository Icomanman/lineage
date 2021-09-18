
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const login = require('./login.js');
const register = require('./register.js');

const global_path = process.cwd();
const router = express.Router();

module.exports = () => {
    router.get('/', express.static(`${global_path}/dist`));
    router.use('/login', login());
    // router.use('/register', register());
    return router;
};