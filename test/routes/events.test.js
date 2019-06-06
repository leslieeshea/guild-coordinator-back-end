const { getGuild, getEvent, getAgent } = require('../data-helpers');

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

  it('can get an event by id', async() => {
    const testEvent = await getEvent();
    const id = testEvent._id;

    const event = await getAgent()
      .get(`/api/v1/events/${id}`);
    
    expect(event.body).toEqual({
      title: expect.any(String),
      description: expect.any(String),
      date: expect.any(String),
      time: expect.any(String),
      guild: expect.any(String),
      _id: expect.any(String),
    });
  });

  it('can update title, description, date and time of an event by id', async() => {
    const guild = await getGuild();
    const guildId = guild._id;

    const testEvent = await getAgent()
      .post('/api/v1/events')
      .send({
        title: 'Meeting tonight',
        description: 'Five-man dungeons',
        date: '06-06-2019',
        time: '4:00 PM',
        guild: guildId
      });

    const id = testEvent.body._id;

    const event = await getAgent()
      .patch(`/api/v1/events/${id}`)
      .send({
        title: 'Meeting tomorrow',
        description: 'Ten-man raid',
        date: '06-07-2019',
        time: '6:00 PM',
      });

    expect(event.body).toEqual({
      title: 'Meeting tomorrow',
      description: 'Ten-man raid',
      date: '06-07-2019',
      time: '6:00 PM',
      guild: guildId,
      _id: expect.any(String)
    });
  });
});
