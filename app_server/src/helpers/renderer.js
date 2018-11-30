import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import AppRouter from '../client/app_router';

export default (req) => {
  const content = renderToString(
    <StaticRouter location={req.path} context={{}}>
      <AppRouter />
    </StaticRouter>
  );

  return `
    <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>My Calendar</title>
      </head>
      <body>
        <div id="root">${content}<div>
        <script src="bundle.js"></script>
      </body>
    </html>
  `;
};