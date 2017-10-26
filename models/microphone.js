'use strict';
module.exports = (sequelize, DataTypes) => {
  var microphone = sequelize.define('microphone', {
    user_id: DataTypes.INTEGER,
    make: DataTypes.STRING,
    modle: DataTypes.STRING,
    serial_number: DataTypes.STRING,
    description: DataTypes.STRING,
    power_source: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return microphone;
};