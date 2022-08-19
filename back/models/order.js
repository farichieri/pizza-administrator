const mongoose = require('mongoose');

const Order = new mongoose.Schema(
  {
    orderName: {
      type: String,
      required: true,
    },
    startDate: {
      type: Number,
      required: true,
    },
    endDate: {
      type: Number,
      required: false,
    },
    ammount: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: false,
    },
  },
  { collection: 'order-data' }
);

const model = mongoose.model('OrderData', Order);

module.exports = model;
