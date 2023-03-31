require('dotenv').config('.env');
const path = require('path');
const gateway = require('express-gateway');
const express = require('express');
const morgan = require('./config/policies/morgan-logging');
// const bodyParser = require('body-parser');


const app = express();
// app.use(bodyParser.json())

if(process.env.ENV_NAME && process.env.ENV_NAME !== process.env.NODE_ENV) {
  process.exit();
}

app.use(morgan.policy());



gateway()
  .load(path.join(__dirname, 'config'))
  .run();
