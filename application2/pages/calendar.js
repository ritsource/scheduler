import Link from 'next/link';

import AboutHeader from '../src/components/Header/AboutHeader';
import CreadentialsForm from '../src/components/Auth/CreadentialsForm';

const CalendarPage = () => {
	return (
		<div className="Login-p-01 About-p-00">
			<AboutHeader pageName="login" />
			<div className="Login-Content-01 About-Content-01">
				{/* <h1>Log In</h1> */}

				<CreadentialsForm pageName="login" onFormSubmit={() => {}} />
			</div>
		</div>
	);
};

// CalendarPage.getInitialProps = async function() {

//   return {
//     bpi: data.bpi
//   };
// }

export default CalendarPage;
