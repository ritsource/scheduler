const mongoose = require('mongoose');
const keys = require('../config/keys');

mongoose.Promise = global.Promise;
// mongoose.connect(keys.mongo_uri, { useNewUrlParser: true });

const connect = () => (req, res, next) => {
	mongoose.connect(keys.mongo_uri, { useNewUrlParser: true });
	next();
};

// module.exports = { mongoose };
module.exports = { mongoose, connect };
