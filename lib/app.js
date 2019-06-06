const express = require('express');
const mongoConnection = require('./middleware/mongoose-connection');

app.use(require('morgan')('tiny', {
  skip: () => process.env.NODE_ENV === 'test'
}));

const app = express();

app.use(express.json());
app.use(require('cookie-parser')());

app.use('/api/v1/guilds', mongoConnection, require('./routes/guilds'));
app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
