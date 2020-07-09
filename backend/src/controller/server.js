const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');

const Logger = require('../util/logger');

const app = express();

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(bodyParser.json());

app.use(require('./cors'));

app.use(`${process.env.CONTEXT}/authentication`, require('./route/authenticationRoute'));
app.use(`${process.env.CONTEXT}/city`, require('./route/cityRoute'));
app.use(`${process.env.CONTEXT}/state`, require('./route/stateRoute'));

const server = http.createServer(app);

server.listen(process.env.PORT, () => {
  Logger.info(`SERVER RUNNIG ON PORT: ${process.env.PORT}`);
});
