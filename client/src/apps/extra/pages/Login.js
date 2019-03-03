import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import CreadentialsForm from '../components/CreadentialsForm';

const LoginPage = ({ history }) => {
	return (
		<div className="Login-p-00 About-p-00">
			<CreadentialsForm pathName="login" />
		</div>
	);
};

export default {
	component: LoginPage
};
