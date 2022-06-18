module.exports = function (args = []) {
    var chalk = require('chalk');
    var fs = require('fs');
    if (args.length < 1) {
        console.log(chalk.red("❌ No script specified."));
        return;

      }
      if (!fs.existsSync(args[0])) {
        console.log(chalk.red("❌ Script does not exist."));
        return;
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