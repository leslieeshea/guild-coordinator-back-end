const { getUsers, getAgent } = require('../data-helpers');

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
});
