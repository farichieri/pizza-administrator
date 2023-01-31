const router = require('express').Router();
const Order = require('../../models/order.js');

router.delete('/api/orders/:_id', async (req, res) => {
  const { _id } = req.params;
  try {
    Order.findByIdAndRemove({ _id }).then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Order with id=${_id}. Maybe the order was not found`,
        });
      } else {
        res.status(200).send({
          message: 'Tutorial was deleted successfully!',
        });
      }
    });
  } catch (error) {
    res
      .status(500)
      .send({
        message: 'Could not delete Order with id: ' + _id,
        error: message.error,
      });
  }
});

module.exports = router;
