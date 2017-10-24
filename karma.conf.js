// Karma configuration
// Generated on Wed Apr 19 2017 16:14:02 GMT+0200 (CEST)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      './node_modules/pixi.js/dist/pixi.min.js',
      './build/compile.js',
      './test/**/*.js',
    ],


    plugins: [
      'karma-jasmine',
      'karma-spec-reporter',
      "karma-chrome-launcher",
      "karma-firefox-launcher",
      "karma-phantomjs-launcher",
      "karma-safari-launcher",
      'karma-typescript',
      'karma-coverage',
      'karma-remap-istanbul',
      'karma-remap-coverage',
      'karma-sourcemap-loader'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      './build/compile.js.map': ['sourcemap'],
      './build/compile.js': ['coverage']
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['spec', 'coverage', 'karma-remap-istanbul'],

    remapIstanbulReporter: {
        remapOptions: {}, //additional remap options
        reportOptions: {}, //additional report options
        reports: {
          lcovonly: 'coverage/lcov.info',
          html: 'coverage/report'
        }
      },

    // web server port
    port: 9876,

    coverageReporter: {
      reporters: [{type: 'lcov'}]
    }, 


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}