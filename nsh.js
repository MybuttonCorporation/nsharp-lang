/*
 * @abstract nshworker: NsharpBetaWorker();
 * `Nsharp.beta.executionAllowed = true;`
 * @class {Nsharp, NsharpBeta}
 *
 *
 * 
 */

/**
 * @script 
*/


class nsh {
	FunctionToVoid(lines = [], lnAt = 0) {
		var file = lines.join('\n');
		var j = 0; // location defining where to stop reading
		var void_commands = [];
		var i = 0; // current line pointer
		lines.forEach(ln => {
			
			if (ln.startsWith('}')) {
				j = i;
			        return;
			}
			i++;
		})
		return lines.slice(lnAt+1, j);
	}
}
module.exports = new nsh();
