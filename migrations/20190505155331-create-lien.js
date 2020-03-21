'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Liens', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      li_idArticle: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model:'Articles',
          key: 'id'
        }
      },
      li_url: {
        allowNull: false,
        type: Sequelize.STRING
      },
      li_nom: {
        allowNull: false,
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
    return queryInterface.dropTable('Liens');
  }
};