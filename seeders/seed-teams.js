'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Teams', [
      {
        name: 'Frontend Team',
        description: 'Handles all UI and frontend logic',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Backend Squad',
        description: 'Responsible for backend APIs and databases',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Teams', null, {});
  }
};
