import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaGoogle } from 'react-icons/fa';
import { ApolloConsumer } from 'react-apollo';

import ProgressbarContext from '../../_common/contexts/ProgressbarContext';

import client from '../../../graphql/apollo-for-client';
import { LOGIN_USER, REGISTER_USER } from '../../../graphql/mutations';

const CreadentialsForm = ({ pathName, errorMsg, onFormSubmit }, context) => {
	const [ name, setName ] = useState('');
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');

	console.log('client', client);

	const loginUser = async () => {
		await client.mutate({
			mutation: LOGIN_USER,
			variables: { email, password }
		});
	};

	const registerUser = async () => {
		await client.mutate({
			mutation: REGISTER_USER,
			variables: { name, email, password }
		});
	};

	return (
		<ProgressbarContext.Consumer>
			{(context) => (
				<div className="CreadentialsForm-c-00">
					<h2 style={{ textAlign: 'left', margin: '10px 0px', width: '100%' }}>
						{pathName === 'signup' ? 'Create a new Account' : 'Login to Schedular'}
					</h2>
					{errorMsg && (
						<p style={{ width: '100%', margin: '0px', color: 'var(--danger-red-color)' }}>{errorMsg}</p>
					)}
					<form
						onSubmit={async (e) => {
							e.preventDefault();
							if (pathName === 'signup') {
								context.setProgressBar(true);
								await registerUser();
								window.location.href = '/todo';
							} else {
								context.setProgressBar(true);
								await loginUser();
								window.location.href = '/todo';
							}
						}}
					>
						{pathName === 'signup' && (
							<input
								placeholder="Name"
								className="Theme-Input-99"
								type="text"
								autoComplete="off"
								onChange={(e) => setName(e.target.value)}
								value={name}
							/>
						)}
						<input
							placeholder="Email"
							className="Theme-Input-99"
							type="email"
							autoComplete="off"
							onChange={(e) => setEmail(e.target.value)}
							value={email}
						/>
						<input
							placeholder="Password"
							className="Theme-Input-99"
							type="password"
							onChange={(e) => setPassword(e.target.value)}
							value={password}
						/>

						<div className="Flex-Class-Row-End" style={{ width: '100%' }}>
							<p
								className="Flex-Class-Row-Start"
								style={{ width: '100%', margin: '0px', padding: '0px' }}
							>
								<input type="checkbox" style={{ margin: '0px 5px -1px 0px', width: '20px' }} />
								{''}Remember&nbsp;account
							</p>
							<button
								// style={{ margin: '5px 0px', width: '100%' }}
								type="submit"
								style={{ margin: '5px 0px' }}
								className="Theme-Btn-First-99"
							>
								{pathName === 'signup' ? <span>Sign&nbsp;In</span> : <span>Log&nbsp;In </span>}
							</button>
						</div>

						{pathName === 'signup' ? (
							<p style={{ margin: '10px' }}>
								Already have an account - <Link to="/login">Lust Login</Link>
							</p>
						) : (
							<p style={{ margin: '10px' }}>
								or maybe - <Link to="/signup">Create a new Account?</Link>
							</p>
						)}

						<a href="/auth/google" style={{ width: '100%' }}>
							<button
								type="button"
								style={{ background: '#dd4b39', width: '100%', margin: '5px 0px' }}
								className="Theme-Btn-First-99"
							>
								<FaGoogle style={{ fontSize: '16px', margin: 'auto 10px -3px auto' }} />
								Signin with Google
							</button>
						</a>

						<a href="/auth/facebook" style={{ width: '100%' }}>
							<button
								type="button"
								style={{ background: '#3b5998', width: '100%', margin: '5px 0px' }}
								className="Theme-Btn-First-99"
							>
								<FaFacebookF style={{ fontSize: '16px', margin: 'auto 10px -3px auto' }} />
								Signin with Facebook
							</button>
						</a>
					</form>

					<p>
						<strong>Privacy Policy</strong> - {' '}
						<a href="/privacy-policy" target="_black">
							Here
						</a>
					</p>
				</div>
			)}
		</ProgressbarContext.Consumer>
	);
};

// export default (props) => (
// 	<ApolloConsumer>{(client) => <CreadentialsForm {...props} client={client} />}</ApolloConsumer>
// );

export default CreadentialsForm;
