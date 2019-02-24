import React, { useState } from 'react';
import { renderRoutes } from 'react-router-config';
import { connect } from 'react-redux';

import Header1 from './components/Header1';

let __isNode__ = false;
if (typeof process === 'object') {
	if (typeof process.versions === 'object') {
		if (typeof process.versions.node !== 'undefined') {
			__isNode__ = true;
		}
	}
}

const Extra = (props) => {
	const pathName = props.staticContext
		? props.staticContext.req.path.replace(/^\/([^\/]*).*$/, '$1')
		: !__isNode__ && window.location.pathname.replace(/^\/([^\/]*).*$/, '$1');

	return (
		<div className="Extra-a-00">
			<Header1 pathName={pathName} />
			<div>{renderRoutes(props.route.routes)}</div>
		</div>
	);
};

export default {
	component: Extra
};

Date.prototype.getFormattedDate = function() {
	return `${this.getFullYear()}-${this.getMonth() + 1}-${this.getDate()}`;
};
