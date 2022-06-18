module.exports = function(args = []) {
	const chalk = require('chalk');
	if (!args[0]) throw new RangeError(chalk.red('a variable name must be provided'));
	var devc = require('../../devConsole.js');
	var val = args[1].substring(1).slice(0, -1);

	devc.variables.set(args[0], val);
	console.log(chalk.bold.green(args[0]) + chalk.reset.bold.white(':'), val);
	return devc.variables.get(args[0]);

}
