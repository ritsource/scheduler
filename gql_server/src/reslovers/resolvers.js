const authResolvers = require('./auths');
const readResolvers = require('./reads');
const readSatResolvers = require('./reads_saturated');

module.exports = {
	...authResolvers,
	...readSatResolvers
};
