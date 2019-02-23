import Link from 'next/link';

import AboutHeader from '../src/components/Header/AboutHeader';
import CreadentialsForm from '../src/components/Auth/CreadentialsForm';

export default () => {
	const [ progressBar, setProgressBar ] = useState(false);
	const [ errorMsg, setErrorMag ] = useState(false);

	const handleSignup = async ({ name, email, password }) => {
		e.preventDefault();
		setProgressBar(true);

		try {
			await axios.post('/auth/register', { name, email, password });
		} catch (error) {
			if (error.response.status === 409) setErrorMag(error.response.data.message);
		}

		setProgressBar(true);

		const response = await axios.post('/auth/local', { email, password });

		if (response.data) return React.replace('/calendar');
		else if (response.data === '') setErrorMag('Incorrect email or password');
	};

	return (
		<div className="Signup-p-01 About-p-00">
			<AboutHeader pageName="login" />
			<div className="Signup-Content-01 About-Content-01">
				{/* <h1>Log In</h1> */}

				<CreadentialsForm pageName="signup" onFormSubmit={handleSignup} />
			</div>
		</div>
	);
};
