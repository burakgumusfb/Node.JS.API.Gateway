module.exports = {
  name: 'logging',
  policy: (actionParams) => {
    const that = this;
    return (req, res, next) => {

      const oldWrite = res.write;
      const oldEnd = res.end;

      const chunks = [];

      res.write = async (...restArgs) => {
        chunks.push(Buffer.from(restArgs[0]));
        oldWrite.apply(res, restArgs);
      };

      res.end = async (...restArgs) => {
        if (restArgs[0]) {
          chunks.push(Buffer.from(restArgs[0]));
        }
        // eslint-disable-next-line prefer-const
        let body = Buffer.concat(chunks).toString('utf8');
        let sessionId;
        if (req.headers && req.headers.authorization) {
          const token = req.headers.authorization.split(' ')[1];
          try {
            //const payload = await jwt.validate(token);
            sessionId = payload.sessionId;
            // eslint-disable-next-line no-empty
          } catch (err) {
            sessionId=err
           }
        }
        const log = {
          sessionId,
          time: new Date().toUTCString(),
          fromIP:
            req.headers['x-forwarded-for'] ||
            req.connection.remoteAddress,
          method: req.method,
          originalUri: req.originalUrl,
          uri: req.url,
          requestData: req.body,
          responseData: body,
          referer: req.headers.referer || '',
          ua: req.headers['user-agent'],
        };

        //logger.info(log);
        oldEnd.apply(res, restArgs);
      };

      next();
    };
  }
};