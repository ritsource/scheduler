import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import CreadentialsForm from '../components/CreadentialsForm';

const SignupPage = ({ history }) => {
	const [ errorMsg, setErrorMag ] = useState(false);

	const handleSignup = async ({ name, email, password }) => {};

	return (
		<div className="Signup-p-00 About-p-00">
			<CreadentialsForm errorMsg={errorMsg} pathName="signup" onFormSubmit={handleSignup} />
		</div>
	);
};

export default {
	component: SignupPage
};
