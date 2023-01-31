const router = require('express').Router();
const Product = require('../../models/product.js');

router.delete('/:_id', async (req, res) => {
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

module.exports = router;
