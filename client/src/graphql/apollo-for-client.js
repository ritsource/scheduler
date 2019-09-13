import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
// import fetch from 'node-fetch';
import { HttpLink } from 'apollo-link-http';

import __isNode__ from '../utils/isNode';

let cache;

if (__isNode__) {
	cache = new InMemoryCache();
} else {
	cache = new InMemoryCache().restore(window.__APOLLO_STATE__);
}

// console.log('process.env.SERVER_URI', process.env.SERVER_URI);

const link = new HttpLink({
	uri: `/graphql`
	// uri: `${process.env.SERVER_URI}/graphql`
});

const client = new ApolloClient({
	cache,
	link,
	ssrForceFetchDelay: 100
});

export default client;
