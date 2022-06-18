/* @whatis `decodeScript`: decodes a script and shows its data*/
var args = process.argv.slice(2);
var chalk = require("chalk");
var fs = require("fs");

var commands = [
  {
    name: "help",
    alias: "-h,--help",
    description: "Shows help about a command",
    exec(args = []) {
      if (commands.find((c) => c.name === args[0])) {
        var cmd = commands.find((c) => c.name === args[0]);
        console.log(
          `$ ${chalk.bold.yellow(cmd.name)}: ${chalk.reset.green(
            cmd.description
          )}`
        );
      } else console.log('$ ' + chalk.red('nsharp (-h, --help)') + chalk.yellow(' for help [err_cmd_not_found]'));
    },
  },
  {
	  name: "decodeScript", 
	  alias: "/decode,/d",
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
  }
];


//#region Base Command
commands.forEach((cmd) => {
  var aliases = cmd.alias.split(",");
  if (aliases.length > 1 && aliases.find(alias => alias === args[0])) {
    var argms = args.slice(1);
    cmd.exec(argms);
	process.exit(0);
  }
});
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
//#endregion