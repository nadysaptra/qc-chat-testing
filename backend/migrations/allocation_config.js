module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable(
            'allocation_configs',
            {
                id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                name: Sequelize.STRING,
                value: Sequelize.STRING,
            },
        );
    },

    down: (queryInterface) => {
        return queryInterface.dropTable('allocation_configs');
    }
};