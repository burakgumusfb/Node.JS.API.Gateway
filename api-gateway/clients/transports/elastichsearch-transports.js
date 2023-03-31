const winston = require('winston');
const { ElasticsearchTransport } = require('winston-elasticsearch');
const ecsClient = require('../elasticsearch');

const esRequestTransports = [];
const ecsRequestTransportOpts = {
    level: 'info',
    client: ecsClient,
    indexPrefix: `gateway-${process.env.NODE_ENV}-request-logs`,
    indexSuffixPattern: 'YYYY.MM',
};


const esRequestTransport = new ElasticsearchTransport(ecsRequestTransportOpts);


switch (process.env.NODE_ENV) {
    case 'local':
        esRequestTransports.push(new winston.transports.Console());
        break;
    case 'production':
    case 'test':
    case 'dev':
        esRequestTransports.push(esRequestTransport);
        break;
    default:
        esRequestTransports.push(new winston.transports.Console());
        break;
}
esRequestTransport.on('error', (error) => {
    console.error('Error in logger caught', error);
});

const transports = {
    esRequestTransports
};
module.exports = transports;
