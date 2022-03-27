const express = require('express');
const router = express.Router();
const customerModel = require('../models/customer');

/**
 * Get all customer
 * @route GET /customer
 * @group Customer
 * @returns {Array} 200 - [{ id: number, name: string, email: string, agent_id: integer, status: enum('UNSERVE', 'SERVE', 'RESOLVE') }]
 * @returns {Error}  400 - Unexpected error
 */
router.get('/', async function(req, res, next) {
  try {
    res.json(await customerModel.findAllCustomer());
  } catch (err) {
    console.error(`Error while getting users `, err.message);
    next(err);
  }
});

/**
 * Get detail customer
 * @route GET /customer/:id
 * @group Customer
 * @returns {Array} 200 - { id: number, name: string, email: string, agent_id: integer, status: enum('UNSERVE', 'SERVE', 'RESOLVE') }
 * @returns {Error}  400 - Unexpected error
 */
router.get('/:id', async function(req, res, next) {
  try {
    res.json(await customerModel.findAllCustomer());
  } catch (err) {
    console.error(`Error while getting users `, err.message);
    next(err);
  }
});

/**
 * Check session
 * @route GET /customer/check-session
 * @group Customer
 * @returns {Array} 200 - { valid: true | false }
 * @returns {Error}  400 - Unexpected error
 */
router.get('/check-session', async function(req, res, next) {
  try {
    res.json(await customerModel.findAllCustomer());
  } catch (err) {
    console.error(`Error while getting users `, err.message);
    next(err);
  }
});

/**
 * Check status of serve | unserve | resolve
 * @route GET /customer/check-status
 * @group Customer
 * @returns {Array} 200 - { valid: true | false }
 * @returns {Error}  400 - Unexpected error
 */
router.get('/check-status', async function(req, res, next) {
  try {
    res.json(await customerModel.findAllCustomer());
  } catch (err) {
    console.error(`Error while getting users `, err.message);
    next(err);
  }
});

module.exports = router;