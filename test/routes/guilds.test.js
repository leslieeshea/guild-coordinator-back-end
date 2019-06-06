const mongoose = require('mongoose');
const { getUsers, getGuild, getAgent } = require('../data-helpers');

describe('Guilds routes', () => {
  it('can create a guild', async() => {
    const users = await getUsers();
    const members = users.map(user => user._id);

    const guild = await getAgent()
      .post('/api/v1/guilds')
      .send({
        name: 'Awesome Guild',
        game: 'World of Warcraft',
        members
      });
    expect(guild.body).toEqual({
      name: 'Awesome Guild',
      game: 'World of Warcraft',
      members,
      _id: expect.any(String),
      __v: 0
    });
  });

  it('can get an event by guild id', async() => {
    const guild = await getGuild();
    const id = guild._id;

    const events = await getAgent()
      .get(`/api/v1/guilds/events/${id}`);

    expect(events.body[0]).toEqual({
      title: expect.any(String),
      description: expect.any(String),
      date: expect.any(String),
      time: expect.any(String),
      guild: id.toString(),
      _id: expect.any(String)
    });
  });

  it('can get a list of all guilds', async() => {
    const guilds = await getAgent()
      .get('/api/v1/guilds');

    expect(guilds.body).toHaveLength(5);
  });

  it('can get a guild by id', async() => {
    const testGuild = await getGuild();
    const id = testGuild._id;
    
    const guild = await getAgent()
      .get(`/api/v1/guilds/${id}`);
    
    expect(guild.body).toEqual({
      name: expect.any(String),
      game: expect.any(String),
      members: expect.any(Array),
      _id: expect.any(String)
    });
  });

  it('can update the array of members', async() => {
    const users = await getUsers();
    const members = users.map(user => user._id.toString());

    const testGuild = await getAgent()
      .post('/api/v1/guilds')
      .send({
        name: 'Super Cool Guild',
        game: 'Dungeons and Dragons',
        members
      });
    
    const newMember = new mongoose.Types.ObjectId();
    const newMembersArray = [... members, newMember.toString()];
    const id = testGuild.body._id;

    const guild = await getAgent()
      .patch(`/api/v1/guilds/${id}`)
      .send({
        name: 'Super Cool Guild',
        game: 'Dungeons and Dragons',
        members: newMembersArray
      });

    expect(guild.body).toEqual({
      name: 'Super Cool Guild',
      game: 'Dungeons and Dragons',
      members: newMembersArray,
      _id: expect.any(String)
    });
  });
});
