
module.exports = function defaultdict(defaultFunction) {
  return new Proxy({}, {
    get: (target, name) => {
      if (!(name in target) && name !== 'length' && name !== 'toJSON') {
        target[name] = defaultFunction(); // eslint-disable-line no-param-reassign
      }
      return target[name];
    },
  });
};
