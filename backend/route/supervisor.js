const express = require('express');
const router = express.Router();
const supervisorModel = require('../models/supervisor');
const customerModel = require('../models/customer');
const agentModel = require('../models/agent');
const guard = require('./guard/role');
const { SERVED } = require('../constant/customerStatus');
/**
 * Get all supervisors
 * @route GET /supervisor
 * @group Supervisor
 * @returns {Array} 200 - [{ id: number, name: string, email: string }]
 * @returns {Error}  400 - Unexpected error
 * @headers {string} 200.X-Role - 	role of user
 */
router.get('/', guard.roleGuard, async (req, res, next) => {
    try {
        const res = await supervisorModel.findAllSupervisor();
        res.json(res);
    } catch (err) {
        console.error(`Error while getting users `, err.message);
        next(err);
    }
});

/**
 * Create new supervisor
 * @route POST /supervisor
 * @group Supervisor
 * @param {string} body.body.required - email - eg: {'email': 'user@domain', 'name': 'Spv1'}
 * @returns {object} 200 - {id: number, name: string, email: string}
 * @returns {Error}  400 - Unexpected error
 */
router.post('/', guard.roleGuard, async (req, res, next) => {
    try {
        const form = req.body;
        const supervisor = await supervisorModel.createSupervisor(form);
        res.json(supervisor);
    } catch (err) {
        console.error(`Error while getting users `, err.message);
        next(err);
    }
});

/**
 * Update supervisor
 * @route PATCH /supervisor/{id}
 * @group Supervisor
 * @param {string} body.body.required - email - eg: {'email': 'user@domain', 'name': 'Spv2'}
 * @param {string} id.path.required - id - eg: 1
 * @returns {object} 200 - {status: true}
 * @returns {Error}  400 - {status: false, message: "email cannot empty" |  "password cannot empty"}
 */
router.patch('/:id', guard.roleGuard, async (req, res, next) => {
    try {
        const {id} = req.params;
        const {name, email} = req.body
        const agent = await supervisorModel.updateSupervisor(id, name, email);
        res.json(agent);
    } catch (err) {
        console.error(`Error while getting users `, err.message);
        next(err);
    }
});

/**
 * Delete agent
 * @route DELETE /supervisor/{id}
 * @group Supervisor
 * @param {string} id.path.required - id - eg: 1
 * @returns {object} 200 - {status: 200, message: true}
 * @returns {Error}  500 - {status: 500, message: "agent still handling customer"}
 * @returns {Error}  404 - {status: 404, message: "agent not found"}
 */
router.delete('/:id', guard.roleGuard, async (req, res, next) => {
    try {
        const {id} = req.params;
        const validAgent = await agentModel.findDetailAgent(id);
        if(!validAgent) {
            res.json({
                status: 404,
                message: 'agent not found'
            })
            return;
        }
        const customers = await customerModel.findAllCustomerByAgentId(id);
        const isServingCustomer = customers.some((v) => v.status == SERVED);
        if(isServingCustomer) {
            res.json({
                status: 500,
                message: 'agent still handling customer'
            })
            return;
        }
        const res = await supervisorModel.deleteAgent(id);
        res.json({
            status: 200,
            message: true
        });
    } catch (err) {
        console.error(`Error while getting users `, err.message);
        next(err);
    }
});

module.exports = router;