module.exports = function(sequelize, DataTypes){
    var Customer = sequelize.define("Customer",{
        name:{
            type:DataTypes.STRING,
            allowNull:false
        },
        //customer is one which mean he/she can consume more than one burger. That's why I use "hasMany"
        class:{
            associate: function(models){
                Customer.hasMany(models.Burger)
            }
        }
    });

    return Customer;
};