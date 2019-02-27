// This file exports all GraphQL Resolver functions

const authResolvers = require('./auths');
const readResolvers = require('./reads');
const writeResolvers = require('./writes');

module.exports = {
	...authResolvers, // Authentication related Relolvers
	...readResolvers, // Read Action related Resolvers
	...writeResolvers // Write Reolvers
};
