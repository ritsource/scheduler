import React, { useState } from 'react';
import Link from 'next/link';
import { FaFacebookF, FaGoogle } from 'react-icons/fa';

const CreadentialsForm = ({ pageName, errorMsg, onFormSubmit, setProgressBar }) => {
	const [ name, setName ] = useState('');
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');

	return (
		<div className="CreadentialsForm-c-00">
			<h2 style={{ textAlign: 'left', margin: '10px 0px', width: '100%' }}>
				{pageName === 'signup' ? 'Create a new Account' : 'Login to Schedular'}
			</h2>
			{errorMsg && <p style={{ width: '100%', margin: '0px', color: 'var(--danger-red-color)' }}>{errorMsg}</p>}
			<form
				onSubmit={(e) => {
					e.preventDefault();
					onFormSubmit({ name, email, password });
				}}
			>
				{pageName === 'signup' && (
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
					<p className="Flex-Class-Row-Start" style={{ width: '100%', margin: '0px', padding: '0px' }}>
						<input type="checkbox" style={{ margin: '0px 5px -1px 0px', width: '20px' }} />
						{''}Remember&nbsp;account
					</p>
					<button
						// style={{ margin: '5px 0px', width: '100%' }}
						type="submit"
						style={{ margin: '5px 0px' }}
						className="Theme-Btn-First-99"
					>
						{pageName === 'signup' ? <span>Sign&nbsp;In</span> : <span>Log&nbsp;In </span>}
					</button>
				</div>

				{/* <p>- or -</p> */}

				{pageName === 'signup' ? (
					<p style={{ margin: '10px' }}>
						Already have an account -{' '}
						<Link href="/login">
							<a onClick={setProgressBar}>Lust Login</a>
						</Link>
					</p>
				) : (
					<p style={{ margin: '10px' }}>
						or maybe -{' '}
						<Link href="/signup">
							<a onClick={setProgressBar}>Create a new Account?</a>
						</Link>
					</p>
				)}

				<button
					onClick={setProgressBar}
					type="button"
					style={{ background: '#dd4b39', width: '100%', margin: '5px 0px' }}
					className="Theme-Btn-First-99"
				>
					<FaGoogle style={{ fontSize: '16px', margin: 'auto 10px -3px auto' }} />
					Signin with Google
				</button>

				<button
					onClick={setProgressBar}
					type="button"
					style={{ background: '#3b5998', width: '100%', margin: '5px 0px' }}
					className="Theme-Btn-First-99"
				>
					<FaFacebookF style={{ fontSize: '16px', margin: 'auto 10px -3px auto' }} />
					Signin with Facebook
				</button>
			</form>

			<p>
				<strong>Privacy Policy</strong> - {' '}
				<a href="/privacy-policy" target="_black">
					Here
				</a>
			</p>
		</div>
	);
};

export default CreadentialsForm;
