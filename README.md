#sequelize-cps

Adds [CPS](http://en.wikipedia.org/wiki/Continuation-passing_style) functionality
([Error First](http://fredkschott.com/post/2014/03/understanding-error-first-callbacks-in-node-js/))
to sequelize via [customulize](https://www.npmjs.org/package/customulize) for cases when promises just aren't for you.


##Installation

    npm install sequelize-cps

##usage

    var sequelizeCps = require('sequelize-cps'),

    // define your sequelize models
    var models = {
        Account: require('./account')
    };

    // call function over them
    sequelizeCps(models);

    // now you can call methods via cps
    models.Account.cps.find({ where: { id: 1} }, function(error, account) {
        if (error) {
            // error logic
        }
        account.name = 'John';
        account.cps.save(function(error, account) {

        });
    });

Pull requests welcome with passing tests.
