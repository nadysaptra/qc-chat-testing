const customerStatus = require('../constant/customerStatus');
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable(
            'customer',
            {
                id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                name: Sequelize.STRING,
                email: Sequelize.STRING,
                agent_id: {
                    type: Sequelize.INTEGER,
                    references: {
                        model: 'agent',
                        key: 'id'
                    },
                    onUpdate: 'cascade',
                    onDelete: 'cascade'
                },
                status: Sequelize.ENUM(customerStatus.UNSERVE, customerStatus.SERVED, customerStatus.RESOLVED),
            },
        );
    },

    down: (queryInterface) => {
        return queryInterface.dropTable('customer');
    }
};