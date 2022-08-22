const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/user');
const Product = require('./models/product');
const Order = require('./models/order');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

require('dotenv/config');

//middlewares
app.use(cors());
app.use(express.json());

// USER //
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

// PRODUCT //
app.post('/api/create_product', async (req, res) => {
  try {
    const product = await Product.create({
      productName: req.body.productName,
    });
    res.json({ product });
  } catch (error) {
    res.send({ message: error });
  }
});

app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json({ products });
  } catch (error) {
    res.send({ message: error });
  }
});

app.delete('/api/product/:_id', async (req, res) => {
  const { _id } = req.params;
  try {
    Product.findByIdAndRemove(_id).then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Product with id=${_id}. Maybe Product was not found.`,
        });
      } else {
        res.send({ message: 'Product was deleted successfully.' });
      }
    });
  } catch (error) {
    res.status(505).send({ message: 'Error deleting product with id=' + _id });
  }
});

// ORDER //
app.post('/api/create_order', async (req, res) => {
  try {
    const order = await Order.create({
      orderName: req.body.orderName,
      orderProduct: req.body.orderProduct,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      ammount: req.body.ammount,
      price: req.body.price,
    });
    res.send({ order });
  } catch (error) {
    res.send({ message: error });
  }
});

app.get('/api/orders', async (req, res) => {
  try {
    const orders = await Order.find();
    res.json({ orders });
  } catch (error) {
    res.send({ message: error });
  }
});

app.put('/api/order/:_id', async (req, res) => {
  const { _id } = req.params;
  try {
    Order.findByIdAndUpdate({ _id }, req.body).then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Order with id=${_id}. Maybe Order was not found.`,
        });
      } else {
        res.send({ message: 'Order was updated successfully.' });
      }
    });
  } catch (error) {
    res.status(505).send({ message: 'Error updating tutorial with id=' + _id });
  }
});

app.delete('/api/order/:_id', async (req, res) => {
  const { _id } = req.params;
  try {
    Order.findByIdAndRemove({ _id }).then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Order with id=${_id}. Maybe the order was not found`,
        });
      } else {
        res.send({
          message: 'Tutorial was deleted successfully!',
        });
      }
    });
  } catch (error) {
    res.status(500).send({ message: 'Could not delete Order with di=' + _id });
  }
});

mongoose.connect(`${process.env.DB_ACCESS}`, (req, res) => {
  console.log('Connected to MongoDB');
});

app.listen(process.env.PORT, () => {
  console.log(`Listening to port: ${process.env.PORT}`);
});
