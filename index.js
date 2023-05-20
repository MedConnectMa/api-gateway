const express = require('express');
const httpProxy = require('http-proxy');

//** app **//
const app = express();
const port = 8000;

//** services **//
const services = [];

// register
app.post('/register/:service', (req, res) => {
    const service = req.params.service;
    if (services[service])
        res.status(400).send(`Service ${service} already registered`);
    else {
        services[service] = httpProxy.createProxyServer({
            target: `http://${service}-service`
        });
        res.status(200).send(`Service ${service} registered`);
    }
});

// proxy
app.all('/api/:service/*', (req, res) => {
    const service = req.params.service;
    if (services[service])
        services[service].web(req, res);
    else
        res.status(400).send(`Service ${service} does not exist`);
});

// not found
app.all('*', (req, res) => {
    res.status(404).send('Not Found');
});

//** start **//
app.listen(port, () => {
  console.log(`Gateway listening at http://0.0.0.0:8000`);
});
