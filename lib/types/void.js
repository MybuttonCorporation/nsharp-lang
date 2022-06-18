/**
	 * @type nsharp.void;
	 * @function Void 
	 * @abstract this operation registers a function in /lib/func/*.js};
	 * @callback eval;
	 * @returns {null, undefined};
	 *
	*/
	function voidLoad() {}
	/*
	* turns an array in which a function (or void) was called into an array of strings containing javascript functions
	* @returns {string[] voidExec}
	* */
function FunctionToVoid(lines = [], lnAt = 0) {
	var file = lines.join('\n');
	var j = 0; // location defining where to stop reading
	var void_commands = [];
	var i = 0; // current line pointer
	lines.forEach(ln => {	
		if (ln.startsWith('{') && ln.endsWith('}')) lines[i] = lines[i].substring(1).slice(lnAt+1, -1);
		if (ln.endsWith('}')) {
			j = i;
			return; //this bitch is the reason I was unable to recieve voidArgs
		}
		i++;
	})
	lines.slice(lnAt+1, j).forEach(ln => {
		void_commands.push(ln);
	})	
	return void_commands;
}
module.exports = function(args = []) {
	if (!args[1].startsWith('{')) {
		return console.log('instanceof Source must be a functionDefinementObject. recieved string.');
		/** 
			* @abstract error
		*/
	} 
	var c = {
		name: args[0],
		src: args[1]
	};
	if (!c.src || !c.name) return console.log('source or name is undefined [eNull.15]');
	var fs = require('fs');
	var argsJoined = 'void ' + args.join(': ');
	var voidf = FunctionToVoid(argsJoined.split('{'));
	console.log(voidf);
	if (c.src.startsWith('{') && c.src.endsWith('}')) {
		var data = c.src.slice(0, -1).substring(1);
		fs.writeFileSync(__dirname + '/../func/' + c.name + '.js', `module.exports = function(args = []) {
		${data}
	}`);
		setTimeout(function () {
			fs.unlinkSync(__dirname + '/../func/' + c.name + '.js');
			/** @abstract delete the function but let it run through memory; allowCallRequire: false*/
			/** @returns {null, undefined}*/
			return 0;
		}, 5000);		 
	} else {
		return console.log('functionDefinementObject must start and end with brackets ({ ... }).');
	}
}
