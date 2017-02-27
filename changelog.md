# Changelog

### 0.3.1
1. Created HUD class

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