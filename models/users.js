'use strict';
module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    classMethods: {
    associate: function(models) {
        // associations can be defined here
        microphone.belongsTo(models.users, {foreignKey: 'userId'});

      }
    }
  });
  return users;
};
