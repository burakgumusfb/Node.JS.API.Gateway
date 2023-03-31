module.exports = {
    version: '1.0.0',
    init: function (pluginContext) {
       let policy = require('../policies/custom-auth')
       pluginContext.registerPolicy(policy)
    },
    policies:['custom-auth']
}