
const router = require('express').Router();

module.exports = () => {
    router.get('/', (req, res) => {
        res.render('tmp', { content: 'login.html' });
    })
    return router;
}