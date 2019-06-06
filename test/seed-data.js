const chance = require('chance').Chance();
const Guild = require('../lib/models/Guild');
const Event = require('../lib/models/Event');
const User = require('../lib/models/User');

module.exports = async({ userCount = 20, guildCount = 5, eventCount = 10 } = {}) => {
  const users = [...Array(userCount)].map(() => ({
    username: chance.name(),
    password: '123'
  }));

  const createdUsers = await User.create(users);
  
  const guilds = [...Array(guildCount)].map(() => ({
    name: chance.name(),
    game: chance.word(),
    members: chance.pick(createdUsers, 5).map(user => user._id)
  }));
  
  const createdGuilds = await Guild.create(guilds);

  const events = [...Array(eventCount)].map(() => ({
    title: chance.name(),
    description: chance.word({ length: 5 }),
    date: chance.string(),
    time: chance.string(),
    guild: chance.pickone(createdGuilds)._id
  }));
  
  await Event.create(events);
};
