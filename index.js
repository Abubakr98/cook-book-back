/* eslint-disable no-console */
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const logger = require('morgan');

require('./app/models');

const config = require('./config');

const app = express();
app.use('/api/v1.0', express.static(path.join(__dirname, 'public')));

app.use(logger('dev'));
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,DELETE, PUT');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.use('/api/v1.0', config.router);
app.use('*', (req, res) => {
  res.send('404 page not found');
});
app.use(express.urlencoded({ extended: false }));

const { mongoUri, appPort } = config.app;
mongoose.set('useFindAndModify', false);
mongoose
  .connect(mongoUri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    app.listen(appPort, () => {
      console.log(`server is running on port ...${appPort}...`);
    });
  })
  .catch((err) => console.error(`Error connection to mongodb: ${mongoUri}`, err));

module.exports = app;
