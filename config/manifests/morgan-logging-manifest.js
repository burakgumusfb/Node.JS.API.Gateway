module.exports = {
    version: '1.0.0',
    init: function (pluginContext) {
       let policy = require('../policies/morgan-logging')
       pluginContext.registerPolicy(policy)
    },
    policies:['morgan-logging']
}