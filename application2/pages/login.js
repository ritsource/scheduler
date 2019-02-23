import React, { useState } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import axios from 'axios';

import AboutHeader from '../src/components/Header/AboutHeader';
import CreadentialsForm from '../src/components/Auth/CreadentialsForm';
import CustomProgressBar from '../src/components/CustomProgressBar';

export default () => {
	const [ progressBar, setProgressBar ] = useState(false);
	const [ errorMsg, setErrorMag ] = useState(false);

	const handleLogin = async ({ name, email, password }) => {
		e.preventDefault();
		setProgressBar(true);
		const response = await axios.post('/auth/local', { email, password });

		if (response.data) return React.replace('/calendar');
		else if (response.data === '') setErrorMag('Incorrect email or password');
	};

	return (
		<div className="Login-p-01 About-p-00">
			{progressBar && <CustomProgressBar />}
			<AboutHeader pageName="login" />
			<div className="Login-Content-01 About-Content-01">
				{/* <h1>Log In</h1> */}

				<CreadentialsForm errorMsg={errorMsg} pageName="login" onFormSubmit={handleLogin} />
			</div>
		</div>
	);
};
