const express = require('express');
const app = express();

app.get('/example-two/hello', function(req, res) {
  res.send('Hello World you can access to me without JWT Token or any Auth');
});

app.listen(3002, function() {
  console.log('Application is starting and application listening to port 3002');
});