[![build status](https://gitlab.com/Sprite-Storm/lightning/badges/dev/build.svg)](https://gitlab.com/Sprite-Storm/lightning/commits/dev)


# Ligtning 0.2.6

A template for building mobile games in pixi, box2d and typescript

## Getting Started

### Prerequisites

- NPM
- Node
> please note that the project was last built with NPM version 3.10.8 and Node version 6.9.1. It should work with earlier versions, but on your head be it.

```
Give examples
```

### Installing

```sh
# OSX
$ sudo npm install -g webpack tsc

# Windows (Elivated permissions may be required)
$ npm install -g webpack tsc
```

Next, go ahead and clone the project.

```sh
$ git clone git@gitlab.com:Sprite-Storm/Lightning.git
```

If you want to make changes to the development branch, please switch to the dev branch. If you want to implement your own feature request, please make a seperate branch and once completed, make a merge request. You can make a pull request from the gitlab dashboard, or from the command line.

```sh
# switch branch
$ git checkout dev

# make new branch and switch to the new branch
$ git checkout -b myCoolFeature

# CI pull request
$ git request-pull v1.0 git@gitlab.com:Sprite-Storm/Lightning.git dev
```
Once you have made a pull request to the dev branch, your feature will be implemented into the latest development version, and released with the version.

### Coding Style
Trying to stick to one format of coding style to make collaboration easier. Below is an example of a class.

```js 
/**
 * Button class for adding a hit area and input controls to a sprite
 */
namespace Lightning.Utils {
    export class Button extends UI.Sprite {
        /**
         * @description Constructor of button class
         * 
         * @param {number} width width of the hitarea
         * @param {number} height height of the hitarea
         */
        constructor(width:number, height:number) {
            super();
        }
        
        /**
         * @description Add a function to the event listner for inputs
         * 
         * @param {string} eventName the name of the event ('mousedown', 'touchend'...)
         * @param {Function} fnct the function to callback when the event is emitted
         */
        on(eventName:string, fnct:Function):boolean {
            ...
            return true;
        }
    }
}
```

## Running
You can let Webpack serve the files, and TSC watch for changes. When TSC detctes a change, it will run build the files, at which point Webpack will detect a change to the built file, and re-bundle and update your browser. To start this, you can use:
```sh
$ npm start
```

## Deployment

Building the library is fairly easy. TSC takes care of all the typescript compilation and Webpack takes care of the bundling. We produce .d.ts files for the typing definitions and the sourmaps for easier debugging. 

To run deployment, you can simple run:

```sh
$ npm run production
```

To run the building or the bundling seperatly, you can use:

```sh
# builds the typescript files into a single javascript file
$ npm run build

# bundles the external libraries and the single javascript output from TSC
$ npm run bundle
```


## Running the tests

Tests are built with Mocha, and coverage with coveralls & istanbul. Tests are written in javascript and reside in the test folder. Here is an example of what a test looks like.
```js
"use strict";
var index = require('../bin/index');
var assert = require('assert');

describe('index', function () {
    var subject;

    beforeEach(function () {
        subject = new index["default"]();
    });
    
        describe('#isObect', function() {
        it('should check if object is a valid object (not array)', function(done) {
            let testData = {test: true};
            let result = subject.isObject(testData);
            assert.equal(true, result, 'expected: ' + true + ', result: ' + result);
            done();
        });
    });
});

```

To run these tests, you can use the following npm script:
```sh
$ npm test
``` 

To get the coverage of code, run this:
```sh
$ npm run coverage
``` 

To get output of coverage for indepth test identification, use:
```sh
$ npm run coveralls
``` 
This will produce a html page with all of your code being displayed along side the number of times each statement is hit, each function is called / tested and what your overall coverage. This report will be published along side this repository at some point.

## Versioning

We use standard version controll naming for this project.
X.0.0 - Major Release
1.X.0 - Minor Release
1.0.X - Patch