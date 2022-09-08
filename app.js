//! 3rd party modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
//! Modules in the core structure of Node
//! my own created files
const pageRoute = require('./routes/pageRoute');
const courseRoute = require('./routes/courseRoute')



const app = express();

//* CONNECT DB
mongoose
  .connect('mongodb://localhost/smartedu-db'
  // , {
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true,
  //   usuFindAndModify: false,
  //   useCreateIndex: true,
  // }
  )
  .then(() => {
    console.log('DB Connected Successfully');
  });


//* TEMPLATE ENGINE
app.set('view engine', 'ejs');

//* MIDDLEWAREs
app.use(express.static('public'));
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

//* ROUTES
app.use('/', pageRoute);
app.use('/courses', courseRoute);





//* /////////////////////////////////////////////////
const port = 3000;
app.listen(port, () => {
  console.log(`App started on port ${port}`);
});
