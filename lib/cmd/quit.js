module.exports = function(args = []) {
	const nsharp = require('../nsharp.main.js');
	if (!args[0]) args.push('0');
	nsharp.process.quit(args[0]);
}
