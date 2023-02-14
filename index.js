import http from 'http';
import fs from 'fs';

//hostname could be 'localhost', in this case it is 0.0.0.0 because of replit
const hostname = '0.0.0.0';
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


//if running remotely like in replit, you have to remove 'hostname'

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
})