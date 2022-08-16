const express = require('express');
const mongoose = require('mongoose');
const app = express();
require('dotenv/config');

app.use(express.json());

app.get('/', (req, res) => {
  res.send('First Request!');
});

app.get('/users', (req, res) => {
  let users = ['Yo', 'Tu', 'El', 'Vosotros', 'Blablabla...'];

  res.send({ users: users });
});

app.post('/create_user', (req, res) => {
  console.log(req.body);
  res.send(`Created your user ${req.body.name}`);
});

mongoose.connect(`${process.env.DB_ACCESS}`, (req, res) => {
  console.log('Connected to MongoDB');
});

app.listen(process.env.PORT, () => {
  console.log(`Listening to port: ${process.env.PORT}`);
});
