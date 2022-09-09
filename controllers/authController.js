const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);

    res.status(201).json({
      status: 'success',
      user,
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (user) {
      bcrypt.compare(password, user.password, (err, same) => {
      if (same) {
        // USER SESSION
        req.session.userID = user._id;
          res.status(200).redirect('/');
        }
      });
    };
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};


// await User.findOne({ email }, (err, user) => { //! Bu şekilde yazınca "Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client" hatası veriyor.
//   if (user) {
//     bcrypt.compare(password, user.password, (err, same) => {
//       if (same) {
//         // USER SESSION
//         res.status(200).send('YOU ARE LOGGED IN');
//       }
//     });
//   }
// });