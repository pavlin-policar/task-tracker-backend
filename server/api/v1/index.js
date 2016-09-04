const express = require('express');
const mongoose = require('mongoose');

const authentication = require('./Authentication');

const Todo = require('./models/Todo');


// Connect to mongodb
mongoose.connect('mongodb://localhost/task-tracker');

// Create the router instance
const router = express.Router();

router.use('/auth', authentication);

// Register restful resources
Todo.methods(['get', 'post', 'put', 'delete']).register(router, '/todos');

module.exports = router;
