import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import CreadentialsForm from '../components/CreadentialsForm';

const SignupPage = ({ history }) => {
	return (
		<div className="Signup-p-00 About-p-00">
			<CreadentialsForm pathName="signup" />
		</div>
	);
};

export default {
	component: SignupPage
};
