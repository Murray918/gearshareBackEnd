const models = require("./models"),
  Sequelize = require("sequelize"),
  express = require("express"),
  bodyParser = require("body-parser");
let app = express();
const Project = Sequelize.import(__dirname + "/path/to/models/project")

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

function createUser() {
  const user = models.User.build({
    name: "Sarah Shuey",
    userName: "fluffyPuppy",
    bio: "I like dogs you fool"
    // tags: ['mic', 'micrphpne', 'live']
  });

  user.save().then(function(newUser) {
    console.log(newUser.dataValues);
  });
}

// createUser();

function listUsers() {
  models.User.findAll().then(function(users) {
    users.forEach(function(user) {
      console.log(user.dataValues);
    });
  });
}

listUsers();

function updateUser() {
  models.User
    .update(
      {
        name: "Bailey Marie"
      },
      {
        where: {
          id: 1
        }
      }
    )
    .then(result => {
      models.User.findById(1).then(user => {
        // console.log(user);
      });
    });
}

// updateUser();

function deleteUser (){
  models.User.findById(3)
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
