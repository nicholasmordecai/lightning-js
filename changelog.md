# Changelog

### 0.5.1
1. Work on Geometry class
    1. Override Tint
    2. Override Alpha
    3. Automatically return a canvas generated texture of the graphics unless specified not to
    4. Added rounded rectangle
    5. Added Ellipse
2. Added Howler.js to the build
    1. Introduced a basic set of functions to use howler
3. Cleaned up the states some more
4. Particle Emitter preFillPool function (create n particles and dump into dead pool before use)
5. Fixed renderer.transparent not working (was the backgroundColor default value)
6. Fixed Easing.ElasticIn function
7. Added random array to the Maths module
8. Added device to the global namespace
9. Added more features to Maths module
10. Started adding examples of code in the comment headers



### 0.5.0
1. Introduced engine initalisation options
2. Cleaned up the main engine and removed the setup from the constructor
3. Added render options to the engine initialiser
4. Created toLocal functionality on the particle emitter


### 0.4.8
1. Added collision events to the Lite Physics plugin
2. Refactoring States and State Manager
    1. Game reference isn't given to state until initalisation
    2. Added a construct function that gets called before the init
3. Fixed a bug when transitioning between states
4. State maneger extends plugin and is not in the main game update loop
5. Created Pre update and Post update methods in Lite Physics
6. Created functionality to destory Lite Physics Bodies
7. Fixed Event Emit subscribe once remove subscriber


### 0.4.7
5. Created Physics Lite Plugin
    1. Manager, pools and bodies
    2. Collide on world bounds
    3. Out of world bounds
    4. Pool collisions between bodies
    5. Updating sprites based on positions
6. Tweak work on the Scale Manager
7. Added some useful methods to the sprite class to aid in the LitePhysics plugin

### 0.4.6
1. Big cleanup of old files
2. Add webfontloader to the external libs
3. Added FPS functionality to the tween engine
4. Tweaked tween creation API

### 0.4.5
1. Added a plugin super class to make it easier to develop plugins
2. Tween Maneger now extends new plugin class
3. Fixed tween destroy functionality
4. Refactored tween manager's active tween system
5. Added tween autoDestroy
6. Fixed globalRef missing on two of the display classes
7. Added a delay to individual anims on tweens
8. Added custom frame data to the tweens and refactored the update loop
9. Fixed on drag issue with device pixel ratio calculation
10. Fixed 'cannot find scaleManager'

### 0.4.4
1. Added a closest value in the Maths class
2. Work on the scale manager
    1. Allowed DPR's - you can specify which DPR's are okay to use
    2. Scaling for Retina displays done
3. Created a Align Vertical method
4. Made some minor adjustments to the service manager
    1. Returned the request object to the callback
    2. Fixed service action not having a specific route
    3. Added callbacks to actions
    4. Stringified the body object
    5. Override body and head in a action call
5. Fixes on the tween manager
    1. Added all of Robert Penner's easing functions
    2. Tweaked the naming convention

    
### 0.4.3
1. Started work on the device class
    1. Used ismobilejs to delect: 
        1. Mobile
        2. Tablet
        3. Desktop
        4. Ipod
    2. Detect browser
    3. Detect operating system
    4. Detect cookies available
2. Fixed bug in add syntax not adding first index
3. Altered state to extend Lightning.Group
4. Started development on Tweens
    1. 28 Easings
    2. Multiple Properties
    3. Looping
    4. Chaining
    5. Pausing
    6. Move to frames
    7. Events
        1. Start
        2. Pause
        3. Tick
        4. Loop
        5. Complete
        6. Reset
        7. Destroy
        8. AutoDestroy
    8. Custom Tween Functions
5. Moved ticker creation above managers
6. Changed Emit function to take a spread operator


### 0.4.2
1. Created a dev environment to build lightning on
    1. Adjusted the tsconfig file
    2. Made a dev project to serve with browserSync
