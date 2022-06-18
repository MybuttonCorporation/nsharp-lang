module.exports = function() {
    //args is not required here
    var fs = require('fs')
    var chalk = require('chalk')
    var data = fs.readFileSync(__dirname+'/docs/documentation.txt', 'utf-8').split('\n')
    data.forEach(ln => {
        //chalk random color
        var colors = [chalk.red, chalk.green, chalk.yellow, chalk.blue, chalk.magenta, chalk.cyan];
        var color = colors[Math.floor(Math.random() * colors.length)];
        console.log(color(ln))
    })


}