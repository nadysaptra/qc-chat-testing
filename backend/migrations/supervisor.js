module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable(
            'supervisors',
            {
                id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                name: Sequelize.STRING,
                email: Sequelize.STRING,
            },
        );
    },

    down: (queryInterface) => {
        return queryInterface.dropTable('supervisors');
    }
};