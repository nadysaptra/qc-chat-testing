const Sequelize = require('sequelize');
const db = require('./index')
const allocation = require('../constant/allocation');

const AllocationConfigModel = db.sequelize.define('allocation_configs', {
  name: Sequelize.STRING,
  value: Sequelize.STRING,
})

const findAllocationAgent = () => AllocationConfigModel.findOne({
    attributes: ['value'],
    where: {
        name: allocation.AGENT_ALLOCATION
    }
});

const updateAllocationAgent = (name, value) => AllocationConfigModel.update({
    value
},{
    where: {
        name: allocation.AGENT_ALLOCATION
    }
});

module.exports = {
    AllocationConfigModel,
    findAllocationAgent,
    updateAllocationAgent
}