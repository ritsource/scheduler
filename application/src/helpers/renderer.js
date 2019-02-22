import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import serialize from 'serialize-javascript';

import AppRoutes from '../client/app_routes';

export default (req, store, context) => {  
  const content = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.path} context={context}>
        <div>{renderRoutes(AppRoutes)}</div>
      </StaticRouter>
    </Provider>
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
        <script>window.INITIAL_STATE = ${serialize(store.getState())}</script>
        <script src="bundle.js"></script>
      </body>
    </html>
  `;
};