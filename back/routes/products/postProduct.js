const router = require('express').Router();
const Product = require('../../models/product.js');

router.post('/', async (req, res) => {
  const { productName } = req.body;
  try {
    const product = await Product.create({
      productName: productName,
    });
    res.status(200).json(product);
  } catch (error) {
    res.status(505).send({ error: error.message });
  }
});

module.exports = router;