2. More work on event emitter
    1. Added removal of subscriptions
    2. Returned correct subscription object
    3. Changed the interface and added the passing of parameters
    4. Fixed the sending of some parameters
    5. Better documentation
    6. Allow event emitter to be enabledand disables
    7. Created a destroy method. Needs confirmation
3. Timer work
    1. Created a destroy method
    2. Many tests
4. Upgraded PIXI to 4.5.1
5. Changed the creation of the wrapper div and the canvas
6. Fixed typing references in the dev env
7. Added a globalRef to the sprite, allowing you to find one anywhere in the world tree
8. Created a device class to hold device specific information
9. Refactor StorageManager
    1. Removed interdependancy of functions for fallback
    2. Added a remove all method
    3. Removed sizeof is it's not very accurate


### 0.4.1
1. Moved touch input into input folder within controllers
2. Created spaces for keyboard and gesture input controllers
3. More work on the CLI
    1. Rudimentary build script
    2. Hijacking NPM for the dev server script
4. Aded karma and jasmine for testing
    1. Chrome Testing Suite
    2. Firefox Testing Suite
    3. PhantomJS Testing Suite
5. Automated the testing procedure under 'npm test'
6. Created an additional build step to allow TSC to construct both the individual files, and a single out file
    1. This was mostly for the remapping that takes place for testing
7. Built test coverage to the project. This is reliate on 6
8. Fixed the auto docs generator. Would still like to improve this
9. Removed the exampled.md file as this is now taken care of with the docs
10. Moved this project from Gitlab to Github
    1. Introduced CircleCI automated testing and continious integration by way of circle.yml
11. Created a config file in the template projects that the CLI will consume


### 0.4.0
1. States now automatically have their own event emitter separate from the core engine
2. CLI gets under way
    1. Commands include add, build, create, dev and publish
    2. Yargs created with aliases for the commands and command options
3. Groups get event emitter
4. Sprites get event emitter
5. Clean up of the engine and engine helper class
6. Brand new shiny storage manager that facilitates non localStorage fallback as default
7. Particle Emitter fixes
    1. Function callback from ticker instead of hijacking update transformation
    2. Particles now use ticker time to calculate lifeTime vs deadTime instead of Date.now() - good performance saver
8. Fix in state manager (not waiting for preload to complete before)
9. Created a Timer class
10. Fixed context issues on event emitter (consider a rename for more standard convention)


### 0.3.6
1. Brand new shiny ultra fast light weight super duper event emitter :D
    1. Will be inherited by all main objects in Lightning.
    2. Allows an event manager to be added to a state, so when the state is destroyed, so are those events and subscriptions
    3. Allows for denial of even propogation
    4. Can subscribe for many triggers, or once
    5. Can enable or disable events on the fly
2. Started development on the Cli
    1. Got the npm -g to install globally with a path variable to make it a globally accessable script
        1. used a shebang, however on windows it will create a *.cmd file so it's cross platform
        2. Created the basis of the folder structure within the cli


### 0.3.5
1. More work on particle emitter
    1. more performance tweaks
    2. fixed the update loop so it's not controlled by an outside source (I should look at using eventEmitter3 for this?)


### 0.3.4
1. Another major overhaul on the particle emitter
    1. Debug Module
    2. Return to pool optamisation
    3. Not removing the children as it's too heavy, isDead property instead
    4. Responsive to device pixel ratio now
    5. Made the default values more useful
2. Re-wrote the particle class for speed gains
    1. Overwritten multiple sprite class functions (renderCnavas, renderWebGL, destroy..)
    2. Removed the ability for the particle class to have children
3. Add a dpr property to the engine. This can only be set at creation and not during runtime
4. Made the Circle function in the geometry respond to DPR. 


### 0.3.3
1. Fixes in state manager
2. Implemented working engine helper class
    1. Too many to list, but lots of helper functions, setters and getters
3. Added start and stop ticker as well as setting the ticker FPS
4. Signal Manager major overhaul
5. Moved stuff out of the core that doesn't belong there


