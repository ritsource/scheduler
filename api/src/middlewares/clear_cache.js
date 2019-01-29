const { clearHash } = require('../services/cache');

module.exports = (hashKey) => {
  return async (req, res, next) => {
    await next();

    clearHash(req.user.id + hashKey);
  }
};