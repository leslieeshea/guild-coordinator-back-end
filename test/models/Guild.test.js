const mongoose = require('mongoose');
const Guild = require('../../lib/models/Guild');

describe('Guild model', () => {
  it('has a name, game, and an array of member ids', () => {
    const guild = new Guild({
      name: 'Awesome Guild',
      game: 'World of Warcraft',
      members: [new mongoose.Types.ObjectId()]
    });

    expect(guild.toJSON()).toEqual({
      name: 'Awesome Guild',
      game: 'World of Warcraft',
      members: [expect.any(mongoose.Types.ObjectId)],
      _id: expect.any(mongoose.Types.ObjectId)
    });
  });

  it('requires a name, game, and array of member ids', () => {
    const guild = new Guild({});
    const errors = guild.validateSync().errors;

    expect(errors.name.message).toEqual('Path `name` is required.');
    expect(errors.game.message).toEqual('Path `game` is required.');
  });
});
