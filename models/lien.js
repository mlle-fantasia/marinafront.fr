'use strict';
module.exports = (sequelize, DataTypes) => {
  const Lien = sequelize.define('Lien', {
    li_idArticle: DataTypes.INTEGER,
    li_url: DataTypes.STRING,
    li_nom: DataTypes.STRING
  }, {});
  Lien.associate = function(models) {
    // associations can be defined here
      models.Lien.belongsTo(models.Article, {
        foreignKey: {
          allowNull: false
        }
      })
  };
  return Lien;
};