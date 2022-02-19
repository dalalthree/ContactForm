const express = require('express');
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');

const app = express();
dotenv.config();

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAILPASS
  }
});
const mailOptions = {
  from: process.env.EMAIL,
  to: process.env.TESTINGEMAIL,
  subject: 'Testing Email',
  html: '<h1>Testing</h1> <p>Test</p>'
};

/*transporter.sendMail(mailOptions, function(error, info){
  if (error) {
	console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});*/

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/client/index.html');
});

app.listen(process.env.PORT, (err) => {
  console.log('Listening on ' + process.env.PORT + '...');
});