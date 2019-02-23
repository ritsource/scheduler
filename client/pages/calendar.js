import Link from 'next/link';

import AppHeader from '../components/Header/AppHeader';
import CreadentialsForm from '../components/Auth/CreadentialsForm';

const CalendarPage = () => {
	return (
		<div className="Login-p-01 About-p-00">
			<AppHeader pageName="login" />
			<div className="Login-Content-01 About-Content-01">
				{/* <h1>Log In</h1> */}
				{/* <CreadentialsForm pageName="login" onFormSubmit={() => {}} /> */}
				CalendarPage
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
