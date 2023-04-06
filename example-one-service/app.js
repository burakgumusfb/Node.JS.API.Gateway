const express = require('express');
const app = express();

app.get('/example-one/hello', function(req, res) {
  res.send('Hello, world! This is Example One, and you need to provide a JWT to access me.');
});

app.listen(3001, function() {
    console.log('Application is starting and application listening to port 3001');
  });