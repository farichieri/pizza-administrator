const User = require('../models/user.js');

const allUsers = async () => {
  const users = await User.find();
  return users;
};

module.exports = { allUsers };
