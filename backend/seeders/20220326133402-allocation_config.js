'use strict';

const allocationConstant = require('../constant/allocation');

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('allocation_configs', [{
      name: allocationConstant.AGENT_ALLOCATION,
      value: '2',
    }], {});
  },
  down () {}
};
