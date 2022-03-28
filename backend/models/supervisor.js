const Sequelize = require('sequelize');
const db = require('./index');

const SupervisorModel = db.sequelize.define('supervisors', {
    name: Sequelize.STRING,
    email: Sequelize.STRING,
});

const authSupervisor = async (email) => await SupervisorModel.findOne({
    where: {
        email
    }
});
const findAllSupervisor = async () => await SupervisorModel.findAll();
const findDetailSupervisor = async (supervisorId) => await SupervisorModel.findOne({
    where: {
        id: supervisorId,
    }
});

const createSupervisor = async(form) => await SupervisorModel.create(form);

const updateSupervisor = async (id, name, email) => await SupervisorModel.update({
    name,
    email
}, {
    where: {
        id
    }
});

const deleteSupervisor = async (id) => await SupervisorModel.destroy({
    where: {
        id
    }
});

module.exports = {
    SupervisorModel,
    findAllSupervisor,
    findDetailSupervisor,
    createSupervisor,
    updateSupervisor,
    deleteSupervisor,
    authSupervisor
};