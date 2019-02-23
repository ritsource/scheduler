import Document, { Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
	render() {
		return (
			<html>
				<Head>
					<meta charSet="UTF-8" />
					<meta name="viewport" content="width=device-width, initial-scale=1.0" />
					<link rel="icon" href="/static/favicon.ico" />
					<link rel="stylesheet" href="/static/3ed_party/normalize.min.css" />
					<link href="/static/3ed_party/Lato.css" rel="stylesheet" />
					<link href="/static/3ed_party/Montserrat.css" rel="stylesheet" />
					<link href="/static/styles.css" rel="stylesheet" />
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</html>
		);
	}
}

export default MyDocument;
