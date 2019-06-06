const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../lib/app');

describe('Guilds routes', () => {
  it('can create a guild', () => {
    return request(app)
      .post('/api/v1/guilds')
      .send({
        name: 'Awesome Guild',
        game: 'World of Warcraft',
        members: new mongoose.Types.ObjectId()
      })
      .then(res => {
        expect(res.body).toEqual({
          name: 'Awesome Guild',
          game: 'World of Warcraft',
          members: [expect.any(String)],
          _id: expect.any(String),
          __v: 0
        });
      });
  });
});
