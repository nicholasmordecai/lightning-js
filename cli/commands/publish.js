exports.command = ['publish', 'p']
 
exports.describe = 'Publish your game'
 
exports.builder = {
  browserify: {
    default: true,
    alias: 'b',
    describe: 'Use browserify for compatability'
  }
}
 
exports.handler = function (argv) {

}