const mongoose = require('mongoose');
const restful = require('node-restful');


const TodoSchema = mongoose.Schema({
  text: String,
  dueDate: Date,
  urgency: Number,
  completed: Boolean,
  author: {
    type: String,
    ref: 'User',
  },
}, {
  timestamps: true,
});

module.exports = restful.model('Todo', TodoSchema);
