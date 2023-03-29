module.exports = {
    version: '1.0.0',
    init: function (pluginContext) {
       let policy = require('../policies/logging')
       pluginContext.registerPolicy(policy)
    },
    policies:['logging']
}