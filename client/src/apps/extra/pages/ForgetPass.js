import React, { useState } from 'react';

const ForgetPassPage = () => {
	const [ email, setEmail ] = useState('');
	const [ errorMsg, setErrorMsg ] = useState(false);
	const [ successMsg, setSuccessMsg ] = useState(false);

	const handleEmailSubmit = () => {};

	return (
		<div className="ForgetPass-p-00 About-p-00">
			<div className="CreadentialsForm-c-00">
				<h2 style={{ textAlign: 'left', margin: '10px 0px', width: '100%' }}>Enter your Email</h2>
				{errorMsg && (
					<p style={{ width: '100%', margin: '0px', color: 'var(--danger-red-color)' }}>{errorMsg}</p>
				)}
				{successMsg && (
					<p style={{ width: '100%', margin: '0px', color: 'var(--safe-green-color)' }}>{successMsg}</p>
				)}
				<form
					onSubmit={(e) => {
						e.preventDefault();
						setErrorMsg(false);
						setSuccessMsg(false);
						handleEmailSubmit();
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
	);
};

export default {
	component: ForgetPassPage
};
