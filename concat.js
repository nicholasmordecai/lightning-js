 var concat = require('concat-files');
 
  concat([
    'typings/globals/box2d/index.d.ts',
    'typings/globals/pixi.js/index.d.ts',
    'typings/globals/sound.js/index.d.ts',
    'typings/globals/stats.js/index.d.ts',
  ], 'dist/libs.d.ts', function(err) {
    if (err) throw err
    console.log('done');
  });