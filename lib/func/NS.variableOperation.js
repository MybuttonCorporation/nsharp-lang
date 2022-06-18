module.exports = function(args = []) {
	if (args.length < 2) {
		throw new SyntaxError('VARIABLEOPERATIONERROR: variable is not defined');
	};
	if (args.length > 2) {
		throw new SyntaxError('VARIABLEOPERATIONERROR: too many arguements');

	}
	var operation = args[1];
	operation.replace(new RegExp('{'+args[0]+'}', 'g'), '')
	eval(operation);
}
