module.exports = {
    name: 'madre',
    alias: '/madre, /mdr, /valide',
    usage: '/madre <type>',
    description: 'Check madre!',
    exec(args = []) {
            console.clear();
            const chalk = require('chalk')
            console.log(chalk.bold.magenta('💜 Madre') + ` ${chalk.bold.yellow('is '+args[0]+'!')}
            
  ${chalk.blue(' _                                         __  __           _            _')}
  ${chalk.red('| |    _____   _____   _   _  ___  _   _  |  \\/  | __ _  __| |_ __ ___  | |')}
  ${chalk.magenta('| |   / _ \\ \\ / / _ \\ | | | |/ _ \\| | | | | |\\/| |/ _` |/ _` | \'__/ _ \\ | |')}
  ${chalk.yellow('| |__| (_) \\ V /  __/ | |_| | (_) | |_| | | |  | | (_| | (_| | | |  __/ |_|')}
  ${chalk.cyan('|_____\\___/ \\_/ \\___|  \\__, |\\___/ \\__,_| |_|  |_|\\__,_|\\__,_|_|  \\___| (_)')}
  ${chalk.green('                       |___/                                               ')}
 
            `);
        
    }
}