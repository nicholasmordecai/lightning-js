var npm = require('npm');

exports.command = ['build', 'b'];
 
exports.describe = 'Build your game';
 
exports.builder = {
  browserify: {
    default: true,
    alias: 'b',
    describe: 'Use browserify for compatability'
  }
}
 
exports.handler = function (argv) {
    console.log('starting dev');
    npm.load({}, function (er) {
      if (er) { return; }
      npm.commands.run(['build'], 'foobar');
    });
}