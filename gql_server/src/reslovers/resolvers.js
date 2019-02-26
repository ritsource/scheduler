const authResolvers = require('./auths');
const readResolvers = require('./reads');
const readSatResolvers = require('./reads_saturated');
const writeResolvers = require('./writes');

module.exports = {
	...authResolvers,
	...readResolvers,
	...readSatResolvers,
	...writeResolvers
};
