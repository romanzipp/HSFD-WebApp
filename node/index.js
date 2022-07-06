'use strict';

const http = require('http');
const url = require('url');

const host = 'localhost';
const port = 8000;

const server = http.createServer((req, res) => {
    const data = url.parse(req.url);
    const params = new URLSearchParams(data.search);

    const [weight, size] = [params.get('gewicht'), params.get('groesse')];

    const bmi = weight / size * size;

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'text/html');
    res.writeHead(200);
    res.end(`<b>${bmi}</b>`);
});

server.listen(port, host, () => {
    console.log(`Server running on http://${host}:${port}`);
});
