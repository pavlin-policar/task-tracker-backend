const Router = require('express').Router;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const isEmpty = require('lodash').isEmpty;

const config = require('./config');

const User = require('../models/User');
const validateUser = require('./validation').validateUser;


const SALT_ROUNDS = 10;

const router = Router();

router.get('/checkuser', (req, res) => {
  const { email, username } = req.query;

  const errors = {};
  // Email was submitted for checking
  if (email) {
    User.findOne({ email }, (findUserError, user) => {
      if (findUserError) {
        res.status(500).json({ error: 'INTERNAL_ERROR' });
      } else if (user) {
        errors.emailUnique = true;
      }

      // Username was submitted for checking
      if (username) {
        // TODO: Not really using this yet, so implement later
      }
      if (isEmpty(errors)) {
        res.status(200).json({ available: true });
      } else {
        res.status(400).json({ errors });
      }
    });
  }
});

router.post('/register', (req, res) => {
  const {
    firstName,
    surname,
    email,
    birthday,
    password,
  } = req.body;

  const { errors, isValid } = validateUser(req.body);
  if (isEmpty(errors)) {
    User.findOne({ email }, (findUserError, user) => {
      if (findUserError) {
        // Database error when checking if user exists
        res.status(500).json({ error: 'INTERNAL_ERROR' });
      } else if (user) {
        // User with email already exists
        errors.email.push('emailUnique');
        res.status(400).json({ errors, isValid });
      } else {
        // The user is indeed a new user, proceed with registration
        const passwordDigest = bcrypt.hashSync(password, SALT_ROUNDS);
        new User({
          name: {
            first: firstName,
            last: surname,
          },
          email,
          birthday,
          password: passwordDigest,
        }).save((saveUserError) => {
          if (saveUserError) {
            res.status(500).json({ error: 'INTERNAL_ERROR' });
          } else {
            res.status(200).json({ success: 'SUCCESS' });
          }
        });
      }
    });
  } else {
    // Something went wrong with validations
    res.status(400).json({ errors, isValid });
  }
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email }, (error, user) => {
    // If the users exists in database, check their credentials
    if (user) {
      if (bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign({
          id: user.id,
        }, config.appSecret);
        res.json({ token });
      } else {
        // Invalid password
        res.status(401).json({ error: 'INVALID_CREDENTIALS' });
      }
    } else {
      // No such user was found
      res.status(401).json({ error: 'INVALID_CREDENTIALS' });
    }
  });
});

module.exports = router;
