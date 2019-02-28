import React, { useState, useEffect } from 'react';
import { ApolloConsumer } from 'react-apollo';
import { renderRoutes } from 'react-router-config';
import { Redirect } from 'react-router-dom';
import { Query } from 'react-apollo';

import Header2 from './components/Header2';

import { FETCH_CURRENT_USER } from '../../graphql/queries';
// import client from '../../graphql/apollo-for-client';

export const AuthContext = React.createContext({ auth: null });

let __isNode__ = false;
if (typeof process === 'object') {
	if (typeof process.versions === 'object') {
		if (typeof process.versions.node !== 'undefined') {
			__isNode__ = true;
		}
	}
}

const Todo = (props) => {
	const pathName = props.staticContext
		? props.staticContext.pathName
		: !__isNode__ && window.location.pathname.replace(/^\/([^\/]*).*$/, '$1');

	return (
		<Query query={FETCH_CURRENT_USER}>
			{({ data, loading, error }) => {
				return (
					<AuthContext.Provider value={{ auth: data.currentUser }}>
						<div className="Todo-a-00">
							<Header2 pathName={pathName} />
							{data.currentUser ? (
								<div>{renderRoutes(props.route.routes)}</div>
							) : (
								<Redirect to="/login" />
							)}
						</div>
					</AuthContext.Provider>
				);
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
