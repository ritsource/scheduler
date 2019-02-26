import React, { useState, useEffect } from 'react';
import { renderRoutes } from 'react-router-config';
import { Redirect } from 'react-router-dom';

import Header2 from './components/Header2';

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
		<div className="Todo-a-00">
			{/* {props.auth ? ( */}
			<React.Fragment>
				<Header2 pathName={pathName} />
				<div>{renderRoutes(props.route.routes)}</div>
			</React.Fragment>
			{/* ) : (
				<Redirect to="/login" />
			)} */}
		</div>
	);
};

export default {
	component: Todo,
	loadData: function(store) {
		// return store.dispatch();
	}
};

Date.prototype.getFormattedDate = function() {
	return `${this.getFullYear()}-${this.getMonth() + 1}-${this.getDate()}`;
};
