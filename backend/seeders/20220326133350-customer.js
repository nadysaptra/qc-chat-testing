'use strict';

const customerStatus = require('../constant/customerStatus');
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('customers', [{
      name: 'John Doe',
      email: 'johndoe@example.com',
      status: customerStatus.UNSERVE
    },{
      name: 'Jane Doe',
      email: 'janedoe@example.com',
      status: customerStatus.UNSERVE
    }], {});
  },
  down() {}
};
