const models = require("./models"),
  Sequelize = require("sequelize"),
  express = require("express"),
  cors = require('cors'),
  bodyParser = require("body-parser");
  let app = express();






//boiler plate body parser can talk to the html and get it recieve it in app.js

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

console.log("party party");

app.get('/', function(req, res, next) {
res.json({msg: 'This is CORS-enabled for all origins!'})
})

app.get('/listusers', (req, res, next) => {
  models.users.findAll().then(function(results) {
  console.log('hello')
  res.json({status: 'success', 'data': results
  })
 })
})

app.get('/listmicrophones', (req, res, next) => {
  models.microphone.findAll().then(function(results) {
  res.json({status: 'success', 'data': results
  })
 })
})

app.get ('/microphone/:id', (req, res, next) => {
  console.log('hello');
  let id = parseInt(req.params.id);
  console.log(req.params);
  models.microphone.findById(id)
    .then(function(results) {
    res.json({status: 'success', 'data': results
    })
   })
 })

 app.get ('/getuser/:id', (req, res, next) => {
   console.log('hello');
   let id = parseInt(req.params.id);
   console.log(req.params);
   models.users.findById(id)
     .then(function(results) {
     res.json({status: 'success', 'data': results
     })
    })
  })

 app.post('/updateuser/:usename', (req, res, next) => {
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

app.post('/createuser', (req, res, next) =>{
    console.log(req.body);
    let first_name = req.body.first_name;
    let last_name = req.body.last_name;
    let username = req.body.username;
    let password = req.body.password;

  const user = models.users.build({
    first_name : first_name,
    last_name : last_name,
    username : username,
    password : password
  });
  user.save().then(function(newUser) {
    console.log(newUser.dataValues);
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
// createProduct(5, 'sure', 'ksm27', '2393575jh', 'This is a studio microphone that could be used in live situaions.', 'phantom');
// createProduct(3, 'sure', 'sm58', '2684903ght', 'This is a live microphone for vocals.', 'passive')
// createProduct(2, 'sennheiser', 'e835', '234525yhdf', 'This is a live dynamic vocal mic', 'passive')
// createProduct(1, 'nuemann', 'tlm 102', '24358sdflwb', 'This is the holy grail of recording mics with a cardioid pattern.', 'power supply')


// function listProducts() {
//   model.microphones.findAll().then(function(microphones) {
//     microphones.forEach(function(microphones) {
//       console.log(microphones.dataValues);
//     });
//   });
// }
//
// function findit() {
//   models.microphone.findById(4).then((r) =>{
//      console.log('this is the one ', r)})
// }
// findit()
// // listProducts();
//
// function deleteProduct () {
//   model.microphones.findById(3)
//     .then( (microphones) => {
//       console.log(microphones);
//       microphones.destroy()
//     })
// }

// deleteProduct();

// function createUser(first_names, last_name, username, password) {
//   const user = models.users.build({
//     first_name : first_names,
//     last_name : last_name,
//     username : username,
//     password : password
//   });
//
//   user.save().then(function(newUser) {
//     console.log(newUser.dataValues);
//   });
// }

// createUser('Bailey', 'Bryant', 'fluffykitty', '12345678');
// createUser('Sam', 'Kapila', 'uiqueen', '23456789');
// createUser('Sarah', 'Shuey', 'alpha', '34567890');
// createUser('Colton', 'Dowling', 'colot', '56787890');
// createUser('Anthony', 'Silva', 'ajsilva', '12345678');


// function listUsers() {
//   models.users.findAll().then(function(users) {
//     users.forEach(function(user) {
//       console.log(user.dataValues);
//     });
//   });
// }

// listUsers();

// function updateUser() {
//   models.user
//     .update(
//       {
//         name: "The artist formerly known as Bailey"
//       },
//       {
//         where: {
//           id: 1
//         }
//       }
//     )
//     .then(result => {
//       models.user.findById(1).then(user => {
//         // console.log(user);
//       });
//     });
// }

// updateUser();

// function deleteUser (){
//   models.user.findById(3)
//     .then( (user) => {
//       console.log(user);
//       user.destroy()
//     })
// }

// deleteUser();

app.listen(8080, () => {
  console.log("successfully started Express Application");
  console.log('CORS-enabled web server listening on port 80')
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
