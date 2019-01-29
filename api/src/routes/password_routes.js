const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

const sendEmail = require('../services/nodemailer');
const keys = require('../config/keys');
const outputTemp = require('../templates/mailer_v1');

module.exports = (app) => {
  // app.get('/api/forgot_password/:emailToken', (req, res) => {    
  //   try {
      
  //   } catch (error) {
      
  //   }
  // });

  app.post('/api/request_a_mail', sendEmail, (req, res) => {
    try {
      console.log('Su');      
    } catch (error) {
      console.log(error);
    }
  });

  // app.post('/api/password_reset/:token', () => {
  //   // reset_email_key
  // });
}