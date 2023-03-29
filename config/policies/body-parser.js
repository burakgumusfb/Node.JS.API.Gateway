const { PassThrough } = require("stream");
const jsonParser = require("express").json();
const urlEncodedParser = require("express").urlencoded({ extended: true });

module.exports = {
  name: 'body-parser',
  policy: () => {
    return (req, res, next) => {
      
      req.egContext.requestStream = new PassThrough();
      req.pipe(req.egContext.requestStream);
      
      const oldWrite = res.write;
      const oldEnd = res.end;

      const chunks = [];

      res.write = (...restArgs) => {
        chunks.push(Buffer.from(restArgs[0]));
        oldWrite.apply(res, restArgs);
      };
      res.end = (...restArgs)=> {
        if (restArgs[0]) {
          chunks.push(Buffer.from(restArgs[0]));
        }
        // eslint-disable-next-line prefer-const
        let body = Buffer.concat(chunks).toString('utf8');
        res.__custombody__ = body;
        oldEnd.apply(res, restArgs);
      }

      return jsonParser(req, res, () => urlEncodedParser(req, res, next));
    };
  }
};

