import React, { useState } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import axiosInstance from '../config/axios';

import AboutHeader from '../components/Header/AboutHeader';
import CreadentialsForm from '../components/Auth/CreadentialsForm';
import CustomProgressBar from '../components/CustomProgressBar';

export default () => {
	const [ progressBar, setProgressBar ] = useState(false);
	const [ errorMsg, setErrorMag ] = useState(false);

	const handleLogin = async ({ name, email, password }) => {
		setProgressBar(true);
		const response = await axiosInstance.post('/auth/local', { email, password });

		if (response.data) {
			Router.replace('/calendar');
		} else if (response.data === '') {
			setErrorMag('Incorrect email or password');
			setProgressBar(false);
		}
	};

	return (
		<div className="Login-p-01 About-p-00">
			{progressBar && <CustomProgressBar />}
			<AboutHeader pageName="login" />
			<div className="Login-Content-01 About-Content-01">
				{/* <h1>Log In</h1> */}

				<CreadentialsForm
					errorMsg={errorMsg}
					pageName="login"
					onFormSubmit={handleLogin}
					setProgressBar={setProgressBar}
				/>
			</div>
		</div>
	);
};
