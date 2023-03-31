const winston = require('winston');
const ecsFormat = require('@elastic/ecs-winston-format');
const {esRequestTransports} = require('../../clients/transports/elastichsearch-transports');

const logger = winston.createLogger({
    format: ecsFormat(),
    transports: esRequestTransports,
});

logger.on('error', (error) => {
    console.error('Error in logger caught', error);
});

module.exports = logger;
