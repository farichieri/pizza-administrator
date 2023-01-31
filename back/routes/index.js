const router = require('express').Router();

// users
const getUsers = require('./users/getUsers.js');
const postUser = require('./users/postUser.js');
const deleteUser = require('./users/deleteUser.js');

// auth
const loginUser = require('./auth/loginUser.js');

// products
const postProduct = require('./products/postProduct.js');
const getProducts = require('./products/getProducts.js');
const deleteProduct = require('./products/deleteProduct.js');

// orders
const getOrders = require('./orders/getOrders.js');
const postOrder = require('./orders/postOrder.js');
const putOrder = require('./orders/putOrder.js');
const deleteOrder = require('./orders/deleteOrder.js');

// reports
const getReports = require('./reports/getReports.js');
const getReport = require('./reports/getReport.js');

router.use('/users', getUsers, postUser, deleteUser);
router.use('/login', loginUser);
router.use('/products', postProduct, getProducts, deleteProduct);
router.use('/orders', getOrders, postOrder, putOrder, deleteOrder);
router.use('/reports', getReports, getReport);

module.exports = router;
