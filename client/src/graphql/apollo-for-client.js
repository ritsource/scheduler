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

const link = new HttpLink({
	uri: '/graphql'
});

const client = new ApolloClient({
	cache,
	link,
	ssrForceFetchDelay: 100
});

export default client;
