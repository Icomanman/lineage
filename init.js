const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const child_process = require('child_process');
const path = require('path');

// const sqlite3 = require('sqlite3').verbose();
// const db = new sqlite3.Database(':memory:');

function main() {
    const app = express();
    const port = 8080;
    const url = `http://localhost:${port}`;
    app.set('view engine', 'ejs');
    app.set('/views', path.join(__dirname, '/views'));

    app.listen(port, () => {
        console.log(`Server running on port ${port}.`);
        console.log(`Host: ${url}`);
    });

    // Serve Directories:
    app.use('/', express.static(`${__dirname}/dist`));
    app.use('/js', express.static(`${__dirname}/dist/js`));
    app.use('/css', express.static(`${__dirname}/dist/css`));
    app.use('img', express.static(`${__dirname}/dist/img`));
    // app.use('/login', express.static(`${__dirname}/views/login.html`));

    app.get('/login', (req, res) => {
        res.render('tmp', { content: 'login.html' });
    });

    let start = 'xdg-open';
    let kill_comm = 'pkill -f chrome';
    if (process.platform == 'win32') {
        start = 'start';
        kill_comm = "'TASKKILL /F /IM chrome.exe /T'";
    };
    // Kill browser upon node exit
    // process.on('exit', () => child_process.exec(kill_comm));
    // child_process.exec(`${start} ${url}/`);
}

main();