'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('agents', [{
      name: 'agent1',
      email: 'test-agent-1@nadysaptra.com',
    },{
      name: 'agent2',
      email: 'test-agent-2@nadysaptra.com',
    },{
      name: 'agent3',
      email: 'test-agent-3@nadysaptra.com',
    }], {});
  },
  down() {}
};
