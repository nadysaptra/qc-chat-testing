const Sequelize = require('sequelize');
const db = require('./index')
const customerStatus = require('../constant/customerStatus');
const { AgentModel } = require('./agent');

const CustomerModel = db.sequelize.define('customer', {
  name: Sequelize.STRING,
  email: Sequelize.STRING,
  agent_id: Sequelize.INTEGER,
  status: Sequelize.ENUM([customerStatus.UNSERVE, customerStatus.SERVED, customerStatus.RESOLVED])
})

CustomerModel.hasOne(AgentModel);

const findAllCustomer = () => CustomerModel.findAll();

module.exports = {
    CustomerModel,
    findAllCustomer
}