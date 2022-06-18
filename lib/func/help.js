module.exports = function (args = []) {
    if (args[1] && args[1].startsWith(' ')) args[1] = args[1].replace(' ', '')

    var fs = require('fs'), chalk = require('chalk'), exec = require('child_process').exec;
    //randomly select chalk colors
    var colors = [chalk.red, chalk.green, chalk.yellow, chalk.blue, chalk.magenta, chalk.cyan];
    var text = fs.readFileSync(__dirname + '/docs/help.txt', 'utf8').split('\n');
    text.forEach(ln => {
        var color = colors[Math.floor(Math.random() * colors.length)];
        console.log(color(ln));
    })

}