# emit-error

[![Build Status](https://travis-ci.org/jasonpincin/emit-error.svg?branch=master)](https://travis-ci.org/jasonpincin/emit-error)
[![Coverage Status](https://coveralls.io/repos/jasonpincin/emit-error/badge.png?branch=master)](https://coveralls.io/r/jasonpincin/emit-error?branch=master)
[![NPM version](https://badge.fury.io/js/emit-error.png)](http://badge.fury.io/js/emit-error)
[![Davis Dependency Status](https://david-dm.org/jasonpincin/emit-error.png)](https://david-dm.org/jasonpincin/emit-error)

[![browser support](https://ci.testling.com/jasonpincin/emit-error.png)
](https://ci.testling.com/jasonpincin/emit-error)


Emit error if callback is executed with a non-null 1st argument

## example

```
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
```

output of above:
```
got error: Error: broke
did not get an error
```

# toc

- [api](#api)
  - [emitError](#emiterror)
  - [var wrappedCb = emitError(emitter, [options,] cb)](#var-wrappedcb-=-emiterroremitter-options-cb)
- [testing](#testing)
  - [options](#options)
  - [patterns](#patterns)
  - [html coverage report](#html-coverage-report)

## api

### emitError

`var emitError = require('emit-error')`

### var wrappedCb = emitError(emitter, [options,] cb)

Returns a function that when called with a non-falsey first argument, will emit that value 
as an `error` event on the given event `emitter`. If a falsey first argument is passed to the 
generated function, or if an `options` object is provided with a property of `alwaysCall` set to 
`true`, then the provided callback `cb` will be executed with all arguments passed to the 
generated function.

*options:*
- alwaysCall: `true` or `false` - if true, the provided callback `cb` will always be called, otherwise
  it will only be called when a the first argument is falsey


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
