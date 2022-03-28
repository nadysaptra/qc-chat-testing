const express = require('express');
const router = express.Router();
const agentModel = require('../models/agent');
const customerModel = require('../models/customer');
const guard = require('./guard/role')
/**
 * Get all agents
 * @route GET /agent
 * @group Agent
 * @returns {Array} 200 - [{ id: number, name: string, email: string }]
 * @returns {Error}  400 - Unexpected error
 * @headers {string} 200.X-Role - 	role of user
 */
router.get('/', guard.roleGuard, async (req, res, next) => {
    try {
        const agent = await agentModel.findAllAgent();
        res.json(agent);
    } catch (err) {
        console.error(`Error while getting users `, err.message);
        next(err);
    }
});

/**
 * Get all available agent - agent that still has allocation base on allocation config
 * @route GET /agent/available
 * @group Agent
 * @returns {Array} 200 - [{ id: number, name: string, email: string }]
 * @returns {Error}  400 - Unexpected error
 */
router.get('/available', async (req, res, next) => {
    try {
        const agent = await agentModel.findAvailableAgent();
        res.json(agent);
    } catch (err) {
        console.error(`Error while getting users `, err.message);
        next(err);
    }
});

/**
 * Get agent detail by customer id
 * @route GET /agent/customer/{id}
 * @group Agent
 * @param {integer} id.path.required - id of customer - eg: 1
 * @returns {Array} 200 - {data : { id: number, name: string, email: string }, status: 200}
 * @returns {Error}  400 - Unexpected error
 */
router.get('/customer/:id', async (req, res, next) => {
    try {
        const {
            id
        } = req.params;
        const customer = await customerModel.findCustomerById(id);
        const agent = await agentModel.findDetailAgent(customer.agent_id);
        res.json({
            data: {
                id: agent.id,
                name: agent.name,
                email: agent.email
            }
        });
    } catch (err) {
        console.error(`Error while getting users `, err.message);
        next(err);
    }
});

/**
 * Create new agent
 * @route POST /agent
 * @group Agent
 * @param {string} email.query.required - email - eg: user@domain
 * @param {string} password.query.required - agent's password.
 * @returns {object} 200 - {id: number, name: string, email: string}
 * @returns {Error}  400 - Unexpected error
 */
router.post('/', guard.roleGuard, async (req, res, next) => {
    try {
        const agent = await agentModel.assign();
        res.json(agent);
    } catch (err) {
        console.error(`Error while getting users `, err.message);
        next(err);
    }
});

/**
 * Update agent
 * @route PATCH /agent/{id}
 * @group Agent
 * @param {string} email.query.required - email - eg: user@domain
 * @param {string} password.query.required - password
 * @returns {object} 200 - {status: true}
 * @returns {Error}  400 - {status: false, message: "email cannot empty" |  "password cannot empty"}
 */
router.patch('/:id', guard.roleGuard, async (req, res, next) => {
    try {
        const agent = await agentModel.assign();
        res.json(agent);
    } catch (err) {
        console.error(`Error while getting users `, err.message);
        next(err);
    }
});

/**
 * Delete agent
 * @route DELETE /agent/{id}
 * @group Agent
 * @param {string} id.query.required - id - eg: 1
 * @returns {object} 200 - {status: true}
 * @returns {Error}  400 - {status: false, message: "agent still handling customer"}
 * @returns {Error}  404 - {status: false, message: "agent not found"}
 */
router.delete('/:id', guard.roleGuard, async (req, res, next) => {
    try {
        const agent = await agentModel.assign();
        res.json(agent);
    } catch (err) {
        console.error(`Error while getting users `, err.message);
        next(err);
    }
});

/**
 * Assign an agent to a customer
 * @route PUT /agent/{id}/assign/{customerId}
 * @group Agent
 * @param {string} id.query.required - id - eg: user@domain
 * @param {string} customerId.query.required - customer id.
 * @returns {object} 200 - An array of user info
 * @returns {Error}  400 - Unexpected error
 */
router.put('/asign', guard.roleGuard, async (req, res, next) => {
    try {
        const agent = await agentModel.assign();
        res.json(agent);
    } catch (err) {
        console.error(`Error while getting users `, err.message);
        next(err);
    }
});

/**
 * Resolve Agent Customer
 * @route PATCH /agent/{id}/resolve
 * @group Agent
 * @param {string} email.param.required - username or email - eg: user@domain
 * @param {string} password.param.required - user's password.
 * @returns {object} 200 - An array of user info
 * @returns {Error}  400 - Unexpected error
 */
router.patch('/:id/resolve', guard.roleGuard, async (req, res, next) => {
    try {
        const agent = await agentModel.resolve();
        res.json(agent);
    } catch (err) {
        console.error(`Error while getting users `, err.message);
        next(err);
    }
});


module.exports = router;