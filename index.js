module.exports = function emitError (emitter, options, cb) {
    if (arguments.length === 2)
        cb = options, options = {}

    return function () {
        var args = Array.prototype.slice.call(arguments, 0)
        if (args[0])
            emitter.emit('error', args[0])
        if (!args[0] || options.alwaysCall)
            return cb.apply(cb, args)
    }
}
