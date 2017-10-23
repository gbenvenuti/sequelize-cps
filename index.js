var customulize = require('customulize'),
    abbott = require('abbott'),
    createCpsFunction = require('./createCpsFunction'),
    addCustomMethods = customulize('cps', createCpsFunction);

module.exports = function(models){
    var firstModel = models[Object.keys(models)[0]];
    if (typeof firstModel === 'function') {
        firstModel = new firstModel();
    }
    if(firstModel && firstModel.sequelize && !firstModel.sequelize.cps){
        firstModel.sequelize.cps = {
            query: abbott(firstModel.sequelize.query.bind(firstModel.sequelize))
        };
    }

    return addCustomMethods(models);
};
