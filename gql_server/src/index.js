if (!process.env.NODE_ENV) process.env.NODE_ENV = 'development';

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const graphqlHTTP = require('express-graphql');

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

app.use(
	'/graphql',
	graphqlHTTP({
		// schema,
		// rootValue: resolvers,
		graphiql: true
	})
); // GraphQL

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`GraphQL-Server is up, PORT=${PORT} NODE_ENV=${process.env.NODE_ENV}..`));
