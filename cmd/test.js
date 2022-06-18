module.exports = {
    name: 'test',
    alias: '/t,/test,-t,--test',
    usage: '/t <args>,/test <args>,-t <args>,--test <args>',
    description: 'test',
    exec(args = []) {
        var chalk = require('chalk')
        console.log(chalk.green('$ ') + chalk.red('args: ') + chalk.yellow(args.join(', ')))
    }
}