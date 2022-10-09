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
    order: [
      {
        orderProduct: {
          type: String,
          required: true,
        },
        ammount: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    orderTotalValue: {
      type: Number,
      required: true,
    },
    userCreator: {
      type: String,
      required: true,
    },
  },
  { collection: 'order-data' }
);

const model = mongoose.model('OrderData', Order);

module.exports = model;
