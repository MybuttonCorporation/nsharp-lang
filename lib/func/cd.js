const chalk = require("chalk");
var fs = require('fs');
module.exports = function (args = []) {
//set the working directory to args[0];
if (!fs.existsSync(args[0])) return console.log(chalk.red('Nsh-working-path: ') + chalk.white('Directory not found'));
    process.chdir(args[0]);
    console.log(chalk.bold.green('Changed directory to ' + args[0]));
    console.log(chalk.bold.magenta('Current directory: ' + process.cwd()));
}