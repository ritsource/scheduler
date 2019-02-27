import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import { renderRoutes } from 'react-router-config';
import serialize from 'serialize-javascript';

import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks';

export default (req, router, client, context, jsfile) => {
	const content = renderToString(
		<ApolloProvider client={client}>
			<ApolloHooksProvider client={client}>
				<StaticRouter location={req.path} context={context}>
					<div>{renderRoutes(router)}</div>
				</StaticRouter>
			</ApolloHooksProvider>
		</ApolloProvider>
	);

	return `
    <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <link rel="icon" href="favicon.ico">
        <link rel="stylesheet" href="3ed_party/normalize.min.css">
        <link href="3ed_party/Lato.css" rel="stylesheet">
        <link href="3ed_party/Montserrat.css" rel="stylesheet">
        <link rel="stylesheet" href="styles.css">
        <title>My Calendar</title>
      </head>
      <body>
        <div id="root">${content}<div>
      </body>
      <script>window.__APOLLO_STATE__ = ${JSON.stringify(client.extract())}</script>
      <script src="${jsfile}"></script>
    </html>
  `;
};

// serialize

{
	/* <script>window.__APOLLO_STATE__ = ${JSON.stringify(serialize(client.extract())).replace(/</g, '\\u003c')}</script> */
}
