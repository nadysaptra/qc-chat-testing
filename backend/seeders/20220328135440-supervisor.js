'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('supervisors', [{
      name: 'supervisor1',
      email: 'test-supervisor-1@nadysaptra.com',
    },{
      name: 'supervisor2',
      email: 'test-supervisor-2@nadysaptra.com',
    },{
      name: 'supervisor3',
      email: 'test-supervisor-3@nadysaptra.com',
    }], {});
  },
  down() {}
};
