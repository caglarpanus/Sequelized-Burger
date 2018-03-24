
// Import the model (models.js) to use its database functions. Only Index.js will be imported 
// Any JS file inside models file will be synced to index.js. 
const db = require("../models");

module.exports = function(app){


// Get all the burgers in the database.
app.get("/", (req, res) => {
  db.Burger.findAll({
    include: [db.Customer],
    order:"name"
  }).then(function(data){

    var hbsObject = {
      burgers:data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });

//Create new burger

app.post("/burgers", (req, res) => {
  db.Burger.create({
    
    name:req.body.name,
    devoured:false
  }).then(function(result){
    console.log(result);
    res.end();
  })  
});


app.put("/burgers/:id", function(req, res) {

  var burgerID = req.params.id;
  var customerName = req.body.customerName;

  db.Customer.findAll({
    where: {
      name: customerName
    }
  })
  .then(function(customer) {
    // Check if customer exists
    if (customer.length === 0) {
      // Create new customer
      db.Customer.create({
        name: customerName
      })
      .then(function(newCustomer) {
        // Add customer reference to burger
        db.Burger.update(
          {
            devoured: true,
            CustomerId: newCustomer.id
          },
          {
            where: {
              id: req.params.id
            }
          }
        ).then(function(burger) {
          res.redirect('/');
        });
       
      });
     
    } 
    else { // if the customer exists already
      // Add customer reference to burger
      db.Burger.update(
        {
          devoured: true,
          CustomerId: customer[0].id
        },
        {
          where: {
            id: req.params.id
          }
        }
      ).then(function(burger) {
        res.redirect('/');
      });
    }
  });
 });
}

