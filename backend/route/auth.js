const express = require('express');
const { UNSERVE } = require('../constant/customerStatus');
const router = express.Router();
const customerModel = require('../models/customer');
const agentModel = require('../models/agent');
const supervisorModel = require('../models/supervisor');

/**
 * Authenticate customer
 * @route POST /auth
 * @group Authentication
 * @param {string} email.query.required - email - eg: user@domain
 * @param {string} name.query.required - customers's name.
 * @returns {Array} 200 - { success: true | false }
 * @returns {Error}  400 - Unexpected error
 */
router.post('/', async function(req, res, next) {
  try {
    let form = req.body;
    form.status = UNSERVE;
    res.json(await customerModel.saveCustomer(form));
  } catch (err) {
    console.error(`Error while getting users `, err.message);
    next(err);
  }
});

/**
 * Authenticate agent
 * @route POST /auth/agent
 * @group Authentication
 * @param {string} body.body.required - email - eg: {email: user@domain}
 * @returns {Array} 200 - { success: true | false }
 * @returns {Error}  400 - Unexpected error
 */
router.post('/agent', async function(req, res, next) {
  try {
    let {email} = req.body;
    if(email) {
      res.json(await agentModel.authAgent(email));
    } else {
      res.json('invalid email', 500);
    }
  } catch (err) {
    console.error(`Error while getting users `, err.message);
    next(err);
  }
});

/**
 * Authenticate supervisor
 * @route POST /auth/agent
 * @group Authentication
 * @param {string} body.body.required - email - eg: {email: user@domain}
 * @returns {Array} 200 - { success: true | false }
 * @returns {Error}  400 - Unexpected error
 */
router.post('/supervisor', async function(req, res, next) {
  try {
    let {email} = req.body;
    if(email) {
      res.json(await supervisorModel.authSupervisor(email));
    } else {
      res.json('invalid email', 500);
    }
  } catch (err) {
    console.error(`Error while getting users `, err.message);
    next(err);
  }
});

module.exports = router;