module.exports = function(sequelize, DataTypes) {
  var Burger = sequelize.define("Burger", 
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      devoured: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    }, {
      //A burger can only be eaten by one person. That's why I must use "belongsTo".
      classMethods: {
        associate: function(models) {
          Burger.belongsTo(models.Customer, {
            onDelete: "CASCADE",
            foreignKey: {
              allowNull: true
            }
          });
        }
      }
    });

  return Burger;
};