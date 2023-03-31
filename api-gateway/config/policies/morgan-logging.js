const morgan = require('morgan');
const os = require('os');
const jwt = require('../../../lib/jwt');
const logger = require('../../logger/logger')

const ignoreList = [
    '/test',
];
const exportMorgan = {

    name: 'morgan-logging',
    policy: (actionParams) => {
        morgan.token('resBody', (_req, res) => {
           return res.__custombody__
        });
        morgan.token('body', (req) => {
            if (req && req.body) {
                return JSON.stringify(req.body);
            }
            return '';
        });
        morgan.token('ip', (req) => {
            if (req && req.headers)
                return (
                    req.headers['x-forwarded-for']
                    ? req.headers['x-forwarded-for'].split(',')[0]
                    : req.socket.remoteAddress || null
                );
            return '';
        });
        morgan.token('host', (req) => {
            if (req) {
                return os.hostname();
            }
            return '';
        });
        morgan.token('user', async (payload) => {
            if(payload && payload.sub){
                return payload.sub;
            }
            return '';
        });
        morgan.token('email', async (payload) => {
            if(payload && payload.email){
                return payload.email;
            }
            return '';
        });
        morgan.token('sessionId', async (payload) => {
            if(payload && payload.sessionId){
                return payload.sessionId;
            }
            return '';
        });

        return morgan(async (tokens, req, res) => {

            let payload =  null;
            if(req.headers && req.headers.authorization) {
                const token = req.headers.authorization.split(' ')[1];
                try {
                     payload = await jwt.validate(token);
                } catch (err) {
                    return payload;
                }
            }

            const method = tokens.method(req, res);
            const url = tokens.url(req, res);
            const status = tokens.status(req, res);
            const response = tokens.resBody(req, res);
            const body = tokens.body(req);
            const ip = tokens.ip(req);
            const host = tokens.host(req);
            const sessionId = await tokens.sessionId(payload);
            const user = await tokens.user(payload);
            const email = await tokens.email(payload);
            const responseTime = `${tokens['response-time'](req, res)}`;
            const log = {
                url,
                method,
                status,
                user,
                email,
                sessionId,
                body,
                response,
                responseTime,
                host,
                ip,
            };
            if (!ignoreList.some((x) => x === url)) {
                 logger.info(log);
            }
        });
    }
    
};
module.exports = exportMorgan;