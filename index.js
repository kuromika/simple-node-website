import fs from 'fs';
import express from 'express'

const app = express();

const route = (path, file) => {
    app.get(path, function(req, res){
        res.setHeader('Content-Type', 'text/html');
        path === '*' ? res.status(404) : res.status(200)
        fs.readFile(file, (err, data) => {
            if (err){
                console.log(err);
            } else {
                res.send(data);
            }
        })
    });
}


route('/', 'index.html');
route('/about', 'about.html');
route('/contact-me', 'contact-me.html');
route('*', '404.html');

//if running remotely like in replit, you have to remove 'hostname'

app.listen(3000);