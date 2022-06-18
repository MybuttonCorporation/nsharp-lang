/**
 * @entry `@nsharp/interpreter`
 * entry point for the nsharp interpreter
 * @version 1.0.0
 * @license MIT
 * @since 1.0.0
 * @core;
 */
function sleep(ms) {
    //stop the program for ms milliseconds
    return new Promise(resolve => setTimeout(resolve, ms));
}
const { exec } = require('child_process');
const fs = require('fs');
class interpreter {
    currentcwd = process.cwd();
    constructor(file = "./program.nsharp") {
        if (file.includes('./')) file.replace('./', '');
        this.cwf = file;
        this.cwd = process.cwd();
        if (!fs.existsSync(file)) new nsharp_range_error(`${file} does not persist in the current working directory.`);
        if (file.includes('/')) {
            this.cwd = process.cwd() + "\\" + file.split('/').slice(0, -1).join('\\');
            this.cwf = file.split('/').slice(-1)[0];
        }
        process.chdir(this.cwd);
    }
    run(callback = function() {return; }) {
        this.#importClasses();
        let lines = fs.readFileSync(this.cwf,'utf8').split("\n");
        lines.forEach(ln => {
            this.execute(ln);
            /*execute the line as an nsharp cmd */
        })
        callback();
        process.chdir(this.currentcwd);
    }

    functions = new Map();
    types = new Map();
    #importClasses() {

