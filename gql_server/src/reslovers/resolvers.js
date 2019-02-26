// This file exports all GraphQL Resolver functions

const authResolvers = require('./auths');
const readResolvers = require('./reads');
const readSatResolvers = require('./custom_reads');
const writeSatResolvers = require('./custom_writes');
const writeResolvers = require('./writes');

module.exports = {
	...authResolvers, // Authentication related Relolvers
	...readResolvers, // Read Action related Resolvers
	...readSatResolvers, // Read Actions (Staurated Res Objects) Resolvers
	...writeSatResolvers, // Write Resolvers (Saturated)
	...writeResolvers // Write Reolvers
};
