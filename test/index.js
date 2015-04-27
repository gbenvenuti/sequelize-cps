var test = require('grape'),
    propertyName = 'cps',
    createCpsFunction = require('../createCpsFunction'),
    runTests = require('customulize/test/runTests');

function successTestCps(t, model, method) {
    model[propertyName][method](null, true, function(error, result) {
        t.equal(result, true, method + ' success ok');
    });
}

function errorTestCps(t, model, method) {
    model[propertyName][method]('bad', function(error) {
        t.equal(error, 'bad', method + ' error ok');
    });
}

runTests.sequelizeV1(test, propertyName, createCpsFunction, successTestCps, errorTestCps);
runTests.sequelizeV2(test, propertyName, createCpsFunction, successTestCps, errorTestCps);