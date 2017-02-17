# Changelog

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