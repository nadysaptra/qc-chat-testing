const express = require('express');
const router = express.Router();
const agentModel = require('../models/agent');
const allocationConfigModel = require('../models/allocation_config');
const guard = require('./guard/role')

/**
 * Get all allocation
 * @route GET /allocation
 * @group Allocation
 * @returns {Array} 200 - [{ id: number, name: string, value: string }]
 * @returns {Error}  400 - Unexpected error
 */
router.get('/', async function (req, res, next) {
    try {
        res.json(agentModel.findAllAgent());
    } catch (err) {
        console.error(`Error while getting users `, err.message);
        next(err);
    }
});

/**
 * Get allocation by key
 * @route GET /allocation/{key}
 * @group Allocation
 * @param {integer} key.path.required - key - ex: agent_allocation
 * @returns {Array} 200 - { id: number, name: string, value: string }
 * @returns {Error}  400 - Unexpected error
 */
router.get('/:key', guard.roleGuard, async function (req, res, next) {
    try {
        res.json(agentModel.findAllAgent());
    } catch (err) {
        console.error(`Error while getting users `, err.message);
        next(err);
    }
});

/**
 * Update allocation
 * @route PATCH /allocation/{key}
 * @group Allocation
 * @param {integer} key.path.required - key - ex: agent_allocation
 * @param {string} body.body.required - id customer - ex: {'value': '2'}
 * @returns {Array} 200 - [{ id: number, key: string, value: string }]
 * @returns {Error}  400 - Unexpected error
 */
router.patch('/:key', guard.roleGuard, async function (req, res, next) {
    try {
        const {
            key
        } = req.params;
        const {
            value
        } = req.body;
        const res = await allocationConfigModel.updateAllocationAgent(key, value)
        if (!res) {
            res.json({
                status: 500,
                message: 'Error'
            }, 500);
        }
        res.json({
            status: 200,
            data: res
        }, 200);
    } catch (err) {
        console.error(`Error while getting users `, err.message);
        next(err);
    }
});

module.exports = router;