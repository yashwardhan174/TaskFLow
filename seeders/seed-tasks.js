'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Tasks', [
      {
        title: 'Design Landing Page',
        description: 'Create UI mockups and components',
        priority: 'High',
        status: 'Pending',
        startDate: new Date('2025-07-10'),
        dueDate: new Date('2025-07-15'),
        projectId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Setup Backend API',
        description: 'Create RESTful API endpoints',
        priority: 'Medium',
        status: 'In Progress',
        startDate: new Date('2025-07-05'),
        dueDate: new Date('2025-07-12'),
        projectId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Tasks', null, {});
  }
};
