const chalk = require("chalk");
const devconsole = require("../../devconsole");

module.exports = function (args = []) {
  if (args.length < 2)
    return console.log(
      chalk.red("ObjectStatementError: at least 2 arguements must be provided.")
    );
  if (args.length > 2)
    return console.log(
      chalk.red("ObjectStatementError: at most 2 arguements must be provided.")
    );
    if (devconsole.variables.has(args[0])) console.log(chalk.bold.red('MemoryError: ') + chalk.reset.white('Variable ' + args[0] + ' already exists.'));
    else {
        if (isNaN(parseInt(args[1]))) return console.log(chalk.red('ObjectStatementError: ') + chalk.reset.white(args[1] + " is not a number"));
        devconsole.variables.set(args[0], eval(args[1]));
        console.log(chalk.bold.green(args[0]) + chalk.reset.bold.white(':'), parseInt(args[1]));
    }
};
