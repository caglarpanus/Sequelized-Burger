module.exports = function(sequelize, DataTypes) {
  // Define the Burger Sequelize model
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
      class: {
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