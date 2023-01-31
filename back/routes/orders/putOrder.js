const router = require('express').Router();
const Order = require('../../models/order.js');

router.put('/:_id', async (req, res) => {
  const { _id } = req.params;
  try {
    Order.findByIdAndUpdate({ _id }, req.body).then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Order with id=${_id}. Maybe Order was not found.`,
        });
      } else {
        res.status(200).send({ message: 'Order was updated successfully.' });
      }
    });
  } catch (error) {
    res.status(505).send({
      message: 'Error updating tutorial with id: ' + _id,
      error: message.error,
    });
  }
});

module.exports = router;
