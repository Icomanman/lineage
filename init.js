const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const child_process = require('child_process');

// const sqlite3 = require('sqlite3').verbose();
// const db = new sqlite3.Database(':memory:');

function main() {
    const app = express();
    const port = 1521;
    const url = `http://localhost:${port}`;
    app.listen(port, () => {
        console.log(`Server running on port ${port}.`);
        console.log(`Host: ${url}`);
    });

    // Serve Directories:
    app.use("/dist", express.static(`${__dirname}/dist`));
    // app.use("/css", express.static(`${__dirname}/dist/css`));
    app.use("/", express.static(`${__dirname}/dist`));

    let start = "xdg-open";
    let kill_comm = "pkill -f chrome";
    if (process.platform == "win32") {
        start = "start";
        kill_comm = "'TASKKILL /F /IM chrome.exe /T'";
    };

    // Kill browser upon node exit
    process.on('exit', () => child_process.exec(kill_comm));
    child_process.exec(`${start} ${url}/`);

}

main();