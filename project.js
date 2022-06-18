const chalk = require('chalk')
const fs = require('fs')
/**
 * @whatis `project`: Nsharp project Manager (nshp) 
 */
module.exports = {
    /**
     * @whatis `new`: Create a new project
     */
    new() {
        console.log(chalk.dim("Setting up project... ") + chalk.bold.cyan("(") + chalk.bold.green("press " + chalk.red("^C ") + "at any given point to cancel") + chalk.bold.cyan(")"));
        let project = {};
        async function AskPath() {
          await createPrompt("📦 Path").then((path) => {
            if (path == "") {
              project.path = process.cwd();
               console.log(chalk.green("📦 Path: " + project.path));
               AskName();
               return;
            }
            if (!fs.existsSync(path)) {
              console.log(chalk.red("❌ Path! " + path)) 
              AskPath();
              return;
            }
            project.path = path;
            console.log(chalk.green("📦 Path: " + path));
            AskName();
          }).catch(err => {
            console.log(chalk.red('entry not made'))
          });
        }
        async function AskName() {
            await createPrompt("📝 Name").then((name) => {
                if (!name) return console.log("Name cannot be empty.") && AskName();
                project.name = name;
            console.log(chalk.green("📝 Name: " + name));
    
                CreateConfig();
                }).catch(err => {
                  console.log(chalk.red('entry not made'))
                });
        }
    
        async function CreateConfig() {
          function setupFiles(dir, pname) {
            if (!fs.existsSync(dir)) throw 'ERR_404: Path does not exist.';
            fs.writeFileSync(dir + "/" + pname + ".nsharp", `... N# Generated Code ...
... This is a default nsharp script. ...
@system.println("Hello, world!")
void test: test
@test("first arguement", "second arguement")
... The code above creates a function called test_fn, and its index is in test.nsv ...
            `)
            fs.writeFileSync(dir + "/test.nsv", `'ARGUEMENTS_1, ARGUEMENTS_2'
void test() {
    console.log("1st arg: " + ARGUEMENTS_1)
    console.log("2nd arg: " + ARGUEMENTS_2)
}
            `)
        }
            var data = {
                compiler: "nsharp.@workers/compiler.js",
                name: project.name,
                path: project.path,
            }
            fs.writeFile(project.path + "/nsh.config", JSON.stringify(data, null, 4), (err) => {
                if (err) throw err;
                console.log(chalk.green("📦 Setup complete."));
            });
            setupFiles(project.path, project.name);
            
        }
        AskPath()
    },
    compile(path) {
        if (!path) throw 'ERR_400: No path specified.';
        if (!fs.existsSync(path)) throw 'ERR_404: Path does not exist.';
    },
    setupFiles(dir, pname) {
        if (!fs.existsSync(dir)) throw 'ERR_404: Path does not exist.';
        fs.writeFileSync(dir + "/" + pname + ".nsharp", `
... N# Generated Code ...
... This is a default nsharp script. ...
@system.println("Hello, world!")
void test: test
@test("first arguement", "second arguement")
... The code above creates a function called test_fn, and its index is in test.nsv ...
        `)
        fs.writeFileSync(dir + "/test.nsv", `'ARGUEMENTS_1, ARGUEMENTS_2'
void test() {
    console.log("1st arg: " + ARGUEMENTS_1)
    console.log("2nd arg: " + ARGUEMENTS_2)
}
        `)
    }

}

//internal functions
function createPrompt(prompt) {
    var readline = require("readline");
    var rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    rl.setPrompt(chalk.bold.yellow(prompt) + chalk.bold.blue("? "));
    rl.prompt();
    return new Promise((resolve, reject) => {
      rl.on("line", function (line) {
    //change the console cursor to the previous line
          process.stdout.write("\u001b[1A");
    rl.close();
        return resolve(line);
      })  
    });
  }
