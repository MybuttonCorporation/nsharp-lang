module.exports = function(args = []) {
	if (!args[0]) console.log('an operation must be provided.\n.nshconfig <w,d,h,g>');
	if (args[0] == 'w') {
		if (!args[1] || !args[2]) return console.log('key or value is not specified');
		var val = args[2] === '1' ? true : false;
		require('../nsharp.main').db.write(args[1], val);
	}
	else if (args[0] == 'd') {
		if (!args[1]) return console.log('no key provided.')
		require('../nsharp.main').db.del(args[1]);
			
	}
	else if (args[0] == 'h') {
		return console.log(require('../nsharp.main').db.has(args[1]));
	}
	else if (args[0] == 'g') {
		if (args[1] == 'l') {
			function getByValue(map, searchValue) {
				for (let [key, value] of map.entries()) {
					    if (value === searchValue)
						      return key;
					  
				}
				
			}

			var db = require('../nsharp.main')
			db.db.keys().forEach(keyv => {
				var name = keyv.ID;
				const chalk = require('chalk')
				console.log(chalk.bold.yellow(name) +chalk.reset.red(':'), chalk.magenta(keyv.data));
			})
			return;
		}
		if (!require('../nsharp.main').db.has(args[1])) return console.log('key does not exist');
		return console.log(require('../nsharp.main').db.get(args[1]));
	}
}
