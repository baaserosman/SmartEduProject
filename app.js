//! 3rd party modules
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const bodyParser = require('body-parser');
//! Modules in the core structure of Node
//! my own created files
const pageRoute = require('./routes/pageRoute');
const courseRoute = require('./routes/courseRoute');
const categoryRoute = require('./routes/categoryRoute');
const userRoute = require('./routes/userRoute');



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

//* GLOBAL VARIABLE

global.userIN = null;

//* MIDDLEWAREs

app.use(express.static('public'));
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(
  session({
    secret: 'my_keyboard_cat',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: 'mongodb://localhost/smartedu-db' }),
  })
);

//* ROUTES

app.use('*', (req, res, next) => {    // Kullanıcı oturum kontrolü.
  userIN = req.session.userID;
  next();
});
app.use('/', pageRoute);
app.use('/courses', courseRoute);
app.use('/categories', categoryRoute);
app.use('/users', userRoute);





//* /////////////////////////////////////////////////
const port = 3000;
app.listen(port, () => {
  console.log(`App started on port ${port}`);
});
