const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/user');
const Product = require('./models/product');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

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
    const newPassword = await bcrypt.hash(req.body.password, 10);
    await User.create({
      name: req.body.name,
      username: req.body.username,
      password: newPassword,
      isAdmin: req.body.isAdmin,
    });
    res.json({ status: 'ok' });
  } catch (error) {
    res.send({ message: error });
  }
});

app.post('/api/create_product', async (req, res) => {
  try {
    await Product.create({
      productName: req.body.productName,
    });
    res.json({ status: 'ok' });
  } catch (error) {
    res.send({ message: error });
  }
});

app.use('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json({ products });
  } catch (error) {
    res.send({ message: error });
  }
});

app.use('/api/login', async (req, res) => {
  const user = await User.findOne({
    username: req.body.username,
  });

  if (!user) {
    return { status: 'error', error: 'Invalid login' };
  }

  const isPasswordValid = await bcrypt.compare(
    req.body.password,
    user.password
  );

  if (isPasswordValid) {
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
