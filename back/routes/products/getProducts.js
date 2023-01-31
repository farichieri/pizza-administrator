const router = require('express').Router();
const Product = require('../../models/product.js');

router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

module.exports = router;
