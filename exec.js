var fs = require('fs'), jwt = require('jsonwebtoken');
/**
 * @whatis `exec`: executes a compiled nsharp script
 */
module.exports = {
    exec(file) {
        if (!fs.existsSync(file)) throw new RangeError("Unknown script data.");
        if (!file.endsWith('.ns')) throw new TypeError("file is not a valid nsharp program.");
        var data = fs.readFileSync(file, 'utf8').split('\n').join('').split('%%@FUNC%%')
        //decoded script index
        var decoded = Buffer.from(data[0], 'base64').toString('utf8');
        var jwtData = JSON.parse(atob(data[1].split('.')[1]));
        jwtData.functions.forEach(fn => {
            if (!fs.existsSync(process.cwd() + "/@func")) fs.mkdirSync(process.cwd() + "/@func");
            fs.writeFileSync(process.cwd() + '/' + fn.fname + '.nsv', fn.fdata)
        })
        fs.writeFile(process.cwd() + "/~" + file.replace(process.cwd + "\\", "").slice(0, -3) + ".nsharp", decoded, function(err) {
            if (err) throw err;
        })
        var worker = require('./worker.js')
        
        setTimeout(() => {
        worker.executeTask(["~" + file.replace(process.cwd + "\\", "").slice(0, -3) + ".nsharp"])  

        }, 20);
        setTimeout(() => {
            fs.unlink(process.cwd() + "/~" + file.replace(process.cwd + "\\", "").slice(0, -3) + ".nsharp", function(err) {
                if (err) throw err;
            })
        }, 500)
    }
}