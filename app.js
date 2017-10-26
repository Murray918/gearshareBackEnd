const models = require("./models"),
  Sequelize = require("sequelize"),
  express = require("express"),
  bodyParser = require("body-parser");
let app = express();

//boiler plate body parser can talk to the html and get it recieve it in app.js

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

console.log("party party");

//this creates the table for all the products
function createProduct() {
  const product = models.Product.build({
    make: "Sure",
    modelNum: "SM7B",
    info: "this is a micrphpne spoken word"
    // tags: ['mic', 'micrphpne', 'live']
  });
  product.save().then(newProduct => {
    console.log(newProduct.dataValues);
  });
}
// createProduct();

function listProducts() {
  models.Product.findAll().then(function(products) {
    products.forEach(function(product) {
      console.log(product.dataValues);
    });
  });
}

// listProducts();

function deleteProduct () {
  models.Product.findById(3)
    .then( (product) => {
      console.log(product);
      product.destroy()
    })
}

// deleteProduct();

function createUser(first_names, last_name, username, password) {
  const user = models.users.build({
    first_name : first_names,
    last_name : last_name,
    username : username,
    password : password
  });

  user.save().then(function(newUser) {
    console.log(newUser.dataValues);
  });
}

// createUser('Bailey', 'Bryant', 'fluffykitty', '12345678');
// createUser('Sam', 'Kapila', 'uiqueen', '23456789');
// createUser('Sarah', 'Shuey', 'alpha', '34567890');
// createUser('Colton', 'Dowling', 'colot', '56787890');
// createUser('Anthony', 'Silva', 'ajsilva', '12345678');


function listUsers() {
  models.users.findAll().then(function(users) {
    users.forEach(function(user) {
      console.log(user.dataValues);
    });
  });
}

listUsers();

function updateUser() {
  models.user
    .update(
      {
        name: "The artist formerly known as Bailey"
      },
      {
        where: {
          id: 1
        }
      }
    )
    .then(result => {
      models.user.findById(1).then(user => {
        // console.log(user);
      });
    });
}

// updateUser();

function deleteUser (){
  models.user.findById(3)
    .then( (user) => {
      console.log(user);
      user.destroy()
    })
}

// deleteUser();

app.listen(8080, () => {
  console.log("successfully started Express Application");
});

process.on("SIGINT", () => {
  console.log("\nshutting down");
  const index = require("./models/index");
  index.sequelize.close();

  // give it a second
  setTimeout(() => {
    console.log("process exit");
    process.exit(0);
  }, 1000);
});




//pg_dump --data-only [dbname] > dump.sql
