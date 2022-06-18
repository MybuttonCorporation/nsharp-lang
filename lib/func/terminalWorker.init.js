module.exports = function(args =  []) {
	require('child_process').exec('chcp 65001', function (err, stdout, stdin) {
		return void{};
	})	
	console.log(require('chalk').bold.yellow('[i] Initilized n#devc for `external-terminal` use.'));
	return;
} 
