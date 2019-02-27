import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = ({ staticContext }) => {
	if (staticContext) {
		staticContext.notFound = true;
	}

	return (
		<div className="NotFoundPage-p-00 About-p-00">
			<h1>404</h1>
			<p className="About-Subheading-01">This Page doesn't Exist</p>

			<p>
				<strong>Go back to</strong> <Link to="/about">Home</Link>
			</p>
		</div>
	);
};

export default {
	component: NotFoundPage
};
