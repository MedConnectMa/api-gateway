const express = require('express');
const httpProxy = require('http-proxy');

// app
const app = express();
const port = 8000;

// proxies
const userProxy = httpProxy.createProxyServer({
  target: 'http://user_service'
});

// routes
app.all('/api/users/*', (req, res) => {
  userProxy.web(req, res);
});

// start server
app.listen(port, () => {
  console.log(`Gateway listening at http://0.0.0.0:8000`);
});