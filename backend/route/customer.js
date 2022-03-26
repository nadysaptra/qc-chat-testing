const express = require('express');
const router = express.Router();
const customerModel = require('../models/customer');

router.get('/', async function(req, res, next) {
  try {
    res.json(await customerModel.findAllCustomer());
  } catch (err) {
    console.error(`Error while getting users `, err.message);
    next(err);
  }
});

module.exports = router;