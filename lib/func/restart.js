const chalk = require("chalk");

module.exports = function(args = []) {
    console.clear();
    console.log(
        `${chalk.bold.yellow("Welcome to Nsharp v1.5.2.")}\n${chalk.reset.black(
          "Type " + chalk.bgBlack.bold.white("help()") + " for more information.\n" + chalk.reset.bgWhite.bold.red('^C') + chalk.black(" or ") + chalk.reset.bgWhite.bold.red('quit()')+ chalk.black(" to exit N#devc.")
        )}`
      );

}
