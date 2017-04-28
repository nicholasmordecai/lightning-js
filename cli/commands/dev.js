var npm = require('npm');

exports.command = ['dev', 'd']
 
exports.describe = 'Start a dev server'
 
exports.builder = {
  port: {
    default: 3000,
    alias: 'p',
    describe: 'Port for dev server'
  }
}
 
exports.handler = function (argv) {
    console.log('starting dev');
    npm.load({}, function (er) {
      if (er) { return; }
      npm.commands.run(['start']);
    });
}