# Changelog

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