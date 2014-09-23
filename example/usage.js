var EventEmitter = require('events').EventEmitter,
    emitError    = require('..')

function callback (err) {
    console.log('did not get an error')
}

function onError (err) {
    console.error('got error: ' + err)
}

var emitter = new EventEmitter().on('error', onError)
var doSomething = emitError(emitter, callback)

doSomething(new Error('broke'))
doSomething()
