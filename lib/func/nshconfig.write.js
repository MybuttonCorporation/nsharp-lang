module.exports = function(args = []) {
	const chalk = require('chalk');
	if (!args[0]) return console.log(chalk.red('no key specified'));
	if (!args[1]) return console.log(chalk.red('no value specified (expected 1 or 0)'));
	if(isNaN((parseInt(args[1])))) return console.log('value can only be 1 or 0. Recieved ' + args[1]);
	if (parseInt(args[1]) > 1 || parseInt(args[1]) < 0) return console.log('value can only be 1 or 0');
	var val = parseInt(args[1]) === 1 ? true : false;
	require('../nsharp.main').db.write(args[0], val);

}
