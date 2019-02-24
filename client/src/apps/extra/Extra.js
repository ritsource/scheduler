import React from 'react';
import { renderRoutes } from 'react-router-config';
import { connect } from 'react-redux';

import Header1 from './components/Header1';

const Extra = (props) => {
	return (
		<div className="Extra-a-00">
			<Header1 pageName="about" />
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
