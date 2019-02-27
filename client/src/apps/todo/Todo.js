import React, { useState, useEffect } from 'react';
import { ApolloConsumer } from 'react-apollo';
import { renderRoutes } from 'react-router-config';
import { Redirect } from 'react-router-dom';
import { Query } from 'react-apollo';

import Header2 from './components/Header2';

import { FETCH_CURRENT_USER } from '../../graphql/queries';
import client from '../../graphql/apollo-for-client';

let __isNode__ = false;
if (typeof process === 'object') {
	if (typeof process.versions === 'object') {
		if (typeof process.versions.node !== 'undefined') {
			__isNode__ = true;
		}
	}
}

const Todo = (props) => {
	const [ auth, setAuth ] = useState(null);

	const fetchUser = () => {
		return client.query({
			query: FETCH_CURRENT_USER
		});
	};

	useEffect(() => {
		fetchUser()
			.then((result) => {
				const { data, loading } = result;
				setAuth(data);
			})
			.catch(() => {});

		return () => {};
	}, []);

	const pathName = props.staticContext
		? props.staticContext.pathName
		: !__isNode__ && window.location.pathname.replace(/^\/([^\/]*).*$/, '$1');

	return (
		<Query query={FETCH_CURRENT_USER}>
			{({ data, loading, error }) => {
				console.log('data-data-data-data', data.currentUser);

				// if (data) {
				return (
					<div className="Todo-a-00">
						{data.currentUser ? (
							<React.Fragment>
								<Header2 pathName={pathName} />
								<div>{renderRoutes(props.route.routes)}</div>
							</React.Fragment>
						) : (
							<Redirect to="/login" />
						)}
					</div>
				);
				// }
			}}
		</Query>
	);
};

export default {
	component: (props) => <ApolloConsumer>{(client) => <Todo {...props} client={client} />}</ApolloConsumer>,
	loadData: function(client) {
		return client.query({ query: FETCH_CURRENT_USER });
	}
};

Date.prototype.getFormattedDate = function() {
	return `${this.getFullYear()}-${this.getMonth() + 1}-${this.getDate()}`;
};
