const Sequelize = require('sequelize');
const db = require('./index');
const allocationConfig = require('./allocation_config')

const AgentModel = db.sequelize.define('agent', {
    name: Sequelize.STRING,
    email: Sequelize.STRING,
});

const findAllAgent = async () => await AgentModel.findAll();

const findDetailAgent = (agentId) => AgentModel.findOne({
    where: {
        id: agentId,
    }
});

const findAvailableAgent =  async () => {
    const allocationAgentValue = await allocationConfig.findAllocationAgent();
    console.log(allocationAgentValue);
    const query = db.sequelize.query(`
        SELECT
        a.*,
        t.total
    FROM
        agent a
        LEFT JOIN (
            SELECT
                COUNT(b.id) as total,
                b.agent_id
            FROM
                customer b
            WHERE
                b.agent_id IS NOT NULL
                AND b.status = 'unserve'
                GROUP BY b.agent_id) AS t ON t.agent_id = a.id
    WHERE t.total < 2 OR t.total IS NULL
    `, { type: db.sequelize.QueryTypes.SELECT });
    return query;
};


module.exports = {
    AgentModel,
    findAllAgent,
    findDetailAgent,
    findAvailableAgent
};