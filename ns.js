var self = {
	beta: {
		Parser(args = []) {
			var fs = require('fs');
			var chalk = require('chalk')
			if (!fs.existsSync(args[0])) return console.log(chalk.red('file does not exist')); 
			var lines = fs.readFileSync(args[0], 'utf-8').split('\n');
			
			for (var num = 0; num <= lines.length; num++) {
				var command = lines[num];
				if (command.endsWith('\r')) command = command.replace('\r', '');
				if (command == '') continue;
				if (command == '}') continue;
				if (command.startsWith('\t')) continue; //ignore the line if it is a part of a function
				if (command.startsWith('...') && command.endsWith('...')) continue;
				if (command.includes('void ')) {
					var f = require('./nsh.js').FunctionToVoid(lines, num).join('\n')
					if (f.endsWith('\r')) f = f.replace('\r', '');
					fs.writeFileSync(__dirname + '/lib/func/' + command.split(':')[0].replace('void ', '') + '.js', `module.exports = function(args = []) {
		${f}
	}`);
		setTimeout(function () {
			fs.unlinkSync(__dirname + '/lib/func/' + command.split(':')[0].replace('void ', '') + '.js');
			/** @abstract delete the function but let it run through memory; allowCallRequire: false*/
			/** @returns {null, undefined}*/
			return 0;
		}, 800); //deletion set to 800ms due to functions not being deleted on quit
				} else {
					require('./devConsole').executeCommand(command);
				}
			}
			}
		}
	}
module.exports = {
	runp(file = []) {
		self.beta.Parser(file);
	}
}

