const wiodb = require('wio.db');
var db = new wiodb.YamlDatabase(process.cwd() + '\\db.yml');
var config = require('./lib/nsharp.main')
if (!config.db.has('printStartupMessage')) config.db.write('printStartupMessage', true);
if (config.db.get('printStartupMessage') == 'WRITE') config.db.write('printStartupMessage', true);
module.exports = {
  name: "devconsole",
  alias: "/dc,/devc,/devconsole,-d,--devconsole",
  description: "Opens the dev console",
  usage: "-d,--devconsole",
  variables: {
    has(key) {
      return db.has(key);
    },
    get(key) {
      return db.get(key);
    },
    set(key, value) {
      return db.set(key, value);
    },
    forEach(callback = (key, value) => {return key, value}) {
      db.all().forEach((value) => {
        callback(value.ID, value.data);
      })
    },
    del(key) {
      return db.delete(key);
    }
    
  },
	executeCommand(command) {
    var line = command;
    var functions = new Map();
    var types = new Map();
    var cmds = new Map();
    var chalk = require('chalk');
    var fs = require('fs');
    function WriteFunctions() {
      lastCommandError = 0;
      var funcs = fs.readdirSync(__dirname + '/lib/func').filter(file => file.endsWith('.js'));
      funcs.forEach(fn => {
              try {
	      var func = require(__dirname + '/lib/func/' + fn);
              functions.set(fn.replace('.js', ''), func);            	
	      } catch {
		      console.log(chalk.red('error loading function /lib/func/'+fn + '.js'));
	      }
})
	    var coms = fs.readdirSync(__dirname + '/lib/cmd').filter(f => f.endsWith('.js'));
	    coms.forEach(cms => {
		    var cm = require(__dirname + '/lib/cmd/' + cms);
		    cmds.set(cms.replace('.js', ''), cm);
	    })
      var typesf = fs.readdirSync(__dirname + '/lib/types').filter(file => file.endsWith('.js'));
      typesf.forEach(fn => {
        var type = require(__dirname + '/lib/types/' + fn);
        types.set(fn.replace('.js', ''), type);
      })

    }

      if (line && line.startsWith('quit()')) {
    process.stdout.write(chalk.bold.red("\nnsh#quit(): ") + chalk.reset.white("Exit N#devc."));
    fs.unlinkSync(__dirname + "\\db.yml")
    process.exit(0);
}
if(config.db.get('showDebugInfo')) {
  var typef = 'function';
  if (line.startsWith('.')) typef = 'command';
    if (types.has(line.split(' ')[0])) typef = 'variableDecl';
  console.log('Searching for commands...');
  console.log('lng_SearchWritableData();');
  console.log('Checking lsgrammar.n#');
  console.log('definable type: ' + chalk.bold.red(typef))
    console.log('allowing VoidExecutionls for variable command (i:varType)');
}
WriteFunctions(); /** @abstract see /lib/func updates, add new functions if added/created; build, compile and run.*/
if (line.startsWith('.') && config.db.get('DisableCommands') == false) {
  
  var alias = line.split(' ')[0].substring(1);
  if (cmds.has(alias)) {
    var argmts = line.split(' ').slice(1);
    console.log(chalk.green('   Nsh ') + chalk.white('% ') + line);
    cmds.get(alias)(argmts);
  }
}
if (line && line.endsWith(';')) line = line.slice(0, -1);
      this.variables.forEach((key, value) => {
        line.split('').forEach(() => {
          if (line.includes('\\{' + key) || line.includes(key + '\\}')) { 
            line = line.replace('\\{' + key, '{' + key);
            line = line.replace(key + '\\}', key + '}');
            return;
          } else {
            line = line.replace('{'+key+'}', value)
            return
          }
        })
      })
      var command = line.split('(')[0];
      var arguements = line.substring(command.length).replace('(', '').replace(')', '').replace(/\'/g, '').replace(/\"/g, '').replace(/\`/g, '').split(',');
      var args = line.split(' ');

      if (types.has(args[0])) {
        if (args.length < 2) {
          console.log(chalk.red('ObjectStatementError: at least 2 arguements must be provided.'));
          return;
        }
  if (db.has(args[0])) {
    console.log(chalk.red('MemoryAllocationError: variable already exists.'));
    return;
  }
  var vals = args.slice(1).join('').split(':');              
        if (vals.length < 2) {
          console.log(chalk.bold.red('ObjectStatementError: ') + chalk.reset.white('at least 2 arguements must be provided.'));
          return;
        } else {
          types.get(args[0])(vals);

          return;
        }

      }
      functions.set('reload', () => {
        WriteFunctions();
        console.log(chalk.green('✅ Reloaded N#devc.'));
      })

      if (line.endsWith(';')) line = line.slice(0, -1);
      var i = 0;
      arguements.forEach(arg => {
        if (arg.startsWith(' ')) {
          arguements[i] = arg.replace(' ', ''); 
          arguements.slice(i);
        }
        i++;
      })
      if (command && command.includes(' ')) {
        var spaces = "";
        for (i = 0; i <= line.length; i++) {
        spaces += " ";
        }
        return console.log(chalk.red('🗃️ ') + chalk.bold.red(`A function name can not include ' '.`));
      }
      
      if (functions.has(command)) {
  var inf = require('./lib/nsharp.main')
if (!line.includes(command + '(') && inf.db.get('allowVoidExecution') != true) {
  console.log(chalk.bold.blue(command + '()') + ': ' + chalk.red('void ') + chalk.yellow('{}') + chalk.bold.green('; Function<fnX>') + chalk.white('(') + chalk.yellow('...args' + chalk.white(': ') + chalk.red('string') + chalk.white('[])')));
		
}
        var func = functions.get(command);
        func(arguements);
      } else {

        return console.log(chalk.red('🗃️ ') + chalk.bold.red(`\`` + command + '()` is not a function or a valid statement.'));

      }
  },
  async sleep(ms) {
    var date = new Date(), curDate = null;
    do { curDate = new Date(); }
	  while(curDate - date <= ms);
  },
	  async exec() {
	    
    var chalk = require("chalk");
    if (!false) require('./lib/func/terminalWorker.init.js')([]); 
	  if (config.db.get('printStartupMessage') == true) {
		  console.log(
		      `${chalk.bold.yellow("Welcome to Nsharp v1.5.2.")}\n${chalk.reset.black(
		"Type " + chalk.bgBlack.bold.white("help()") + " for more information.\n" + chalk.reset.bgWhite.bold.red('^C') + chalk.black(" or ") + chalk.reset.bgWhite.bold.red('quit()')+ chalk.black(" to exit N#devc.")
			)}`
    );
	  }

    var functions = new Map();
    var types = new Map();
    var cmds = new Map();
    
    var fs = require('fs');
    var lastCommandError = 0;
    function WriteFunctions() {
      lastCommandError = 0;
      var funcs = fs.readdirSync(__dirname + '/lib/func').filter(file => file.endsWith('.js'));
      funcs.forEach(fn => {
              try {
	      var func = require(__dirname + '/lib/func/' + fn);
              functions.set(fn.replace('.js', ''), func);            	
	      } catch {
		      console.log(chalk.red('error loading function /lib/func/'+fn + '.js'));
	      }
})
	    var coms = fs.readdirSync(__dirname + '/lib/cmd').filter(f => f.endsWith('.js'));
	    coms.forEach(cms => {
		    var cm = require(__dirname + '/lib/cmd/' + cms);
		    cmds.set(cms.replace('.js', ''), cm);
	    })
      var typesf = fs.readdirSync(__dirname + '/lib/types').filter(file => file.endsWith('.js'));
      typesf.forEach(fn => {
        var type = require(__dirname + '/lib/types/' + fn);
        types.set(fn.replace('.js', ''), type);
      })

    }
    WriteFunctions();

      var prompt = () => {
        var readline = require('readline')
        var rl = readline.createInterface({
          input: process.stdin,
          output: process.stdout,
        })
            
        var clr = lastCommandError == 2 ? 'red': 'green';
        if (lastCommandError == 0) clr = 'yellow';
        process.once('unhandledRejection', (err) => {
          console.log(chalk.red(err.message))
          rl.close();
          prompt();
        })
        process.once("beforeExit", () => {
          process.stdout.write(chalk.bold.red("\nnsh#quit(): ") + chalk.reset.white("Exit N#devc."));
          fs.unlinkSync(__dirname + "\\db.yml")
          process.exit(0);
        })
        rl.question(
          chalk.bold.yellow("📝 Nsh") + chalk.reset.white(" % "), (line) => {
            process.stdout.write("\u001b[1A\r");
            if (line && line.startsWith('quit()')) {
          process.stdout.write(chalk.bold.red("\nnsh#quit(): ") + chalk.reset.white("Exit N#devc."));
          fs.unlinkSync(__dirname + "\\db.yml")
          process.exit(0);
		 }
		  if(config.db.get('showDebugInfo')) {
			  var typef = 'function';
			  if (line.startsWith('.')) typef = 'command';
		  	  if (types.has(line.split(' ')[0])) typef = 'variableDecl';
			  console.log('Searching for commands...');
			  console.log('lng_SearchWritableData();');
			  console.log('Checking lsgrammar.n#');
			  console.log('definable type: ' + chalk.bold.red(typef))
		  	  console.log('allowing VoidExecutionls for variable command (i:varType)');
		  }
		  WriteFunctions(); /** @abstract see /lib/func updates, add new functions if added/created; build, compile and run.*/
		  if (line.startsWith('.') && config.db.get('DisableCommands') == false) {
			  
			  var alias = line.split(' ')[0].substring(1);
			  if (cmds.has(alias)) {
				  var argmts = line.split(' ').slice(1);
				  console.log(chalk.green('   Nsh ') + chalk.white('% ') + line);
				  cmds.get(alias)(argmts);
				  rl.close();
				  lastCommandError = 1;
				  return prompt();

			  }
		  }
		  if (line && line.endsWith(';')) line = line.slice(0, -1);
            this.variables.forEach((key, value) => {
              line.split('').forEach(() => {
                if (line.includes('\\{' + key) || line.includes(key + '\\}')) { 
                  line = line.replace('\\{' + key, '{' + key);
                  line = line.replace(key + '\\}', key + '}');
                  return;
                } else {
                  line = line.replace('{'+key+'}', value)
                  return
                }
              })
            })
            var command = line.split('(')[0];
            var arguements = line.substring(command.length).replace('(', '').replace(')', '').replace(/\'/g, '').replace(/\"/g, '').replace(/\`/g, '').split(',');
            var args = line.split(' ');
            var writing = line;
            if (!line.endsWith(';')) writing += ';';
            var spaces = "";
            for (i = 0; i <= line.length; i++) {
              spaces += " ";
            }
            console.log('\r' + chalk.bold[clr]("📝 Nsh") + chalk.reset.white(" $ ") + writing + spaces);
	    
            if (types.has(args[0])) {
              if (args.length < 2) {
                console.log(chalk.red('ObjectStatementError: at least 2 arguements must be provided.'));
                lastCommandError = 2;
                rl.close();
                prompt();
                return;
              }
		    if (db.has(args[0])) {
			    console.log(chalk.red('MemoryAllocationError: variable already exists.'));
			    lastCommandError = 2;
			    rl.close();
			    prompt();
			    return;
		    }
		    var vals = args.slice(1).join('').split(':');              
              if (vals.length < 2) {
                console.log(chalk.bold.red('ObjectStatementError: ') + chalk.reset.white('at least 2 arguements must be provided.'));

                lastCommandError = 2;
                rl.close();
                prompt();
                return;
              } else {
                lastCommandError = 1;
                process.stdout.write("\u001b[1A\r");
                var spaces = "";
                for (i = 0; i <= line.length; i++) {
                  spaces += " ";
                }
                console.log('\r' +chalk.bold.green('📝 Nsh') + chalk.reset.bold.white(' $'), line + spaces);
                types.get(args[0])(vals);
                rl.close();
                prompt();
                return;
              }

            }
            functions.set('reload', () => {
              WriteFunctions();
              console.log(chalk.green('✅ Reloaded N#devc.'));
            })

            if (line.endsWith(';')) line = line.slice(0, -1);
            var i = 0;
            arguements.forEach(arg => {
              if (arg.startsWith(' ')) {
                arguements[i] = arg.replace(' ', ''); 
                arguements.slice(i);
              }
              i++;
            })
            if (command && command.includes(' ')) {
              lastCommandError = 2;
              rl.close();

              process.stdout.write("\u001b[1A\r");
              var spaces = "";
              for (i = 0; i <= line.length; i++) {
              spaces += " ";
              }
              console.log("\r" +chalk.bold.red("📝 Nsh") + chalk.reset.white(" $ ") + line + spaces)
              console.log(chalk.red('🗃️ ') + chalk.bold.red(`A function name can not include ' '.`));
              return prompt();
            }
            
            if (functions.has(command)) {
		    var inf = require('./lib/nsharp.main')
			if (!line.includes(command + '(') && inf.db.get('allowVoidExecution') != true) {
				console.log(chalk.bold.blue(command + '()') + ': ' + chalk.red('void ') + chalk.yellow('{}') + chalk.bold.green('; Function<fnX>') + chalk.white('(') + chalk.yellow('...args' + chalk.white(': ') + chalk.red('string') + chalk.white('[])')));
				rl.close();
				lastCommandError = 1;
				return prompt();		
			}
              var func = functions.get(command);
              process.stdout.write("\u001b[1A\r");
              var spaces = ""
              for (i = 0; i <= line.length; i++) {
                spaces += " ";

              }
              console.log("\r" + chalk.bold.green("📝 Nsh") + chalk.reset.white(" $ ") + line + spaces);
              func(arguements);
              lastCommandError = 1;
            } else {
              lastCommandError = 2;
              process.stdout.write("\u001b[1A\r");
              var spaces = "";
              for (i = 0; i <= line.length; i++) {
                spaces += " ";
              }
              console.log("\r" +chalk.bold.red("📝 Nsh") + chalk.reset.white(" $ ") + line + spaces)
              console.log(chalk.red('🗃️ ') + chalk.bold.red(`\`` + command + '()` is not a function or a valid statement.'));

            }
              rl.close();
              prompt();
          });

      }
      prompt()

  }
}

