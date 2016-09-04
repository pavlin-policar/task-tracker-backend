/* eslint consistent-return:0 */

const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const cors = require('cors');

const logger = require('./logger');
const api = require('./api/v1');

const argv = require('minimist')(process.argv.slice(2));
const isDev = process.env.NODE_ENV !== 'production';
const resolve = require('path').resolve;


const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride());

app.use(cors());

// If you need a backend, e.g. an API, add your custom backend-specific middleware here
app.use('/api/v1', api);

// get the intended port number, use port 3000 if not provided
const port = argv.port || process.env.PORT || 3000;

// Start your app.
app.listen(port, (err) => {
  if (err) {
    return logger.error(err.message);
  }
  logger.appStarted(port);
});
