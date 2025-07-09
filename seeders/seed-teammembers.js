'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('TeamMembers', [
      {
        teamId: 1,  // Frontend Team
        userId: 1,  // Yashwardhan Nigam
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        teamId: 2,  // Backend Squad
        userId: 2,  // John Doe
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('TeamMembers', null, {});
  }
};
