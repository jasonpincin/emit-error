var EventEmitter = require('events').EventEmitter,
    emitError    = require('..')

var emitter = new EventEmitter().on('error', function (err) {
    console.error(err)
})

function fail (cb) {
    cb(new Error('failed'))
}

function succeed (cb) {
    cb(null, 'success')
}

fail(emitError(emitter, function (status) {
    console.log('will not see this')
}))

fail(emitError(emitter, {alwaysCall: true}, function (err, status) {
    // When always call specified, err is passed
    console.log('will see this')
}))

succeed(emitError(emitter, function (status) {
    // Gets called with status of success
    console.log(status)
}))
