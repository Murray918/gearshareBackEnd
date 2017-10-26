const models = require("./models"),
  Sequelize = require("sequelize"),
  express = require("express"),
  bodyParser = require("body-parser");
  let app = express();
  app.use(bodyParser.json())


//boiler plate body parser can talk to the html and get it recieve it in app.js

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

console.log("party party");

app.get('/listusers', (req, res) => {
  models.users.findAll().then(function(results) {
  res.json({status: 'success', 'data': results
  })
 })
})

app.get('/listmicrophones', (req, res) => {
  models.microphone.findAll().then(function(results) {
  res.json({status: 'success', 'data': results
  })
 })
})

app.get ('/search/micropnones', (req, res) => {
  // res.render('updatePage')
  let make = 'sure'
  models.microphone.findAll({
    where : {make:make}
  })
    .then(function(results) {
    res.json({status: 'success', 'data': results
    })
   })
 })

 app.post('/updateuser/:usename', (req, res) => {
   let username = 'fluffykitty'
   const userToUpdate = models.users.update({
     first_name: 'The artist formerly known as Bailey',
   },{
     where: {username : username}
   })
   .then( (results) => {
     res.json({status: 'success', 'data': results
   })
 })
})




//this creates the table for all the products
function createProduct(user_id, make, model, serial_number, description, power_source) {
  console.log(models.microphone);
  const microphone = models.microphone.build({
      user_id : user_id,
      make : make,
      model : model,
      serial_number : serial_number,
      description : description,
      power_source : power_source
  });
  microphone.save().then(newMicrophone => {
    console.log(newMicrophone.dataValues);
    return newMicrophone.dataValues
  });
}
createProduct(6, 'sure', 'ksm27', '2393575jh', 'This is a studio microphone that could be used in live situaions.', 'phantom');


function listProducts() {
  model.microphones.findAll().then(function(microphones) {
    microphones.forEach(function(microphones) {
      console.log(microphones.dataValues);
    });
  });
}

// listProducts();

function deleteProduct () {
  model.microphones.findById(3)
    .then( (microphones) => {
      console.log(microphones);
      microphones.destroy()
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
