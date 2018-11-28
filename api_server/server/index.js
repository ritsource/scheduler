const express = require('express');
const bodyParser = require('body-parser');

require('./db/mongoose'); // Mongoose

const app = express();

// Middlewares
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send({ name: 'Ritwik' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is up at port ${PORT}..`));