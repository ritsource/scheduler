import React, { useState } from 'react';

const ResetPassPage = () => {
	const [ password1, setPassword1 ] = useState('');
	const [ password2, setPassword2 ] = useState('');
	const [ errorMsg, setErrorMsg ] = useState(false);
	const [ successMsg, setSuccessMsg ] = useState(false);

	const handlePasswordSubmit = () => {};

	return (
		<div className="ResetPass-p-00 About-p-00">
			<div className="CreadentialsForm-c-00">
				<h2 style={{ textAlign: 'left', margin: '10px 0px', width: '100%' }}>Set New Password</h2>
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

						if (password1 !== password2) return setErrorMsg('Password is not matching');

						handlePasswordSubmit();
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
	);
};

export default {
	component: ResetPassPage
};