### 0.3.2
1. Added a BitmapText class
2. Added a depreciation class to deal with backwards compatability
3. Cleaned up the reference.d.ts files and fixed them not being added to the global definition file (relook at this at a later date)
4. Removed the font utils file and put the helper functions into BitmapText
5. Major overhaul on the states and the state manager
6. Migrating the physics functionality into a physics manager


### 0.3.1
1. Added HUD class
2. Added an Input Controller
3. Fullscreen now implemented
    1. this.game.goFullscreen();
4. Tweaks to the hit area class
5. Updated Pixi.js to 4.4.1
6. Created a interfaces folder to start separating the interfaces out
7. Started work on some new abstract helper functions in the Maths utils


### 0.3.0
1. Fixed particle emitter default values
2. Made helper function for generating textures (this.game.genereateTexture(...));
3. Made helper function for getting textures (this.game.texture(...));
4. Improved the utility functions on the parallax class


### 0.2.9
1. Introduce Lightning.Texture class
2. Created a physics class to contain anything box2d / phsics related
3. Fix Display Object not being resolved in the State class
4. Sprites now have a enableDrag function
    1. Can pass preserve position which keeps he location change


### 0.2.8
1. Added a Maths component for things like generating random numbers etc
    1. Maths.rng(); | Maths.rng(true) -- for negative rng
    2. Maths.rndInt(-10, 10);
    3. Maths.rndFloat(-2.3, 4.6789);
2. More work on the particle system
    1. Life span ranges
    2. Making the modifiers
    3. Added pooling system
    4. Added ranges on creation
    5. Added increment ranges on update
    6. Refactored update loop
    7. Fixed not running single particle batch


### 0.2.7
1. Added center values to the game for ease of finding center x and y
2. Added the DisplayObject class as an extention to Lightning
3. Removes Icons class and moved it to a plugin for an SVG pack
4. Moved UI related classes to Display
5. States get an 'add' util function to add multiple sprites to the stage easily
6. Begin development of both Particles and a Particle Emitter


### 0.2.6
1. Major overhaul again with the build tools and compiling
2. Fix for not bundling sub directory .js files in the build folder


### 0.2.5
1. Added CI tools to the dev branch
2. Fixed some typos in the code
3. Updated naming conventions
    1. Removed the UI prefix for sprite, graphics, group etc
    2. Changed Shapes to Geometry


### 0.2.4
1. Added font creation utility (generates responsive font sizing)
2. Fixes for scaling in SVG's with retina / high dpr displays


### 0.2.3
1. Updated project name for use with NPM
2. Added and refactored shared code amongst display objects for eeasier scale and anchor setting


### 0.2.2
1. Updated the documentation (needs another look over in the future)


### 0.2.1
1. Fixed button game refernece not being accessable when inherited
2. Added a font helper class to generate the correct scaling size for font


### 0.2.0
1. Fixed #3 - not updating state
2. Made it much easier to run the latest version, though it's not 100% requirable at the moment.
3. More work on the sprites, button, input handling and other UI related issues


### 0.1.6
1. Hit Area class added
    1. Simpler interaction management
    2. debug event listener
2. Button class added, extending PIXI.Sprite
    1. Fixed button graphics not anchoring
3. Tactical rename to Lightning due to a spelling error xD
4. Sprites now have setAnchor method.
5. Pixi.js typings fixed for anchor points


### 0.1.5
1. Stats are now optional. Set stateEnabled on the core before game initalisation
2. Physics update
    1. Set the physics world into the core engine.
    2. Set the phyics update dependant on physics enabled.
    3. Created a start physics function so games don't run it if it's not needed
    4. Found a type definition for box3d c++ port, implemented tha. It's 95% complete. Will update if possible as I go along.


### 0.1.4
1. Namespace Lightning added.
2. Box2D bundled into the project correctly.
3. State manager fixed (class not initalising correctly).
    1. Changed to game.stateStart(class).
4. Readme file added.
5. Changelog added.