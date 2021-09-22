const mongoose = require('../db');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  restaurants: {
    type: [{}],
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
