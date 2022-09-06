const express = require('express');
const pageRoute = require('./routes/pageRoute');

const app = express();

//* TEMPLATE ENGINE
app.set('view engine', 'ejs');

//* MIDDLEWAREs
app.use(express.static('public'));

//* ROUTES
app.use('/', pageRoute);













//* /////////////////////////////////////////////////
const port = 3000;
app.listen(port, () => {
  console.log(`App started on port ${port}`);
});
