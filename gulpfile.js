const gulp = require('gulp');
const concat = require('gulp-concat');
const minify = require('gulp-minify');


const sourceFiles = [ './libs/pixi.js', './libs/Box2D.js', './libs/howler.js', './libs/stats.min.js', './build/*.js' ];
const destination = './dist/';

const sourceFilesDTS = ['./build/*.d.ts', './typings/globals/pixi.js/index.d.ts', './typings/globals/box2d/index.d.ts', './typings/globals/stats.js/index.d.ts'];
 
gulp.task('concat', function() {
  return gulp.src(sourceFiles)
    .pipe(concat('lightning.js'))
    .pipe(gulp.dest(destination));
});

gulp.task('concat-dts', function() {
  return gulp.src(sourceFilesDTS)
    .pipe(concat('lightning.d.ts'))
    .pipe(gulp.dest(destination));
});

gulp.task('push-to-test', function() {
    gulp.src('./dist/lightning.js')
        .pipe(gulp.dest('./../lightning-tester/public/js/'));
});

gulp.task('minify', function() {
  gulp.src('./dist/lightning.js')
    .pipe(minify({
        ext:{
            src:'.js',
            min:'.min.js'
        },
        exclude: ['tasks'],
    }))
    .pipe(gulp.dest('dist'))
});