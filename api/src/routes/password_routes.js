const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const sendEmail = require('../services/nodemailer');
const generateUserToken = require('../middlewares/gen_email_token');
const keys = require('../config/keys');

const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports = (app) => {
  app.post('/api/request_a_mail', generateUserToken, sendEmail, (req, res) => {
    try {
      res.status(200).send({ message: 'Email has been sent.' });
    } catch (error) {
      // console.log(error);
      res.status(422).send({ message: 'Something went wrong.' });
    }
  });

  app.post('/api/password_reset', (req, res) => {
    // try {
      const { email, _id } = jwt.verify(req.body.token, keys.email_token_key);
    // } catch (error) {
    //   res.status(504).send({ message: 'Your token has expired.' });
    // }

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(req.body.password, salt, async (err, hash) => {
        if (err) return err;
        const password = hash;
  
        try {
          const newUser = await User.findOneAndUpdate(
            { email, _id },
            { password: password },
            { new: true }
          );
          
          newUser.password = null;
          res.send(newUser);
        } catch (error) {
          // console.log(error.message);        
          res.status(422).send();
        }
      });
    });
  });
}