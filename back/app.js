const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/user');
const jwt = require('jsonwebtoken');

require('dotenv/config');

//middlewares
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('First Request!');
});

app.get('/users', (req, res) => {
  let users = ['Yo', 'Tu', 'El', 'Vosotros', 'Blablabla...'];
  res.send({ users: users });
});

app.post('/api/create_user', async (req, res) => {
  try {
    await User.create({
      name: req.body.name,
      username: req.body.username,
      password: req.body.password,
      isAdmin: req.body.isAdmin,
    });
    res.json({ status: 'ok' });
  } catch (error) {
    console.log(error);
    res.send({ message: error });
  }
});

app.use('/api/login', async (req, res) => {
  const user = await User.findOne({
    username: req.body.username,
    password: req.body.password,
  });
  if (user) {
    const token = jwt.sign(
      {
        username: req.body.username,
        password: req.body.password,
      },
      'secret123'
    );
    return res.json({ status: 'ok', user: token });
  } else {
    return res.json({ status: 'error', user: false });
  }
});

mongoose.connect(`${process.env.DB_ACCESS}`, (req, res) => {
  console.log('Connected to MongoDB');
});

app.listen(process.env.PORT, () => {
  console.log(`Listening to port: ${process.env.PORT}`);
});
