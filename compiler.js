var fs = require('fs')
var jwt = require('jsonwebtoken')
var chalk = require('chalk')
/**
 * @whatis `compiler`: Nsharp compiler (nshc)
 */
module.exports = {
    compileScript(file) {
        if (!fs.existsSync(file)) throw new RangeError("Script not found.");
        if (!file.endsWith('.nsharp')) throw new TypeError("Script is not a nsharp script.");
        var data = fs.readFileSync(file);
        var encoded = data.toString('base64');
        var i = 0;
        var j = 0;
        var data = '';
        while (i < encoded.length) {
            if (i % 15 == 0) {
                data += encoded.substring(i, i + 15) + '\n';
                j++;
            }
            i++;
        }
        var functions = fs.readdirSync(process.cwd()).filter(file => file.endsWith('.nsv'));
        var fnData = [];
        functions.forEach(fn => {
            var fnIndex = fs.readFileSync(process.cwd() +"/"+ fn, 'utf8');
            fnData.push({fname: fn.replace('.nsv', ''), fdata: fnIndex});
        })
        var jwtData = jwt.sign({functions: fnData}, 'secret')
        var ns_file = file.substring(0, file.length - 7) + '.ns';
        if (!fs.existsSync(process.cwd() + '/bin')) fs.mkdirSync(process.cwd() + '/bin');
        (property => {
            'worker-' + property;
        })
        fs.writeFileSync(process.cwd() + "/bin/" + ns_file.replace(process.cwd() + "\\", ''), `${data}%%@FUNC%%\n${jwtData}`);
        console.log(chalk.green("✅ Compiled script to: "+ chalk.yellow("/bin/" + ns_file)));
    }
    
}

