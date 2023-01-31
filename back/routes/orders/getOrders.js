const router = require('express').Router();
const Order = require('../../models/order.js');

router.get('/', async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

module.exports = router;
