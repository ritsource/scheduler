import App from './app';
import AboutPage from './components/pages/about_page';
import HomePage from './components/pages/home_page';
import LoginPage from './components/pages/login_page';
import ForgotPasswordPage from './components/pages/forgot_pass_page';
import ResetPasswordPage from './components/pages/reset_pass_page';
import CalendarPage from './components/pages/calendar_page';
import TodoPage from './components/pages/todo_page';
import SettingsPage from './components/pages/settings_page';
import NotFoundPage from './components/pages/not_found_page';

export default [
	{
		...App,
		routes: [
			{ ...AboutPage, path: '/about', exact: true },
			{ ...HomePage, path: '/', exact: true },
			{ ...LoginPage, path: '/login', exact: true },
			{ ...ForgotPasswordPage, path: '/forgot_password', exact: true },
			{ ...ResetPasswordPage, path: '/reset_password', exact: true },
			{ ...CalendarPage, path: '/calendar' },
			{ ...TodoPage, path: '/todo' },
			{ ...SettingsPage, path: '/settings' },
			{ ...NotFoundPage }
		]
	}
];
