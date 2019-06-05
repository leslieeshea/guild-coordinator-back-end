const mongoose = require('mongoose');
const User = require('../../lib/models/User');

describe('User model', () => {
  it('has a username and password', () => {
    const user = new User({
      username: 'leslie',
      password: 'password',
    });

    expect(user.toJSON()).toEqual({
      username: 'leslie',
      _id: expect.any(mongoose.Types.ObjectId)
    });
  });
});
