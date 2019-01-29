const nodemailer = require('nodemailer');
const keys = require('../config/keys');

module.exports = (req, res, next) => {
  const recieverEmail = req.body.email;
  const link = req.body.link;

  const outputTemp = require('../templates/mailer_v1')(link);

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      type: 'OAuth2',
      user: keys.mail_sender_address,
      clientId: keys.google_client_id,
      clientSecret: keys.google_client_secret,
      refreshToken: keys.google_refresh_token,
      accessToken: keys.google_access_token,
      // expires: 1484314697598
    }
  });

  let mailOptions = {
    from: keys.mail_sender_address,
    to: recieverEmail,
    subject: 'Reset Password - My Calendar',
    // text: 'My Calendar',
    html: outputTemp,
    auth: {
        user: keys.mail_sender_address,
        refreshToken: keys.google_refresh_token,
        accessToken: keys.google_access_token,
        // expires: 1484314697598
    }
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('error', error);      
      return res.status(405).send();
    }
    
    // console.log('Success');      
    next();
  });
};