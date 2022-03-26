const express = require('express');
const router = express.Router();
const agentModel = require('../models/agent');

router.get('/', async function (req, res, next) {
    try {
        const agent = await agentModel.findAllAgent();
        res.json(agent);
    } catch (err) {
        console.error(`Error while getting users `, err.message);
        next(err);
    }
});

module.exports = router;