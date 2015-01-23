# emit-error

[![Build Status](https://travis-ci.org/jasonpincin/emit-error.svg?branch=master)](https://travis-ci.org/jasonpincin/emit-error)
[![Coverage Status](https://coveralls.io/repos/jasonpincin/emit-error/badge.png?branch=master)](https://coveralls.io/r/jasonpincin/emit-error?branch=master)
[![NPM version](https://badge.fury.io/js/emit-error.png)](http://badge.fury.io/js/emit-error)
[![Davis Dependency Status](https://david-dm.org/jasonpincin/emit-error.png)](https://david-dm.org/jasonpincin/emit-error)

Emit error if callback is executed with a truthy 1st argument

## deprecated

This module has been deprecated. Use [on-error](https://github.com/jasonpincin/on-error) instead.


## example

```javascript
var EventEmitter = require('events').EventEmitter,
    emitError    = require('emit-error')

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
```

## api

```javascript
var emitError = require('emit-error')
```

### var wrappedCb = emitError(emitter [, options, cb])

Returns a function that when called with a truthy first argument, will emit that value
as an `error` event on the supplied event `emitter`. If the option `alwaysCall` is defined, 
the provided `cb` will be executed in all cases with all arguments supplied to `wrappedCb`, otherwise 
if the 1st argument to `wrappedCb` is falsey, the supplied `cb` will be executed with all but the 
1st argument supplied to `wrappedCb`.

If no callback `cb` is provided, then the generated callback will simply emit error events when 
called with a non-falsey 1st argument.

*options:*
- alwaysCall: `true` or `false` - if true, the provided callback `cb` will always be called (and include 
  the 1st argument), otherwise it will only be called when a the first argument is falsey (and without the 
  1st argument)


## testing

`npm test [--dot | --spec] [--coverage]`

### options

* `--dot` - output test results as dots instead of tap
* `--spec` - output test results as spec instead of tap
* `--coverage` - display text cover report
* `--testling` - run tests in browser via testling (cannot be used with --coverage and 
  expects both browserify and testling to be installed globally)
  

### patterns

Only run test files matching a certain pattern by prefixing the 
test command with `grep=pattern`. Example:

```
grep=connect npm test --dot
```

### html coverage report

Open it with `npm run view-cover` or `npm run vc`
