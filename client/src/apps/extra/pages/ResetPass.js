import React, { useState } from 'react';
import axios from 'axios';

import ProgressbarContext from '../../_common/contexts/ProgressbarContext';

const ResetPassPage = () => {
	const [ password1, setPassword1 ] = useState('');
	const [ password2, setPassword2 ] = useState('');
	const [ errorMsg, setErrorMsg ] = useState(false);
	const [ successMsg, setSuccessMsg ] = useState(false);

	const handlePasswordSubmit = async (setProgressBar) => {
		setProgressBar(true);

		const urlParams = new URLSearchParams(window.location.search);

		try {
			await axios.post('/auth/password_reset', { token: urlParams.get('token'), password: password1 });
			window.location.replace('/login');
		} catch (error) {
			setProgressBar(false);
			if (error.response.status === 422) setErrorMsg('Unable to change password');
			else setErrorMsg('Unknown error occured');
		}
	};

	return (
		<ProgressbarContext.Consumer>
			{(context) => (
				<div className="ResetPass-p-00 About-p-00">
					<div className="CreadentialsForm-c-00">
						<h2 style={{ textAlign: 'left', margin: '10px 0px', width: '100%' }}>Set New Password</h2>
						{errorMsg && (
							<p style={{ width: '100%', margin: '0px', color: 'var(--danger-red-color)' }}>{errorMsg}</p>
						)}
						{successMsg && (
							<p style={{ width: '100%', margin: '0px', color: 'var(--safe-green-color)' }}>
								{successMsg}
							</p>
						)}
						<form
							onSubmit={(e) => {
								e.preventDefault();
								setErrorMsg(false);
								setSuccessMsg(false);

								if (password1 !== password2) return setErrorMsg('Password is not matching');
								if (password1.length < 8) return setErrorMsg('Atleast 8 characters needed');

								handlePasswordSubmit(context.setProgressBar);
							}}
						>
							<input
								placeholder="Password"
								className="Theme-Input-99"
								type="text"
								autoComplete="off"
								onChange={(e) => setPassword1(e.target.value)}
								value={password1}
							/>
							<input
								style={
									errorMsg === 'Password is not matching' ? (
										{ border: '1px solid var(--danger-red-color)' }
									) : (
										{}
									)
								}
								placeholder="Confirm"
								className="Theme-Input-99"
								type="password"
								autoComplete="off"
								onChange={(e) => {
									const value = e.target.value;
									if (value === password1) setErrorMsg(false);
									setPassword2(value);
								}}
								value={password2}
							/>
							<div className="Flex-Class-Row-Start" style={{ width: '100%' }}>
								<button type="submit" style={{ margin: '5px 0px' }} className="Theme-Btn-Normal-99">
									Reset Password
								</button>
							</div>
						</form>
					</div>
				</div>
			)}
		</ProgressbarContext.Consumer>
	);
};

export default {
	component: ResetPassPage
};
