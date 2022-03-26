const express = require('express');
const router = express.Router();
const usersModel = require('../database/models/customer');

router.get('/', async function(req, res, next) {
  try {
    res.json(await usersModel.getAllCustomers(req.query.page));
  } catch (err) {
    console.error(`Error while getting users `, err.message);
    next(err);
  }
});

module.exports = router;