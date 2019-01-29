const nodemailer = require('nodemailer');
const keys = require('../config/keys');

module.exports = (req, res, next) => {
  const recieverEmail = req.body.email;
  const link = req.body.link || 'www.google.com' ;

  const outputTemp = require('../templates/mailer_v1')(link);

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    // port: 465,
    // secure: true,
    // auth: {
    //   type: 'OAuth2',
    //   user: keys.mail_sender_address,
    //   clientId: keys.google_client_id,
    //   clientSecret: keys.google_client_secret,
    //   refreshToken: keys.google_refresh_token
    // }
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
    to: req.body.email,
    subject: 'Message',
    text: 'I hope this message gets through!',
    auth: {
        user: keys.mail_sender_address,
        refreshToken: keys.google_refresh_token,
        accessToken: keys.google_access_token,
        // expires: 1484314697598
    }
  };

  // let mailOptions = {
  //   from: `"Portfolio Contact" <${keys.mail_sender_email}>`, // sender address
  //   to: `${keys.mail_receiver_email}`, // list of receivers
  //   subject: `From - ${req.body.email}`,
  //   text: 'Hello world?',
  //   html: outputTemp
  // };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('error', error);        
      return res.status(405).send();
    }

    // console.log('Message sent: %s', info.messageId);
    // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    console.log('Success');      
    next();
  });
};