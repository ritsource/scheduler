import React from 'react';
import { Link } from 'react-router-dom';
import { GoMarkGithub, GoStar, GoRepoForked } from 'react-icons/go';

const AboutPage = () => {
	return (
		<div className="About-p-00">
			<h1>Schedule your work in Style</h1>
			<p className="About-Subheading-01">
				Inspired from{' '}
				<a href="https://calendar.google.com" target="_black">
					Google Calendar
				</a>{' '}
				and{' '}
				<a href="https://to-do.microsoft.com" target="_black">
					Microsoft Todo
				</a>
			</p>
			<div>
				<Link to="/login">
					<button style={{ margin: '10px 5px' }} className="Theme-Btn-First-99 Theme-Btn-Shadow-99">
						Sign In
					</button>
				</Link>
				<a href="https://github.com/ritwik310/my-calendar" target="_black">
					<button style={{ margin: '10px 5px' }} className="Theme-Btn-White-99 Theme-Btn-Shadow-99">
						<GoMarkGithub style={{ color: '#333333', fontSize: '16px', margin: 'auto 10px -3px auto' }} />
						Github
					</button>
				</a>
			</div>

			<p>
				<strong>Version 2.0</strong> - Report any bugs {' '}
				<a href="/contact" target="_black">
					here
				</a>
			</p>

			<div className="About-Side-Git-Btns-Container-01">
				<a href="https://github.com/ritwik310/my-calendar" target="_black">
					<button style={{ margin: '5px 10px' }} className="Theme-Btn-White-99 Theme-Btn-Shadow-99">
						<GoRepoForked style={{ color: '#333333', fontSize: '16px', margin: 'auto 10px -3px auto' }} />
						Fork it on Github
					</button>
					<button
						style={{ margin: '5px 0px', padding: '10px' }}
						className="Theme-Btn-Black-99 Theme-Btn-Shadow-99"
					>
						27
					</button>
				</a>
				<div>
					<a href="https://github.com/ritwik310/my-calendar" target="_black">
						<button style={{ margin: '5px 10px' }} className="Theme-Btn-White-99 Theme-Btn-Shadow-99">
							<GoStar style={{ color: '#333333', fontSize: '16px', margin: 'auto 10px -3px auto' }} />
							Star it on Github
						</button>
						<button
							style={{ margin: '5px 0px', padding: '10px' }}
							className="Theme-Btn-Black-99 Theme-Btn-Shadow-99"
						>
							105
						</button>
					</a>
				</div>
			</div>
		</div>
	);
};

export default {
	component: AboutPage
};
