import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
// import fetch from 'node-fetch';
import { HttpLink } from 'apollo-link-http';

export default (req) => {
	const client = new ApolloClient({
		ssrMode: true,
		cache: new InMemoryCache(),
		link: new HttpLink({
			uri: `${process.env.SERVER_URI}/graphql`,
			credentials: 'same-origin',
			// fetch: fetch,
			headers: {
				cookie: req.header('Cookie')
			}
		})
	});

	return client;
};
