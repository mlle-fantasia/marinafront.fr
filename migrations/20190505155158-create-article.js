'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Articles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ar_titre: {
        allowNull: false,
        type: Sequelize.STRING
      },
      ar_resume: {
        allowNull: false,
        type: Sequelize.STRING
      },
      ar_contenu: {
        allowNull: false,
        type: Sequelize.STRING
      },
      ar_langage: {
        allowNull: true,
        type: Sequelize.STRING
      },
      ar_miniature: {
        allowNull: false,
        type: Sequelize.STRING
      },
      ar_site: {
        allowNull: true,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Articles');
  }
};