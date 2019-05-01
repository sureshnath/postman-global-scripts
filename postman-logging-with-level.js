// console-log-level@1.4.1 - start
var util = require('util')

var levels = ['trace', 'debug', 'info', 'warn', 'error', 'fatal']
var noop = function () {}
var getLogger = function (opts) {
  opts = opts || {}
  opts.level = opts.level || 'info'

  var logger = {}

  var shouldLog = function (level) {
    return levels.indexOf(level) >= levels.indexOf(opts.level)
  }

  levels.forEach(function (level) {
    logger[level] = shouldLog(level) ? log : noop

    function log () {
      var prefix = opts.prefix
      var normalizedLevel

      if (opts.stderr) {
        normalizedLevel = 'error'
      } else {
        switch (level) {
          case 'trace': normalizedLevel = 'info'; break;
          case 'debug': normalizedLevel = 'info'; break;
          case 'fatal': normalizedLevel = 'error'; break;
          default: normalizedLevel = level
        }
      }

      if (prefix) {
        if (typeof prefix === 'function') prefix = prefix(level);
        arguments[0] = util.format(prefix, arguments[0]);
      }

      console[normalizedLevel](util.format.apply(util, arguments))
    }
  })

  return logger
}
// console-log-level@1.4.1 - end

var logLevel = pm.globals.get("logLevel") || 'info'

var log = getLogger({ level: logLevel })

var logp = getLogger({
  prefix: function (level) {
    return new Date().toISOString()
  },
  level: logLevel
})
