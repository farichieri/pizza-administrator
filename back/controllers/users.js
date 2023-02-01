const User = require('../models/User.js');

const allUsers = async () => {
  const users = await User.find();
  return users;
};

module.exports = { allUsers };
