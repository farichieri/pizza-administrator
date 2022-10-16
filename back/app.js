const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/user');
const Product = require('./models/product');
const Order = require('./models/order');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const notFound = require('./middlewares/notFound');
const handleErrors = require('./middlewares/handleErrors');
const port = process.env.PORT || 5000;
require('dotenv/config');

//middlewares
app.use(cors());
app.use(express.json());

// USER //
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.send({ message: error });
  }
});

app.post('/api/users', async (req, res) => {
  try {
    const newPassword = await bcrypt.hash(req.body.password, 10);
    await User.create({
      name: req.body.name,
      username: req.body.username,
      password: newPassword,
      isAdmin: req.body.isAdmin,
    });
    res.json({ status: 'user created successfully' });
  } catch (error) {
    res.send({ message: error });
  }
});

app.delete('/api/users/:_id', async (req, res) => {
  const { _id } = req.params;
  try {
    await User.findByIdAndRemove(_id).then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete User with id=${_id}. Maybe User was not found.`,
        });
      } else {
        res.send({ message: 'User was deleted successfully.' });
      }
    });
  } catch (error) {
    res.status(505).send({ message: 'Error deleting User with id: ' + _id });
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
    return res.json({
      status: 'ok',
      user: token,
      isAdmin: user.isAdmin,
      password: user.password,
      username: user.username,
    });
  } else {
    return res.json({ status: 'error', user: false });
  }
});

// PRODUCT //
app.post('/api/products', async (req, res) => {
  try {
    const product = await Product.create({
      productName: req.body.productName,
    });
    res.json(product);
  } catch (error) {
    res.send({ message: error });
  }
});

app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.send({ message: error });
  }
});

app.delete('/api/products/:_id', async (req, res) => {
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
    res.status(505).send({ message: 'Error deleting product with id: ' + _id });
  }
});

// ORDER //
app.post('/api/orders', async (req, res) => {
  try {
    const order = await Order.create({
      orderName: req.body.orderName,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      order: req.body.order,
      orderTotalValue: req.body.order.reduce(
        (prev, next) => prev + Number(next.price),
        0
      ),
      userCreator: req.body.userCreator,
    });
    res.send(order);
  } catch (error) {
    res.send({ message: error });
  }
});

app.get('/api/orders', async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    res.send({ message: error });
  }
});

app.put('/api/orders/:_id', async (req, res) => {
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
    res
      .status(505)
      .send({ message: 'Error updating tutorial with id: ' + _id });
  }
});

app.delete('/api/orders/:_id', async (req, res) => {
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
    res.status(500).send({ message: 'Could not delete Order with id: ' + _id });
  }
});

// REPORTS

app.get('/api/reports', async (req, res) => {
  try {
    const orders = await Order.find();
    const totalValue = orders.reduce(
      (prev, next) => prev + Number(next.orderTotalValue),
      0
    );
    res.json(totalValue);
  } catch (error) {
    res.send({ message: error });
  }
});

app.get('/api/report/dates', async (req, res) => {
  try {
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;

    const orders = await Order.find();
    const ordersSearched = orders.filter(
      (order) => order.startDate >= startDate && order.startDate <= endDate
    );
    res.json(ordersSearched);
  } catch (error) {
    res.send({ message: error });
  }
});

app.use(notFound);
app.use(handleErrors);

mongoose.connect(`${process.env.DB_ACCESS}`, () => {
  try {
    console.log('Connected to MongoDB');
  } catch (error) {
    console.log(error);
  }
});

app.listen(port || 5000, () => {
  console.log(`Listening to port: ${port}!`);
});
