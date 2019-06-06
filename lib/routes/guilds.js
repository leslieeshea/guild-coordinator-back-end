const { Router } = require('express');
const Guild = require('../models/Guild');
const Event = require('../models/Event');

module.exports = Router()
  .post('/', async(req, res, next) => {
    const {
      name,
      game,
      members
    } = req.body;

    try {
      const guild = await Guild.create({ name, game, members });
      res.send(guild);
    } catch(error) {
      next(error);
    }
  })

  // can get events by guild id
  .get('/events/:id', async(req, res, next) => {
    try {
      const events = await Event
        .find({ guild: req.params.id })
        .select({
          __v: false
        })
        .lean();
      res.send(events);
    } catch(error) {
      next(error);
    }
  })

  .get('/', async(req, res, next) => {
    try {
      const guild = await Guild
        .find()
        .select({
          __v: false
        })
        .lean();
      res.send(guild);
    } catch(error) {
      next(error);
    }
  })

  .get('/:id', async(req, res, next) => {
    try {
      const guild = await Guild
        .findById(req.params.id)
        .select({
          __v: false
        })
        .lean();
      res.send(guild);
    } catch(error) {
      next(error);
    }
  })

  .patch('/:id', async(req, res, next) => {
    const { members } = req.body;

    try {
      const guild = await Guild
        .findByIdAndUpdate(req.params.id, { members }, { new: true })
        .select({
          __v: false
        })
        .lean();
      res.send(guild);
    } catch(error) {
      next(error);
    }
  });
