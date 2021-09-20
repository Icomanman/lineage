
const global_path = process.cwd();
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const { validationResult } = require('express-validator');

const { loginUser, registerUser, validations } = require(`${global_path}/src/utils.js`);

/* Instantiate middleware in 'router'. Note that 'body-parser' is depracated: 19 Sep 2021
The Request object body can now be parsed directly via express via the below: */
const router = express.Router();
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

module.exports = () => {
    // homepage (index) as static html:
    router.get('/', express.static(`${global_path}/dist`));
    router.get('/home', (req, res) => {
        res.render('tmp', { content: 'home.html', msg_arr: null, is_home: true });
    });

    // login:
    router.get('/login', (req, res) => res.render('tmp', { content: 'login.html', msg_arr: null }));
    router.post('/login', validations('login'), (req, res) => {
        console.log('> Incoming /login POST request...');
        // pass and validate user login input:
        try {
            const err_obj = validationResult(req);
            if (err_obj.isEmpty()) {
                const status_code = loginUser(req.body);
                res.status(status_code);
                if (status_code == 200) res.redirect('/home');
            } else {
                console.log(err_obj.array());
                res.render('tmp', { content: 'login.html', msg_arr: err_obj.array() });
            }
        } catch (err) {
            console.log(err);
            res.redirect('/');
        }
    });

    // register:
    router.get('/register', (req, res) => res.redirect('/'));
    router.post('/register', validations('registration'), (req, res) => {
        console.log('> Incoming /register POST request...');
        // pass and validate user registration input:
        try {
            const err_obj = validationResult(req);
            if (err_obj.isEmpty()) {
                const status_code = registerUser(req.body);
                res.status(status_code);
                setTimeout(() => {
                    res.redirect('/home');
                }, 2000);
            } else {
                console.log(err_obj.array());
                res.render('tmp', { content: 'fallback_reg.html', msg_arr: null, misc: err_obj.array() });
            }
        } catch (err) {
            console.log(err);
            res.redirect('/');
        }
    });
    return router;
};