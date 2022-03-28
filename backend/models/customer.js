const Sequelize = require('sequelize');
const db = require('./index')
const customerStatus = require('../constant/customerStatus');

const CustomerModel = db.sequelize.define('customers', {
  name: Sequelize.STRING,
  email: Sequelize.STRING,
  agent_id: Sequelize.INTEGER,
  status: Sequelize.ENUM([customerStatus.UNSERVE, customerStatus.SERVED, customerStatus.RESOLVED])
})

const findAllCustomer = () => CustomerModel.findAll({
  attributes: ['id', 'name', 'email', 'agent_id', 'status'],
});

const findAllCustomerByAgentId = (id) => CustomerModel.findAll({
  attributes: ['id', 'name', 'email', 'agent_id', 'status'],
  where: {
    agent_id: id
  }
});
const findCustomerById = (id) => CustomerModel.findOne({
  attributes: ['name', 'email', 'agent_id', 'status'],
  where: {
    id: id
  }
});

const saveCustomer = (form) => CustomerModel.create(form)

const assignAgent = (agentId, customerId) => CustomerModel.update({
  agent_id: agentId,
  status: customerStatus.SERVED
}, {
  where: {
    id: customerId
  }
})

const resolve = (id) => CustomerModel.update({
  status: customerStatus.RESOLVED
}, {
  where: {
    id: id
  }
})


module.exports = {
    CustomerModel,
    findAllCustomer,
    saveCustomer,
    findCustomerById,
    assignAgent,
    resolve,
    findAllCustomerByAgentId
}