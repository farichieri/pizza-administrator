const router = require('express').Router();
const Order = require('../../models/order.js');

router.post('/', async (req, res) => {
  const { orderName, startDate, endDate, order, userCreator } = req.body;
  try {
    const newOrder = await Order.create({
      orderName: orderName,
      startDate: startDate,
      endDate: endDate,
      order: order,
      orderTotalValue: order.reduce(
        (prev, next) => prev + Number(next.price),
        0
      ),
      userCreator: userCreator,
    });
    res.status(200).send(newOrder);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

module.exports = router;
