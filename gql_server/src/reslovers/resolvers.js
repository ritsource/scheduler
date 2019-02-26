const authResolvers = require('./auths');
const readResolvers = require('./reads');
const readSatResolvers = require('./custom_reads');
const writeSatResolvers = require('./custom_writes');
const writeResolvers = require('./writes');

module.exports = {
	...authResolvers,
	...readResolvers,
	...readSatResolvers,
	...writeSatResolvers,
	...writeResolvers
};
