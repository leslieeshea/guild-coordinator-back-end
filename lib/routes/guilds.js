const { Router } = require('express');
const Guild = require('../models/Guild');

module.exports = Router()
  .post('/', (req, res, next) => {
    const {
      name,
      game,
      members
    } = req.body;

    Guild
      .create({ name, game, members })
      .then(createdGuild => res.send(createdGuild))
      .catch(next);
  });
