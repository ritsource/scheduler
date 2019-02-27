import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
// import fetch from 'node-fetch';
import { HttpLink } from 'apollo-link-http';

let __isNode__ = false;
if (typeof process === 'object') {
	if (typeof process.versions === 'object') {
		if (typeof process.versions.node !== 'undefined') {
			__isNode__ = true;
		}
	}
}

let cache;

if (__isNode__) {
	cache = new InMemoryCache();
} else {
	cache = new InMemoryCache().restore(window.__APOLLO_STATE__);
}

const link = new HttpLink({
	// uri: __isNode__ ? 'http://localhost:4000/' : '/graphql'
	uri: '/graphql'
	// fetch: fetch
});

const client = new ApolloClient({
	cache,
	link,
	ssrForceFetchDelay: 100
});

export default client;
