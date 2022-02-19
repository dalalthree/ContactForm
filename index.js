const express = require('express');
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');

const app = express();
dotenv.config();

app.use(express.urlencoded({ extended: false }));

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAILPASS
  }
});
const mailOptions = {
  from: process.env.EMAIL,
  subject: 'Ticket Confirmation'
};


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/client/index.html');
});

app.get('/sucess', (req, res) => {
  res.sendFile(__dirname + '/client/sucess.html');
});

app.post('/submit', (req, res) => {
  sendTicket(req.body.firstname, req.body.lastname, req.body.email, req.body.subject, res);
});

function sendConfirmation(first, last, email, subject, res){
  mailOptions.to = email;
  mailOptions.html = `
  <body style="background-color: lightgrey; font-family:cursive">
    <h2>Hello ${first} ${last},</h2>
    <h3>This is a confirmation for your ticket.</h3>
    
    <p style="font-weight: bold;">Your message: </p>
    <p>${subject}</p>
  </body>
  `;
  transporter.sendMail(mailOptions, function(err, info){
    if (err) {
      console.log(err);
    } else {
      console.log('Confirm sent: ' + info.response);
      res.redirect('/sucess');
    }
  });
}

function sendTicket(first, last, email, subject, res){
  mailOptions.to = process.env.EMAIL;
  mailOptions.html = `
  <body style="background-color: lightgrey; font-family:cursive">
    <h2>Ticket from ${first} ${last},</h2>
    <h3>Email: ${email}</h3>
    <p style="font-weight: bold;">Message: </p>
    <p>${subject}</p>
  </body>
  `;
  transporter.sendMail(mailOptions, function(err, info){
    if (err) {
      console.log(err);
    } else {
      console.log('Ticket sent: ' + info.response);
      sendConfirmation(first, last, email, subject, res);
    }
  });
}

app.listen(process.env.PORT, (err) => {
  console.log('Listening on ' + process.env.PORT + '...');
});