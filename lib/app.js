const express = require('express');
// const mongoConnection = require('./middleware/mongo-connection');

const app = express();

app.use(express.json());

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