    var funcs = fs.readdirSync(this.currentcwd + '/lib/func').filter(i => i.endsWith('.js'));
    var types = fs.readdirSync(this.currentcwd + '/lib/types').filter(i => i.endsWith('.js'));
    funcs.forEach(fn => {
        this.functions.set(fn.replace('.js', ''), require(this.currentcwd+'/lib/func/' + fn));
    })
    types.forEach(type => {
        this.types.set(type.replace('.js', ''), require(this.currentcwd+'/lib/types/' + type));
    })

    }
    compileFn(fnName, fnLoc, args) {
        var $i = fs.readFileSync(fnLoc + ".nsv", 'utf8');
        var $fi = $i.split('\n');
        var $imports = $fi[0].replace(/\'/g, '');
        var $l = $fi.slice(1);
        fs.writeFile(this.cwd + "/@func/" + fnName + ".js", `
var workerThis = function(${$imports}) {
${$l.slice(1).join('\n')}
workerThis("${args}")

        `, function(err) {
            if (err) throw err;
        })
        exec(`node ${process.cwd()}/@func/${fnLoc}.js`, (err, stdout, stderr) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log(stdout);
        })


    }
    executeFn(fnName, fnLoc) {
        if (!fs.existsSync(this.cwd +"/" + fnLoc + ".nsv")) return null;
        else {
            var $i = fs.readFileSync(fnLoc + ".nsv", 'utf8');
            var $fi = $i.split('\n');
            var $imports = $fi[0].replace(/\'/g, '');
            var $l = $fi.slice(1);
            fs.writeFile(this.cwd + "/@func/" + fnName + ".js", `
module.exports = function(${$imports}) {
    ${$l.slice(1).join('\n')}

            `, function(err) {if (err) throw err})
        this.functions.set(fnName, require(this.cwd + "/@func/" + fnName + ".js"));
        }
    }
    execute(code = "") {
        let lines = code.split("\n");
        this.functions.set('system.printf', (msg) => {
            process.stdout.write(msg);
        })
        this.functions.set('system.println', (msg) => {
            console.log(msg)
        })
        let variables = new Map();
        function getByValue(map, value) {
            for (let [key, val] of map) {
                if (val === value) {
                    return key;
                }
            }
        }
        variables.set('program', 'nsharp');
        variables.set('env.cwd', this.cwd);
        variables.set('env.cwf', this.cwf);
        let ln = 1
        lines.forEach(async line => {
            
            ln++;
            if (line.startsWith('...') && line.endsWith('...')) return;
            if (line.startsWith('* ')) return;
            function replaceAll(find, replace, str) {
                return str.replace(new RegExp(find, 'g'), replace);
            }
            variables.forEach(vnm => {
                let $vk = getByValue(variables, vnm);
                line = replaceAll(`${$vk}`, vnm, line);
                line = line.replace(/\$/g, '');
            })

            //defining functions [will be updated to work without extra files]
            if (line.startsWith('void ')) {
                
                let $fnm = line.split(' ')[1].replace(/\r/g, '');

                this.executeFn($fnm.replace(':', ''), line.split(': ')[1].replace(/\r/g, ''));
                return;
            }

            // above is required for object assignments

            //function calls
            if (this.functions.has(line.split('(')[0]) || this.functions.has(line.split('(')[0])) {
                var $params = line.replace(line.split('(')[0], '')
                let $data = "";
                if (lines.length == ln) $data = $params.replace('("', '').slice(0, -2).replace(/\r/g, '');
                else if (line.slice(0, -2).endsWith('"')) $data = $params.substring(2).slice(0, -3).replace(/\r/g, '');
                else $data = $params.replace('("', '').slice(0, -2).replace(/\r/g, '');
                var $args = $data;
                if (fs.existsSync(process.cwd() + "/@func/"+line.split('(')[0] + ".js")) {
                    this.compileFn(line.split('(')[0], line.split('(')[0], $args)
                    return
                }
                else {
                    this.functions.get(line.split('(')[0])($args);
                }
            }
            //if statement (not sure if this works properly)
            //@recommended to not use for the time being
            if (line.startsWith("if")) {
                let condition = line.split(" ")[1];
                let if_statement = line.split(" ")[2];
                let else_statement = line.split(" ")[3];
                if (eval(condition)) {
                    this.execute(if_statement);
                } else {
                    this.execute(else_statement);
                }
            }

            //variable assignment
            if (line.split(" ")[0] == "var" || line.split(" ")[0] == "const") {
            if (line.split(" ")[1].includes('$')) throw new nsharp_syntax_error("variable name can not contain `$`\n@" + this.cwf + ":"+ln+"," + line.split(' ')[0].length + line.split(' ')[1].length + 1)
            if (!line.split(" ")[1].includes(':')) throw new nsharp_syntax_error("expected ':' in variable declaration\n@" + this.cwf + ":"+ln+"," + line.split(' ')[0].length + line.split(' ')[1].length + 1);
            var $varName = line.split(":")[0];
            var $varValue = line.split(":")[1];
            let varType = 'object';
            if ($varName.startsWith('\'') && $varName.endsWith('\'')) varType = 'literal';
            if ($varName.startsWith('`') && $varName.endsWith('`')) varType = 'string';
            if ($varName.startsWith('"') && $varName.endsWith('"')) varType = 'string';
            if (varType == 'object' && !variables.has($varValue)) throw new nsharp_range_error("variable does not persist in $nsh/variables\n@" + this.cwf + ":"+ln+"," + line.split(' ')[0].length + line.split(' ')[1].length + 1);
            variables.set($varName, $varValue);
            }
        })
    }
}



//yet to start these mfs

class nsharp_syntax_error extends Error {
    constructor(message) {
            var dataStream = {
                interpreter: {
                    error: {
                        msg: message
                    }
                }
            }
            
            super(dataStream.interpreter.error.msg);
            this.error = {
                msg: message,
                code: 1,
                stopped: true,
                type: 'nsharp_syntax_error'
            }
        }

}


class nsharp_range_error extends Error {
    constructor(message) {
        var dataStream = {
            interpreter: {
                error: {
                    msg: message
                }
            }
        }
        
        super(dataStream.interpreter.error.msg);
        this.error = {
            msg: message,
            code: 1,
            stopped: true,
            type: 'nsharp_range_error'
        }
    }
}

module.exports = {
    interpreter,
    nsharp_syntax_error,
    nsharp_range_error
}