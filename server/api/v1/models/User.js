const mongoose = require('mongoose');
const restful = require('node-restful');


const user = mongoose.Schema({
  name: {
    first: String,
    last: String,
  },
  username: String,
  password: String,
  email: String,
  birthday: Date,
}, {
  timestamps: true,
});

module.exports = restful.model('User', user);
