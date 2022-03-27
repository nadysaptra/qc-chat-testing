const express = require('express');
const router = express.Router();
const agentModel = require('../models/agent');

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
 * @route GET /allocation/:key
 * @group Allocation
 * @returns {Array} 200 - { id: number, name: string, value: string }
 * @returns {Error}  400 - Unexpected error
 */
router.get('/:key', async function (req, res, next) {
    try {
        res.json(agentModel.findAllAgent());
    } catch (err) {
        console.error(`Error while getting users `, err.message);
        next(err);
    }
});

/**
 * Update allocation
 * @route PATCH /allocation/:key
 * @group Allocation
 * @returns {Array} 200 - [{ id: number, name: string, value: string }]
 * @returns {Error}  400 - Unexpected error
 */
router.patch('/:key', async function (req, res, next) {
    try {
        res.json(agentModel.findAllAgent());
    } catch (err) {
        console.error(`Error while getting users `, err.message);
        next(err);
    }
});

module.exports = router;