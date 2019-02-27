import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import CreadentialsForm from '../components/CreadentialsForm';

const LoginPage = ({ history }) => {
	const [ errorMsg, setErrorMag ] = useState(false);

	const handleLogin = async ({ name, email, password }) => {};

	return (
		<div className="Login-p-00 About-p-00">
			<CreadentialsForm errorMsg={errorMsg} pathName="login" onFormSubmit={handleLogin} />
		</div>
	);
};

export default {
	component: LoginPage
};
