var test         = require('tape'),
    EventEmitter = require('events').EventEmitter,
    emitError    = require('..')

test('emit-error', function (t) {
    function callback () {
        var args = Array.prototype.slice.call(arguments, 0)
        return args
    }
    var emitter      = new EventEmitter,
        wrapped      = emitError(emitter, callback),
        emitterCalls = []

    emitter.on('error', function (err) {
        emitterCalls.push(err)
    })

    t.notOk(emitError(emitter, callback)(new Error('error 1')), 'should return undefined on error without alwaysCall')
    t.deepEqual(emitError(emitter, {alwaysCall:true}, callback)(new Error('error 2')), [new Error('error 2')], 'should return args on error with alwaysCall')
    t.deepEqual(emitError(emitter, callback)(null, 1, 2), [null, 1, 2], 'should return args on no error')

    t.end()
})
