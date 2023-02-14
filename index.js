import http from 'http';
import fs from 'fs';

const hostname = 'localhost';
const port = 8080;

const server = http.createServer((req, res) => {
    const reqUrl = new URL(req.url, `http://${hostname}:${port}`);
    res.setHeader('Content-Type', 'text/html');
    fs.readFile(reqUrl.pathname === '/' ? 'index.html' :
     `${reqUrl.pathname.substring(1)}.html`, (err, data) => {
        if (err) {
            res.statusCode = 404;
            fs.readFile('404.html', (err, data) => {
                return res.end(data);
            })
        } else {
            res.statusCode = 200;
            return res.end(data);
        }
    })
})


server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
})