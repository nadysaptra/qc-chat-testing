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
 * @param {string} body.body.required - body - eg: {email: 'user@domain', name: 'blabla'}
 * @returns {object} 200 - {id: number, name: string, email: string}
 * @returns {Error}  400 - Unexpected error
 */
router.post('/', guard.roleGuard, async (req, res, next) => {
    try {
        const {
            name,
            email
        } = req.body
        const agent = await agentModel.createAgent(name, email);
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
 * @param {string} body.body.required - body - eg: {email: 'user@domain', name: 'blabla'}
 * @returns {object} 200 - {status: true}
 * @returns {Error}  400 - {status: false, message: "email cannot empty" |  "password cannot empty"}
 */
router.patch('/:id', guard.roleGuard, async (req, res, next) => {
    try {
        const {
            id
        } = req.params;
        const {
            name,
            email
        } = req.body
        const agent = await agentModel.updateAgent(id, name, email);
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
 * @param {integer} id.path.required - id - eg: 1
 * @returns {object} 200 - {status: true}
 * @returns {Error}  400 - {status: false, message: "agent still handling customer"}
 * @returns {Error}  404 - {status: false, message: "agent not found"}
 */
router.delete('/:id', guard.roleGuard, async (req, res, next) => {
    try {
        const {
            id
        } = req.params;
        const agent = await agentModel.deleteAgent(id);
        res.json(agent);
    } catch (err) {
        console.error(`Error while getting users `, err.message);
        next(err);
    }
});

/**
 * Assign an agent to a customer
 * @route PUT /agent/assign/{id}/customer/{customerId}
 * @group Agent
 * @param {integer} id.path.required - id - eg: 1
 * @param {integer} customerId.path.required - customer id - eg: 1
 * @returns {object} 200 - {status: 200}
 * @returns {Error}  400 - {status: 400, message: 'unexpected error'}
 */
router.put('/assign/:id/customer/:customerId', guard.roleGuard, async (req, res, next) => {
    try {
        const {
            id,
            customerId
        } = req.params;
        const customer = await customerModel.assignAgent(id, customerId);
        if (customer) {
            res.json({
                status: 200
            });
            return;
        }
        res.json({
            status: 400,
            message: 'unexpected error'
        });
    } catch (err) {
        console.error(`Error while getting users `, err.message);
        next(err);
    }
});


module.exports = router;