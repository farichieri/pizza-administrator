const mongoose = require('mongoose');

const Product = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
    },
  },
  { collection: 'product-data' }
);

const model = mongoose.model('ProductData', Product);

module.exports = model;
