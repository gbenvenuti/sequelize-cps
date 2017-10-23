var test = require('tape'),
    propertyName = 'cps',
    entryPoint = require('../'),
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
runTests.sequelizeV3(test, propertyName, createCpsFunction, successTestCps, errorTestCps);
runTests.sequelizeV4(test, propertyName, createCpsFunction, successTestCps, errorTestCps);

test('patches sequelize', function(t){
    t.plan(2);

    var sequelize = {
        query: function() {
            return { then: function() {} };
        },
    };
    var models = {
            foo: {
                Instance: function(){},
                save: function(){
                    return {
                        then: function(){

                        }
                    };
                },
                sequelize,
            },
            bar: {
                Instance: function(){},
                save: function(){
                    return {
                        then: function(){

                        }
                    };
                },
                sequelize,
            },
        };


    entryPoint(models);

    t.equal(typeof models.foo.sequelize.cps.query, 'function', 'added abbotted query to sequelize');
    t.equal(typeof models.bar.sequelize.cps.query, 'function', 'added abbotted query to sequelize');
});

test('patches sequelize for v4', function (t) {
    t.plan(2);

    var sequelize = {
        query: function(){
            return {
                then: function(){}
            };
        },
    };
    var models = {
        foo: function SequelizeModel1() {
            this.sequelize = sequelize;
        },
        bar: function SequelizeModel2() {
            this.sequelize = sequelize;
        }
    };

    entryPoint(models);

    console.log(models);
    t.equal(typeof (new models.foo()).sequelize.cps.query, 'function', 'added abbotted query to sequelize');
    t.equal(typeof (new models.bar()).sequelize.cps.query, 'function', 'added abbotted query to sequelize');
});
