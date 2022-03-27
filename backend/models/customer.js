const Sequelize = require('sequelize');
const db = require('./index')
const customerStatus = require('../constant/customerStatus');

const CustomerModel = db.sequelize.define('customers', {
  name: Sequelize.STRING,
  email: Sequelize.STRING,
  agent_id: Sequelize.INTEGER,
  status: Sequelize.ENUM([customerStatus.UNSERVE, customerStatus.SERVED, customerStatus.RESOLVED])
})

const findAllCustomer = () => CustomerModel.findAll();
const saveCustomer = (form) => CustomerModel.create(form)

module.exports = {
    CustomerModel,
    findAllCustomer,
    saveCustomer
}