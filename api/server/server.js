if (!process.env.NODE_ENV) process.env.NODE_ENV = 'development';
const APP_HOST = process.env.APP_HOST || 'http://localhost:3000';

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');
const cookieSession = require('cookie-session');
const keys = require('./config/keys');

require('./db/mongoose'); // Mongoose
require('./models/user'); // User Model
require('./models/event'); // Event Model
require('./models/group'); // Group Model
require('./models/step'); // Step Model
require('./services/passport'); // Passport

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

app.use(cookieSession({
  maxAge: 30 * 24 * 60 * 60 * 1000,
  keys: [keys.cookie_key]
}));

app.use(passport.initialize());
app.use(passport.session());

// Routes
require('./routes/auth_routes')(app, APP_HOST);
require('./routes/event_routes')(app);
require('./routes/group_routes')(app);
require('./routes/step_routes')(app);

app.get('/', (req, res) => {
  res.send({ name: 'Ritwik' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is up, PORT=${PORT} NODE_ENV=${process.env.NODE_ENV}..`));