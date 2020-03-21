'use strict';
module.exports = (sequelize, DataTypes) => {
  const Article = sequelize.define('Article', {
    ar_titre: DataTypes.STRING,
    ar_resume: DataTypes.STRING,
    ar_contenu: DataTypes.STRING,
    ar_langage: DataTypes.STRING,
    ar_miniature: DataTypes.STRING,
    ar_site: DataTypes.STRING
  }, {});
  Article.associate = function(models) {
    // associations can be defined here
      models.Article.hasMany(models.Lien);
  };
  return Article;
};