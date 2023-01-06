const chalk = require('chalk')
const symbol = require('log-symbols')


exports.warn = function (message) {
    console.log(symbol.error, chalk.yellow(message));
}
exports.error = function (message) {
    console.log(symbol.error, chalk.red(message));
}

exports.info = function (message) {
    console.log(symbol.info, chalk.white(message));
}
exports.infoGreen = function (message) {
    console.log(symbol.info, chalk.green(message));
}
exports.exit = function (error) {
    if (error instanceof Error) {
        console.log(chalk.red(error.message));
    }
    process.exit(-1)
}
