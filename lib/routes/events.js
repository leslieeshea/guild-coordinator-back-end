const { Router } = require('express');
const Event = require('../models/Event');
const Guild = require('../models/Guild');

module.exports = Router()
  .post('/', async(req, res, next) => {
    const {
      title,
      description,
      date,
      time,
      guild
    } = req.body;

    try {
      const event = await Event.create({ title, description, date, time, guild });
      res.send(event);
    } catch(error) {
      next(error);
    }
  })

  .get('/', async(req, res, next) => {
    try {
      const event = await Event
        .find()
        .select({
          __v: false
        })
        .lean();
      res.send(event);
    } catch(error) {
      next(error);
    }
  });
