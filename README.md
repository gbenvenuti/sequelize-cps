#sequelize-cps

Adds CPS functionality to sequelize via [customulize](https://www.npmjs.org/package/customulize) for cases when __.complete, .success, .save__
just aren't for you.



* [CPS](http://en.wikipedia.org/wiki/Continuation-passing_style)
* [Error First](http://fredkschott.com/post/2014/03/understanding-error-first-callbacks-in-node-js/)

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

##kgo
When using [kgo](https://www.npmjs.org/package/kgo) this is especially convenient.

    kgo
    ('account', Account.cps.find.bind(null, {where: {id: 1}}))
    ('update', ['account'], function(account, done) {
        account.name = 'John';
        account.cps.save(done);
    })
    // etc, etc, etc

Pull requests welcome with passing tests.
