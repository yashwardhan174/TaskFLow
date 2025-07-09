'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Notifications', [
      {
        userId: 1,
        message: 'Welcome to TaskFlow, Yashwardhan!',
        read: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 2,
        message: 'You have been assigned to task "Setup Backend API".',
        read: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Notifications', null, {});
  }
};
