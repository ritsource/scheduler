import '@babel/polyfill';
import 'cross-fetch/polyfill';
import express from 'express';

const app = express();

app.use(express.static('public'));

import extraRoute from './routes/extra_route';
import todoRoute from './routes/todo_route';
import calendarRoute from './routes/calendar_route';
import notFoundRoute from './routes/404_route';

extraRoute(app);
todoRoute(app);
calendarRoute(app);
notFoundRoute(app); // Not Found Route

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`App-Renderer is up, PORT=${PORT} NODE_ENV=${process.env.NODE_ENV}..`));
