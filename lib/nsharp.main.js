	/**
	* @nsharp.main.js
	* This script's purpose is to provide nsharp-based excessive tools to
	* other scripts included in nsharp or are plugins to nsharp in order 
	* to increase efficiency and achieve cleaner code.
	*
	* */	
const db = require('wio.db');
const Database = new db.YamlDatabase({databasePath: `${__dirname}\\nshconfig.yml`});
const chalk = require('chalk');
module.exports = {
	process: {
		quit(code = 0) {
			
			console.log("\n"+chalk.bold.red('quit n#devc.'));
			process.exit(code);
		}
	},
	out: {
		println(text = '') {
			console.log(text);
		}
	},
	db: {
		keys() {
			return Database.all();
		},
		write(key, value) {
			if (!key) return console.log('key or value is not specified.')
			else {
				Database.set(key, value);
				console.log(key, chalk.red(': '), value);
			}
		},
		del(key) {
			if (!key) return console.log('key must be specified');
			if (!Database.has(key)) return console.log('key does not exist in nshconfig.yml');
			Database.delete(key);
			//delete the key;
		},
		has(key) {
			if (!key || key == null || typeof key == 'undefined') return false;
			return Database.has(key);
		},
		get(key){
			if (!Database.has(key)) return false;		
			return Database.get(key);
		}
	}
}
