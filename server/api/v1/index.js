const express = require('express');
const mongoose = require('mongoose');

const authentication = require('./Authentication');

const Todo = require('./models/Todo');
const User = require('./models/User');


// Connect to mongodb
mongoose.connect('mongodb://localhost/task-tracker');

// Create the router instance
const router = express.Router();

router.use('/auth', authentication);

// Register restful resources
Todo.methods(['get', 'post', 'put', 'delete']).register(router, '/todos');
// TODO: This also returns the password hash. Fix this.
User.methods(['get', 'post', 'put', 'delete']).register(router, '/users');

module.exports = router;
