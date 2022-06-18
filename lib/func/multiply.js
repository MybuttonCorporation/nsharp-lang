const chalk = require("chalk")

module.exports = function(args = []) {
    if (args[1] && args[1].startsWith(' ')) args[1] = args[1].replace(' ', '')
    

    console.log(chalk.bold.green(parseInt(args[0]) * parseInt(args[1])) + ` ${chalk.reset.white('(')}${chalk.red(args[0] + " * " + args[1])}${chalk.reset.white(')')}`)

    return parseInt(args[0]) * parseInt(args[1]);
}