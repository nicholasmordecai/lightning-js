# Changelog

### 0.1.5
1. Stats are now optional. Set stateEnabled on the core before game initalisation
2. Physics update
    1. Set the physics world into the core engine.
    2. Set the phyics update dependant on physics enabled.
    3. Created a start physics function so games don't run it if it's not needed
    4. Found a type definition for box3d c++ port, implemented tha. It's 95% complete. Will update if possible as I go along.

### 0.1.4
1. Namespace Lightening added.
2. Box2D bundled into the project correctly.
3. State manager fixed (class not initalising correctly).
    1. Changed to game.stateStart(class).
4. Readme file added.
5. Changelog added.