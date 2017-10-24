[![CircleCI](https://circleci.com/gh/megmut/lightning-js.svg?style=svg)](https://circleci.com/gh/megmut/lightning-js)

[![Coverage Status](https://coveralls.io/repos/github/megmut/lightning-js/badge.svg?branch=master)](https://coveralls.io/github/megmut/lightning-js?branch=master)


# Ligtning 0.5.0

A complete HTML5 game development library built on Pixi.js (4.4.1)

## Getting Started

### Prerequisites

- NPM
- Node
> please note that the project was last built with NPM version 3.10.8 and Node version 6.9.1. It should work with earlier versions, but on your head be it.

For changes to the library, gulp and tsc must be installed globally. If they are not already, please install them:

```sh
# OSX
$ sudo npm install -g gulp tsc

# Windows (Elivated permissions may be required)
$ npm install -g gulp tsc
```

### Installing

Next, go ahead and install the project.

```sh
npm install -g lightning-js
```

### Creating a New Project
Lightning comes with some pre-built templates for you to work from. You don't have to use them, but it can be a good help.

To create a new project, run the command:
```sh
lightning create myNewProjectName
```
> running the above command will create a blank slate. You will get all the build tools, folder structure, essential npm modules, however you won't find a single line of code in there.

To use of of the templates provided, please use the --template paramater:
```sh
lightning create myNewProjectName --template flappy-bird
```
Here is a list of templates
* basic
* flappy-bird -comming soon-
* side-scroller -comming soon-
* space-shooter -comming soon-


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

There are optional parameters to running a production build.
* --exclude {array} = []
* --ios {boolean} = false
* --android {boolean} = fale
* --desktop {boolean} = false
* --minify {boolean} = true
* --uglify {boolean} = true
* --browserify {boolean} true
