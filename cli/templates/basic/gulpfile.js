const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const browserify = require('gulp-browserify');
const rename = require('gulp-rename');

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./public",
        },
        open: false
    });
});

gulp.task('watch-css', function () {
    gulp.src('public/css/*')
        .pipe(browserSync.stream());
});

gulp.task('browserify', function() {
    gulp.src('src/js/main.js')
        .pipe(browserify({
          insertGlobals : true
        }))
        .pipe(rename('game.js'))
        .pipe(gulp.dest('./public/js/', {overwrite: true}))
});

gulp.task('fetch-lightning', function() {
    gulp.src('./node_modules/lightning-js/dist/lightning.js')
        .pipe(gulp.dest('./public/js/'));
});

gulp.task('fetch-lightning-dts', function() {
    gulp.src('./node_modules/lightning-js/dist/lightning.d.ts')
        .pipe(gulp.dest('./src/'));
});

gulp.task('watch', ['browser-sync'], function () {
    gulp.watch(["src/js/**/*.js"], ['browserify']);
    gulp.watch(["public/css/**/*.css"], ["watch-css"]);
    gulp.watch("public/*.html").on('change', browserSync.reload);
    gulp.watch("public/js/game.js").on('change', browserSync.reload);
});