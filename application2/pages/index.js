import Link from 'next/link';

export default () => {
	return (
		<div>
			<div className="Header-c-00">
				{/* <div className="Header-c-00" style={{ border: '1px solid red' }}> */}
				<div className="header-002-hamburger-div" onClick={() => {}}>
					<div />
					<div />
					<div />
				</div>
				<Link href="/">
					<h2 id="application-header-brand-logo" className="my-theme-gradient-text">
						{/* <ReactSVG src="/calendar.svg" /> */}
						Schedular
					</h2>
				</Link>
			</div>
		</div>
	);
};
