'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Projects', [
      {
        name: 'Project Alpha',
        description: 'This is the alpha project',
        ownerId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Project Beta',
        description: 'This is the beta project',
        ownerId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Projects', null, {});
  }
};
