[![CircleCI](https://circleci.com/gh/Sprite-Storm/lightning-js/tree/master.svg?style=svg)](https://circleci.com/gh/Sprite-Storm/lightning-js/tree/master)
[![codecov](https://codecov.io/gh/megmut/lightning-js/branch/master/graph/badge.svg)](https://codecov.io/gh/megmut/lightning-js)
[![dependencies Status](https://david-dm.org/sprite-storm/lightning-js/status.svg)](https://david-dm.org/sprite-storm/lightning-js)
[![devDependencies Status](https://david-dm.org/sprite-storm/lightning-js/dev-status.svg)](https://david-dm.org/sprite-storm/lightning-js?type=dev)


![lightning-js logo](https://preview.ibb.co/gLBF3R/readme_header.png)


# Ligtning 0.5.6

A complete HTML5 game development library built on Pixi.js (4.4.1)

## Getting Started
Lightning comes pre-packaged with a CLI that's easy to use, and aids in project setup and build tools. You are more than welcome to use your own build tools, and please feel free to fork the CLI if you do and we'll try and encorperate it into the main branch. 

### Prerequisites

- NPM - https://www.npmjs.com/get-npm
- Node - https://nodejs.org/en/download/
> please note that the project was last built with NPM version 3.10.8 and Node version 8.9.3. It should work with earlier versions, but replicating any bugs might not be straight forward

### Installing

Next, go ahead and install the project.

```sh
npm install -g lightning-js
```

To create a new project, run the command:
```sh
lightning create myNewProjectName
```
> running the above command will create a blank slate. You will get all the build tools, folder structure, essential npm modules, however you won't find a single line of code in there.

To use of of the templates provided, please use the --template paramater:
```sh
lightning create myNewProjectName
```
> there will be miltuple boiler plates coming soon, but for now don't use the --template flag and use the default template

### Running your project
These templates use gulp to serve the game in development mode. Any changes to any of the files will result in the browser automatically being updated.

> This was initially done with webpack, however in the best interest of keeping things light weight and easily configurable, I opted for gulp. I also had some issues when webpack was serving .svg files.

Starting the dev server
```sh
cd myNewProjectName
lightning dev
```

You can use the options like so:
```sh
lightning dev --port 7878 --watch false --browserify false
```

There are some options you can pass to the dev command:
* --port {number} default = 3000
* --watch {boolean} default = true
* --browserify {boolean} default = true

### Building and Releasing
Running production builds are very important. Although you could release your game from the public folder that would have been created above, it will not be minified, uglified, version bumped, tested or wrapped.

> These features haven't been developed yet!

To run a standard production build:
```sh
lightning build --production
```
