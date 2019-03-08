import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import { renderRoutes } from 'react-router-config';
import serialize from 'serialize-javascript';

export default (req, router, client, context, jsfilename) => {
	const content = renderToString(
		<ApolloProvider client={client}>
			<StaticRouter location={req.path} context={context}>
				<div>{renderRoutes(router)}</div>
			</StaticRouter>
		</ApolloProvider>
	);

	return `
    <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <meta name="Scheduler" content="Put Schedules and Todos on Calendar" />

        <meta name="og:title" property="og:title" content="Put Schedules on Calendar" />
        <meta property="og:type" content="video.movie" />
        <meta name="og:site_name" property="og:site_name" content="Scheduler" />
        <meta property="og:url" content="https://scheduler.ritwiksaha.com/" />
        <meta property="og:image" content="https://scheduler.ritwiksaha.com/image.png" />

        <meta name="og:description" property="og:description" content="Schedule your work in style. Google Calendar + Microsoft Todo in 1 app." />     

        <link rel="icon" href="favicon.ico" />

        <link rel="stylesheet" href="css/normalize.min.css" />
        <link href="css/Lato.css" rel="stylesheet" />
        <link href="css/Montserrat.css" rel="stylesheet" />
        
        <link rel="stylesheet" href="css/${req.cookies.myAppColorTheme || 'Blue'}.css" />
        <link rel="stylesheet" href="css/${req.cookies.myAppColorMode || 'lightOnly'}.css" />
        <link rel="stylesheet" href="styles.v2.0.0.css" />

        <title>${req.path.charAt(1).toUpperCase() + req.path.slice(2) || 'About'} - Scheduler</title>
      </head>
      <body>
        <div id="root">${content}<div>
      </body>
      <script>window.__APOLLO_STATE__ = ${JSON.stringify(client.extract())}</script>
      <script src="${jsfilename}.v2.0.0.js"></script>
    </html>
  `;
};
