const express = require('express');
const { nanoid, customAlphabet } = require('nanoid');
const app = express();

app.post('/token-service/create-token', function(req, res) {

      const tokenParams = {
          sub: nanoid(57),
          email: "email@email.com",
          sessionId: nanoid(256),
      };

      const token = jwt.sign(tokenParams);
      return token;
});

app.listen(3003, function() {
  console.log('Application is starting and application listening to port 3003');
});