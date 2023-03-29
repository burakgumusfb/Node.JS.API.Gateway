const jsonwebtoken = require('jsonwebtoken');
const util = require('util');
const redisClient = require('../clients/redis-client');
const CustomError = require('./custom-error')
const redisGet = util.promisify(redisClient.get).bind(redisClient);

const EXPIRES_IN = '10950d'; // 30 years for jwt token.
const REDIS_EXPIRES = (86400 * 30 * 12) * 30; // 30 years for redis.

const jwtLib = {
    sign: (payload, expiresIn = EXPIRES_IN) => {
        const signedToken = jsonwebtoken.sign(payload, process.env.JWT_SECRET, {
            expiresIn,
            algorithm: 'HS256',
        });

        redisClient.set(payload.sessionId, signedToken);
        redisClient.expire(payload.sessionId, REDIS_EXPIRES);
        return {
            token: signedToken,
            token_type: 'bearer',
        };
    },

    validate: async (token) => {
        const payload = jsonwebtoken.decode(token);
        const value = await redisGet(payload.sessionId);
        if (value != null) {
            try {
                jsonwebtoken.verify(token, process.env.JWT_SECRET);
            } catch (error) {
                redisClient.del(payload.sessionId);
                throw new CustomError('un_authorized', 401, true);
            }

            return payload;
        }
        throw new CustomError('un_authorized', 401, true);
    },
};

module.exports = jwtLib;
