//! 3rd party modules
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const methodOverride = require('method-override');
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
  .connect(
    'mongodb+srv://bascher:9WycwGLAu78hO7GH@cluster0.acqsays.mongodb.net/my-smart-edu?retryWrites=true&w=majority'
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
app.use(flash());
app.use((req, res, next) => {
  res.locals.flashMessages = req.flash();
  next();
});
app.use(methodOverride('_method', { methods: ['POST', 'GET'] }));


//* ROUTES

app.use('*', (req, res, next) => {    //! Kullanıcı oturum kontrolü.
  userIN = req.session.userID;
  next();
});
app.use('/', pageRoute);
app.use('/courses', courseRoute);
app.use('/categories', categoryRoute);
app.use('/users', userRoute);



//* /////////////////////////////////////////////////
const port = process.env.PORT || 5000 ;
app.listen(port, () => {
  console.log(`App started on port ${port}`);
});

// Export the Express API
module.exports = app;