const isEmpty = require('lodash').isEmpty;
const validator = require('validator');

const defaultdict = require('../../../utils/defaultdict');


const validateUser = (data) => {
  const {
    email,
    birthday,
    password,
    passwordConfirmation,
  } = data;

  const errors = defaultdict(Array);
  if (!validator.isEmail(email)) {
    errors.email.push('email');
  }
  if (
    !(birthday instanceof Date) &&
    (birthday instanceof String && !validator.isDate(birthday))
  ) {
    errors.birthday.push('date');
  }
  if (!validator.isLength(password, 6)) {
    errors.password.push('length');
  }
  if (!validator.matches(password, passwordConfirmation)) {
    errors.passwordConfirmation.push('sameAs');
  }

  return {
    isValid: isEmpty(errors),
    errors,
  };
};

module.exports = { validateUser };
