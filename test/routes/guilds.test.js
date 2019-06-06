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
});
