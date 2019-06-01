'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    us_email: DataTypes.STRING,
    us_username: DataTypes.STRING,
    u_password: DataTypes.STRING,
    us_isAdmin: DataTypes.BOOLEAN
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};