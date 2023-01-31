const router = require('express').Router();
const Order = require('../../models/order.js');

router.get('/', async (req, res) => {
  try {
    const orders = await Order.find();
    const totalValue = orders.reduce(
      (prev, next) => prev + Number(next.orderTotalValue),
      0
    );
    res.status(200).json(totalValue);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

module.exports = router;
