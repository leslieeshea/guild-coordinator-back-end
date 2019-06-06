const { Router } = require('express');
const Event = require('../models/Event');

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
  })
  
  .get('/:id', async(req, res, next) => {
    try {
      const event = await Event
        .findById(req.params.id)
        .select({
          __v: false
        })
        .lean();
      res.send(event);
    } catch(error) {
      next(error);
    }
  })

  .patch('/:id', async(req, res, next) => {
    const {
      title,
      description,
      date,
      time
    } = req.body;

    try {
      const event = await Event
        .findByIdAndUpdate(req.params.id, { title, description, date, time }, { new: true })
        .select({
          __v: false
        })
        .lean();
      res.send(event);
    } catch(error) {
      next(error);
    }
  });
