const chalk = require("chalk");
const fs = require('fs');
module.exports = function (args = []) {
    var files = fs.readdirSync('./');
    var folder = process.cwd().split('\\')[process.cwd().split('\\').length - 1];
    console.log(chalk.bold.magentaBright("./"+folder+"/") + chalk.black('*') + "\n");
    var dirtext = "", filetext = "";
    files.forEach(function (file) {
        //check if the file is a directory
        if (fs.lstatSync(file).isDirectory()) {
            dirtext+="|"+chalk.bold.magentaBright("/"+file+"/");
        } else {
            filetext+= "|" + chalk.bold.white("/"+file);
        }
    });
    var i = 0;
    dirtext.split("|").forEach(function (dir) {
        if(i != 0 && i%6==0) process.stdout.write('\n');
       if (dir != "") process.stdout.write(chalk.bold.magenta(dir)+ "\t");
       if (dir != "") i++;
    })
    console.log();
    var j = 0;
    filetext.split('|').forEach(function (file) {
        if(j != 0 && j%4==0) process.stdout.write('\n');
       if (file != "") process.stdout.write(chalk.bold.white(file)+ "\t");
       if (file != "") j++;

    })
}