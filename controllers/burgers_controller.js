
// Import the model (models.js) to use its database functions. Only Index.js will be imported 
// Any JS file inside models file will be synced to index.js. 
const db = require("../models");

module.exports = function(app){
  //Get all the burgers in the database
  app.get("/", function(req, res) {

    db.Burger.findAll({
      include: [ db.Customer ]
    })
    .then(function(data) {

      var hbsObject = {
        burgers: data
      };
      console.log(hbsObject);
      res.render('index', hbsObject);
    });
  });

  // Create a new burger entry
  app.post("/burgers", function(req, res) {

    db.Burger.create(req.body)
    .then(function(burger) {
      res.redirect("/");
    });
  });


  app.put("/burgers/:id", function(req,res){

    var burgerID = req.params.id;
    var customerName = req.body.customerName;

    db.Customer.findAll({
      where:{
        name:customerName
      }
    }).then(function(customer){

        if(customer.length === 0){

          db.Customer.create({
            name:customerName
          }).then(function(newCustomer){

            db.Burger.update(
              {
                devoured:true,
                CustomerId:newCustomer.id

              },
              {
                where:req.params.id
              }
            
            ).then(function(burger){
              res.redirect("/");
            })

          });

        }else{

          db.Burger.update(
            {
              devoured:true,
              CustomerId:customer[0].id

            }
        ).then(function(burger){
          res.redirect("/");
        });

        }

    });

  });

}