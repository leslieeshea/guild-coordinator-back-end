const { getGuild, getAgent } = require('../data-helpers');

describe('Event routes', () => {
  it('can create an event', async() => {
    const guild = await getGuild();
    const id = guild._id;
    const event = await getAgent()
      .post('/api/v1/events')
      .send({
        title: 'Meeting tonight',
        description: 'Five-man dungeons',
        date: '06-06-2019',
        time: '4:00 PM',
        guild: id
      });

    expect(event.body).toEqual({
      title: 'Meeting tonight',
      description: 'Five-man dungeons',
      date: '06-06-2019',
      time: '4:00 PM',
      guild: id,
      _id: expect.any(String),
      __v: 0
      
    });
  });

  it('can get a list of all events', async() => {
    const events = await getAgent()
      .get('/api/v1/events');

    expect(events.body).toHaveLength(10);
  });
});
