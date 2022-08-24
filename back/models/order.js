const mongoose = require('mongoose');

const Order = new mongoose.Schema(
  {
    startDate: {
      type: Number,
      required: true,
    },
    endDate: {
      type: Number,
      required: false,
    },
    orderName: {
      type: String,
      required: true,
    },
    order: {
      orderProduct: {
        type: String,
      },
      ammount: {
        type: Number,
      },
      price: {
        type: Number,
      },
    },
  },
  { collection: 'order-data' }
);

const model = mongoose.model('OrderData', Order);

module.exports = model;
