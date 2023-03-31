const express = require('express');
const app = express();

app.get('/example-one/hello', function(req, res) {
  res.send('Hello World From Example One!');
});

app.listen(3001, function() {
    console.log('Application is starting and application listening to port 3001');
  });