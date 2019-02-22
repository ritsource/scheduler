const redis = require('redis');
const mongoose = require('mongoose');
const keys = require('../config/keys');
const util = require('util');

const client = redis.createClient({
  host: keys.redisHost,
  port: keys.redisPort
});

client.hget = util.promisify(client.hget);
const exec = mongoose.Query.prototype.exec;

mongoose.Query.prototype.cache = function(options = {}) {
  this.useCache = true;
  this.hashKey = JSON.stringify(options.key || '');

  return this;
};

mongoose.Query.prototype.exec = async function() {
  if (!this.useCache) {
    return exec.apply(this, arguments);
  }

  const key = JSON.stringify(
    Object.assign({}, this.getQuery(), {
      collection: this.mongooseCollection.name
    })
  );

  const cacheValue = await client.hget(this.hashKey, key);

  if (cacheValue) {
    const doc = JSON.parse(cacheValue);
    // console.log('******* GETTING', this.hashKey, doc);

    return Array.isArray(doc)
      ? doc.map(d => new this.model(d))
      : new this.model(doc);
  }

  const result = await exec.apply(this, arguments);

  client.hset(this.hashKey, key, JSON.stringify(result), 'EX', 10);
  // console.log('******* SETTING', this.hashKey, result);

  return result;
};

const clearHash = (hashKey) => {
  // console.log('******* CLEARING', hashKey);
  client.del(JSON.stringify(hashKey));
};

module.exports = { clearHash };