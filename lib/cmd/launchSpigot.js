module.exports = function (args = []) {
	const child_process = require('child_process');
	var procExec = 'C:\\Program Files\\Java\\jdk-15.0.2\\bin\\java.exe'
	var cdir = process.cwd();
	process.chdir('C:\\dapack')
	const cp = child_process.spawn(procExec, ['-jar', 'C:\\dapack\\craftbukkit-1.16.4.jar']);
	cp.stdout.on('data', (buf) => {
		  // can manipulate buf
		//   process.stdout.write(buf)
		//   
		process.stdout.write(buf);
	});

	cp.stderr.on('data', (buf) => {
		process.stderr.write(buf);	  
	})
	cp.stdin.on('data', (buf) => {
		process.stdin.write(buf);
	})
	process.chdir(cdir)
}
