if (!process.env.NODE_ENV) process.env.NODE_ENV = 'development';

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');
const cookieSession = require('cookie-session');
const graphqlHTTP = require('express-graphql');

require('./db/mongoose'); // Mongoose
require('./models/user'); // User Model
require('./models/event'); // Event Model
require('./models/group'); // Group Model
require('./models/step'); // Step Model
require('./auth/passport'); // Passport

const keys = require('./config/keys');
const schema = require('./schema/schema');
const resolvers = require('./reslovers/index');

// App init
const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

app.use(
	cookieSession({
		maxAge: 30 * 24 * 60 * 60 * 1000,
		keys: [ keys.cookie_key ]
	})
);

app.use(passport.initialize());
app.use(passport.session());

// Middlewares
app.use(cors());
app.use(bodyParser.json());

app.use(
	'/graphql',
	graphqlHTTP({
		schema,
		rootValue: resolvers,
		graphiql: true
	})
); // GraphQL

// Routes
require('./auth/auth_routes')(app);

// Just for fun
app.get('/', (req, res) => {
	res.send({ name: 'Ritwik' });
});

// Ony for dev & testing
if (process.env.NODE_ENV !== 'production') {
	const { registerUser } = require('./auth/auth_funcs');

	app.post('/auth/dev-register', async (req, res) => {
		const { name, email, password } = req.body;
		const response = await registerUser({ name, email, password, req });
		res.send(response);
	});
}

// Server listening
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`GraphQL-Server is up, PORT=${PORT} NODE_ENV=${process.env.NODE_ENV}..`));
