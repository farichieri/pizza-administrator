const router = require('express').Router();
const Order = require('../../models/order');

router.get('/dates', async (req, res) => {
  try {
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;

    const orders = await Order.find();
    const ordersSearched = orders.filter(
      (order) => order.startDate >= startDate && order.startDate <= endDate
    );
    res.status(200).json(ordersSearched);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

module.exports = router;
