const express = require('express');
const dotenv = require('dotenv');

const app = express();
dotenv.config();

app.get('/', (req, res) => {
});

app.listen(process.env.PORT, (err) => {
  console.log('Listening on 3000...')
});