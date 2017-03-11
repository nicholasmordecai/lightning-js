exports.command = ['build', 'b']
 
exports.describe = 'Build your game'
 
exports.builder = {
  browserify: {
    default: true,
    alias: 'b',
    describe: 'Use browserify for compatability'
  }
}
 
exports.handler = function (argv) {
  console.log(argv.port)
}