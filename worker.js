const fs = require("fs");
const chalk = require("chalk");

var commands = [
  {
    name: "help",
    alias: "-h,--help",
    description: "Shows the help menu",
    usage: '-h <command>, --help <command>',
    exec(args = []) {
      if (commands.find((c) => c.name === args[0])) {
        var cmd = commands.find((c) => c.name === args[0]);
        console.log(
`$ ${chalk.bold.yellow(cmd.name)}: ${chalk.reset.green(cmd.description)} 
${chalk.blue('$')} ${chalk.bold.yellow('usage')}: [\n\t  ${chalk.reset.green(cmd.usage.split(',').map(c => '$ nsharp ' + chalk.bold.white(c) + ' ').join('\n\t  '))}\n\t ]`
        );
      } else return console.log('$ ' + chalk.red('nsharp (-h, --help)') + chalk.yellow(' for help [err_cmd_not_found]'));
    },
  },
  {
	  name: "decodeScript", 
	  alias: "/decode,/d",
    usage: "/decode <script>.ns,/d <script>.ns",
	  description: "Decodes a script and shows its data",
	  exec(args = []) {
		if (args.length < 1) {
			console.log(chalk.red("❌ No script specified."));
			process.exit(1);
		  }
		  if (!fs.existsSync(args[0])) {
			console.log(chalk.red("❌ Script does not exist."));
			process.exit(1);
		  }
		  
		  var file = fs.readFileSync(args[0], "utf8").split("%%@FUNC%%");
		  var index = file[0].split("\n").join("");
		  console.log(
			chalk.yellow("<" + args[0] + ".index>") +
			  "\n\n" +
			  chalk.green(Buffer.from(index, "base64").toString("ascii"))
		  );
		  console.log();
		  console.log("\t\t+---------------------+");
		  console.log("\t\t|     <functions>     |");
		  console.log("\t\t^---------------------^");
		  console.log();
		  var jwtData = JSON.parse(atob(file[1].split(".")[1]));
		  console.log(chalk.black("----------------------------------------"));
		  jwtData.functions.forEach((fn) => {
			console.log(chalk.yellow("<" + fn.fname + ".nsv>"));
			console.log();
			console.log(chalk.green("FUNCTION PARAMETERS: " + fn.fdata));
			console.log(chalk.black("----------------------------------------"));
		  });
		  
	  }
  },

];
var command_files = fs.readdirSync(__dirname + "/cmd").filter((f) => f.endsWith(".js"));
command_files.forEach(i => {
  if (typeof require(__dirname + "/cmd/" +i).exec == 'function') {
    commands.push(require(__dirname + "/cmd/" +i));
  }
})

//#region Base Command


async function worker(args = []) {
  commands.forEach((cmd) => {
    var aliases = cmd.alias.split(",");
    if (aliases.length > 1 && aliases.find(alias => alias === args[0])) {
      var argms = args.slice(1);
      cmd.exec(argms);
      process.exit();
    }
  });
  
  if (args[0] == '/devc') {
    require("./devConsole.js").exec(args.slice(1));
    return;
  }
  if (args.length < 1) return console.log(chalk.red("❌ No script specified."));
  if (args[0] == "-new") {
    require('./project.js').new();
  }

  if (fs.existsSync(args[0] + ".ns")) {
    var exec = require('./exec.js')
    exec.exec(args[0] + ".ns");
    return;
}
var cfg = require('./lib/nsharp.main')
if (fs.existsSync(args[0]) && cfg.db.get('useBetaInterpreter')) {
	require('./ns.js').runp(args);
	return;
}
  if (args[0].startsWith('/compile:')) {
      //check if args[0].substring(9) is a valid .nsharp file
        if (!fs.existsSync(args[0].substring(9))) return console.log(chalk.red("❌ No script specified."));
        if (!args[0].substring(9).endsWith('.nsharp')) return console.log(chalk.red("Script is not a valid nsharp script."));
    require('./compiler.js').compileScript(args[0].substring(9));
    return;
  }
  if (!fs.existsSync(args[0]) && args[0] != "-new")
    console.log(chalk.red("❌ Script does not exist")) & process.exit(1);
  else if (fs.existsSync(args[0])) {
    let int = require("./interpreter.js");
    new int.interpreter(args[0]).run();
  }
}


module.exports = {
    executeTask(args = []) {
        worker(args);
    }
};
