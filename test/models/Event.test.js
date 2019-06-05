const mongoose = require('mongoose');
const Event = require('../../lib/models/Event');

describe('Event model', () => {
  it('has a name, description, date, time, and guild', () => {
    const event = new Event({
      name: 'Raiding',
      description: 'Wanting to get folks together to run BFA raid',
      date: '2019-06-13',
      time: '4:00 PM',
      guild: new mongoose.Types.ObjectId()
    });

    expect(event.toJSON()).toEqual({
      name: 'Raiding',
      description: 'Wanting to get folks together to run BFA raid',
      date: '2019-06-13',
      time: '4:00 PM',
      guild: expect.any(mongoose.Types.ObjectId),
      _id: expect.any(mongoose.Types.ObjectId)
    });
  });
});
