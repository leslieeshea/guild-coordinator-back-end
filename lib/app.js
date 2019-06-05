const express = require('express');
// const mongoConnection = require('./middleware/mongo-connection');

const app = express();

app.use(express.json());

module.exports = app;
