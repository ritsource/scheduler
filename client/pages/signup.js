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

	const handleSignup = async ({ name, email, password }) => {
		setProgressBar(true);

		try {
			const response = await axiosInstance.post('/auth/register', { name, email, password });
			if (response.data) return Router.replace('/login');
		} catch (error) {
			if (error.response.status === 409) setErrorMag(error.response.data.message);
		}
	};

	return (
		<div className="Signup-p-01 About-p-00">
			{progressBar && <CustomProgressBar />}
			<AboutHeader pageName="login" />
			<div className="Signup-Content-01 About-Content-01">
				{/* <h1>Log In</h1> */}

				<CreadentialsForm setProgressBar={setProgressBar} pageName="signup" onFormSubmit={handleSignup} />
			</div>
		</div>
	);
};
