import "@babel/polyfill";
import express from 'express';
// import proxy from 'http-proxy-middleware';
import helmet from 'helmet';
import { matchRoutes } from 'react-router-config';

import renderer from './helpers/renderer';
import configureStore from './helpers/configure_store';
import AppRoutes from './client/app_routes';

const app = express();

app.use(helmet());

// app.use(proxy('/api', { target: 'http://server:5000', changeOrigin: true }));
// app.use(proxy('/auth', { target: 'http://server:5000', changeOrigin: true }));

app.use(express.static('public'));

app.get('*', (req, res) => {
  const store = configureStore(req);
  const context = {
    year: req.query.year || new Date().getFullYear(),
    month: req.query.month || new Date().getMonth()
  };

  const promises = matchRoutes(AppRoutes, req.path).map(({route}) => {
    return route.loadData ? route.loadData(store, context) : null;
  });

  Promise.all(promises).then(() => {
    const content = renderer(req, store, context);
    if (context.notFound) res.status(404);
    if (context.serviceUnavailable) res.status(503);
    res.send(content);
  }).catch((e) => {
    console.log('Catch **');
    console.log('Catch **', e.message);
    
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is up, PORT=${PORT} NODE_ENV=${process.env.NODE_ENV}..`));