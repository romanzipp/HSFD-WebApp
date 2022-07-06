'use strict';

const http = require('http');
const url = require('url');

const host = 'localhost';
const port = 8000;

const isHtml = (content) => {
    return /<\/?[a-z][\s\S]*>/i.test(content);
};

const validate = (data) => {
    if (!data.name) {
        throw new Error('Name ist erforderlich');
    }

    if (!data.comments) {
        throw new Error('Anmerkungen sind erforderlich');
    }

    if (isHtml(data.comments)){
        throw new Error('Anmerkungen sind nicht zulässig');
    }
};

const server = http.createServer((req, res) => {
    const data = url.parse(req.url);
    const params = new URLSearchParams(data.search);

    const [weight, size, name, comments] = [params.get('gewicht'), params.get('groesse'), params.get('name'), params.get('anmerkung')];

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'text/html');

    try {
        validate({ weight, size, name, comments });

        const bmi = weight / size * size;

        res.writeHead(200);
        res.end(`BMI: <b>${bmi}</b>, Name: <b>${name}</b>, Anmerkungen: <b>${comments}</b>`);
    } catch (err) {
        res.writeHead(422);
        res.end(`<b>${err}</b>`);
    }
});

server.listen(port, host, () => {
    console.log(`Server running on http://${host}:${port}`);
});
