// Pull in required dependencies
const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
var path = require("path");

// Set up Express Application
const app = express();
const port = process.env.PORT || 8080;

// Requiring our models for syncing
var db = require(path.join(__dirname, '/models'));

// Serve static content for the app from the 'public' directory
app.use(express.static(process.cwd() + '/public'));

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Set Handlebars as the view engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Import routes and give the server access to them
require('./controllers/burgers_controller.js')(app);

// Syncing our sequelize models and then starting our express app
// Include the {force: true} parameter if you need to update the models
db.sequelize.sync().then(function() {
  app.listen(port, function() {
    console.log("Application is listening on PORT: " + port);
  });
});