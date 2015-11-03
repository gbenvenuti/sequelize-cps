function createCpsFunction(model, method) {
    return function() {
        var newArgs = Array.prototype.slice.call(arguments),
            callback = newArgs.pop(),
            modelCommand = model[method].apply(model, newArgs);

        // Sequelize 1.7.x
        if(modelCommand.complete){
            modelCommand.complete.call(modelCommand, callback);
            return;
        }

        // Sequelize 2.x.x
        modelCommand.then(callback.bind(null, null), callback);
    };
}
module.exports = createCpsFunction;