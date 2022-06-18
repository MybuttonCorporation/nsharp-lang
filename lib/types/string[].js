module.exports = function (args = []) {
	var array = args[1];
	var strdata = array.substring(1).replace(']', '');
	var argsv = strdata.replace(/\"/g, '').split(',');
	var array = [];
	argsv.forEach(arg => {
		if (arg.startsWith(' ')) arg = arg.substring(1);
		array.push(arg);
	})
	var devc = require('../../devConsole');
	devc.variables.set(args[0], array);
	var chalk = require('chalk');
	console.log(chalk.bold.yellow(args[0]) + chalk.green(':'), array);
	return devc.variables.get(args[0]);
}
