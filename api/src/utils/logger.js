const debug  = require('debug');
const logger = debug('seinfeldTrivia');

const origFormatArgs = debug.formatArgs;
debug.formatArgs = function (args) { // requires access to "this"
    // example: prepend something to arguments[0]
    args[0] = `[${new Date().toUTCString()}] ${args[0]}`;

    // call original implementation
    origFormatArgs.call(this, args);
};

module.exports = logger;