import React, { useState } from 'react';
import axios from 'axios';

import ProgressbarContext from '../../_common/contexts/ProgressbarContext';

const ForgetPassPage = () => {
	const [ email, setEmail ] = useState('');
	const [ errorMsg, setErrorMsg ] = useState(false);
	const [ successMsg, setSuccessMsg ] = useState(false);

	const handleEmailSubmit = async (setProgressBar) => {
		setProgressBar(true);

		try {
			await axios.post('/auth/request_a_mail', { email });
			setProgressBar(false);
			setSuccessMsg('An email has been sent');
			setErrorMessage(false);
		} catch (error) {
			setProgressBar(false);
			if (error.response.status === 422) {
				setSuccessMsg(false);
				setErrorMsg('No user found with this email');
			} else if (error.response.status === 405) {
				setSuccessMsg(false);
				setErrorMsg("The Email couldn't be sent");
			} else {
				setSuccessMsg(false);
				setErrorMsg('Unknown error occured');
			}
		}
	};

	return (
		<ProgressbarContext.Consumer>
			{(context) => (
				<div className="ForgetPass-p-00 About-p-00">
					<div className="CreadentialsForm-c-00">
						<h2 style={{ textAlign: 'left', margin: '10px 0px', width: '100%' }}>Enter your Email</h2>
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
								handleEmailSubmit(context.setProgressBar);
							}}
						>
							<input
								placeholder="Email"
								className="Theme-Input-99"
								type="email"
								autoComplete="off"
								onChange={(e) => setEmail(e.target.value)}
								value={email}
							/>
							<div className="Flex-Class-Row-Start" style={{ width: '100%' }}>
								<button type="submit" style={{ margin: '5px 0px' }} className="Theme-Btn-Normal-99">
									Get Token
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
	component: ForgetPassPage
};
