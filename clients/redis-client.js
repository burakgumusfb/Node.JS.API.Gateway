const { Promise } = require('bluebird');
const redis = Promise.promisifyAll(require('redis'));

const client = redis.createClient({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
});

client.on('error', (error) => {
});

module.exports = client;
