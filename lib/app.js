const express = require('express');
const mongoConnection = require('./middleware/mongoose-connection');

const app = express();

app.use(require('morgan')('tiny', {
  skip: () => process.env.NODE_ENV === 'test'
}));

app.use(express.json());
app.use(require('cookie-parser')());

app.use('/api/v1/auth', mongoConnection, require('./routes/auth'));
app.use('/api/v1/guilds', mongoConnection, require('./routes/guilds'));
app.use('/api/v1/events', mongoConnection, require('./routes/events'));
app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
