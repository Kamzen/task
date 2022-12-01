'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('teams', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      league_id: {
        type: Sequelize.UUID,
        allowNull: false,
        foreignKey: true
      },
      team_name: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      match_played: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      goal_diff: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      points: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Teams');
  }
};