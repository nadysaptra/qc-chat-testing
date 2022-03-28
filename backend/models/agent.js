const Sequelize = require('sequelize');
const db = require('./index');
const allocationConfig = require('./allocation_config')
const allocation = require('../constant/allocation')
const {
    CustomerModel
} = require('./customer');
const { SERVED } = require('../constant/customerStatus');

const AgentModel = db.sequelize.define('agents', {
    name: Sequelize.STRING,
    email: Sequelize.STRING,
});

AgentModel.hasOne(CustomerModel);

const authAgent = async (email) => await AgentModel.findOne({
    where: {
        email
    }
});
const findAllAgent = async () => await AgentModel.findAll();
const findDetailAgent = async (agentId) => await AgentModel.findOne({
    where: {
        id: agentId,
    }
});

const createAgent = async (id, name, email) => await AgentModel.create({
    name,
    email
});

const updateAgent = async (id, name, email) => await AgentModel.update({
    name,
    email
}, {
    where: {
        id
    }
});

const deleteAgent = async (id) => await AgentModel.destroy({
    where: {
        id
    }
});


const findAvailableAgent = async () => {
    const resAllocation = await allocationConfig.findAllocationAgent();
    let allocationValue = allocation.AGENT_ALLOCATION;
    if (resAllocation) {
        allocationValue = resAllocation.value;
    }
    const sql = `
    SELECT
        a.*,
        IFNULL(t.total, 0) as total
    FROM
        agents a
        LEFT JOIN (
            SELECT
                COUNT(b.id) as total,
                b.agent_id
            FROM
                customers b
            WHERE
                b.agent_id IS NOT NULL
                AND b.status = '${SERVED}'
                GROUP BY b.agent_id) AS t ON t.agent_id = a.id
    WHERE t.total < ${allocationValue} OR t.total IS NULL
    `;
    const query = db.sequelize.query(sql, {
        type: db.sequelize.QueryTypes.SELECT
    });
    return query;
};


module.exports = {
    AgentModel,
    findAllAgent,
    findDetailAgent,
    findAvailableAgent,
    createAgent,
    updateAgent,
    deleteAgent,
    authAgent
};