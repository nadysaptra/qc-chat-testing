const express = require('express');
const router = express.Router();
const customerModel = require('../models/customer');
const agentModel = require('../models/agent');
const { AGENT_ALLOCATION } = require('../constant/allocation');
const allocationConfigModel = require('../models/allocation_config');
const guard = require('./guard/role')

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
 * Check session
 * @route GET /customer/check-session
 * @group Customer
 * @returns {Array} 200 - { valid: true | false }
 * @returns {Error}  400 - Unexpected error
 */
router.get('/check-session', guard.roleGuard, async function(req, res, next) {
  try {
    res.json(await customerModel.findAllCustomer());
  } catch (err) {
    console.error(`Error while getting users `, err.message);
    next(err);
  }
});

/**
 * Check status of serve | unserve | resolve
 * @route GET /customer/:id/status
 * @group Customer
 * @returns {Array} 200 - { status: 200, data: {status: "serve" } }
 * @returns {Error}  400 - Unexpected error
 */
router.get('/:id/status', guard.roleGuard, async function(req, res, next) {
  try {
    const {id} = req.params;
    const resQuery = await customerModel.findCustomerById(id);
    res.json({
      data: {
        status: resQuery.status
      },
      status: 200,
    });
  } catch (err) {
    console.error(`Error while getting users `, err.message);
    next(err);
  }
});

/**
 * Check remaining queue
 * @route GET /customer/queue
 * @group Customer
 * @returns {Array} 200 - { status: 200, data: {queue: 1} }
 * @returns {Error}  400 - Unexpected error
 */
router.get('/queue', guard.roleGuard, async function(req, res, next) {
  try {
    let queue = 0;
    const allocation = (await allocationConfigModel.findAllocationAgent()).value || AGENT_ALLOCATION;
    let availableAgent = await agentModel.findAvailableAgent();
    availableAgent = availableAgent
      .filter((v) => v.total < allocation)
      .sort((a, b) => a.total - b.total);
    // * find only remaining queue
    if(availableAgent && availableAgent.length > 0) {
      queue = availableAgent[0].total;
    }
    res.json({
      data: {
        queue
      },
      status: 200,
    });
  } catch (err) {
    console.error(`Error while getting users `, err.message);
    next(err);
  }
});

/**
 * Get customer by agent id
 * @route GET /customer/agent/{id}
 * @group Customer
 * @param {integer} id.path.required - id agent - ex: 1
 * @returns {Array} 200 - { status: 200, data: customers: [] }
 * @returns {Error}  400 - Unexpected error
 */
router.get('/agent/:id', guard.roleGuard, async function(req, res, next) {
  try {
    const {id} = req.params;
    const customers = await customerModel.findAllCustomerByAgentId(id);
    res.json({
      data: {
        customers
      },
      status: 200,
    });
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
 * this function must be on bottom of file
 */
router.get('/:id', guard.roleGuard, async function(req, res, next) {
  try {
    const {id} = req.params;
    res.json(await customerModel.findCustomerById(id));
  } catch (err) {
    console.error(`Error while getting users `, err.message);
    next(err);
  }
});

module.exports = router;