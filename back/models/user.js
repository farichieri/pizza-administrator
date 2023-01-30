const mongoose = require('mongoose');

const User = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      default: '',
      type: String,
      required: true,
      unique: true,
    },
    password: {
      default: '',
      type: String,
      required: false,
    },
    isAdmin: {
      default: false,
      type: Boolean,
      required: false,
    },
    isSuperAdmin: {
      default: false,
      type: Boolean,
      required: false,
    },
  },
  { collection: 'user-data' }
);

const model = mongoose.model('User', User);

module.exports = model;
