function createCpsFunction(model, method) {
    return function() {
        var newArgs = Array.prototype.slice.call(arguments),
            callback = newArgs.pop();
        model[method].apply(model, newArgs).complete(callback);
    };
}
module.exports = createCpsFunction;