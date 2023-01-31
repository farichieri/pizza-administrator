const express = require('express');
const app = express();
const cors = require('cors');
const notFound = require('./middlewares/notFound');
const handleErrors = require('./middlewares/handleErrors');
const Database = require('./connection');
const port = process.env.PORT || 5000;
require('dotenv').config();
const routes = require('./routes/index.js');

//middlewares
app.use(cors());
app.use(express.json());

app.use('/api', routes);
app.get('/', (req, res) => {
  res.send('Welcome to Pizza-Administrator Backend');
});
app.use(notFound);
app.use(handleErrors);

new Database();

app.listen(port || 5000, () => {
  console.log(`Listening to port: ${port}!`);
});
