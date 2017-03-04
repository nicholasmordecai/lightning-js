/// <reference path="../src/reference.d.ts" />
declare namespace Lightning {
    interface iPoint {
        x: number;
        y: number;
    }
}
declare namespace Lightning {
    interface iRange {
        from: number;
        to: number;
    }
}
declare namespace Lightning {
    interface iPointRange {
        xFrom: number;
        xTo: number;
        yFrom: number;
        yTo: number;
    }
}
declare namespace Lightning {
    interface iStateMap {
        key: string;
        worldIndex: number;
        active: boolean;
        fps: number;
        state: Lightning.State;
    }
}
declare namespace Lightning {
    interface iTweenCallback {
        name: string;
        funct: Function;
        functContext: any;
        functParams: any[];
        frame: number;
        once: boolean;
    }
}
declare namespace Lightning {
    interface iTweenProperty {
        prop: string;
        val: number;
    }
}
declare namespace Lightning {
    class Maths {
        /**
         * @description generate a random integer between two values
         * @param  {number} from
         * @param  {number} to
         */
        static rngInt(from: number, to: number): number;
        /**
         * @description generate a random number
         *
         * @param  {boolean=false} negative
         */
        static rng(negative?: boolean): number;
        /**
         * @description generate a random float between two values
         *
         * @param {number} from
         * @param {number} to
         */
        static rngFloat(from: number, to: number): number;
        /**
         * TODO
         * Generate random position in a given area
         *
         * @param {iPoint} from
         * @param {iPoint} to
         *
         * @returns {iPoint}
         */
        static rndPos(): iPoint;
        /**
         * TODO
         * @description Calculate distance between two positions
         *
         * @param {iPoint} pos1
         * @param {iPoint} pos2
         *
         * @returns {iPoint}
         */
        static distanceBetween(): iPoint;
        /**
        * TODO
        * @description Convert Hex to RGB
        *
        * @param {iPoint} pos1
        * @param {iPoint} pos2
        *
        * @returns {iPoint}
        */
        static hextoRGB(): iPoint;
        /**
        * TODO
        * @description Calculate RGB to Hex
        *
        * @param {iPoint} pos1
        * @param {iPoint} pos2
        *
        * @returns {iPoint}
        */
        static rgbToHex(): iPoint;
    }
}
/**
 * Redirect functions for when something gets depreciated.
 * Should try not to do this as often as possible
 */
declare namespace Lightning {
    class Depreciated {
    }
}
/**
 * A helper class for the 'Game'. It's used for all non essential public functions.
 * This is mostly used to keep the actual engine class neat, slim and easier to develop
 */
declare namespace Lightning {
    class EngineHelper {
        protected _renderer: PIXI.WebGLRenderer | PIXI.CanvasRenderer;
        protected _world: PIXI.Container;
        protected _hud: any;
        protected _ticker: PIXI.ticker.Ticker;
        protected _activateState: any;
        protected _tweens: any;
        protected _signals: Signals.SignalManager;
        protected _stateManager: StateManager;
        protected _physicsManager: PhysicsManager;
        generateTexture(...params: any[]): any;
        goFullscreen(): void;
        texture(...params: any[]): any;
        backgroundColor: number;
        readonly world: PIXI.Container;
        readonly width: number;
        readonly height: number;
        readonly center: {
            x: number;
            y: number;
        };
        readonly renderer: PIXI.CanvasRenderer | PIXI.WebGLRenderer;
        readonly tweens: TweenManager;
        readonly signals: Signals.SignalManager;
        readonly states: StateManager;
        fps: number;
        readonly minFPS: number;
        readonly elapsedTime: number;
        readonly deltaTime: number;
        readonly lastTime: number;
    }
}
declare namespace Lightning {
    class State extends PIXI.Container {
        protected game: Engine;
        loader: PIXI.loaders.Loader;
        /**
         * @description State constructor
         *
         * @param {Engine} game
         */
        constructor(game: Engine);
        /**
         * @description Initalization function
         *
         * @param {Array} params
         *
         * @returns {void}
         */
        init(params: any): void;
        /**
         * @description Preload function. Used as a helper function to preload assets into the texture cache. Will skip and call the create function if there are no resources to load
         *
         * @returns {void}
         */
        preload(): void;
        /**
         * @description Create function. Called after the preload function is complete or there is nothing to preload
         *
         * @returns {void}
         */
        create(): void;
        /**
         * @description Update function. This is called by the state manager on every tick
         */
        update(): void;
        /**
         * @description Add children to this state. Helper functions should be migrated at some point
         *
         * @returns {boolean}
         */
        add(...params: Array<DisplayObject>): boolean;
        /**
         * @description Called if the loader produces an error
         *
         * @returns {void}
         */
        preloadError(err: any): void;
        /**
         * @description Called when a single file has completed loading
         *
         * @returns {void}
         */
        preloadSingle(loader: PIXI.loaders.Loader, resource: any): void;
        /**
         * @description Called when the loader has finished loading everything
         *
         * @returns {void}
         */
        preloadComplete(resources: any): void;
    }
}
declare namespace Lightning {
    class StateManager {
        protected game: Engine;
        protected _states: Array<iStateMap>;
        protected _activeStates: Array<State>;
        /**
         * @description StateManager constructor
         *
         * @param {Engine} game
         */
        constructor(game: Engine);
        /**
         * @description Update loop. Called from the game ticker and is used to call each state update function individually
         */
        update(): void;
        /**
         * @description Initalize a single state. Usually called from the start function, though this can be bypassed and a custom state injected via this function
         *
         * @param {State} state
         * @param {Array} params
         *
         * @returns {boolean}
         */
        init(state: State, ...params: any[]): boolean;
        /**
         * @description Start a state. This function is called in order to add a state to the world display list and call the init function if the state is to auto initalize
         */
        start(key: any, autoInit?: boolean, ...params: any[]): void;
        /**
         * @description Leaves the state renderable and interactive but disables it's update procedure
         *
         * @param {string} key
         *
         * @returns {boolean}
         */
        pause(key: string): boolean;
        /**
         * @description Re-enabled the state's update procedure
         *
         * @param {string} key
         *
         * @returns {boolean}
         */
        unpause(key: string): boolean;
        /**
         * TODO
         * @description Will reset the state by nullifying it and calling the constructor to re-initalize it
         */
        reset(): void;
        /**
         * @description Will remove the state from the render list and update loop. It will also set all
         * interactivity to false as well as visibility and renderable.
         * Will store it's current position in the display list incase it is to be re-enabled at the same position
         *
         * @returns {boolean}
         */
        disable(key: string): boolean;
        /**
         * @description Will re-enable a state exactly as it was before being disabled.
         * Sets all visibility, interactivity and renderable to true.
         * If last index is passed, it will use the previous position in the world display list
         * If the index is passed, it will be added to the world display list where the index is
         * If last index is false and index is null, then it will get added to the top of the world display list
         *
         * @returns {boolean}
         */
        enable(key: string, lastIndex?: boolean, index?: number): boolean;
        /**
         * @description Destroy the state entirley
         * Removes from the world children
         * Removes from the active states array
         * sets visible, renderable and all interactivity to false
         *
         * @param {string} key
         *
         * @returns {boolean}
         */
        destroy(key: string): boolean;
        /**
         * @description Adds a new state to the state StateManager
         *
         * @param {string} key
         * @param {State} state
         *
         * @returns {boolean}
         */
        add(key: string, state: State): boolean;
        /**
         * @description Adds a state to the active states array if it's not already there
         *
         * @param {State} state
         *
         * @returns {boolean}
         */
        private addToActive(state);
        /**
         * TODO
         * @description Will create a texture of the state as it currently is and apply it to the state as it's only renderable child. This could be used when large state transitions are happening and the display list gets too large and effects performance
         */
        freeze(): void;
        /**
         * @description Loop through the states array and match by key. If one is found, then the entire state map is returned
         *
         * @param {string} key
         *
         * @returns {State}
         */
        findState(key: string): iStateMap;
        /**
         * @description Loops through all active states and matches by a state
         *
         * @param {state}
         *
         * @returns {number}
         */
        findActiveIndex(state: State): number;
    }
}
declare namespace Lightning {
    class PhysicsManager {
        protected game: Engine;
        protected _active: boolean;
        private _physicsWorld;
        private _physicsWorldBounds;
        constructor(game: Engine);
        update(): void;
        startPhysics(): void;
        collideOnWorldBounds(): void;
        readonly physics: Box2D.Dynamics.b2World;
        readonly physicsWorldBounds: Box2D.Dynamics.b2BodyDef;
    }
}
declare namespace Lightning {
    class Input {
        protected game: Engine;
        private window;
        private key;
        constructor(game: Engine);
        onKeyDown(key: Event): void;
        addKey(keyCode: string, fn: Function): void;
    }
}
declare namespace Lightning {
    class DisplayObject extends PIXI.DisplayObject {
        constructor();
    }
}
declare namespace Lightning {
    class Texture extends PIXI.Texture {
    }
}
declare namespace Lightning {
    class Graphics extends PIXI.Graphics {
        constructor();
        /**
         * @param  {} ...displayObjects
         */
        add(...displayObjects: any[]): void;
    }
}
declare namespace Lightning {
    class Sprite extends PIXI.Sprite {
        protected _body: Box2D.Dynamics.b2Body;
        protected _respectPosition: boolean;
        protected _respectPositionValues: {
            x: number;
            y: number;
        };
        /**
         * @param  {PIXI.Texture=null} texture
         */
        constructor(texture?: PIXI.Texture);
        /**
         * @param  {boolean} val
         */
        enableBody(val: boolean): void;
        /**
         * @param  {number} aX
         * @param  {number=aX} aY
         * @returns void
         */
        setAnchor(aX: number, aY?: number): void;
        /**
         * @param  {number} aX
         * @param  {number=aX} aY
         * @returns void
         */
        setScale(aX: number, aY?: number): void;
        /**
         * @returns Box2D
         */
        /**
         * @param  {Box2D.Dynamics.b2Body} body
         */
        body: Box2D.Dynamics.b2Body;
        /**
         * @param  {} ...displayObjects
         */
        add(...displayObjects: any[]): void;
        enableDrag(respectPosition?: boolean): void;
        startDrag(event: PIXI.interaction.InteractionEvent): void;
        stopDrag(event: PIXI.interaction.InteractionEvent): void;
        onDrag(event: PIXI.interaction.InteractionEvent): void;
    }
}
declare namespace Lightning {
    class Group extends PIXI.Container {
        constructor();
        /**
         * @param  {} ...displayObjects
         */
        add(...displayObjects: any[]): void;
    }
}
/**
 * Order the world when created
 */
declare namespace Lightning {
    class HUD extends Group {
        protected game: Engine;
        constructor(game: Engine);
    }
}
declare namespace Lightning {
    class BitmapText extends PIXI.extras.BitmapText {
        /**
         * @description function for calculating scaling fonts
         *
         * @param {Object} game reference to the Engine instance
         * @param {number} size size of the font (in responsive pixels)
         * @param {string} font name of the font stored in resource cache
         *
         * @returns {string} concatinated string to pass directly to the PIXI.extras.BitmapText
         */
        calcFont(game: Engine, size: number, font: string): string;
    }
}
/**
 * Notes: Need to add a shaddow parameter and function.
 * This should allow the user to set parameters such is
 *
 * make a button class that has multiple states for quick dev
 */
declare namespace Lightning {
    namespace Geometry {
        /**
         * @description Draw a square
         *
         * @param {number} d dimension of the square in pixels
         *
         * @returns {Lightning.Graphics}
         */
        function Square(d: number): PIXI.Graphics;
        /**
         * @description Draw a rectangle
         *
         * @param {number} w width of the rectangle in pixels
         * @param {number} h height of the rectangle in pixels
         *
         * @returns {Lightning.Graphics}
         */
        function Rect(w: number, h: number): PIXI.Graphics;
        /**
         * @description Draw a Star (double square)
         *
         * @param {number} w width of the rectangle in pixels
         * @param {number} h height of the rectangle in pixels
         *
         * @returns {Lightning.Graphics}
         */
        function Star(w: number, h: number): PIXI.Graphics;
        /**
         * @description Draw a 3d rectangle
         *
         * @param {number} w width of the rectangle in pixels
         * @param {number} h height of the rectangle in pixels
         * @param {number} d depth of rectangle in pixels
         *
         * @returns {Lightning.Graphics}
         */
        function Rect3D(w: number, h: number, d: number): PIXI.Graphics;
        /**
         * @description Draw a circle
         *
         * @param {number} r Radius of the circle in pixels
         *
         * @returns {Lightning.Graphics}
         */
        function Circle(r: number): PIXI.Graphics;
        /**
         * @description Draw a Triangle
         *
         * @param {number} l1 Length of the first triangle side
         * @param {number} l2 Length of the second triangle side
         *
         * @returns {Lightning.Graphics}
         */
        function Triangle(l1: number, l2?: number): PIXI.Graphics;
    }
}
declare namespace Lightning {
    class HitArea extends Graphics {
        private game;
        private _texture;
        /**
         *
         * @param game
         * @returns {HitArea}
         */
        constructor(game: Engine, width: number, height: number);
        setRect(width: any, height: any): void;
        setCircle(radius: any): void;
        /**
         * @description Pass a function to be added to the click events
         * @param fnct
         */
        onClick(fnct: Function): void;
        /**
         * @description Pass a function to be added to the mouse, pointer and touch down events
         * @param fnct
         */
        down(fnct: Function): void;
        /**
         * @description Pass a function to be added to the mouse, touch and pointer up events
         * @param fnct
         */
        up(fnct: Function): void;
        /**
         * @description Pass a function to be added to the mouse, pointer and touch up outside events
         * @param fnct
         */
        upOutside(fnct: Function): void;
        /**
         * @description Pass a function to be added to the mouse and pointer over events
         * @param fnct
         */
        over(fnct: Function): void;
        /**
         * @description Pass a function to be added to the mouse and pointer out events
         * @param fnct
         */
        out(fnct: Function): void;
        /**
         * @description Pass a function to be added to the mouse and pointer move event
         * @param fnct
         */
        move(fnct: Function): void;
        /**
         * @description Pass a function to be added to the right click events
         * @param fnct
         */
        rightClick(fnct: Function): void;
        /**
         * @description Pass a function to be added to the right down events
         * @param fnct
         */
        rightDown(fnct: Function): void;
        /**
         * @description Pass a function to be added to the right up events
         * @param fnct
         */
        rightUp(fnct: Function): void;
        /**
         * @description Pass a function to be added to the right up outside events
         * @param fnct
         */
        rightUpOutside(fnct: Function): void;
        /**
         * @description Pass a function to be added to the tap event
         *
         * @param fnct
         */
        onTap(fnct: Function): void;
    }
}
declare namespace Lightning {
    class Button extends Sprite {
        protected game: Engine;
        protected _primitive: string;
        protected _hitArea: HitArea;
        /**
         * @param  {Engine} game
         * @param  {} texture=null
         */
        constructor(game: Engine, texture?: any);
        /**
         */
        initalise(): void;
        /**
         * @param  {number} aX
         * @param  {number=null} aY
         * @returns void
         */
        setAnchor(aX: number, aY?: number): void;
        /**
         * @returns HitArea
         */
        readonly hit: HitArea;
    }
}
declare namespace Lightning {
    class Particle extends Sprite {
        protected _emitter: ParticleEmitter;
        protected _velX: number;
        protected _velY: number;
        protected _gX: number;
        protected _gY: number;
        protected _alphaIncrement: number;
        protected _rotationIncrement: number;
        protected _scaleIncrement: {
            x: number;
            y: number;
        };
        protected _createdAt: number;
        protected _lifeSpan: number;
        protected _deadTime: number;
        constructor(texture: PIXI.Texture, emitter: any);
        update(): void;
        velocity: {
            x: number;
            y: number;
        };
        gravity: {
            x: number;
            y: number;
        };
        lifeSpan: number;
        alphaIncrement: number;
        rotationIncrement: number;
        scaleIncrement: {
            x: number;
            y: number;
        };
        createdAt: number;
    }
}
/**
 * Fade in / Scale in sprites - optional
 * Simple / Advanced -- for creating ultra performant particles in the 50k+ range
 */
declare namespace Lightning {
    class ParticleEmitter extends Group {
        protected game: Engine;
        protected state: State;
        protected _emit: boolean;
        protected _nextEmit: number;
        protected _interval: number;
        protected _lastStart: number;
        protected _time: number;
        protected _textures: Array<PIXI.Texture>;
        protected _respectPosition: boolean;
        protected _respectPositionValues: iPoint;
        protected _deadPool: Array<Particle>;
        protected _gravity: iPoint;
        protected _spread: iPointRange;
        protected _lifeSpanRange: iRange;
        protected _particleStrength: number;
        protected _particleScaleRange: iPointRange;
        protected _particleAlphaRange: iRange;
        protected _particleRotationRange: iRange;
        protected _particleVelocityRange: iPointRange;
        protected _particleRotationIncrement: iRange;
        protected _particleScaleIncrement: iPointRange;
        protected _particleAlphaIncrement: iRange;
        constructor(state: State, x?: number, y?: number);
        update(): void;
        /**
         * @param  {string} key
         * @param  {DisplayObject} particle
         */
        add(...params: Array<PIXI.Texture>): void;
        start(time?: number): void;
        fireEmitter(): void;
        createParticle(): void;
        stop(): void;
        returnToPool(particle: Particle): void;
        startDrag(event: PIXI.interaction.InteractionEvent): void;
        enableDrag(respectPosition?: boolean): void;
        stopDrag(event: PIXI.interaction.InteractionEvent): void;
        onDrag(event: PIXI.interaction.InteractionEvent): void;
        setSpread(xFrom: number, xTo: number, yFrom: number, yTo: number): void;
        setGravity(x: number, y?: number): void;
        setLifeSpan(from: number, to?: number): void;
        setInterval(val: number): void;
        setVelocityRange(xFrom: number, xTo: number, yFrom?: number, yTo?: number): void;
        setRotationIncrement(from: number, to?: number): void;
        setScaleIncrement(xFrom: number, xTo: number, yFrom?: number, yTo?: number): void;
        setAlphaIncrement(from: number, to?: number): void;
        setScaleRange(xFrom: number, xTo: number, yFrom?: number, yTo?: number): void;
        setAlphaRange(from: number, to?: number): void;
        setRotationRange(from: number, to?: number): void;
        setStrength(val: number): void;
        readonly alive: number;
        readonly pool: number;
    }
}
interface iTile {
    key: string;
    object: PIXI.extras.TilingSprite;
    updateX: number;
    updateY: number;
    updateRelative: number;
    index: number;
}
declare namespace Lightning {
    class Parallax extends Group {
        protected game: Engine;
        protected _tiles: Array<iTile>;
        protected _width: number;
        protected _height: number;
        protected _scrollSpeed: number;
        protected _incMultiplier: number;
        protected _watch: any;
        protected _watchX: boolean;
        protected _watchY: boolean;
        protected _watchOffset: {
            x: number;
            y: number;
        };
        protected _lastWatch: {
            x: number;
            y: number;
        };
        protected _watchIncMultiplier: {
            x: number;
            y: number;
        };
        protected _watchDampner: {
            x: number;
            y: number;
        };
        protected _referenceOffset: {
            x: number;
            y: number;
        };
        /**
         * @param  {Engine} game
         * @param  {number=null} width
         * @param  {number=null} height
         */
        constructor(game: Engine, width?: number, height?: number);
        /**
         * @param  {string} key
         * @param  {Texture} texture
         * @param  {boolean=false} xy
         */
        add(key: string, texture: Texture, xy?: boolean): void;
        /**
         *
         */
        update(): void;
        /**
         * @param  {string} key
         */
        getTile(key: string): iTile;
        /**
         * @param  {any} val
         * @returns void
         */
        setWatch(val: any, x?: boolean, y?: boolean): void;
        /**
         * @param  {number} x
         * @param  {number=x} y
         * @returns void
         */
        setWatchOffset(x: number, y?: number): void;
        /**
         * @param  {boolean=false} x
         * @param  {boolean=false} y
         */
        setWatchXY(x?: boolean, y?: boolean): void;
        /**
         * @param  {number} x
         * @param  {number=x} y
         * @returns void
         */
        setReferenceOffset(x: number, y?: number): void;
        setWatchDampner(x: number, y?: number): void;
        /**
         * @param  {string} key
         * @param  {number=0} x
         * @param  {number=0} y
         * @returns void
         */
        setUpdate(key: string, x?: number, y?: number): void;
        /**
         * @param  {number} val
         * @returns void
         */
        setScrollSpeed(val: number): void;
        /**
         * @param  {number} val
         * @param  {boolean=false} reset
         * @param  {boolean=false} xy
         * @returns void
         */
        setIncrementMultiplier(val: number, reset?: boolean, xy?: boolean): void;
        /**
         * @param  {number} x
         * @param  {number=x} y
         * @returns void
         */
        setWatchIncerementMultiplier(x: number, y?: number): void;
        /**
         * @returns number
         */
        readonly scrollSpeed: number;
    }
}
declare namespace Lightning {
    class Easing {
        none(x: number, t: number, b: number, c: number, d: number): number;
        easeInQuad(t: number, b: number, c: number, d: number): number;
        easeOutQuad(x: number, t: number, b: number, c: number, d: number): number;
        easeInOutQuad(x: number, t: number, b: number, c: number, d: number): number;
        easeInCubic(x: number, t: number, b: number, c: number, d: number): number;
        easeOutCubic(x: number, t: number, b: number, c: number, d: number): number;
        easeInOutCubic(x: number, t: number, b: number, c: number, d: number): number;
        easeInQuart(x: number, t: number, b: number, c: number, d: number): number;
        easeOutQuart(x: number, t: number, b: number, c: number, d: number): number;
        easeInOutQuart(x: number, t: number, b: number, c: number, d: number): number;
        easeInQuint(x: number, t: number, b: number, c: number, d: number): number;
        easeOutQuint(x: number, t: number, b: number, c: number, d: number): number;
        easeInOutQuint(x: number, t: number, b: number, c: number, d: number): number;
        easeInSine(x: number, t: number, b: number, c: number, d: number): number;
        easeOutSine(x: number, t: number, b: number, c: number, d: number): number;
        easeInOutSine(x: number, t: number, b: number, c: number, d: number): number;
        easeInExpo(x: number, t: number, b: number, c: number, d: number): number;
        easeOutExpo(x: number, t: number, b: number, c: number, d: number): number;
        easeInOutExpo(x: number, t: number, b: number, c: number, d: number): number;
        easeInCirc(x: number, t: number, b: number, c: number, d: number): number;
        easeOutCirc(x: number, t: number, b: number, c: number, d: number): number;
        easeInOutCirc(x: number, t: number, b: number, c: number, d: number): number;
        easeInElastic(x: number, t: number, b: number, c: number, d: number): number;
        easeOutElastic(x: number, t: number, b: number, c: number, d: number): number;
        easeInOutElastic(x: number, t: number, b: number, c: number, d: number): number;
        easeInBack(x: number, t: number, b: number, c: number, d: number, s: number): number;
        easeOutBack(x: number, t: number, b: number, c: number, d: number, s: number): number;
        easeInOutBack(x: number, t: number, b: number, c: number, d: number, s: number): number;
        easeOutBounce(x: number, t: number, b: number, c: number, d: number): number;
    }
}
declare namespace Lightning {
    class Events {
        private tween;
        private _events;
        /**
         * Construct a new event class
         * @param {Object} tween
         */
        constructor(tween: Tween);
        /**
         * Add a new event
         * @param  {string} name
         * @param  {Function} funct
         */
        add(funct: Function, functContext?: any, ...functParams: any[]): void;
        /**
         * Add an event that gets destroyed on use
         * @param  {string} name
         * @param  {Function} funct
         */
        addOnce(funct: Function, functContext?: any, ...functParams: any[]): void;
        addAtFrame(funct: Function, frame: number, functContext?: any, ...functParams: any[]): void;
        addOnceAtFrame(funct: Function, frame: number, functContext?: any, ...functParams: any[]): void;
        /**
         * When the event is triggered, fire all the functions in the events array
         */
        trigger(): void;
        /**
         * Removes an event from the array - finds the position using the findPosition function
         * @param  {string} name
         */
        remove(name: string): void;
        exists(frame: number): any;
        /**
         * Re-instanciates the events array, destroying all events
         */
        removeAll(): void;
        /**
         * Returns an event instance
         * @param  {string} ref
         */
        find(ref: string): any;
        /**
         * Returns the position of an event
         * @param  {string} ref
         */
        findPosition(ref: string): number;
    }
}
/**
 * Frame class. Defines what each frame should consist of in an animation
 */
declare namespace Lightning {
    class Frame {
        private _frameId;
        private _properties;
        private _relative;
        private _complex;
        constructor(frameId: number, relative: boolean);
        /**
         * Add another property to this frame
         */
        addProperty(property: string, val: number): void;
        frameId: number;
        properties: Array<iTweenProperty>;
        relative: boolean;
        complex: boolean;
    }
}
declare namespace Lightning {
    class Tween {
        private tweenManager;
        private _playFlag;
        private _maxFrames;
        private _currentFrame;
        private _frames;
        private _autoDestroy;
        private _isPaused;
        private _loop;
        private _loopsRemaining;
        private _deleteFlag;
        private _onStartCallbacks;
        private _onStopCallbacks;
        private _onCompleteCallbacks;
        private _onLoopCallbacks;
        private _onPauseCallbacks;
        private _onTickCallbacks;
        private _onDestroyCallbacks;
        private _onFrameCallbacks;
        constructor(parent: TweenManager);
        /**
         * Create an indivual frame at a specific position
         * @param  {number} frameId
         * @param  {number} val
         * @param  {string} property
         * @param  {boolean} relative
         */
        createFrame(frameId: number, properties: Array<any>, relative: boolean): void;
        insertFrameValues(frameId: number, property: string, relative: boolean): void;
        /**
         * Extend a frame with multiple properties
         * @param  {number} frameId
         * @param  {Array<Property>} properties
         * @param  {boolean} relative
         */
        extendFrame(frameId: number, properties: Array<iTweenProperty>, relative: boolean): void;
        /**
         * Apply the current frame properties to an object
         * @param  {Object} obj
         */
        applyUpdate(obj: Object): void;
        /**
         * Deals with the tween end logic
         */
        end(): void;
        /**
         * When the tween manager starts a new tween, the on start callbacks are triggered
         */
        onStartTrigger(): void;
        /**
         * Called when the tween is destroyed (can only be done from outside this class)
         */
        onDestroyTrigger(): void;
        onFrameTrigger(): void;
        /**
         * Called when the tween receives an update from the tween manager
         */
        onTickTrigger(): void;
        onCompleteTrigger(): void;
        /**
         * Reset the current frame to 0
         */
        reset(): void;
        start(obj: Object, loop: boolean, loops: number, autoDestroy: boolean): {
            tween: any;
            obj: Object;
        };
        /**
         * Called when the tween is looped back to the beginning
         */
        loop(): void;
        /**
         * Called by the user, or when
         */
        stop(): void;
        complete(): void;
        chain(tween: Tween): void;
        /**
         * Set the destroy flag ready for deletion on the next update
         */
        destroy(): void;
        /**
         * Pause the tween
         */
        pause(): void;
        /**
         * Remove a frame from the frames array
         */
        removeFrame(frame: number, length?: number): void;
        /**
         *
         * @returns {boolean}
         */
        readonly hasStarted: boolean;
        /**
         * Calculates if the tween has been finished
         * @returns {boolean}
         */
        readonly hasFinished: boolean;
        /**
         * Returns the current frame number
         * @returns {number}
         */
        /**
         * set the current frame number
         * @param {number} val
         */
        currentFrame: number;
        /**
         * Return the maximum number of frames in this tween (not taking into account loops)
         * @returns {number}
         */
        readonly maxFrames: number;
        /**
         * Returns an array of the tween frames
         */
        readonly frames: Array<Frame>;
        /**
         * Returns if the tween is to auto destroy on completion
         * @returns {boolean}
         */
        /**
         * Sets the auto destroy flag
         * @param value
         */
        autoDestroy: boolean;
        /**
         * Returns true if the tween is in a paused state
         * @returns {boolean}
         */
        readonly isPaused: boolean;
        /**
         * Returns true if looping is enabled
         * @returns {boolean}
         */
        /**
         * Set the looping enabled
         * @param value
         */
        looping: boolean;
        /**
         * Returns the number of loops remaining
         * @returns {number}
         */
        /**
         * Set the number of loops remaining
         * @param value
         */
        loopsRemaining: number;
        /**
         * Returns true if the tween is ready to be deleted
         * @returns {boolean}
         */
        readonly deleteFlag: boolean;
        playFlag: boolean;
        frame: number;
        readonly events: Object;
    }
}
declare namespace Lightning {
    class TweenManager {
        private game;
        private _tweens;
        private _events;
        private _running;
        private _easing;
        constructor(game: any);
        /**
         * Makes a new instance of a tween
         * @param name
         * @returns {any}
         */
        newTween(name: string): any;
        /**
         * Create a new tween
         * @param name
         * @param property
         * @param from
         * @param to
         * @param time
         * @param easing
         */
        create(name: string, props: Array<any>): any;
        /**
         * Create an tween array with no tween data
         * @param name
         */
        createEmpty(name: string): any;
        /**
         * Calculate the frames in an tween
         * @param tween
         * @param property
         * @param from
         * @param to
         * @param time
         * @param easing
         */
        calculateFrames(tween: Tween, props: any): void;
        /**
         * Add a custom frame to the tween sequence
         * @param name
         * @param position
         * @param data
         */
        addFrame(name: string, position: number, data: Array<any>): void;
        /**
         * Combine 2 tween sequences together
         * @param name1
         * @param name2
         * @param position if -1 tween will chain at the end
         * @param destroyOriginals remove the original tweens after building the new one
         */
        extend(newName: string, tweens: Array<string>, position: number, destroyOriginals: boolean): any;
        /**
         * Start a tween. Keeps the original safe and clones the object
         * @param obj object to be tweened
         * @param name name of the tween
         * @param loop if loops are enabled
         * @param loops number of times to loop
         * @param autoDestroy if is to auto destroy
         */
        start(obj: Object, name: string, loop: boolean, loops: number, autoDestroy: boolean): {
            tween: any;
            obj: Object;
        };
        /**
         * Start a tween. Keeps the original safe and clones the object
         * @param obj object to be tweened
         * @param name name of the tween
         * @param loop if loops are enabled
         * @param loops number of times to loop
         * @param autoDestroy if is to auto destroy
         */
        startDirect(obj: Object, tween: Tween, loop: boolean, loops: number, autoDestroy: boolean): {
            tween: any;
            obj: Object;
        };
        /**
         * @param {string} name - Returns a deep cloned object of the requested tween
         */
        clone(name: string): any;
        /**
         * Clones a tween object
         */
        cloneObj(obj: any): any;
        /**
         * Clone object properties
         */
        copyObjectProps(objFrom: any, objTo: any): void;
        /**
         * Call the object constructor, or initalise a new one
         */
        cloneEmptyObject(o: any): any;
        /**
         * Check on the object type
         */
        isPlainObject(o: any): boolean;
        /**
         * Gets called every request frame update
         * If there are
         */
        update(): void;
        /**
         * @param {string} name
         * @param {boolean} cached
         */
        remove(name: string, cached?: boolean): void;
        /**
         * Return the tween by name
         * @param {string} name
         */
        getTween(name: string): any;
        /**
         * Shorter naming for retreiving a tween
         */
        find(name: string): Tween;
        /**
         * Provides access to Robert Penner's easing equations
         */
        readonly easing: Easing;
        /**
         * Give access to the events class
         */
        readonly events: Events;
    }
}
declare namespace Lightning.Signals {
    /**
     *	@desc       A TypeScript conversion of JS Signals by Miller Medeiros
    *               Released under the MIT license
    *				http://millermedeiros.github.com/js-signals/
    *
    *	@version	1.0 - 7th March 2013
    *
    *	@author 	Richard Davey, TypeScript conversion
    *	@author		Miller Medeiros, JS Signals
    *	@author		Robert Penner, AS Signals
    *
    *	@url		http://www.photonstorm.com
    */
    /**
     * Custom event broadcaster
     * <br />- inspired by Robert Penner's AS3 Signals.
     * @name Signal
     * @author Miller Medeiros
     * @constructor
     */
    class Signal {
        /**
         * @property _bindings
         * @type Array
         * @private
         */
        private _bindings;
        /**
         * @property _prevParams
         * @type Any
         * @private
         */
        private _prevParams;
        /**
         * Signals Version Number
         * @property VERSION
         * @type String
         * @const
         */
        static VERSION: string;
        /**
         * If Signal should keep record of previously dispatched parameters and
         * automatically execute listener during `add()`/`addOnce()` if Signal was
         * already dispatched before.
         * @type boolean
         */
        memorize: boolean;
        /**
         * @type boolean
         * @private
         */
        private _shouldPropagate;
        /**
         * If Signal is active and should broadcast events.
         * <p><strong>IMPORTANT:</strong> Setting this property during a dispatch will only affect the next dispatch, if you want to stop the propagation of a signal use `halt()` instead.</p>
         * @type boolean
         */
        active: boolean;
        /**
         * @method validateListener
         * @param {Any} listener
         * @param {Any} fnName
         */
        validateListener(listener: any, fnName: any): void;
        /**
         * @param {Function} listener
         * @param {boolean} isOnce
         * @param {Object} [listenerContext]
         * @param {Number} [priority]
         * @return {SignalBinding}
         * @private
         */
        private _registerListener(listener, isOnce, listenerContext, priority);
        /**
         * @method _addBinding
         * @param {SignalBinding} binding
         * @private
         */
        private _addBinding(binding);
        /**
         * @method _indexOfListener
         * @param {Function} listener
         * @return {number}
         * @private
         */
        private _indexOfListener(listener, context);
        /**
         * Check if listener was attached to Signal.
         * @param {Function} listener
         * @param {Object} [context]
         * @return {boolean} if Signal has the specified listener.
         */
        has(listener: any, context?: any): boolean;
        /**
         * Add a listener to the signal.
         * @param {Function} listener Signal handler function.
         * @param {Object} [listenerContext] Context on which listener will be executed (object that should represent the `this` variable inside listener function).
         * @param {Number} [priority] The priority level of the event listener. Listeners with higher priority will be executed before listeners with lower priority. Listeners with same priority level will be executed at the same order as they were added. (default = 0)
         * @return {SignalBinding} An Object representing the binding between the Signal and listener.
         */
        add(listener: any, listenerContext?: any, priority?: number): SignalBinding;
        /**
         * Add listener to the signal that should be removed after first execution (will be executed only once).
         * @param {Function} listener Signal handler function.
         * @param {Object} [listenerContext] Context on which listener will be executed (object that should represent the `this` variable inside listener function).
         * @param {Number} [priority] The priority level of the event listener. Listeners with higher priority will be executed before listeners with lower priority. Listeners with same priority level will be executed at the same order as they were added. (default = 0)
         * @return {SignalBinding} An Object representing the binding between the Signal and listener.
         */
        addOnce(listener: any, listenerContext?: any, priority?: number): SignalBinding;
        /**
         * Remove a single listener from the dispatch queue.
         * @param {Function} listener Handler function that should be removed.
         * @param {Object} [context] Execution context (since you can add the same handler multiple times if executing in a different context).
         * @return {Function} Listener handler function.
         */
        remove(listener: any, context?: any): any;
        /**
         * Remove all listeners from the Signal.
         */
        removeAll(): void;
        /**
         * @return {number} Number of listeners attached to the Signal.
         */
        getNumListeners(): number;
        /**
         * Stop propagation of the event, blocking the dispatch to next listeners on the queue.
         * <p><strong>IMPORTANT:</strong> should be called only during signal dispatch, calling it before/after dispatch won't affect signal broadcast.</p>
         * @see Signal.prototype.disable
         */
        halt(): void;
        /**
         * Dispatch/Broadcast Signal to all listeners added to the queue.
         * @param {...*} [params] Parameters that should be passed to each handler.
         */
        dispatch(...paramsArr: any[]): void;
        /**
         * Forget memorized arguments.
         * @see Signal.memorize
         */
        forget(): void;
        /**
         * Remove all bindings from signal and destroy any reference to external objects (destroy Signal object).
         * <p><strong>IMPORTANT:</strong> calling any method on the signal instance after calling dispose will throw errors.</p>
         */
        dispose(): void;
        /**
         * @return {string} String representation of the object.
         */
        toString(): string;
    }
}
declare namespace Lightning.Signals {
    class SignalBinding {
        /**
         * Object that represents a binding between a Signal and a listener function.
         * <br />- <strong>This is an internal constructor and shouldn't be called by regular users.</strong>
         * <br />- inspired by Joa Ebert AS3 SignalBinding and Robert Penner's Slot classes.
         * @author Miller Medeiros
         * @constructor
         * @internal
         * @name SignalBinding
         * @param {Signal} signal Reference to Signal object tha
         * listener is currently bound to.
         * @param {Function} listener Handler function bound to the signal.
         * @param {boolean} isOnce If binding should be executed just once.
         * @param {Object} [listenerContext] Context on which listener will be executed (object that should represent the `this` variable inside listener function).
         * @param {Number} [priority] The priority level of the event listener. (default = 0).
         */
        constructor(signal: Signal, listener: any, isOnce: boolean, listenerContext: any, priority?: number);
        /**
         * Handler function bound to the signal.
         * @type Function
         * @private
         */
        private _listener;
        /**
         * If binding should be executed just once.
         * @type boolean
         * @private
         */
        private _isOnce;
        /**
         * Context on which listener will be executed (object that should represent the `this` variable inside listener function).
         * @memberOf SignalBinding.prototype
         * @name context
         * @type Object|undefined|null
         */
        context: any;
        /**
         * Reference to Signal object that listener is currently bound to.
         * @type Signal
         * @private
         */
        private _signal;
        /**
         * Listener priority
         * @type Number
         */
        priority: number;
        /**
         * If binding is active and should be executed.
         * @type boolean
         */
        active: boolean;
        /**
         * Default parameters passed to listener during `Signal.dispatch` and `SignalBinding.execute`. (curried parameters)
         * @type Array|null
         */
        params: any;
        /**
         * Call listener passing arbitrary parameters.
         * <p>If binding was added using `Signal.addOnce()` it will be automatically removed from signal dispatch queue, this method is used internally for the signal dispatch.</p>
         * @param {Array} [paramsArr] Array of parameters that should be passed to the listener
         * @return {*} Value returned by the listener.
         */
        execute(paramsArr?: any[]): any;
        /**
         * Detach binding from signal.
         * - alias to: mySignal.remove(myBinding.getListener());
         * @return {Function|null} Handler function bound to the signal or `null` if binding was previously detached.
         */
        detach(): any;
        /**
         * @return {Boolean} `true` if binding is still bound to the signal and have a listener.
         */
        isBound(): boolean;
        /**
         * @return {boolean} If SignalBinding will only be executed once.
         */
        isOnce(): boolean;
        /**
         * @return {Function} Handler function bound to the signal.
         */
        getListener(): any;
        /**
         * @return {Signal} Signal that listener is currently bound to.
         */
        getSignal(): Signal;
        /**
         * Delete instance properties
         * @private
         */
        _destroy(): void;
        /**
         * @return {string} String representation of the object.
         */
        toString(): string;
    }
}
declare namespace Lightning.Signals {
    /**
     * Signal Manager class for storing, manipulating and general management of signals throughout the game
     */
    class SignalManager {
        private game;
        private _signals;
        /**
         * @description Signal Manager constructor
         *
         * @param {engine} game
         */
        constructor(game: Engine);
        /**
         * @description Create a new signal
         *
         * @param {string} key
         *
         * @returns {Signal}
         */
        create(key: string): Signal;
        /**
         * @description Add a function to a signal
         *
         * @param {string} key
         * @param {function} fn
         * @param {Object} listenerContext
         *
         * @returns {boolean}
         */
        add(key: string, fn: Function, listenerContext?: Object): boolean;
        /**
         * @description Add a function to a signal only once
         *
         * @param {string} key
         * @param {function} fn
         * @param {Object} listenerContext
         *
         * @returns {boolean}
         */
        addOnce(key: string, fn: Function, listenerContext: Object): boolean;
        /**
         * @description Destroy the signal
         * @param {string} key
         *
         * @returns {boolean§}
         */
        destroy(key: string): boolean;
        /**
         * @description Change the active property on a signal
         *
         * @param {string} key
         * @param {boolean} active
         *
         * @returns {boolean}
         */
        active(key: string, active: boolean): boolean;
        /**
         * @description dispatch a signal and pass parameters
         *
         * @param {string} key
         * @param {Array} params
         */
        dispatch(key: string, ...params: any[]): boolean;
        /**
         * @description Returns a signal if it exists, else it will return null
         *
         * @param {srting} key
         *
         * @returns {Signal}
         */
        signal(key: string): Signal;
        /**
         * @description Return true if the signal is created, else return false
         *
         * @param {string} name
         *
         * @return {boolean}
         */
        has(name: string): boolean;
    }
}
declare namespace Lightning {
    class Engine extends EngineHelper {
        protected _renderer: PIXI.WebGLRenderer | PIXI.CanvasRenderer;
        protected _world: PIXI.Container;
        protected _hud: HUD;
        protected _ticker: PIXI.ticker.Ticker;
        protected _tweens: TweenManager;
        protected _signals: Signals.SignalManager;
        protected _stateManager: StateManager;
        protected _physicsManager: PhysicsManager;
        /**
         * @description Engine constructor
         *
         * @param {number} width
         * @param {number} height
         * @param {string} canvasId
         */
        constructor(width: any, height: any, canvasId?: string);
        /**
         * @description Main entry for every update function. This is called by the ticker on every request frame update
         *
         * @param {number} time
         *
         * @returns {void}
         */
        update(time: any): void;
        /**
         * @description Start the ticker
         *
         * @returns {boolean}
         */
        start(): boolean;
        /**
         * @description Stop the ticker
         *
         * @returns {boolean}
         */
        stop(): boolean;
    }
}

// Generated by typings
// Source: custom_typings/pixi.js/index.d.ts
declare module PIXI {

    // from CONST
    export var VERSION: typeof CONST.VERSION;
    export var PI_2: typeof CONST.PI_2;
    export var RAD_TO_DEG: typeof CONST.RAD_TO_DEG;
    export var DEG_TO_RAD: typeof CONST.DEG_TO_RAD;
    export var RENDERER_TYPE: typeof CONST.RENDERER_TYPE;
    export var BLEND_MODES: typeof CONST.BLEND_MODES;
    export var DRAW_MODES: typeof CONST.DRAW_MODES;
    export var SCALE_MODES: typeof CONST.SCALE_MODES;
    export var WRAP_MODES: typeof CONST.WRAP_MODES;
    export var TRANSFORM_MODE: typeof CONST.TRANSFORM_MODE;
    export var PRECISION: typeof CONST.PRECISION;
    export var TEXT_STYLE_CHANGED: typeof CONST.TEXT_STYLE_CHANGED;
    export var GC_MODES: typeof CONST.GC_MODES;
    export var SHAPES: typeof CONST.SHAPES;
    export var TEXT_GRADIENT: typeof CONST.TEXT_GRADIENT;

    export function autoDetectRenderer(width: number, height: number, options?: PIXI.IRendererOptions, noWebGL?: boolean): PIXI.WebGLRenderer | PIXI.CanvasRenderer;
    export var loader: PIXI.loaders.Loader;

    //////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////SETTINGS///////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////

    export module settings {
        export var TARGET_FPMS: number;
        export var MIPMAP_TEXTURES: boolean;
        export var RESOLUTION: number;
        export var FILTER_RESOLUTION: number;
        export var SPRITE_MAX_TEXTURES: number;
        export var SPRITE_BATCH_SIZE: number;
        export var RETINA_PREFIX: RegExp;
        export var RENDER_OPTIONS: {
            view: HTMLCanvasElement,
            antialias: boolean,
            forceFXAA: boolean,
            autoResize: boolean,
            transparent: boolean,
            backgroundColor: number,
            clearBeforeRender: boolean,
            preserveDrawingBuffer: boolean,
            roundPixels: boolean
        };
        export var TRANSFORM_MODE: number;
        export var GC_MODE: number;
        export var GC_MAX_IDLE: number;
        export var GC_MAX_CHECK_COUNT: number;
        export var WRAP_MODE: number;
        export var SCALE_MODE: number;
        export var PRECISION: string;
        export var UPLOADS_PER_FRAME: number;
        export var CAN_UPLOAD_SAME_BUFFER: boolean;
    }

    //////////////////////////////////////////////////////////////////////////////
    /////////////////////////////ACCESSIBILITY////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////

    export module accessibility {

        // accessibility
        export class AccessibilityManager {

            constructor(renderer: CanvasRenderer | WebGLRenderer);

            protected div: HTMLElement;
            protected pool: HTMLElement[];
            protected renderId: number;
            debug: boolean;
            renderer: SystemRenderer;
            protected children: IAccessibleTarget[];
            protected isActive: boolean;

            protected activate(): void;
            protected deactivate(): void;
            protected updateAccessibleObjects(displayObject: DisplayObject): void;
            protected update(): void;
            protected capHitArea(hitArea: IHitArea): void;
            protected addChild(displayObject: DisplayObject): void;
            protected _onClick(e: interaction.InteractionEvent): void;
            protected _onFocus(e: interaction.InteractionEvent): void;
            protected _onFocusOut(e: interaction.InteractionEvent): void;
            protected _onKeyDown(e: interaction.InteractionEvent): void;
            protected _onMouseMove(): void;

            destroy(): void;

        }
        export interface IAccessibleTarget {

            accessible: boolean;
            accessibleTitle: string;
            accessibleHint: string;
            tabIndex: number;

        }

    }

    //////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////CORE//////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////

    // const

    export module CONST {
        export var VERSION: string;
        export var PI_2: number;
        export var RAD_TO_DEG: number;
        export var DEG_TO_RAD: number;
        export var TARGET_FPMS: number;
        export var RENDERER_TYPE: {
            UNKNOWN: number;
            WEBGL: number;
            CANVAS: number;
        };
        export var BLEND_MODES: {
            NORMAL: number;
            ADD: number;
            MULTIPLY: number;
            SCREEN: number;
            OVERLAY: number;
            DARKEN: number;
            LIGHTEN: number;
            COLOR_DODGE: number;
            COLOR_BURN: number;
            HARD_LIGHT: number;
            SOFT_LIGHT: number;
            DIFFERENCE: number;
            EXCLUSION: number;
            HUE: number;
            SATURATION: number;
            COLOR: number;
            LUMINOSITY: number;
        };
        export var DRAW_MODES: {
            POINTS: number;
            LINES: number;
            LINE_LOOP: number;
            LINE_STRIP: number;
            TRIANGLES: number;
            TRIANGLE_STRIP: number;
            TRIANGLE_FAN: number;
        };
        export var SCALE_MODES: {
            LINEAR: number,
            NEAREST: number
        };
        export var GC_MODES: {
            AUTO: number;
            MANUAL: number;
        };
        export var WRAP_MODES: {
            CLAMP: number;
            MIRRORED_REPEAT: number;
            REPEAT: number;
        };
        export var TRANSFORM_MODE: {
            DEFAULT: number;
            DYNAMIC: number;
            STATIC: number;
        };
        export var URL_FILE_EXTENSION: RegExp | string;
        export var DATA_URI: RegExp | string;
        export var SVG_SIZE: RegExp | string;
        export var SHAPES: {
            POLY: number;
            RECT: number;
            CIRC: number;
            ELIP: number;
            RREC: number;
        };
        export var PRECISION: {
            LOW: string;
            MEDIUM: string;
            HIGH: string;
        };
        export var TEXT_GRADIENT: {
            LINEAR_VERTICAL: number;
            LINEAR_HORIZONTAL: number;
        };
        export var TEXT_STYLE_CHANGED: string;

    }

    // display

    export interface IApplicationOptions {

        view?: HTMLCanvasElement;
        transparent?: boolean;
        antialias?: boolean;
        preserveDrawingBuffer?: boolean;
        resolution?: number;
    }

    export class Application {

        constructor(width?: number, height?: number, options?: IApplicationOptions, noWebGL?: boolean);

        renderer: PIXI.WebGLRenderer | PIXI.CanvasRenderer;
        stage: Container;
        ticker: ticker.Ticker;

        stop(): void;
        start(): void;
        render(): void;
        destroy(removeView?: boolean): void;
        readonly view: HTMLCanvasElement;

    }

    export interface IDestroyOptions {
        children?: boolean;
        texture?: boolean;
        baseTexture?: boolean;
    }
    export class Bounds {

        minX: number;
        minY: number;
        maxX: number;
        maxY: number;
        rect: Rectangle;

        isEmpty(): boolean;
        clear(): void;

        getRectangle(rect?: Rectangle): Rectangle;
        addPoint(point: Point): void;
        addQuad(vertices: number[]): Bounds;
        addFrame(transform: Transform, x0: number, y0: number, x1: number, y1: number): void;
        addVertices(transform: Transform, vertices: number[], beginOffset: number, endOffset: number): void;
        addBounds(bounds: Bounds): void;
        addBoundsMask(bounds: Bounds, mask: Bounds): void;
        addBoundsArea(bounds: Bounds, area: Rectangle): void;

    }
    export class Container extends DisplayObject {

        // begin extras.getChildByName
        getChildByName(name: string): DisplayObject;
        // end extras.getChildByName

        children: DisplayObject[];
        width: number;
        height: number;

        protected onChildrenChange: (...args: any[]) => void;
        addChild<T extends DisplayObject>(child: T, ...additionalChildren: DisplayObject[]): T;
        addChildAt<T extends DisplayObject>(child: T, index: number): T;
        swapChildren(child: DisplayObject, child2: DisplayObject): void;
        getChildIndex(child: DisplayObject): number;
        setChildIndex(child: DisplayObject, index: number): void;
        getChildAt(index: number): DisplayObject;
        removeChild(child: DisplayObject): DisplayObject;
        removeChildAt(index: number): DisplayObject;
        removeChildren(beginIndex?: number, endIndex?: number): DisplayObject[];
        updateTransform(): void;
        calculateBounds(): void;
        protected _calculateBounds(): void;
        protected containerUpdateTransform(): void;
        renderWebGL(renderer: WebGLRenderer): void;
        renderAdvancedWebGL(renderer: WebGLRenderer): void;
        protected _renderWebGL(renderer: WebGLRenderer): void;
        protected _renderCanvas(renderer: CanvasRenderer): void;
        renderCanvas(renderer: CanvasRenderer): void;
        destroy(options?: IDestroyOptions | boolean): void;

        once(event: "added", fn: (displayObject: DisplayObject) => void, context?: any): utils.EventEmitter;
        once(event: "removed", fn: (DisplayObject: DisplayObject) => void, context?: any): utils.EventEmitter;
        once(event: string, fn: Function, context?: any): utils.EventEmitter;
        on(event: "added", fn: (displayObject: DisplayObject) => void, context?: any): utils.EventEmitter;
        on(event: "removed", fn: (DisplayObject: DisplayObject) => void, context?: any): utils.EventEmitter;
        on(event: string, fn: Function, context?: any): utils.EventEmitter;
        off(event: string, fn: Function, context?: any): utils.EventEmitter;

    }
    export class DisplayObject extends utils.EventEmitter implements interaction.InteractiveTarget {

        // begin extras.cacheAsBitmap
        protected _cacheAsBitmap: boolean;
        protected _cacheData: boolean;
        cacheAsBitmap: boolean;
        protected _renderCachedWebGL(renderer: WebGLRenderer): void;
        protected _initCachedDisplayObject(renderer: WebGLRenderer): void;
        protected _renderCachedCanvas(renderer: CanvasRenderer): void;
        protected _initCachedDisplayObjectCanvas(renderer: CanvasRenderer): void;
        protected _calculateCachedBounds(): Rectangle;
        protected _getCachedLocalBounds(): Rectangle;
        protected _destroyCachedDisplayObject(): void;
        protected _cacheAsBitmapDestroy(): void;
        // end extras.cacheAsBitmap

        // begin extras.getChildByName
        name: string;
        // end extras.getChildByName

        // begin extras.getGlobalPosition
        getGlobalPosition(point?: Point, skipUpdate?: boolean): Point;
        // end extras.getGlobalPosition

        // begin accessible target
        accessible: boolean;
        accessibleTitle: string;
        accessibleHint: string;
        tabIndex: number;
        // end accessible target

        // begin interactive target
        interactive: boolean;
        buttonMode: boolean;
        hitArea: IHitArea;
        interactiveChildren: boolean;
        defaultCursor: string;
        _isRightDown: boolean;
        _isLeftDown: boolean;
        // end interactive target

        transform: TransformBase;
        alpha: number;
        visible: boolean;
        renderable: boolean;
        parent: Container;
        worldAlpha: number;
        filterArea: Rectangle;
        protected _filters: Filter[];
        protected _enabledFilters: Filter[];
        protected _bounds: Bounds;
        protected _boundsID: number;
        protected _lastBoundsID: number;
        protected _boundsRect: Rectangle;
        protected _localBoundsRect: Rectangle;
        protected _mask: PIXI.Graphics | PIXI.Sprite;
        x: number;
        y: number;
        worldTransform: Matrix;
        localTransform: Matrix;
        position: Point;
        scale: Point;
        pivot: Point;
        skew: Point;
        rotation: number;
        worldVisible: boolean;
        mask: PIXI.Graphics | PIXI.Sprite;
        filters: Filter[];

        updateTransform(): void;
        protected displayObjectUpdateTransform(): void;
        protected _recursivePostUpdateTransform(): void;
        getBounds(skipUpdate?: boolean, rect?: Rectangle): Rectangle;
        getLocalBounds(rect?: Rectangle): Rectangle;
        toGlobal(position: Point, point?: Point, skipUpdate?: boolean): Point;
        toLocal(position: Point, from?: DisplayObject, point?: Point, skipUpdate?: boolean): Point;
        protected renderWebGL(renderer: WebGLRenderer): void;
        renderCanvas(renderer: CanvasRenderer): void;
        setParent(container: Container): Container;
        setTransform(x?: number, y?: number, scaleX?: number, scaleY?: number, rotation?: number, skewX?: number, skewY?: number, pivotX?: number, pivotY?: number): DisplayObject;
        destroy(): void;

        on(event: string, fn: Function, context?: any): utils.EventEmitter;
        once(event: string, fn: Function, context?: any): utils.EventEmitter;
        off(event: string, fn: Function, context?: any): utils.EventEmitter;

        /*
         on(event: 'click', fn: (event: interaction.InteractionEvent) => void, context?: any): utils.EventEmitter;
         on(event: 'mousedown', fn: (event: interaction.InteractionEvent) => void, context?: any): utils.EventEmitter;
         on(event: 'mouseout', fn: (event: interaction.InteractionEvent) => void, context?: any): utils.EventEmitter;
         on(event: 'mouseover', fn: (event: interaction.InteractionEvent) => void, context?: any): utils.EventEmitter;
         on(event: 'mouseup', fn: (event: interaction.InteractionEvent) => void, context?: any): utils.EventEmitter;
         on(event: 'mouseclick', fn: (event: interaction.InteractionEvent) => void, context?: any): utils.EventEmitter;
         on(event: 'mouseupoutside', fn: (event: interaction.InteractionEvent) => void, context?: any): utils.EventEmitter;
         on(event: 'rightclick', fn: (event: interaction.InteractionEvent) => void, context?: any): utils.EventEmitter;
         on(event: 'rightdown', fn: (event: interaction.InteractionEvent) => void, context?: any): utils.EventEmitter;
         on(event: 'rightup', fn: (event: interaction.InteractionEvent) => void, context?: any): utils.EventEmitter;
         on(event: 'rightupoutside', fn: (event: interaction.InteractionEvent) => void, context?: any): utils.EventEmitter;
         on(event: 'tap', fn: (event: interaction.InteractionEvent) => void, context?: any): utils.EventEmitter;
         on(event: 'touchend', fn: (event: interaction.InteractionEvent) => void, context?: any): utils.EventEmitter;
         on(event: 'touchendoutside', fn: (event: interaction.InteractionEvent) => void, context?: any): utils.EventEmitter;
         on(event: 'touchmove', fn: (event: interaction.InteractionEvent) => void, context?: any): utils.EventEmitter;
         on(event: 'touchstart', fn: (event: interaction.InteractionEvent) => void, context?: any): utils.EventEmitter;

         once(event: 'click', fn: (event: interaction.InteractionEvent) => void, context?: any): utils.EventEmitter;
         once(event: 'mousedown', fn: (event: interaction.InteractionEvent) => void, context?: any): utils.EventEmitter;
         once(event: 'mouseout', fn: (event: interaction.InteractionEvent) => void, context?: any): utils.EventEmitter;
         once(event: 'mouseover', fn: (event: interaction.InteractionEvent) => void, context?: any): utils.EventEmitter;
         once(event: 'mouseup', fn: (event: interaction.InteractionEvent) => void, context?: any): utils.EventEmitter;
         once(event: 'mouseclick', fn: (event: interaction.InteractionEvent) => void, context?: any): utils.EventEmitter;
         once(event: 'mouseupoutside', fn: (event: interaction.InteractionEvent) => void, context?: any): utils.EventEmitter;
         once(event: 'rightclick', fn: (event: interaction.InteractionEvent) => void, context?: any): utils.EventEmitter;
         once(event: 'rightdown', fn: (event: interaction.InteractionEvent) => void, context?: any): utils.EventEmitter;
         once(event: 'rightup', fn: (event: interaction.InteractionEvent) => void, context?: any): utils.EventEmitter;
         once(event: 'rightupoutside', fn: (event: interaction.InteractionEvent) => void, context?: any): utils.EventEmitter;
         once(event: 'tap', fn: (event: interaction.InteractionEvent) => void, context?: any): utils.EventEmitter;
         once(event: 'touchend', fn: (event: interaction.InteractionEvent) => void, context?: any): utils.EventEmitter;
         once(event: 'touchendoutside', fn: (event: interaction.InteractionEvent) => void, context?: any): utils.EventEmitter;
         once(event: 'touchmove', fn: (event: interaction.InteractionEvent) => void, context?: any): utils.EventEmitter;
         once(event: 'touchstart', fn: (event: interaction.InteractionEvent) => void, context?: any): utils.EventEmitter;
         */

    }

    export class TransformBase {

        static IDENTITY: TransformBase;

        worldTransform: Matrix;
        localTransform: Matrix;
        protected _worldID: number;
        updateLocalTransform(): void;
        updateTransform(parentTransform: TransformBase): void;
        updateWorldTransform(parentTransform: TransformBase): void;

    }
    export class TransformStatic extends TransformBase {

        position: ObservablePoint;
        scale: ObservablePoint;
        pivot: ObservablePoint;
        skew: ObservablePoint;

        protected _rotation: number;
        protected _sr: number;
        protected _cr: number;
        protected _cy: number;
        protected _sy: number;
        protected _nsx: number;
        protected _cx: number;
        protected _currentLocalID: number;

        protected onChange(): void;
        updateSkew(): void;
        updateLocalTransform(): void;
        updateTransform(parentTransform: TransformBase): void;
        setFromMatrix(matrix: Matrix): void;

        rotation: number;

    }
    export class Transform extends TransformBase {

        constructor();

        position: Point;
        scale: Point;
        skew: ObservablePoint;
        pivot: Point;

        protected _rotation: number;
        protected _sr: number;
        protected _cr: number;
        protected _cy: number;
        protected _sy: number;
        protected _nsx: number;
        protected _cx: number;

        updateSkew(): void;
        setFromMatrix(matrix: Matrix): void;

        rotation: number;

    }

    // graphics

    export class GraphicsData {

        constructor(lineWidth: number, lineColor: number, lineAlpha: number, fillColor: number, fillAlpha: number, fill: boolean, shape: IShape | Circle | Rectangle | RoundedRectangle | Ellipse | Polygon);

        lineWidth: number;
        lineColor: number;
        lineAlpha: number;
        protected _lineTint: number;
        fillColor: number;
        fillAlpha: number;
        protected _fillTint: number;
        fill: boolean;
        protected holes: IShape[];
        shape: IShape | Circle | Rectangle | RoundedRectangle | Ellipse | Polygon;
        type: number;
        clone(): GraphicsData;
        addHole(shape: IShape | Circle | Rectangle | RoundedRectangle | Ellipse | Polygon): void;
        destroy(options?: IDestroyOptions | boolean): void;

    }
    export class Graphics extends Container {

        fillAlpha: number;
        lineWidth: number;
        lineColor: number;
        protected graphicsData: GraphicsData[];
        tint: number;
        protected _prevTint: number;
        blendMode: number;
        currentPath: GraphicsData;
        protected _webGL: any;
        isMask: boolean;
        boundsPadding: number;
        protected _localBounds: Bounds;
        dirty: boolean;
        fastRectDirty: number;
        clearDirty: number;
        boundsDirty: number;
        protected cachedSpriteDirty: boolean;
        protected _spriteRect: Rectangle;
        protected _fastRect: boolean;

        static _SPRITE_TEXTURE: Texture;

        clone(): Graphics;
        lineStyle(lineWidth?: number, color?: number, alpha?: number): Graphics;
        moveTo(x: number, y: number): Graphics;
        lineTo(x: number, y: number): Graphics;
        quadraticCurveTo(cpX: number, cpY: number, toX: number, toY: number): Graphics;
        bezierCurveTo(cpX: number, cpY: number, cpX2: number, cpY2: number, toX: number, toY: number): Graphics;
        arcTo(x1: number, y1: number, x2: number, y2: number, radius: number): Graphics;
        arc(cx: number, cy: number, radius: number, startAngle: number, endAngle: number, anticlockwise?: boolean): Graphics;
        beginFill(color: number, alpha?: number): Graphics;
        endFill(): Graphics;
        drawRect(x: number, y: number, width: number, height: number): Graphics;
        drawRoundedRect(x: number, y: number, width: number, height: number, radius: number): Graphics;
        drawCircle(x: number, y: number, radius: number): Graphics;
        drawEllipse(x: number, y: number, width: number, height: number): Graphics;
        drawPolygon(path: number[] | Point[]): Graphics;
        clear(): Graphics;
        isFastRect(): boolean;
        protected _renderCanvas(renderer: CanvasRenderer): void;
        protected _calculateBounds(): Rectangle;
        protected _renderSpriteRect(renderer: PIXI.SystemRenderer): void;
        containsPoint(point: Point): boolean;
        updateLocalBounds(): void;
        drawShape(shape: IShape | Circle | Rectangle | Ellipse | Polygon | RoundedRectangle): GraphicsData;
        generateCanvasTexture(scaleMode?: number, resolution?: number): Texture;
        protected closePath(): Graphics;
        protected addHole(): Graphics;
        destroy(options?: IDestroyOptions | boolean): void;

    }
    export class CanvasGraphicsRenderer {

        constructor(renderer: SystemRenderer);
        render(graphics: Graphics): void;
        protected updateGraphicsTint(graphics: Graphics): void;
        protected renderPolygon(points: Point[], close: boolean, context: CanvasRenderingContext2D): void;
        destroy(): void;

    }
    export class GraphicsRenderer extends ObjectRenderer {

        constructor(renderer: PIXI.CanvasRenderer);

        protected graphicsDataPool: GraphicsData[];
        protected primitiveShader: PrimitiveShader;
        gl: WebGLRenderingContext;

        CONTEXT_UID: number;

        destroy(): void;
        render(graphics: Graphics): void;
        protected updateGraphics(graphics: PIXI.Graphics): void;
        getWebGLData(webGL: WebGLRenderingContext, type: number): WebGLGraphicsData;

    }
    export class WebGLGraphicsData {

        constructor(gl: WebGLRenderingContext, shader: glCore.GLShader, attribsState: glCore.IAttribState);

        gl: WebGLRenderingContext;
        color: number[];
        points: Point[];
        indices: number[];
        buffer: WebGLBuffer;
        indexBuffer: WebGLBuffer;
        dirty: boolean;
        glPoints: number[];
        glIndices: number[];
        shader: glCore.GLShader;
        vao: glCore.VertexArrayObject;

        reset(): void;
        upload(): void;
        destroy(): void;

    }
    export class PrimitiveShader extends glCore.GLShader { }

    // math

    export module GroupD8 {

        export var E: number;
        export var SE: number;
        export var S: number;
        export var SW: number;
        export var W: number;
        export var NW: number;
        export var N: number;
        export var NE: number;
        export var MIRROR_HORIZONTAL: number;
        export var MIRROR_VERTICAL: number;

        export function uX(ind: number): number;
        export function uY(ind: number): number;
        export function vX(ind: number): number;
        export function vY(ind: number): number;
        export function inv(rotation: number): number;
        export function add(rotationSecond: number, rotationFirst: number): number;
        export function sub(rotationSecond: number, rotationFirst: number): number;
        export function rotate180(rotation: number): number;
        export function isSwapWidthHeight(rotation: number): boolean;
        export function byDirection(dx: number, dy: number): number;
        export function matrixAppendRotationInv(matrix: Matrix, rotation: number, tx: number, ty: number): void;

    }
    export class Matrix {

        a: number;
        b: number;
        c: number;
        d: number;
        tx: number;
        ty: number;

        fromArray(array: number[]): void;
        set(a: number, b: number, c: number, d: number, tx: number, ty: number): Matrix;
        toArray(transpose?: boolean, out?: number[]): number[];
        apply(pos: Point, newPos?: Point): Point;
        applyInverse(pos: Point, newPos?: Point): Point;
        translate(x: number, y: number): Matrix;
        scale(x: number, y: number): Matrix;
        rotate(angle: number): Matrix;
        append(matrix: Matrix): Matrix;
        setTransform(x: number, y: number, pivotX: number, pivotY: number, scaleX: number, scaleY: number, rotation: number, skewX: number, skewY: number): PIXI.Matrix;
        prepend(matrix: Matrix): Matrix;
        invert(): Matrix;
        identity(): Matrix;
        decompose(transform: TransformBase): TransformBase;
        clone(): Matrix;
        copy(matrix: Matrix): Matrix;

        static IDENTITY: Matrix;
        static TEMP_MATRIX: Matrix;

    }
    export class ObservablePoint {

        constructor(cb: Function, scope?: any, x?: number, y?: number);

        x: number;
        y: number;
        cb: () => void;
        scope: any;

        set(x?: number, y?: number): void;
        copy(point: Point | ObservablePoint): void;

    }
    export class Point {

        constructor(x?: number, y?: number);

        x: number;
        y: number;

        clone(): Point;
        copy(p: Point): void;
        equals(p: Point): boolean;
        set(x?: number, y?: number): void;

    }

    export interface IShape {
    }
    export interface IHitArea extends IShape {

        contains(x: number, y: number): boolean;

    }
    export class Circle {

        constructor(x?: number, y?: number, radius?: number);

        x: number;
        y: number;
        radius: number;
        type: number;

        clone(): Circle;
        contains(x: number, y: number): boolean;
        getBounds(): Rectangle;

    }
    export class Ellipse {

        constructor(x?: number, y?: number, width?: number, height?: number);

        x: number;
        y: number;
        width: number;
        height: number;
        type: number;

        clone(): Ellipse;
        contains(x: number, y: number): boolean;
        getBounds(): Rectangle;

    }
    export class Polygon {

        constructor(points: Point[] | number[]);
        constructor(...points: Point[]);
        constructor(...points: number[]);

        closed: boolean;
        points: number[];
        type: number;

        clone(): Polygon;
        contains(x: number, y: number): boolean;
        close(): void;

    }
    export class Rectangle {

        constructor(x?: number, y?: number, width?: number, height?: number);

        x: number;
        y: number;
        width: number;
        height: number;
        type: number;
        left: number;
        right: number;
        top: number;
        bottom: number;

        static EMPTY: Rectangle;

        clone(): Rectangle;
        copy(rectangle: Rectangle): Rectangle;
        contains(x: number, y: number): boolean;
        pad(paddingX: number, paddingY: number): void;
        fit(rectangle: Rectangle): void;
        enlarge(rectangle: Rectangle): void;

    }
    export class RoundedRectangle {

        constructor(x?: number, y?: number, width?: number, height?: number, radius?: number);

        x: number;
        y: number;
        width: number;
        height: number;
        radius: number;
        type: number;

        clone(): RoundedRectangle;
        contains(x: number, y: number): boolean;

    }

    // renderers

    export interface IRendererOptions {

        view?: HTMLCanvasElement;
        transparent?: boolean;
        autoResize?: boolean;
        antialias?: boolean;
        resolution?: number;
        clearBeforeRender?: boolean;
        backgroundColor?: number;
        roundPixels?: boolean;
        context?: WebGLRenderingContext;

    }
    export class SystemRenderer extends utils.EventEmitter {

        constructor(system: string, width?: number, height?: number, options?: IRendererOptions);

        type: number;
        width: number;
        height: number;
        view: HTMLCanvasElement;
        resolution: number;
        transparent: boolean;
        autoResize: boolean;
        blendModes: any; // todo?
        preserveDrawingBuffer: boolean;
        clearBeforeRender: boolean;
        roundPixels: boolean;
        protected _backgroundColor: number;
        protected _backgroundColorRgba: number[];
        protected _backgroundColorString: string;
        protected _tempDisplayObjectParent: Container;
        protected _lastObjectRendered: DisplayObject;
        backgroundColor: number;

        resize(width: number, height: number): void;
        generateTexture(displayObject: DisplayObject, scaleMode?: number, resolution?: number): RenderTexture;
        render(...args: any[]): void;
        destroy(removeView?: boolean): void;

    }
    export class CanvasRenderer extends SystemRenderer {

        // plugintarget mixin start
        static __plugins: any[];
        static registerPlugin(pluginName: string, ctor: Function): void;
        plugins: any;
        initPlugins(): void;
        destroyPlugins(): void;
        // plugintarget mixin end

        constructor(width?: number, height?: number, options?: IRendererOptions);

        rootContext: CanvasRenderingContext2D;
        rootResolution: number;
        refresh: boolean;
        maskManager: CanvasMaskManager;
        smoothProperty: string;
        extract: extract.CanvasExtract;

        context: CanvasRenderingContext2D;

        render(displayObject: PIXI.DisplayObject, renderTexture?: PIXI.RenderTexture, clear?: boolean, transform?: PIXI.Transform, skipUpdateTransform?: boolean): void
        setBlendMode(blendMode: number): void;
        destroy(removeView?: boolean): void;
        resize(w: number, h: number): void;
        clear(clearColor?: string): void;

        on(event: "prerender", fn: () => void, context?: any): utils.EventEmitter;
        on(event: "postrender", fn: () => void, context?: any): utils.EventEmitter;
        on(event: string, fn: Function, context?: any): utils.EventEmitter;
        once(event: "prerender", fn: () => void, context?: any): utils.EventEmitter;
        once(event: "postrender", fn: () => void, context?: any): utils.EventEmitter;
        once(event: string, fn: Function, context?: any): utils.EventEmitter;
        off(event: string, fn: Function, context?: any): utils.EventEmitter;

    }
    export class CanvasMaskManager {

        constructor(renderer: CanvasRenderer);

        pushMask(maskData: any): void;
        protected renderGraphicsShape(graphics: Graphics): void;
        popMask(renderer: WebGLRenderer | CanvasRenderer): void;
        destroy(): void;

    }
    export class CanvasRenderTarget {

        constructor(width: number, height: number, resolution: number);

        canvas: HTMLCanvasElement;
        context: CanvasRenderingContext2D;
        resolution: number;

        width: number;
        height: number;

        clear(): void;
        resize(width: number, height: number): void;
        destroy(): void;

    }

    export interface IWebGLRendererOptions {

        view?: HTMLCanvasElement;
        transparent?: boolean;
        autoResize?: boolean;
        antialias?: boolean;
        forceFXAA?: boolean;
        resolution?: number;
        clearBeforeRender?: boolean;
        preserveDrawingBuffer?: boolean;
        roundPixels?: boolean;

    }
    export class WebGLRenderer extends SystemRenderer {

        // plugintarget mixin start
        static __plugins: any[];
        static registerPlugin(pluginName: string, ctor: Function): void;
        plugins: any;
        initPlugins(): void;
        destroyPlugins(): void;
        // plugintarget mixin end

        constructor(width?: number, height?: number, options?: IWebGLRendererOptions);

        protected _contextOptions: {
            alpha: boolean;
            antiAlias: boolean;
            premultipliedAlpha: boolean;
            stencil: boolean;
            preseveDrawingBuffer: boolean;
        };
        protected _backgroundColorRgba: number[];
        maskManager: MaskManager;
        stencilManager: StencilManager;
        emptyRenderer: ObjectRenderer;
        currentRenderer: ObjectRenderer;
        gl: WebGLRenderingContext;
        CONTEXT_UID: number;
        state: WebGLState;
        renderingToScreen: boolean;
        boundTextures: Texture[];
        filterManager: FilterManager;
        textureManager: TextureManager;
        extract: extract.WebGLExtract;
        protected drawModes: any;
        protected _activeShader: Shader;
        _activeRenderTarget: RenderTarget;
        protected _initContext(): void;

        render(displayObject: PIXI.DisplayObject, renderTexture?: PIXI.RenderTexture, clear?: boolean, transform?: PIXI.Transform, skipUpdateTransform?: boolean): void
        setObjectRenderer(objectRenderer: ObjectRenderer): void;
        flush(): void;
        resize(width: number, height: number): void;
        setBlendMode(blendMode: number): void;
        clear(clearColor?: number): void;
        setTransform(matrix: Matrix): void;
        bindRenderTexture(renderTexture: RenderTexture, transform: Transform): WebGLRenderer;
        bindRenderTarget(renderTarget: RenderTarget): WebGLRenderer;
        bindShader(shader: Shader): WebGLRenderer;
        bindTexture(texture: Texture | BaseTexture, location?: number, forceLocation?: boolean): number;
        unbindTexture(texture: Texture | BaseTexture): WebGLRenderer;
        createVao(): glCore.VertexArrayObject;
        bindVao(vao: glCore.VertexArrayObject): WebGLRenderer;
        reset(): WebGLRenderer;
        handleContextLost: (event: WebGLContextEvent) => void;
        handleContextRestored: () => void;
        destroy(removeView?: boolean): void;

        on(event: "context", fn: (gl: WebGLRenderingContext) => void, context?: any): utils.EventEmitter;
        on(event: "prerender", fn: () => void, context?: any): utils.EventEmitter;
        on(event: "postrender", fn: () => void, context?: any): utils.EventEmitter;
        on(event: string, fn: Function, context?: any): utils.EventEmitter;
        once(event: "context", fn: (gl: WebGLRenderingContext) => void, context?: any): utils.EventEmitter;
        once(event: "prerender", fn: () => void, context?: any): utils.EventEmitter;
        once(event: "postrender", fn: () => void, context?: any): utils.EventEmitter;
        once(event: string, fn: Function, context?: any): utils.EventEmitter;
        off(event: string, fn: Function, context?: any): utils.EventEmitter;

    }
    export class WebGLState {

        constructor(gl: WebGLRenderingContext);

        activeState: number[];
        defaultState: number[];
        stackIndex: number;
        stack: number[];
        gl: WebGLRenderingContext;
        maxAttribs: number;
        attribState: glCore.IAttribState;
        nativeVaoExtension: any;

        push(): void;
        pop(): void;
        setState(state: number[]): void;
        setBlend(value: number): void;
        setBlendMode(value: number): void;
        setDepthTest(value: number): void;
        setCullFace(value: number): void;
        setFrontFace(value: number): void;
        resetAttributes(): void;
        resetToDefault(): void;

    }
    export class TextureManager {

        constructor(renderer: WebGLRenderer);

        renderer: WebGLRenderer;
        gl: WebGLRenderingContext;
        protected _managedTextures: WebGLTexture[];

        bindTexture(): void;
        getTexture(): WebGLTexture;
        updateTexture(texture: BaseTexture | Texture): WebGLTexture;
        destroyTexture(texture: BaseTexture, _skipRemove?: boolean): void;
        removeAll(): void;
        destroy(): void;

    }
    export class TextureGarbageCollector {

        constructor(renderer: WebGLRenderer);

        renderer: WebGLRenderer;
        count: number;
        checkCount: number;
        maxIdle: number;
        checkCountMax: number;
        mode: number;

        update(): void;
        run(): void;
        unload(): void;

    }
    export abstract class ObjectRenderer extends WebGLManager {

        constructor(renderer: WebGLRenderer);

        start(): void;
        stop(): void;
        flush(): void;

        render(...args: any[]): void;

    }
    export class Quad {

        constructor(gl: WebGLRenderingContext);

        gl: WebGLRenderingContext;
        vertices: number[];
        uvs: number[];
        interleaved: number[];
        indices: number[];
        vertexBuffer: WebGLBuffer;
        vao: glCore.VertexArrayObject;
        initVao(shader: glCore.GLShader): void;
        map(targetTextureFrame: Rectangle, destinationFrame: Rectangle): Quad;
        upload(): Quad;
        destroy(): void;

    }
    export class RenderTarget {

        constructor(gl: WebGLRenderingContext, width: number, height: number, scaleMode: number, resolution: number, root?: boolean);

        gl: WebGLRenderingContext;
        frameBuffer: glCore.GLFramebuffer;
        texture: Texture;
        clearColor: number[];
        size: Rectangle;
        resolution: number;
        projectionMatrix: Matrix;
        transform: Matrix;
        frame: Rectangle;
        defaultFrame: Rectangle;
        destinationFrame: Rectangle;
        sourceFrame: Rectangle;
        stencilBuffer: glCore.GLFramebuffer;
        stencilMaskStack: Graphics[];
        filterData: {
            index: number,
            stack: {
                renderTarget: RenderTarget,
                filter: any[];
                bounds: Rectangle
            }[]
        };
        scaleMode: number;
        root: boolean;

        clear(clearColor?: number[]): void;
        attachStencilBuffer(): void;
        setFrame(destinationFrame: Rectangle, sourceFrame: Rectangle): void;
        activate(): void;
        calculateProjection(destinationFrame: Rectangle, sourceFrame: Rectangle): void;
        resize(width: number, height: number): void;
        destroy(): void;

    }

    export class BlendModeManager extends WebGLManager {

        constructor(renderer: WebGLRenderer);

        currentBlendMode: number;

        setBlendMode(blendMode: number): boolean;

    }
    export class FilterManager extends WebGLManager {

        constructor(renderer: WebGLRenderer);

        gl: WebGLRenderingContext;
        quad: Quad;
        stack: {
            renderTarget: RenderTarget;
            sourceFrame: Rectangle;
            destinationFrame: Rectangle;
            filters: Filter[];
            target: any;
            resolution: number;
        }[];
        stackIndex: number;
        shaderCache: any;
        filterData: any;

        pushFilter(target: RenderTarget, filters: Filter[]): void;
        popFilter(): void;
        applyFilter(shader: glCore.GLShader | Filter, inputTarget: RenderTarget, outputTarget: RenderTarget, clear?: boolean): void;
        syncUniforms(shader: glCore.GLShader, filter: Filter): void;
        getRenderTarget(clear?: boolean, resolution?: number): RenderTarget;
        returnRenderTarget(renderTarget: RenderTarget): RenderTarget;
        calculateScreenSpaceMatrix(outputMatrix: Matrix): Matrix;
        calculateNormalisedScreenSpaceMatrix(outputMatrix: Matrix): Matrix;
        calculateSpriteMatrix(outputMatrix: Matrix, sprite: Sprite): Matrix;
        destroy(): void;
        emptyPool(): void;
        getPotRenderTarget(gl: WebGLRenderingContext, minWidth: number, minHeight: number, resolution: number): RenderTarget;
        freePotRenderTarget(renderTarget: RenderTarget): void;

    }
    export class StencilMaskStack {

        stencilStack: any[];
        reverse: boolean;
        count: number;

    }
    export class MaskManager extends WebGLManager {

        scissor: boolean;
        scissorData: any;
        scissorRenderTarget: RenderTarget;
        enableScissor: boolean;
        alphaMaskPool: number[];
        alphaMaskIndex: number;
        pushMask(target: RenderTarget, maskData: Sprite | Graphics): void;
        popMask(target: RenderTarget, maskData: Sprite | Graphics): void;
        pushSpriteMask(target: RenderTarget, maskData: Sprite | Graphics): void;
        popSpriteMask(): void;
        pushStencilMask(maskData: Sprite | Graphics): void;
        popStencilMask(): void;
        pushScissorMask(target: RenderTarget, maskData: Sprite | Graphics): void;
        popScissorMask(): void;

    }
    export class StencilManager extends WebGLManager {

        constructor(renderer: WebGLRenderer);

        stencilMaskStack: Graphics[];

        setMaskStack(stencilMasStack: Graphics[]): void;
        pushStencil(graphics: Graphics): void;
        popStencil(): void;
        destroy(): void;

    }
    export class WebGLManager {

        constructor(renderer: WebGLRenderer);

        renderer: WebGLRenderer;
        onContextChange(): void;
        destroy(): void;

    }
    export interface IUniformData {

        type: string;
        value: any;

        // name is set by pixi if uniforms were automatically extracted from shader code, but not used anywhere
        name?: string;

    }
    export class Filter {

        // param uniforms should be an object matching type {[name: string]: IUniformData};
        // left untyped as there's no way to define the type without requiring an index signature or making this class generic
        constructor(vertexSrc?: string, fragmentSrc?: string, uniforms?: any);

        vertextSrc: string;
        fragmentSrc: string;
        protected uniformData: { [name: string]: IUniformData };
        uniforms: { [name: string]: any };
        glShaders: any;
        glShaderKey: string;
        padding: number;
        resolution: number;
        blendMode: number;
        enabled: boolean;
        apply(filterManager: FilterManager, input: RenderTarget, output: RenderTarget, clear?: boolean): void;

        static defaultVertexSrc: string;
        static defaultFragmentSrc: string;

    }
    export class SpriteMaskFilter extends Filter {

        constructor(sprite: Sprite);

        maskSprite: Sprite;
        maskMatrix: Matrix;
        apply(filterManager: FilterManager, input: RenderTarget, output: RenderTarget): void;

    }

    // sprites

    export class Sprite extends Container {

        constructor(texture?: Texture);

        protected _anchor: Point;
        anchor: Point;
        protected _texture: Texture;
        protected _transformTrimmedID: number;
        protected _textureTrimmedID: number;
        protected _width: number;
        protected _height: number;
        tint: number;
        protected _tint: number;
        protected _tintRGB: number;
        blendMode: number;
        pluginName: string;
        protected cachedTint: number;
        texture: Texture;
        protected textureDirty: boolean;
        protected _textureID: number;
        protected _transformID: number;
        protected vertexTrimmedData: Float32Array;
        vertexData: Float32Array;
        width: number;
        height: number;

        protected _onTextureUpdate(): void;
        calculateVertices(): void;
        protected _calculateBounds(): void;
        protected calculateTrimmedVertices(): void;
        protected onAnchorUpdate(): void;
        protected _renderWebGL(renderer: WebGLRenderer): void;
        protected _renderCanvas(renderer: CanvasRenderer): void;
        getLocalBounds(): Rectangle;
        containsPoint(point: Point): boolean;
        destroy(options?: IDestroyOptions | boolean): void;

        static from(source: number | string | BaseTexture | HTMLImageElement | HTMLCanvasElement | HTMLVideoElement): Sprite;
        static fromFrame(frameId: string): Sprite;
        static fromImage(imageId: string, crossorigin?: boolean, scaleMode?: number): Sprite;

    }
    export class BatchBuffer {

        vertices: ArrayBuffer;
        float32View: number[];
        uint32View: number[];

        destroy(): void;

    }
    export class SpriteRenderer extends ObjectRenderer {

        constructor(renderer: PIXI.WebGLRenderer);

        vertSize: number;
        vertByteSize: number;
        size: number;
        buffers: BatchBuffer[];
        indices: number[];
        shaders: Shader[];
        currentIndex: number;
        tick: number;
        groups: any[];
        sprites: Sprite[];
        vertexBuffers: number[];
        vaos: glCore.VertexArrayObject[];
        vaoMax: number;
        vertexCount: number;

        protected onContextChanged: () => void;
        protected onPrerender: () => void;
        render(sprite: Sprite): void;
        flush(): void;
        start(): void;
        stop(): void;
        destroy(): void;

    }
    export class CanvasSpriteRenderer extends ObjectRenderer {

        constructor(renderer: WebGLRenderer);

        render(sprite: Sprite): void;
        destroy(): void;

    }
    export module CanvasTinter {

        export function getTintedTexture(sprite: Sprite, color: number): HTMLCanvasElement;
        export function tintWithMultiply(texture: Texture, color: number, canvas: HTMLCanvasElement): void;
        export function tintWithOverlay(texture: Texture, color: number, canvas: HTMLCanvasElement): void;
        export function tintWithPerPixel(texture: Texture, color: number, canvas: HTMLCanvasElement): void;
        export function roundColor(color: number): number;

        export var cacheStepsPerColorChannel: number;
        export var convertTintToImage: boolean;
        export var canUseMultiply: boolean;
        export var tintMethod: Function;

    }

    // text
    export interface ITextStyleStyle {
        align?: string;
        breakWords?: boolean;
        dropShadow?: boolean;
        dropShadowAngle?: number;
        dropShadowBlur?: number;
        dropShadowColor?: string | number;
        dropShadowDistance?: number;
        fill?: string | string[] | number | number[] | CanvasGradient | CanvasPattern;
        fillGradientType?: number;
        fontFamily?: string | string[];
        fontSize?: number | string;
        fontStyle?: string;
        fontVariant?: string;
        fontWeight?: string;
        letterSpacing?: number;
        lineHeight?: number;
        lineJoin?: string;
        miterLimit?: number;
        padding?: number;
        stroke?: string | number;
        strokeThickness?: number;
        styleID?: number;
        textBaseline?: string;
        wordWrap?: boolean;
        wordWrapWidth?: number;
    }

    export class TextStyle implements ITextStyleStyle {
        align: string;
        breakWords: boolean;
        dropShadow: boolean;
        dropShadowAngle: number;
        dropShadowBlur: number;
        dropShadowColor: string | number;
        dropShadowDistance: number;
        fill: string | string[] | number | number[] | CanvasGradient | CanvasPattern;
        fillGradientType: number;
        fontFamily: string | string[];
        fontSize: number | string;
        fontStyle: string;
        fontVariant: string;
        fontWeight: string;
        letterSpacing: number;
        lineHeight: number;
        lineJoin: string;
        miterLimit: number;
        padding: number;
        stroke: string | number;
        strokeThickness: number;
        styleID: number;
        textBaseline: string;
        wordWrap: boolean;
        wordWrapWidth: number;
        constructor(style?: ITextStyleStyle);
        public clone(): TextStyle;
        public reset(): void;
    }

    export class Text extends Sprite {

        static getFontStyle(style: ITextStyleStyle): string;
        static calculateFontProperties(style: string): any;

        constructor(text?: string, style?: ITextStyleStyle, canvas?: HTMLCanvasElement);

        canvas: HTMLCanvasElement;
        context: CanvasRenderingContext2D;
        resolution: number;
        protected _text: string;
        protected _style: TextStyle;
        protected _styleListener: Function;
        protected _font: string;
        protected localStyleID: number;

        static fontPropertiesCache: any;
        static fontPropertiesCanvas: HTMLCanvasElement;
        static fontPropertiesContext: CanvasRenderingContext2D;

        width: number;
        height: number;
        style: TextStyle;
        text: string;

        protected updateText(respectDirty?: boolean): void;
        protected drawLetterSpacing(text: string, x: number, y: number, isStroke?: boolean): void;
        protected updateTexture(): void;
        renderWebGL(renderer: WebGLRenderer): void;
        protected _renderCanvas(renderer: CanvasRenderer): void;
        protected wordWrap(text: string): string;
        protected _calculateBounds(): void;
        protected _onStyleChange: () => void;
        protected _generateFillStyle(style: TextStyle, lines: string[]): string | number | CanvasGradient;
        destroy(options?: IDestroyOptions | boolean): void;
        dirty: boolean;

    }

    // textures

    export class BaseRenderTexture extends BaseTexture {

        constructor(width?: number, height?: number, scaleMode?: number, resolution?: number);

        height: number;
        width: number;
        realHeight: number;
        realWidth: number;
        resolution: number;
        scaleMode: number;
        hasLoaded: boolean;
        protected _glRenderTargets: { [n: number]: WebGLTexture; };
        protected _canvasRenderTarget: { [n: number]: WebGLTexture; };
        valid: boolean;

        resize(width: number, height: number): void;
        destroy(): void;

        once(event: "update", fn: (baseRenderTexture: BaseRenderTexture) => void, context?: any): utils.EventEmitter;
        once(event: string, fn: Function, context?: any): utils.EventEmitter;
        on(event: "update", fn: (baseRenderTexture: BaseRenderTexture) => void, context?: any): utils.EventEmitter;
        on(event: string, fn: Function, context?: any): utils.EventEmitter;
        off(event: string, fn: Function, context?: any): utils.EventEmitter;

    }
    export class BaseTexture extends utils.EventEmitter {

        constructor(source?: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement, scaleMode?: number, resolution?: number);

        protected uuid: number;
        protected touched: number;
        resolution: number;
        width: number;
        height: number;
        realWidth: number;
        realHeight: number;
        scaleMode: number;
        hasLoaded: boolean;
        isLoading: boolean;
        wrapMode: number;
        source: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement;
        origSource: HTMLImageElement;
        imageType: string;
        sourceScale: number;
        premultipliedAlpha: boolean;
        imageUrl: string;
        protected isPowerOfTwo: boolean;
        mipmap: boolean;
        wrap: boolean;
        protected _glTextures: any;
        protected _enabled: number;
        protected _id: number;

        update(): void;
        protected _updateImageType(): void;
        protected _loadSvgSource(): void;
        protected _loadSvgSourceUsingDataUri(dataUri: string): void;
        protected _loadSvgSourceUsingXhr(): void;
        protected _loadSvgSourceUsingString(svgString: string): void;
        protected loadSource(source: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement): void;
        protected _sourceLoaded(): void;
        destroy(): void;
        dispose(): void;
        updateSourceImage(newSrc: string): void;

        static fromImage(imageUrl: string, crossorigin?: boolean, scaleMode?: number, sourceScale?: number): BaseTexture;
        static fromCanvas(canvas: HTMLCanvasElement, scaleMode?: number): BaseTexture;

        on(event: "update", fn: (baseTexture: BaseTexture) => void, context?: any): utils.EventEmitter;
        on(event: "loaded", fn: (baseTexture: BaseTexture) => void, context?: any): utils.EventEmitter;
        on(event: "error", fn: (baseTexture: BaseTexture) => void, context?: any): utils.EventEmitter;
        on(event: "dispose", fn: (baseTexture: BaseTexture) => void, context?: any): utils.EventEmitter;
        on(event: string, fn: Function, context?: any): utils.EventEmitter;
        once(event: "update", fn: (baseTexture: BaseTexture) => void, context?: any): utils.EventEmitter;
        once(event: "loaded", fn: (baseTexture: BaseTexture) => void, context?: any): utils.EventEmitter;
        once(event: "error", fn: (baseTexture: BaseTexture) => void, context?: any): utils.EventEmitter;
        once(event: "dispose", fn: (baseTexture: BaseTexture) => void, context?: any): utils.EventEmitter;
        once(event: string, fn: Function, context?: any): utils.EventEmitter;
        off(event: string, fn: Function, context?: any): utils.EventEmitter;

    }
    export class RenderTexture extends Texture {

        constructor(baseRenderTexture: BaseRenderTexture, frame?: Rectangle);

        protected legacyRenderer: any;
        valid: boolean;

        resize(width: number, height: number, doNotResizeBaseTexture?: boolean): void;

        static create(width?: number, height?: number, scaleMode?: number, resolution?: number): RenderTexture;

    }
    export class Texture extends utils.EventEmitter {

        constructor(baseTexture: BaseTexture, frame?: Rectangle, orig?: Rectangle, trim?: Rectangle, rotate?: number);

        noFrame: boolean;
        baseTexture: BaseTexture;
        protected _frame: Rectangle;
        trim: Rectangle;
        valid: boolean;
        requiresUpdate: boolean;
        protected _uvs: TextureUvs;
        orig: Rectangle;
        protected _updateID: number;
        transform: any;

        update(): void;
        protected onBaseTextureLoaded(baseTexture: BaseTexture): void;
        protected onBaseTextureUpdated(baseTexture: BaseTexture): void;
        destroy(destroyBase?: boolean): void;
        clone(): Texture;
        protected _updateUvs(): void;

        static fromImage(imageUrl: string, crossOrigin?: boolean, scaleMode?: number, sourceScale?: number): Texture;
        static fromFrame(frameId: string): Texture;
        static fromCanvas(canvas: HTMLCanvasElement, scaleMode?: number): Texture;
        static fromVideo(video: HTMLVideoElement | string, scaleMode?: number): Texture;
        static fromVideoUrl(videoUrl: string, scaleMode?: number): Texture;
        static from(source: number | string | BaseTexture | HTMLImageElement | HTMLCanvasElement | HTMLVideoElement): Texture;
        static addTextureToCache(texture: Texture, id: string): void;
        static removeTextureFromCache(id: string): Texture;

        frame: Rectangle;
        protected _rotate: boolean;
        rotate: number;
        width: number;
        height: number;

        static EMPTY: Texture;

        on(event: "update", fn: (texture: Texture) => void, context?: any): utils.EventEmitter;
        on(event: string, fn: Function, context?: any): utils.EventEmitter;
        once(event: "update", fn: (texture: Texture) => void, context?: any): utils.EventEmitter;
        once(event: string, fn: Function, context?: any): utils.EventEmitter;
        off(event: string, fn: Function, context?: any): utils.EventEmitter;

    }
    export class TextureUvs {

        x0: number;
        y0: number;
        x1: number;
        y1: number;
        x2: number;
        y2: number;
        x3: number;
        y3: number;

        uvsUint32: Uint32Array;

        protected set(frame: Rectangle, baseFrame: Rectangle, rotate: number): void;

    }
    export class VideoBaseTexture extends BaseTexture {

        constructor(source: HTMLVideoElement, scaleMode?: number);

        autoUpdate: boolean;
        autoPlay: boolean;
        protected _isAutoUpdating: boolean;

        update(): void;
        protected _onCanPlay(): void;
        protected _onPlayStart(): void;
        protected _onPlayStop(): void;
        destroy(): void;
        protected _isSourcePlaying(): boolean;
        protected _isSourceReady(): boolean;

        static fromVideo(video: HTMLVideoElement, scaleMode?: number): VideoBaseTexture;
        static fromUrl(videoSrc: string | any | string[] | any[]): VideoBaseTexture;
        static fromUrls(videoSrc: string | any | string[] | any[]): VideoBaseTexture;

        source: HTMLVideoElement;
        protected loadSource(source: HTMLVideoElement): void;
    }

    // ticker

    module ticker {

        export var shared: Ticker;

        export class Ticker {

            protected _tick(time: number): void;
            protected _emitter: utils.EventEmitter;
            protected _requestId: number;
            protected _maxElapsedMS: number;

            protected _requestIfNeeded(): void;
            protected _cancelIfNeeded(): void;
            protected _startIfPossible(): void;

            autoStart: boolean;
            deltaTime: number;
            elapsedMS: number;
            lastTime: number;
            speed: number;
            started: boolean;

            FPS: number;
            minFPS: number;

            add(fn: (deltaTime: number) => void, context?: any): Ticker;
            addOnce(fn: (deltaTime: number) => void, context?: any): Ticker;
            remove(fn: (deltaTime: number) => void, context?: any): Ticker;
            start(): void;
            stop(): void;
            update(): void;

        }

    }

    // shader

    export class Shader extends glCore.GLShader { }

    //////////////////////////////////////////////////////////////////////////////
    ////////////////////////////EXTRACT///////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////

    export module extract {

        export class CanvasExtract {

            protected renderer: CanvasRenderer;

            constructor(renderer: CanvasRenderer);

            image(target?: DisplayObject | RenderTexture): HTMLImageElement;
            base64(target?: DisplayObject | RenderTexture): string;
            canvas(target?: DisplayObject | RenderTexture): HTMLCanvasElement;
            pixels(renderTexture?: DisplayObject | RenderTexture): number[];

            destroy(): void;

        }
        export class WebGLExtract {
            protected renderer: WebGLRenderer;

            constructor(renderer: WebGLRenderer);

            image(target?: DisplayObject | RenderTexture): HTMLImageElement;
            base64(target?: DisplayObject | RenderTexture): string;
            canvas(target?: DisplayObject | RenderTexture): HTMLCanvasElement;
            pixels(renderTexture?: DisplayObject | RenderTexture): number[];

            destroy(): void;
        }

    }

    //////////////////////////////////////////////////////////////////////////////
    ////////////////////////////EXTRAS////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////

    export module extras {

        export interface IBitmapTextStyle {

            font?: string | {

                name?: string;
                size?: number;

            };
            align?: string;
            tint?: number;

        }
        export class BitmapText extends Container {

            constructor(text: string, style?: IBitmapTextStyle);

            protected _textWidth: number;
            protected _textHeight: number;
            textWidth: number;
            textHeight: number;
            protected _glyphs: Sprite[];
            protected _font: string | {
                name?: string;
                size?: number;
            };
            font: string | {
                name?: string;
                size?: number;
            };
            protected _text: string;
            maxWidth: number;
            maxLineHeight: number;
            dirty: boolean;
            tint: number;
            align: string;
            text: string;
            anchor: PIXI.Point | number;

            protected updateText(): void;
            updateTransform(): void;
            getLocalBounds(): Rectangle;
            validate(): void;

            static fonts: any;

        }
        export class AnimatedSprite extends Sprite {

            constructor(textures: Texture[] | { texture: Texture, time?: number }[], autoUpdate?: boolean);

            protected _autoUpdate: boolean;
            protected _textures: Texture[];
            protected _durations: number[];
            textures: Texture[] | { texture: Texture, time?: number }[];
            animationSpeed: number;
            loop: boolean;
            onComplete: () => void;
            onFrameChange: (currentFrame: number) => void;
            protected _currentTime: number;
            playing: boolean;
            totalFrames: number;
            currentFrame: number;
            stop(): void;
            play(): void;
            gotoAndStop(frameNumber: number): void;
            gotoAndPlay(frameNumber: number): void;
            protected update(deltaTime: number): void;
            destroy(): void;

            static fromFrames(frame: string[]): AnimatedSprite;
            static fromImages(images: string[]): AnimatedSprite;

        }
        export class TextureTransform {

            constructor(texture: Texture, clampMargin?: number);

            protected _texture: Texture;
            protected mapCoord: Matrix;
            protected uClampFrame: Float32Array;
            protected uClampOffset: Float32Array;
            protected _lastTextureID: number;

            clampOffset: number;
            clampMargin: number;

            texture: Texture;

            update(forceUpdate?: boolean): void;

        }
        export class TilingSprite extends Sprite {

            constructor(texture: Texture, width?: number, height?: number);

            tileTransform: TransformStatic;
            protected _width: number;
            protected _height: number;
            protected _canvasPattern: CanvasPattern;
            uvTransform: TextureTransform;
            uvRespectAnchor: boolean;

            clampMargin: number;
            tileScale: Point | ObservablePoint;
            tilePosition: Point | ObservablePoint;

            protected _onTextureUpdate(): void;
            protected _renderWebGL(renderer: WebGLRenderer): void;
            protected _renderCanvas(renderer: CanvasRenderer): void;
            protected _calculateBounds(): void;
            getLocalBounds(rect?: Rectangle): Rectangle;
            containsPoint(point: Point): boolean;
            destroy(): void;

            static from(source: number | string | BaseTexture | HTMLCanvasElement | HTMLVideoElement, width?: number, height?: number): TilingSprite;
            static fromFrame(frameId: string, width?: number, height?: number): TilingSprite;
            // if you remove the next line, the class will break. https://github.com/pixijs/pixi-typescript/issues/96
            static fromImage(imageId: string, crossorigin?: boolean, scaleMode?: number): Sprite;
            static fromImage(imageId: string, width?: number, height?: number, crossorigin?: boolean, scaleMode?: number): TilingSprite;

            width: number;
            height: number;

        }
        export class TilingSpriteRenderer extends ObjectRenderer {

            constructor(renderer: WebGLRenderer);

            render(ts: TilingSprite): void;

        }

    }

    //////////////////////////////////////////////////////////////////////////////
    ////////////////////////////FILTERS///////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////

    export module filters {

        export class FXAAFilter extends Filter { }
        export class BlurFilter extends Filter {

            constructor(strength?: number, quality?: number, resolution?: number, kernelSize?: number);

            blurXFilter: BlurXFilter;
            blurYFilter: BlurYFilter;
            resolution: number;
            padding: number;
            passes: number;
            blur: number;
            blurX: number;
            blurY: number;
            quality: number;

        }
        export class BlurXFilter extends Filter {

            constructor(strength?: number, quality?: number, resolution?: number, kernelSize?: number);

            protected _quality: number;

            quality: number;
            passes: number;
            resolution: number;
            strength: number;
            firstRun: boolean;
            blur: number;

        }
        export class BlurYFilter extends Filter {

            constructor(strength?: number, quality?: number, resolution?: number, kernelSize?: number);

            protected _quality: number;

            quality: number;
            passes: number;
            resolution: number;
            strength: number;
            firstRun: boolean;
            blur: number;

        }
        export class ColorMatrixFilter extends Filter {

            constructor();

            protected _loadMatrix(matrix: number[], multiply?: boolean): void;
            protected _multiply(out: number[], a: number[], b: number[]): void;
            protected _colorMatrix(matrix: number[]): void;

            matrix: number[];

            brightness(b: number, multiply?: boolean): void;
            greyscale(scale: number, multiply?: boolean): void;
            blackAndWhite(multiply?: boolean): void;
            hue(rotation: number, multiply?: boolean): void;
            contrast(amount: number, multiply?: boolean): void;
            saturate(amount: number, multiply?: boolean): void;
            desaturate(multiply?: boolean): void;
            negative(multiply?: boolean): void;
            sepia(multiply?: boolean): void;
            technicolor(multiply?: boolean): void;
            polaroid(multiply?: boolean): void;
            toBGR(multiply?: boolean): void;
            kodachrome(multiply?: boolean): void;
            browni(multiply?: boolean): void;
            vintage(multiply?: boolean): void;
            colorTone(desaturation: number, toned: number, lightColor: string, darkColor: string, multiply?: boolean): void;
            night(intensity: number, multiply?: boolean): void;
            predator(amount: number, multiply?: boolean): void;
            lsd(multiply?: boolean): void;
            reset(): void;

        }
        export class DisplacementFilter extends Filter {

            constructor(sprite: Sprite, scale?: number);

            scale: Point;
            map: Texture;

        }
        export class VoidFilter extends Filter {
            glShaderKey: string;
        }

        // pixi-filters.d.ts todo
        // https://github.com/pixijs/pixi-filters/
        export class NoiseFilter extends Filter {

            noise: number;

        }

    }

    //////////////////////////////////////////////////////////////////////////////
    ////////////////////////////INTERACTION///////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////

    export module interaction {

        export interface InteractionEvent {

            stopped: boolean;
            target: DisplayObject;
            currentTarget: DisplayObject;
            type: string;
            data: InteractionData;
            stopPropagation(): void;

        }
        export class InteractionData {

            global: Point;

            protected _target: DisplayObject;
            target: DisplayObject;
            targetProxy: DisplayObject;
            originalEvent: Event;

            getLocalPosition(displayObject: DisplayObject, point?: Point, globalPos?: Point): Point;

        }
        export class InteractionManager extends utils.EventEmitter {

            constructor(renderer: SystemRenderer, options?: { autoPreventDefault?: boolean; interactionFrequency?: number; });

            renderer: SystemRenderer;
            autoPreventDefault: boolean;
            interactionFrequency: number;
            mouse: InteractionData;
            pointer: InteractionData;
            eventData: {
                stopped: boolean;
                target: any;
                type: any;
                data: InteractionData;
                stopPropagination(): void;
            };
            interactiveDataPool: InteractionData[];
            protected interactionDOMElement: HTMLElement;
            protected moveWhenInside: boolean;
            protected eventsAdded: boolean;
            mouseOverRenderer: boolean;
            supportsTouchEvents: boolean;
            supportsPointerEvents: boolean;
            normalizeTouchEvents: boolean;
            normalizeMouseEvents: boolean;

            protected onMouseUp: (event: MouseEvent) => void;
            protected processMouseUp: (displayObject: DisplayObject, hit: boolean) => void;
            protected onMouseDown: (event: MouseEvent) => void;
            protected processMouseDown: (displayObject: DisplayObject, hit: boolean) => void;
            protected onMouseMove: (event: MouseEvent) => void;
            protected processMouseMove: (displayObject: DisplayObject, hit: boolean) => void;
            protected onMouseOut: (event: MouseEvent) => void;
            protected processMouseOverOut: (displayObject: DisplayObject, hit: boolean) => void;
            protected onMouseOver: (event: MouseEvent) => void;

            protected onPointerUp: (event: PointerEvent) => void;
            protected processPointerUp: (displayObject: DisplayObject, hit: boolean) => void;
            protected onPointerDown: (event: PointerEvent) => void;
            protected processPointerDown: (displayObject: DisplayObject, hit: boolean) => void;
            protected onPointerMove: (event: PointerEvent) => void;
            protected processPointerMove: (displayObject: DisplayObject, hit: boolean) => void;
            protected onPointerOut: (event: PointerEvent) => void;
            protected processPointerOut: (displayObject: DisplayObject, hit: boolean) => void;
            protected onPointerOver: (event: PointerEvent) => void;

            protected onTouchStart: (event: TouchEvent) => void;
            protected processTouchStart: (DisplayObject: DisplayObject, hit: boolean) => void;
            protected onTouchEnd: (event: TouchEvent) => void;
            protected processTouchEnd: (displayObject: DisplayObject, hit: boolean) => void;
            protected onTouchMove: (event: TouchEvent) => void;
            protected processTouchMove: (displayObject: DisplayObject, hit: boolean) => void;
            defaultCursorStyle: string;
            currentCursorStyle: string;
            protected _tempPoint: Point;
            resolution: number;
            protected setTargetElement(element: HTMLElement, resolution: number): void;
            protected addEvents(): void;
            protected removeEvents(): void;
            update(deltaTime: number): void;
            protected dispatchEvent(displayObject: DisplayObject, eventString: string, eventData: any): void;
            mapPositionToPoint(point: Point, x: number, y: number): void;
            protected processInteractive(point: Point, displayObject: DisplayObject, func: (displayObject: DisplayObject, hit: boolean) => void, hitTest: boolean, interactive: boolean): boolean;
            protected _startInteractionProcess(): void;
            protected _queueAdd(displayObject: DisplayObject, order: number): void;
            protected _finishInteractionProcess(func: Function): void;
            protected getTouchData(touchEvent: InteractionData): InteractionData;
            protected returnTouchData(touchData: InteractionData): void;
            protected normalizeToPointerData(Event: Event): void;

            destroy(): void;

        }
        export interface InteractiveTarget {

            interactive: boolean;
            interactiveChildren: boolean;
            hitArea: IHitArea;
            buttonMode: boolean;
            defaultCursor: string;

        }
        export interface InteractiveTargetProxy extends InteractiveTarget {
        }

    }

    //////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////LOADER/////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////

    // pixi loader extends 
    // https://github.com/englercj/resource-loader/
    // 2.0.4

    class MiniSignalBinding {

        constructor(fn: Function, once?: boolean, thisArg?: any);

        protected _fn: Function;
        protected _once: boolean;
        protected _thisArg: any;
        protected _next: MiniSignalBinding;
        protected _prev: MiniSignalBinding;
        protected _owner: MiniSignal;

        detach(): boolean;

    }
    class MiniSignal {

        constructor();

        protected _head: MiniSignalBinding;
        protected _tail: MiniSignalBinding;

        handlers(exists?: boolean): MiniSignalBinding[] | boolean;
        handlers(exists?: true): boolean;
        handlers(exists?: false): MiniSignalBinding[];

        has(node: MiniSignalBinding): boolean;
        dispatch(): boolean;
        add(fn: Function, thisArg?: any): void;
        once(fn: Function, thisArg?: any): void;
        detach(node: MiniSignalBinding): MiniSignal;
        detachAll(): MiniSignal;

    }

    export module loaders {

        export interface ILoaderOptions {

            crossOrigin?: boolean | string;
            loadType?: number;
            xhrType?: string;
            metaData?: any;
            loadElement?: HTMLImageElement | HTMLAudioElement | HTMLVideoElement;
            skipSource?: boolean;

        }
        export interface IResourceDictionary {

            [index: string]: PIXI.loaders.Resource;

        }

        // As of ResourceLoader v2 we no longer require EventEmitter
        // However, for depreciation reasons, it remains. 
        export class Loader extends utils.EventEmitter {

            // pixi overrides here
            static addPixiMiddleware(fn: Function): void;

            // below this line is the original non-pixi loader

            static Resource: any;
            static async: any;
            static base64: any;

            constructor(baseUrl?: string, concurrency?: number);

            baseUrl: string;
            progress: number;
            loading: boolean;
            defaultQueryString: string;

            protected _beforeMiddleware: Function[];
            protected _afterMiddleware: Function[];
            protected _resourcesParsing: Resource[];
            protected _boundLoadResource: (r: Resource, d: Function) => void;
            protected _queue: any;

            resources: IResourceDictionary;

            onProgress: MiniSignal;
            onError: MiniSignal;
            onLoad: MiniSignal;
            onStart: MiniSignal;
            onComplete: MiniSignal;

            add(...params: any[]): this;
            add(name: string, url: string, options?: ILoaderOptions, cb?: Function): this;
            add(url: string, options?: ILoaderOptions, cb?: Function): this;
            add(obj: any | any[], options?: ILoaderOptions, cb?: Function): this;

            pre(fn: Function): this;
            use(fn: Function): this;
            reset(): this;
            load(cb?: Function): this;

            protected _prepareUrl(url: string): string;
            protected _loadResource(resource: Resource, dequeue: Function): void;
            protected _onComplete(): void;
            protected _onLoad(resource: Resource): void;

            // these are added for spine support

            spineAtlas: any;
            spineData: any;
            textures: ITextureDictionary;

            // depreciation 

            on(event: "complete", fn: (loader: loaders.Loader, object: any) => void, context?: any): utils.EventEmitter;
            on(event: "error", fn: (error: Error, loader: loaders.Loader, resource: Resource) => void, context?: any): utils.EventEmitter;
            on(event: "load", fn: (loader: loaders.Loader, resource: Resource) => void, context?: any): utils.EventEmitter;
            on(event: "progress", fn: (loader: loaders.Loader, resource: Resource) => void, context?: any): utils.EventEmitter;
            on(event: "start", fn: (loader: loaders.Loader) => void, context?: any): utils.EventEmitter;
            on(event: string, fn: Function, context?: any): utils.EventEmitter;

            once(event: "complete", fn: (loader: loaders.Loader, object: any) => void, context?: any): utils.EventEmitter;
            once(event: "error", fn: (error: Error, loader: loaders.Loader, resource: Resource) => void, context?: any): utils.EventEmitter;
            once(event: "load", fn: (loader: loaders.Loader, resource: Resource) => void, context?: any): utils.EventEmitter;
            once(event: "progress", fn: (loader: loaders.Loader, resource: Resource) => void, context?: any): utils.EventEmitter;
            once(event: "start", fn: (loader: loaders.Loader) => void, context?: any): utils.EventEmitter;
            once(event: string, fn: Function, context?: any): utils.EventEmitter;

        }
        export interface ITextureDictionary {
            [index: string]: PIXI.Texture;
        }
        export class Resource {

            static setExtensionLoadType(extname: string, loadType: number): void;
            static setExtensionXhrType(extname: string, xhrType: number): void;

            constructor(name: string, url: string | string[], options?: ILoaderOptions);

            protected _flags: number;

            name: string;
            url: string;
            data: any;
            crossOrigin: boolean | string;
            loadType: number;
            xhrType: string;
            metadata: any;
            error: Error;
            xhr: XMLHttpRequest;
            children: Resource[];
            type: number;
            progressChunk: number;

            protected _dequeue: Function;
            protected _onLoadBinding: Function;
            protected _boundComplete: Function;
            protected _boundOnError: Function;
            protected _boundOnProgress: Function;
            protected _boundXhrOnError: Function;
            protected _boundXhrOnAbort: Function;
            protected _boundXhrOnLoad: Function;
            protected _boundXdrOnTimeout: Function;

            onStart: MiniSignal;
            onProgress: MiniSignal;
            onComplete: MiniSignal;
            onAfterMiddleware: MiniSignal;

            isDataUrl: boolean;
            isComplete: boolean;
            isLoading: boolean;
            complete(): void;
            abort(message?: string): void;
            load(cb?: Function): void;

            protected _hasFlag(flag: number): boolean;
            protected _setFlag(flag: number, value: boolean): void;
            protected _loadElement(type: string): void;
            protected _loadSourceElement(type: string): void;
            protected _loadXhr(): void;
            protected _loadXdr(): void;
            protected _createSource(type: string, url: string, mime?: string): HTMLSourceElement;
            protected _onError(event?: any): void;
            protected _onProgress(event?: any): void;
            protected _xhrOnError(): void;
            protected _xhrOnAbort(): void;
            protected _xdrOnTimeout(): void;
            protected _xhrOnLoad(): void;
            protected _determineCrossOrigin(url: string, loc: any): string;
            protected _determineXhrType(): number;
            protected _determineLoadType(): number;
            protected _getExtension(): string;
            protected _getMimeXhrType(type: number): string;

            static STATUS_FLAGS: {
                NONE: number;
                DATA_URL: number;
                COMPLETE: number;
                LOADING: number;
            };

            static TYPE: {
                UNKNOWN: number;
                JSON: number;
                XML: number;
                IMAGE: number;
                AUDIO: number;
                VIDEO: number;
                TEXT: number;
            };

            static LOAD_TYPE: {
                XHR: number;
                IMAGE: number;
                AUDIO: number;
                VIDEO: number;
            };

            static XHR_RESPONSE_TYPE: {
                DEFAULT: number;
                BUFFER: number;
                BLOB: number;
                DOCUMENT: number;
                JSON: number;
                TEXT: number;
            };

            static EMPTY_GIF: string;

        }
    }

    //////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////MESH///////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////

    export module mesh {

        export class Mesh extends Container {

            constructor(texture: Texture, vertices?: Float32Array, uvs?: Float32Array, indices?: Uint16Array, drawMode?: number);

            protected _texture: Texture;
            uvs: Float32Array;
            vertices: Float32Array;
            indices: Uint16Array;
            dirty: number;
            indexDirty: number;
            dirtyVertex: boolean;
            protected _geometryVersion: number;
            blendMode: number;
            pluginName: string;
            canvasPadding: number;
            drawMode: number;
            texture: Texture;
            tintRgb: Float32Array;
            protected _glDatas: { [n: number]: any; };
            protected _renderWebGL(renderer: WebGLRenderer): void;
            protected _renderCanvas(renderer: CanvasRenderer): void;
            protected _onTextureUpdate(): void;
            protected _calculateBounds(): void;
            containsPoint(point: Point): boolean;
            tint: number;

            static DRAW_MODES: {
                TRIANGLE_MESH: number;
                TRIANGLES: number;
            };

        }

        export class CanvasMeshRenderer {

            constructor(renderer: CanvasRenderer);

            renderer: CanvasRenderer;

            render(mesh: Mesh): void;
            protected _renderTriangleMesh(mesh: Mesh): void;
            protected _renderTriangles(mesh: Mesh): void;
            protected _renderDrawTriangle(mesh: Mesh, index0: number, index1: number, index2: number): void;
            protected renderMeshFlat(mesh: Mesh): void;

            destroy(): void;

        }

        export class MeshRenderer extends ObjectRenderer {

            constructor(renderer: WebGLRenderer);

            shader: Shader;
            render(mesh: Mesh): void;

        }

        export class Plane extends Mesh {

            constructor(texture: Texture, verticesX?: number, verticesY?: number);
            protected _ready: boolean;
            verticesX: number;
            verticesY: number;
            drawMode: number;

            refresh(): void;

            protected _onTexureUpdate(): void;

        }

        export class NineSlicePlane extends Plane {

            constructor(texture: Texture, leftWidth?: number, topHeight?: number, rightWidth?: number, bottomHeight?: number);

            width: number;
            height: number;
            leftWidth: number;
            rightWidth: number;
            topHeight: number;
            bottomHeight: number;

            protected _leftWidth: number;
            protected _rightWidth: number;
            protected _topHeight: number;
            protected _bottomHeight: number;
            protected _height: number;
            protected _width: number;
            protected _origHeight: number;
            protected _origWidth: number;
            protected _uvh: number;
            protected _uvw: number;

            updateHorizontalVertices(): void;
            updateVerticalVertices(): void;
            protected drawSegment(context: CanvasRenderingContext2D | WebGLRenderingContext, textureSource: any, w: number, h: number, x1: number, y1: number, x2: number, y2: number): void;

        }

        export class Rope extends Mesh {

            constructor(texture: Texture, points: Point[]);

            points: Point[];
            colors: number[];
            protected _ready: boolean;
            refresh(): void;

            protected _onTextureUpdate(): void;
            updateTransform(): void;

        }
    }

    //////////////////////////////////////////////////////////////////////////////
    /////////////////////////////PARTICLES////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////

    export module particles {

        export interface IParticleContainerProperties {

            scale?: boolean;
            position?: boolean;
            rotation?: boolean;
            uvs?: boolean;
            alpha?: boolean;

        }
        export class ParticleContainer extends Container {

            constructor(size?: number, properties?: IParticleContainerProperties, batchSize?: number);

            protected _properties: boolean[];
            protected _maxSize: number;
            protected _batchSize: number;
            protected _glBuffers: { [n: number]: WebGLBuffer; };
            protected _bufferToUpdate: number;
            interactiveChildren: boolean;
            blendMode: number;
            roundPixels: boolean;
            baseTexture: BaseTexture;

            setProperties(properties: IParticleContainerProperties): void;
            protected onChildrenChange: (smallestChildIndex?: number) => void;

            destroy(options?: IDestroyOptions | boolean): void;

        }
        export class ParticleBuffer {

            constructor(gl: WebGLRenderingContext, properties: any, dynamicPropertyFlags: any[], size: number);

            gl: WebGLRenderingContext;
            vertSize: number;
            vertByteSize: number;
            size: number;
            dynamicProperties: any[];
            staticProperties: any[];
            staticStride: number;
            staticBuffer: any;
            staticData: any;
            dynamicStride: number;
            dynamicBuffer: any;
            dynamicData: any;

            destroy(): void;

        }
        export interface IParticleRendererProperty {
            attribute: number;
            size: number;
            uploadFunction: (children: PIXI.DisplayObject[], startIndex: number, amount: number, array: number[], stride: number, offset: number) => void;
            offset: number;
        }
        export class ParticleRenderer extends ObjectRenderer {

            constructor(renderer: WebGLRenderer);

            shader: glCore.GLShader;
            indexBuffer: WebGLBuffer;
            properties: IParticleRendererProperty[];
            protected tempMatrix: Matrix;

            start(): void;
            generateBuffers(container: ParticleContainer): ParticleBuffer[];
            uploadVertices(children: DisplayObject[], startIndex: number, amount: number, array: number[], stride: number, offset: number): void;
            uploadPosition(children: DisplayObject[], startIndex: number, amount: number, array: number[], stride: number, offset: number): void;
            uploadRotation(children: DisplayObject[], startIndex: number, amount: number, array: number[], stride: number, offset: number): void;
            uploadUvs(children: DisplayObject[], startIndex: number, amount: number, array: number[], stride: number, offset: number): void;
            uploadAlpha(children: DisplayObject[], startIndex: number, amount: number, array: number[], stride: number, offset: number): void;
            destroy(): void;

            indices: Uint16Array;

        }
        export interface IParticleShader extends glCore.GLShader { }

    }

    //////////////////////////////////////////////////////////////////////////////
    ////////////////////////////PREPARE///////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////

    export module prepare {

        interface addHook {
            (item: any, queue: any[]): boolean;
        }
        interface uploadHook<UploadHookSource> {
            (prepare: UploadHookSource, item: any): boolean
        }
        export abstract class BasePrepare<UploadHookSource>{

            constructor(renderer: SystemRenderer);

            limiter: CountLimiter | TimeLimiter;
            protected renderer: SystemRenderer;
            protected uploadHookHelper: UploadHookSource;
            protected queue: any[];
            protected addHooks: addHook[];
            protected uploadHooks: uploadHook<UploadHookSource>[];
            protected completes: Function[];
            protected ticking: boolean;
            protected delayedTick: () => void;

            upload(item: Function | DisplayObject | BaseTexture | TextStyle | any, done?: () => void): void;
            protected tick(): void;
            protected prepareItems(): void;
            register(addHook?: addHook, uploadHook?: uploadHook<UploadHookSource>): this;
            add(item: DisplayObject | any): this;
            destroy(): void;

        }
        export class CanvasPrepare extends BasePrepare<CanvasPrepare> {

            constructor(renderer: CanvasRenderer);

            protected canvas: HTMLCanvasElement;
            protected ctx: CanvasRenderingContext2D;

        }
        export class WebGLPrepare extends BasePrepare<WebGLRenderer> {

            constructor(renderer: WebGLRenderer);

        }
        export class CountLimiter {

            constructor(maxItemsPerFrame: number);

            protected maxItemsPerFrame: number;
            protected itemsLeft: number;

        }
        export class TimeLimiter {

            constructor(maxMilliseconds: number);

            protected maxMilliseconds: number;
            protected frameStart: number;

        }

    }

    //////////////////////////////////////////////////////////////////////////////
    /////////////////////////////pixi-gl-core/////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////
    // pixi-gl-core https://github.com/pixijs/pixi-gl-core
    // sharedArrayBuffer as a type is not available yet.
    // need to fully define what an `Attrib` is.
    export module glCore {

        export interface IContextOptions {
            /**
             * Boolean that indicates if the canvas contains an alpha buffer.
             */
            alpha?: boolean;
            /**
             * Boolean that indicates that the drawing buffer has a depth buffer of at least 16 bits.
             */
            depth?: boolean;
            /**
             * Boolean that indicates that the drawing buffer has a stencil buffer of at least 8 bits.
             */
            stencil?: boolean;
            /**
             * Boolean that indicates whether or not to perform anti-aliasing.
             */
            antialias?: boolean;
            /**
             * Boolean that indicates that the page compositor will assume the drawing buffer contains colors with pre-multiplied alpha.
             */
            premultipliedAlpha?: boolean;
            /**
             * If the value is true the buffers will not be cleared and will preserve their values until cleared or overwritten by the author.
             */
            preserveDrawingBuffer?: boolean;
            /**
             *  Boolean that indicates if a context will be created if the system performance is low.
             */
            failIfMajorPerformanceCaveat?: boolean;
        }
        export function createContext(view: HTMLCanvasElement, options?: IContextOptions): WebGLRenderingContext;
        export function setVertexAttribArrays(gl: WebGLRenderingContext, attribs: IAttrib[], state?: WebGLState): WebGLRenderingContext;
        export class GLBuffer {

            static EMPTY_ARRAY_BUFFER: ArrayBuffer;

            constructor(gl: WebGLRenderingContext, type: number, data: ArrayBuffer | ArrayBufferView | any, drawType: number);

            protected _updateID: number;
            gl: WebGLRenderingContext;
            buffer: WebGLBuffer;
            type: number;
            drawType: number;
            data: ArrayBuffer | ArrayBufferView | any;

            upload(data: ArrayBuffer | ArrayBufferView | any, offset?: number, dontBind?: boolean): void;
            bind(): void;

            static createVertexBuffer(gl: WebGLRenderingContext, data: ArrayBuffer | ArrayBufferView | any, drawType: number): GLBuffer;
            static createIndexBuffer(gl: WebGLRenderingContext, data: ArrayBuffer | ArrayBufferView | any, drawType: number): GLBuffer;
            static create(gl: WebGLRenderingContext, type: number, data: ArrayBuffer | ArrayBufferView | any, drawType: number): GLBuffer;

            destroy(): void;

        }
        export class GLFramebuffer {

            constructor(gl: WebGLRenderingContext, width: number, height: number);

            gl: WebGLRenderingContext;
            frameBuffer: WebGLFramebuffer;
            stencil: WebGLRenderbuffer;
            texture: GLTexture;
            width: number;
            height: number;

            enableTexture(texture: GLTexture): void;
            enableStencil(): void;
            clear(r: number, g: number, b: number, a: number): void;
            bind(): void;
            unbind(): void;
            resize(width: number, height: number): void;
            destroy(): void;

            static createRGBA(gl: WebGLRenderingContext, width: number, height: number, data: ArrayBuffer | ArrayBufferView | any): GLFramebuffer;
            static createFloat32(gl: WebGLRenderingContext, width: number, height: number, data: ArrayBuffer | ArrayBufferView | any): GLFramebuffer;

        }
        export class GLShader {

            constructor(gl: WebGLRenderingContext, vertexSrc: string | string[], fragmentSrc: string | string[], precision: string, attributeLocations: { [key: string]: number });

            gl: WebGLRenderingContext;
            program: WebGLProgram;
            uniformData: any;
            uniforms: any;
            attributes: any;

            bind(): void;
            destroy(): void;

        }
        export class GLTexture {

            constructor(gl: WebGLRenderingContext, width?: number, height?: number, format?: number, type?: number);

            gl: WebGLRenderingContext;
            texture: WebGLTexture;
            mipmap: boolean;
            premultiplyAlpha: boolean;
            width: number;
            height: number;
            format: number;
            type: number;

            upload(source: HTMLImageElement | ImageData | HTMLVideoElement | HTMLCanvasElement): void;
            uploadData(data: number, width: number, height: number): void;
            bind(location?: number): void;
            unbind(): void;
            minFilter(linear: boolean): void;
            magFilter(linear: boolean): void;
            enableMipmap(): void;
            enableLinearScaling(): void;
            enableNearestScaling(): void;
            enableWrapClamp(): void;
            enableWrapRepeat(): void;
            enableWrapMirrorRepeat(): void;
            destroy(): void;

            static fromSource(gl: WebGLRenderingContext, source: HTMLImageElement | ImageData | HTMLVideoElement | HTMLCanvasElement, premultipleAlpha?: boolean): GLTexture;
            static fromData(gl: WebGLRenderingContext, data: number[], width: number, height: number): GLTexture;

        }
        export interface IAttrib {

            attribute: {
                location: boolean;
                size: number;
            };
            normalized: boolean;
            stride: number;
            start: number;
            buffer: ArrayBuffer;

        }
        export interface IWebGLRenderingContextAttribute {

            buffer: WebGLBuffer;
            attribute: any;
            type: number;
            normalized: boolean;
            stride: number;
            start: number;

        }
        export interface IAttribState {
            tempAttribState: IAttrib[];
            attribState: IAttrib[];
        }

        export class VertexArrayObject {

            static FORCE_NATIVE: boolean;

            constructor(gl: WebGLRenderingContext, state: WebGLState);

            protected nativeVaoExtension: any;
            protected nativeState: IAttribState;
            protected nativeVao: VertexArrayObject;
            gl: WebGLRenderingContext;
            attributes: IAttrib[];
            indexBuffer: GLBuffer;
            dirty: boolean;

            bind(): VertexArrayObject;
            unbind(): VertexArrayObject;
            activate(): VertexArrayObject;
            addAttribute(buffer: GLBuffer, attribute: IAttrib, type: number, normalized: boolean, stride: number, start: number): VertexArrayObject;
            addIndex(buffer: GLBuffer, options?: any): VertexArrayObject;
            clear(): VertexArrayObject;
            draw(type: number, size: number, start: number): VertexArrayObject;
            destroy(): void;
            getSize(): number;

        }

    }

    //////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////UTILS//////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////

    export interface IDecomposedDataUri {
        mediaType: string;
        subType: string;
        encoding: string;
        data: any;
    }

    export module utils {

        export function uid(): number;
        export function hex2rgb(hex: number, out?: number[]): number[];
        export function hex2string(hex: number): string;
        export function rgb2hex(rgb: Number[]): number;
        export function canUseNewCanvasBlendModes(): boolean;
        export function getResolutionOfUrl(url: string, defaultValue?: number): number;
        export function getSvgSize(svgString: string): any;
        export function decomposeDataUri(dataUri: string): IDecomposedDataUri;
        export function getUrlFileExtension(url: string): string;
        export function sayHello(type: string): void;
        export function skipHello(): void;
        export function isWebGLSupported(): boolean;
        export function sign(n: number): number;
        export function removeItems<T>(arr: T[], startIdx: number, removeCount: number): void;
        export var TextureCache: any;
        export var BaseTextureCache: any;

        //https://github.com/kaimallea/isMobile
        export module isMobile {
            export var apple: {
                phone: boolean;
                ipod: boolean;
                tablet: boolean;
                device: boolean;
            };
            export var android: {
                phone: boolean;
                tablet: boolean;
                device: boolean;
            }
            export var amazon: {
                phone: boolean;
                table: boolean;
                device: boolean;
            }
            export var windows: {
                phone: boolean;
                tablet: boolean;
                device: boolean;
            }
            export var seven_inch: boolean;
            export var other: {
                blackberry_10: boolean;
                blackberry: boolean;
                opera: boolean;
                firefox: boolean;
                chrome: boolean;
                device: boolean;
            }
            export var any: boolean;
            export var phone: boolean;
            export var tablet: boolean;
        }

        // https://github.com/primus/eventemitter3
        export class EventEmitter {

            listeners(event: string): Function[];
            emit(event: string, ...args: any[]): boolean;
            on(event: string, fn: Function, context?: any): EventEmitter;
            once(event: string, fn: Function, context?: any): EventEmitter;
            removeListener(event: string, fn: Function, context?: any, once?: boolean): EventEmitter;
            removeAllListeners(event: string): EventEmitter;
            eventNames(): string[];

            off(event: string, fn: Function, context?: any, once?: boolean): EventEmitter;
            addListener(event: string, fn: Function, context?: any): EventEmitter;

        }

    }

    //////////////////////////////////////////////////////////////////////////////
    /////////////////////////////depreciation/////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////
    // not sure how to handle blendmodes scalemodes basetexturecache
    module core {

        /**
         * @class
         * @private
         * @name SpriteBatch
         * @memberof PIXI
         * @see PIXI.ParticleContainer
         * @throws {ReferenceError} SpriteBatch does not exist any more, please use the new ParticleContainer instead.
         * @deprecated since version 3.0.0
         */
        type SpriteBatch = ParticleContainer;

        /**
         * @class
         * @private
         * @name AssetLoader
         * @memberof PIXI
         * @see PIXI.loaders.Loader
         * @throws {ReferenceError} The loader system was overhauled in pixi v3, please see the new PIXI.loaders.Loader class.
         * @deprecated since version 3.0.0
         */
        type AssetLoader = loaders.Loader;

        /**
         * @class
         * @private
         * @name Stage
         * @memberof PIXI
         * @see PIXI.Container
         * @deprecated since version 3.0.0
         */
        type Stage = Container;

        /**
         * @class
         * @private
         * @name DisplayObjectContainer
         * @memberof PIXI
         * @see PIXI.Container
         * @deprecated since version 3.0.0
         */
        type DisplayObjectContainer = Container;

        /**
         * @class
         * @private
         * @name Strip
         * @memberof PIXI
         * @see PIXI.mesh.Mesh
         * @deprecated since version 3.0.0
         */
        type Strip = mesh.Mesh;

        /**
         * @class
         * @private
         * @name Rope
         * @memberof PIXI
         * @see PIXI.mesh.Rope
         * @deprecated since version 3.0.0
         */
        type Rope = mesh.Rope;

        /**
         * @class
         * @private
         * @name ParticleContainer
         * @memberof PIXI
         * @see PIXI.particles.ParticleContainer
         * @deprecated since version 4.0.0
         */
        type ParticleContainer = particles.ParticleContainer;

        /**
         * @class
         * @private
         * @name MovieClip
         * @memberof PIXI
         * @see PIXI.extras.MovieClip
         * @deprecated since version 3.0.0
         */
        type MovieClip = extras.AnimatedSprite

        /**
         * @class
         * @private
         * @name TilingSprite
         * @memberof PIXI
         * @see PIXI.extras.TilingSprite
         * @deprecated since version 3.0.0
         */
        type TilingSprite = extras.TilingSprite;

        /**
         * @class
         * @private
         * @name BitmapText
         * @memberof PIXI
         * @see PIXI.extras.BitmapText
         * @deprecated since version 3.0.0
         */
        type BitmapText = extras.BitmapText;

        /**
         * @namespace
         * @private
         * @name math
         * @memberof PIXI
         * @see PIXI
         * @deprecated since version 3.0.6
         */
        type math = any;

        /**
         * @class
         * @private
         * @name PIXI.AbstractFilter
         * @see PIXI.Filter
         * @deprecated since version 3.0.6
         */
        type AbstractFilter = Filter;

        /**
         * @class
         * @private
         * @name PIXI.TransformManual
         * @see PIXI.TransformBase
         * @deprecated since version 4.0.0
         */
        type TransformManual = TransformBase;

        /**
         * @static
         * @constant
         * @name PIXI.TARGET_FPMS
         * @see PIXI.settings.TARGET_FPMS
         * @deprecated since version 4.2.0
         */
        type TARGET_FPMS = number;

        /**
         * @static
         * @constant
         * @name PIXI.FILTER_RESOLUTION
         * @see PIXI.settings.FILTER_RESOLUTION
         * @deprecated since version 4.2.0
         */
        type FILTER_RESOLUTION = number;

        /**
         * @static
         * @constant
         * @name PIXI.RESOLUTION
         * @see PIXI.settings.RESOLUTION
         * @deprecated since version 4.2.0
         */
        type RESOLUTION = number;

        /**
         * @static
         * @constant
         * @name PIXI.MIPMAP_TEXTURES
         * @see PIXI.settings.MIPMAP_TEXTURES
         * @deprecated since version 4.2.0
         */
        type MIPMAP_TEXTURES = any;

        /**
         * @static
         * @constant
         * @name PIXI.SPRITE_BATCH_SIZE
         * @see PIXI.settings.SPRITE_BATCH_SIZE
         * @deprecated since version 4.2.0
         */
        type SPRITE_BATCH_SIZE = number;

        /**
         * @static
         * @constant
         * @name PIXI.SPRITE_MAX_TEXTURES
         * @see PIXI.settings.SPRITE_MAX_TEXTURES
         * @deprecated since version 4.2.0
         */
        type SPRITE_MAX_TEXTURES = number;

        /**
         * @static
         * @constant
         * @name PIXI.RETINA_PREFIX
         * @see PIXI.settings.RETINA_PREFIX
         * @deprecated since version 4.2.0
         */
        type RETINA_PREFIX = RegExp | string;

        /**
         * @static
         * @constant
         * @name PIXI.DEFAULT_RENDER_OPTIONS
         * @see PIXI.settings.RENDER_OPTIONS
         * @deprecated since version 4.2.0
         */
        type DEFAULT_RENDER_OPTIONS = number;

    }

    export module extras {

        /**
         * @class
         * @name MovieClip
         * @memberof PIXI.extras
         * @see PIXI.extras.AnimatedSprite
         * @deprecated since version 4.2.0
         */
        type MovieClip = extras.AnimatedSprite;

    }

}

declare module pixi {
    export var gl: typeof PIXI.glCore;
}

declare module "pixi.js" {
    export = PIXI;
}

// Generated by typings
// Source: custom_typings/box2d/index.d.ts
declare namespace Box2D.Common {

	/**
	* Color for debug drawing.  Each value has the range [0, 1].
	**/
	export class b2Color {

		/**
		* Red
		**/
		public r: number;

		/**
		* Green
		**/
		public g: number;

		/**
		* Blue
		**/
		public b: number;

		/**
		* RGB color as hex.
		* @type uint
		**/
		public color: number;

		/**
		* Constructor
		* @param rr Red value
		* @param gg Green value
		* @param bb Blue value
		**/
		constructor(rr: number, gg: number, bb: number);

		/**
		* Sets the Color to new RGB values.
		* @param rr Red value
		* @param gg Green value
		* @param bb Blue value
		**/
		public Set(rr: number, gg: number, bb: number): void;
	}
}

declare namespace Box2D.Common {

	/**
	* Controls Box2D global settings.
	**/
	export class b2Settings {

		/**
		* b2Assert is used internally to handle assertions. By default, calls are commented out to save performance, so they serve more as documentation than anything else.
		* @param a Asset an expression is true.
		**/
		public static b2Assert(a: boolean): void;

		/**
		* Friction mixing law. Feel free to customize this.
		* Friction values are usually set between 0 and 1. (0 = no friction, 1 = high friction)
		* By default this is `return Math.sqrt(friction1, friction2);`
		* @param friction1 Friction 1 to mix.
		* @param friction2 Friction 2 to mix.
		* @return The two frictions mixed as one value.
		**/
		public static b2MixFriction(friction1: number, friction2: number): number;

		/**
		* Restitution mixing law. Feel free to customize this.  Restitution is used to make objects bounce.
		* Restitution values are usually set between 0 and 1. (0 = no bounce (inelastic), 1 = perfect bounce (perfectly elastic))
		* By default this is `return Math.Max(restitution1, restitution2);`
		* @param restitution1 Restitution 1 to mix.
		* @param restitution2 Restitution 2 to mix.
		* @return The two restitutions mixed as one value.
		**/
		public static b2MixRestitution(restitution1: number, restitution2: number): number;

		/**
		* This is used to fatten AABBs in the dynamic tree. This allows proxies to move by a small amount without triggering a tree adjustment. This is in meters.
		**/
		public static b2_aabbExtension: number;

		/**
		* This is used to fatten AABBs in the dynamic tree. This is used to predict the future position based on the current displacement. This is a dimensionless multiplier.
		**/
		public static b2_aabbMultiplier: number;

		/**
		* A body cannot sleep if its angular velocity is above this tolerance.
		**/
		public static b2_angularSleepTolerance: number;

		/**
		* A small angle used as a collision and constraint tolerance. Usually it is chosen to be numerically significant, but visually insignificant.
		**/
		public static b2_angularSlop: number;

		/**
		* This scale factor controls how fast overlap is resolved. Ideally this would be 1 so that overlap is removed in one time step. However using values close to 1 often lead to overshoot.
		**/
		public static b2_contactBaumgarte: number;

		/**
		* A body cannot sleep if its linear velocity is above this tolerance.
		**/
		public static b2_linearSleepTolerance: number;

		/**
		* A small length used as a collision and constraint tolerance. Usually it is chosen to be numerically significant, but visually insignificant.
		**/
		public static b2_linearSlop: number;

		/**
		* The maximum angular position correction used when solving constraints. This helps to prevent overshoot.
		**/
		public static b2_maxAngularCorrection: number;

		/**
		* The maximum linear position correction used when solving constraints. This helps to prevent overshoot.
		**/
		public static b2_maxLinearCorrection: number;

		/**
		* Number of manifold points in a b2Manifold. This should NEVER change.
		**/
		public static b2_maxManifoldPoints: number;

		/**
		* The maximum angular velocity of a body. This limit is very large and is used to prevent numerical problems. You shouldn't need to adjust this.
		**/
		public static b2_maxRotation: number;

		/**
		* b2_maxRotation squared
		**/
		public static b2_maxRotationSquared: number;

		/**
		* Maximum number of contacts to be handled to solve a TOI island.
		**/
		public static b2_maxTOIContactsPerIsland: number;

		/**
		* Maximum number of joints to be handled to solve a TOI island.
		**/
		public static b2_maxTOIJointsPerIsland: number;

		/**
		* The maximum linear velocity of a body. This limit is very large and is used to prevent numerical problems. You shouldn't need to adjust this.
		**/
		public static b2_maxTranslation: number;

		/**
		* b2_maxTranslation squared
		**/
		public static b2_maxTranslationSquared: number;

		/**
		* 3.141592653589793
		**/
		public static b2_pi: number;

		/**
		* The radius of the polygon/edge shape skin. This should not be modified. Making this smaller means polygons will have and insufficient for continuous collision. Making it larger may create artifacts for vertex collision.
		**/
		public static b2_polygonRadius: number;

		/**
		* The time that a body must be still before it will go to sleep.
		**/
		public static b2_timeToSleep: number;

		/**
		* Continuous collision detection (CCD) works with core, shrunken shapes. This is the amount by which shapes are automatically shrunk to work with CCD. This must be larger than b2_linearSlop.
		* @see also b2_linearSlop
		**/
		public static b2_toiSlop: number;

		/**
		* A velocity threshold for elastic collisions. Any collision with a relative linear velocity below this threshold will be treated as inelastic.
		**/
		public static b2_velocityThreshold: number;


		/**
		* Maximum unsigned short value.
		**/
		public static USHRT_MAX: number;

		/**
		* The current version of Box2D.
		**/
		public static VERSION: string;
	}
}

declare namespace Box2D.Common.Math {

	/**
	* A 2-by-2 matrix.  Stored in column-major order.
	**/
	export class b2Mat22 {

		/**
		* Column 1
		**/
		public col1: b2Vec2;

		/**
		* Column 2
		**/
		public col2: b2Vec2;

		/**
		* Empty constructor
		**/
		constructor();

		/**
		* Sets all internal matrix values to absolute values.
		**/
		public Abs(): void;

		/**
		* Adds the two 2x2 matricies together and stores the result in this matrix.
		* @param m 2x2 matrix to add.
		**/
		public AddM(m: b2Mat22): void;

		/**
		* Creates a copy of the matrix.
		* @return Copy of this 2x2 matrix.
		**/
		public Copy(): b2Mat22;

		/**
		* Creates a rotation 2x2 matrix from the given angle.
		* R(theta) = [ cos(theta)  -sin(theta) ]
		*            [ sin(theta)   cos(theta) ]
		* @param angle Matrix angle (theta).
		* @return 2x2 matrix.
		**/
		public static FromAngle(angle: number): b2Mat22;

		/**
		* Creates a 2x2 matrix from two columns.
		* @param c1 Column 1 vector.
		* @param c2 Column 2 vector.
		* @return 2x2 matrix.
		**/
		public static FromVV(c1: b2Vec2, c2: b2Vec2): b2Mat22;

		/**
		* Gets the rotation matrix angle.
		* R(theta) = [ cos(theta)  -sin(theta) ]
		*            [ sin(theta)   cos(theta) ]
		* @return The rotation matrix angle (theta).
		**/
		public GetAngle(): number;

		/**
		* Compute the inverse of this matrix, such that inv(A) A = identity.
		* @param out Inverse matrix.
		* @return Inverse matrix.
		**/
		public GetInverse(out: b2Mat22): b2Mat22;

		/**
		* Sets the 2x2 rotation matrix from the given angle.
		* R(theta) = [ cos(theta)  -sin(theta) ]
		*            [ sin(theta)   cos(theta) ]
		* @param angle Matrix angle (theta).
		**/
		public Set(angle: number): void;

		/**
		* Sets the 2x2 matrix to identity.
		**/
		public SetIdentity(): void;

		/**
		* Sets the 2x2 matrix from a 2x2 matrix.
		* @param m 2x2 matrix values.
		**/
		public SetM(m: b2Mat22): void;

		/**
		* Sets the 2x2 matrix from 2 column vectors.
		* @param c1 Column 1 vector.
		* @param c2 Column 2 vector.
		**/
		public SetVV(c1: b2Vec2, c2: b2Vec2): void;

		/**
		* Sets the 2x2 matrix to all zeros.
		**/
		public SetZero(): void;

		/**
		* TODO, has something to do with the determinant
		* @param out Solved vector
		* @param bX
		* @param bY
		* @return Solved vector
		**/
		public Solve(out: b2Vec2, bX: number, bY: number): b2Vec2;
	}
}

declare namespace Box2D.Common.Math {

	/**
	* A 3-by3 matrix.  Stored in column-major order.
	**/
	export class b2Mat33 {

		/**
		* Column 1
		**/
		public col1: b2Vec3;

		/**
		* Column 2
		**/
		public col2: b2Vec3;

		/**
		* Column 3
		**/
		public col3: b2Vec3;

		/**
		* Constructor
		* @param c1 Column 1
		* @param c2 Column 2
		* @param c3 Column 3
		**/
		constructor(c1: b2Vec3, c2: b2Vec3, c3: b2Vec3);

		/**
		* Adds the two 3x3 matricies together and stores the result in this matrix.
		* @param m 3x3 matrix to add.
		**/
		public AddM(m: b2Mat33): void;

		/**
		* Creates a copy of the matrix.
		* @return Copy of this 3x3 matrix.
		**/
		public Copy(): b2Mat33;

		/**
		* Sets the 3x3 matrix to identity.
		**/
		public SetIdentity(): void;

		/**
		* Sets the 3x3 matrix from a 3x3 matrix.
		* @param m 3x3 matrix values.
		**/
		public SetM(m: b2Mat33): void;

		/**
		* Sets the 3x3 matrix from 3 column vectors.
		* @param c1 Column 1 vector.
		* @param c2 Column 2 vector.
		* @param c3 Column 2 vector.
		**/
		public SetVVV(c1: b2Vec3, c2: b2Vec3, c3: b2Vec3): void;

		/**
		* Sets the 3x3 matrix to all zeros.
		**/
		public SetZero(): void;

		/**
		* TODO, has something to do with the determinant
		* @param out Solved vector
		* @param bX
		* @param bY
		* @return Solved vector
		**/
		public Solve22(out: b2Vec2, bX: number, bY: number): b2Vec2;

		/**
		* TODO, has something to do with the determinant
		* @param out Solved vector
		* @param bX
		* @param bY
		* @param bZ
		* @return Solved vector
		**/
		public Solve33(out: b2Vec3, bX: number, bY: number, bZ: number): b2Vec3;
	}
}

declare namespace Box2D.Common.Math {

	/**
	* Math utility functions.
	**/
	export class b2Math {

		/**
		* Determines if a number is valid.  A number is valid if it is finite.
		* @param x Number to check for validity.
		* @return True if x is valid, otherwise false.
		**/
		public static IsValid(x: number): boolean;

		/**
		* Dot product of two vector 2s.
		* @param a Vector 2 to use in dot product.
		* @param b Vector 2 to use in dot product.
		* @return Dot product of a and b.
		**/
		public static Dot(a: b2Vec2, b: b2Vec2): number;

		/**
		* Cross product of two vector 2s.
		* @param a Vector 2 to use in cross product.
		* @param b Vector 2 to use in cross product.
		* @return Cross product of a and b.
		**/
		public static CrossVV(a: b2Vec2, b: b2Vec2): number;

		/**
		* Cross product of vector 2 and s.
		* @param a Vector 2 to use in cross product.
		* @param s s value.
		* @return Cross product of a and s.
		**/
		public static CrossVF(a: b2Vec2, s: number): b2Vec2;

		/**
		* Cross product of s and vector 2.
		* @param s s value.
		* @param a Vector 2 to use in cross product.
		* @return Cross product of s and a.
		**/
		public static CrossFV(s: number, a: b2Vec2): b2Vec2;

		/**
		* Multiply matrix and vector.
		* @param A Matrix.
		* @param v Vector.
		* @return Result.
		**/
		public static MulMV(A: b2Mat22, v: b2Vec2): b2Vec2;

		/**
		*
		* @param A
		* @param v
		* @return
		**/
		public static MulTMV(A: b2Mat22, v: b2Vec2): b2Vec2;

		/**
		*
		* @param T
		* @param v
		* @return
		**/
		public static MulX(T: b2Transform, v: b2Vec2): b2Vec2;

		/**
		*
		* @param T
		* @param v
		* @return
		**/
		public static MulXT(T: b2Transform, v: b2Vec2): b2Vec2;

		/**
		* Adds two vectors.
		* @param a First vector.
		* @param b Second vector.
		* @return a + b.
		**/
		public static AddVV(a: b2Vec2, b: b2Vec2): b2Vec2;

		/**
		* Subtracts two vectors.
		* @param a First vector.
		* @param b Second vector.
		* @return a - b.
		**/
		public static SubtractVV(a: b2Vec2, b: b2Vec2): b2Vec2;

		/**
		* Calculates the distance between two vectors.
		* @param a First vector.
		* @param b Second vector.
		* @return Distance between a and b.
		**/
		public static Distance(a: b2Vec2, b: b2Vec2): number;

		/**
		* Calculates the squared distance between two vectors.
		* @param a First vector.
		* @param b Second vector.
		* @return dist^2 between a and b.
		**/
		public static DistanceSquared(a: b2Vec2, b: b2Vec2): number;

		/**
		*
		* @param s
		* @param a
		* @return
		**/
		public static MulFV(s: number, a: b2Vec2): b2Vec2;

		/**
		*
		* @param A
		* @param B
		* @return
		**/
		public static AddMM(A: b2Mat22, B: b2Mat22): b2Mat22;

		/**
		*
		* @param A
		* @param B
		* @return
		**/
		public static MulMM(A: b2Mat22, B: b2Mat22): b2Mat22;

		/**
		*
		* @param A
		* @param B
		* @return
		**/
		public static MulTMM(A: b2Mat22, B: b2Mat22): b2Mat22;

		/**
		* Creates an ABS number.
		* @param a Number to ABS.
		* @return Absolute value of a.
		**/
		public static Abs(a: number): number;

		/**
		* Creates an ABS vector.
		* @param a Vector to ABS all values.
		* @return Vector with all positive values.
		**/
		public static AbsV(a: b2Vec2): b2Vec2;

		/**
		* Creates an ABS matrix.
		* @param A Matrix to ABS all values.
		* @return Matrix with all positive values.
		**/
		public static AbsM(A: b2Mat22): b2Mat22;

		/**
		* Determines the minimum number.
		* @param a First number.
		* @param b Second number.
		* @return a or b depending on which is the minimum.
		**/
		public static Min(a: number, b: number): number;

		/**
		* Determines the minimum vector.
		* @param a First vector.
		* @param b Second vector.
		* @return a or b depending on which is the minimum.
		**/
		public static MinV(a: b2Vec2, b: b2Vec2): b2Vec2;

		/**
		* Determines the max number.
		* @param a First number.
		* @param b Second number.
		* @return a or b depending on which is the maximum.
		**/
		public static Max(a: number, b: number): number;

		/**
		* Determines the max vector.
		* @param a First vector.
		* @param b Second vector.
		* @return a or b depending on which is the maximum.
		**/
		public static MaxV(a: b2Vec2, b: b2Vec2): b2Vec2;

		/**
		* Clamp a number to the range of low to high.
		* @param a Number to clamp.
		* @param low Low range.
		* @param high High range.
		* @return Number a clamped to range of low to high.
		**/
		public static Clamp(a: number, low: number, high: number): number;

		/**
		* Clamps a vector to the range of low to high.
		* @param a Vector to clamp.
		* @param low Low range.
		* @param high High range.
		* @return Vector a clamped to range of low to high.
		**/
		public static ClampV(a: b2Vec2, low: b2Vec2, high: b2Vec2): b2Vec2;

		/**
		* Swaps a and b objects.
		* @param a a -> b.
		* @param b b -> a.
		**/
		public static Swap(a: any, b: any): void;

		/**
		* Generates a random number.
		* @param return Random number.
		**/
		public static Random(): number;

		/**
		* Returns a random number between lo and hi.
		* @param lo Lowest random number.
		* @param hi Highest random number.
		* @return Number between lo and hi.
		**/
		public static RandomRange(lo: number, hi: number): number;

		/**
		* Calculates the next power of 2 after the given number.
		* @param x Number to start search for the next power of 2.
		* @return The next number that is a power of 2.
		**/
		public static NextPowerOfTwo(x: number): number;

		/**
		* Check if a number is a power of 2.
		* @param x Number to check if it is a power of 2.
		* @return True if x is a power of 2, otherwise false.
		**/
		public static IsPowerOfTwo(x: number): boolean;

		/**
		* Global instance of a zero'ed vector.  Use as read-only.
		**/
		public static b2Vec2_zero: b2Vec2;

		/**
		* Global instance of a 2x2 identity matrix.  Use as read-only.
		**/
		public static b2Mat22_identity: b2Mat22;

		/**
		* Global instance of an identity transform.  Use as read-only.
		**/
		public static b2Transform_identity: b2Transform;
	}
}

declare namespace Box2D.Common.Math {

	/**
	* This describes the motion of a body/shape for TOI computation. Shapes are defined with respect to the body origin, which may no coincide with the center of mass. However, to support dynamics we must interpolate the center of mass position.
	**/
	export class b2Sweep {

		/**
		* World angle.
		**/
		public a: number;

		/**
		* World angle.
		**/
		public a0: number;

		/**
		* Center world position.
		**/
		public c: b2Vec2;

		/**
		* Center world position.
		**/
		public c0: b2Vec2;

		/**
		* Local center of mass position.
		**/
		public localCenter: b2Vec2;

		/**
		* Time interval = [t0,1], where t0 is in [0,1].
		**/
		public t0: b2Vec2;

		/**
		* Advance the sweep forward, yielding a new initial state.
		* @t The new initial time.
		**/
		public Advance(t: number): void;

		/**
		* Creates a copy of the sweep.
		**/
		public Copy(): b2Sweep;

		/**
		* Get the interpolated transform at a specific time.
		* @param xf Transform at specified time, this is an out parameter.
		* @param alpha Is a factor in [0,1], where 0 indicates t0.
		**/
		public GetTransform(xf: b2Transform, alpha: number): void;

		/**
		* Sets the sweep from a sweep.
		* @param other Sweep values to copy from.
		**/
		public Set(other: b2Sweep): void;
	}
}

declare namespace Box2D.Common.Math {

	/**
	* A transform contains translation and rotation. It is used to represent the position and orientation of rigid frames.
	**/
	export class b2Transform {

		/**
		* Transform position.
		**/
		public position: b2Vec2;

		/**
		* Transform rotation.
		**/
		public R: b2Mat22;

		/**
		* The default constructor does nothing (for performance).
		* @param pos Position
		* @param r Rotation
		**/
		constructor(pos: b2Vec2, r: b2Mat22);

		/**
		* Calculate the angle that the rotation matrix represents.
		* @return Rotation matrix angle.
		**/
		public GetAngle(): number;

		/**
		* Initialize using a position vector and rotation matrix.
		* @param pos Position
		* @param r Rotation
		**/
		public Initialize(pos: b2Vec2, r: b2Mat22): void;

		/**
		* Sets the transfrom from a transfrom.
		* @param x Transform to copy values from.
		**/
		public Set(x: b2Transform): void;

		/**
		* Set this to the identity transform.
		**/
		public SetIdentity(): void;
	}
}

declare namespace Box2D.Common.Math {

	/**
	* A 2D column vector.
	**/
	export class b2Vec2 {

		/**
		* x value
		**/
		public x: number;

		/**
		* y value
		**/
		public y: number;

		/**
		* Creates a new vector 2.
		* @param x x value, default = 0.
		* @param y y value, default = 0.
		**/
		constructor(x?: number, y?: number);

		/**
		* Sets x and y to absolute values.
		**/
		public Abs(): void;

		/**
		* Adds the vector 2 to this vector 2.  The result is stored in this vector 2.
		* @param v Vector 2 to add.
		**/
		public Add(v: b2Vec2): void;

		/**
		* Creates a copy of the vector 2.
		* @return Copy of this vector 2.
		**/
		public Copy(): b2Vec2;

		/**
		* Cross F V
		* @param s
		**/
		public CrossFV(s: number): void;

		/**
		* Cross V F
		* @param s
		**/
		public CrossVF(s: number): void;

		/**
		* Gets the negative of this vector 2.
		* @return Negative copy of this vector 2.
		**/
		public GetNegative(): b2Vec2;

		/**
		* True if the vector 2 is valid, otherwise false.  A valid vector has finite values.
		* @return True if the vector 2 is valid, otherwise false.
		**/
		public IsValid(): boolean;

		/**
		* Calculates the length of the vector 2.
		* @return The length of the vector 2.
		**/
		public Length(): number;

		/**
		* Calculates the length squared of the vector2.
		* @return The length squared of the vector 2.
		**/
		public LengthSquared(): number;

		/**
		* Creates a new vector 2 from the given values.
		* @param x x value.
		* @param y y value.
		**/
		public static Make(x: number, y: number): b2Vec2;

		/**
		* Calculates which vector has the maximum values and sets this vector to those values.
		* @param b Vector 2 to compare for maximum values.
		**/
		public MaxV(b: b2Vec2): void;

		/**
		* Calculates which vector has the minimum values and sets this vector to those values.
		* @param b Vector 2 to compare for minimum values.
		**/
		public MinV(b: b2Vec2): void;

		/**
		* Matrix multiplication.  Stores the result in this vector 2.
		* @param A Matrix to muliply by.
		**/
		public MulM(A: b2Mat22): void;

		/**
		* Vector multiplication.  Stores the result in this vector 2.
		* @param a Value to multiple the vector's values by.
		**/
		public Multiply(a: number): void;

		/**
		* Dot product multiplication.  Stores the result in this vector 2.
		* @param A Matrix to multiply by.
		**/
		public MulTM(A: b2Mat22): void;

		/**
		* Sets this vector 2 to its negative.
		**/
		public NegativeSelf(): void;

		/**
		* Normalizes the vector 2 [0,1].
		* @return Length.
		**/
		public Normalize(): number;

		/**
		* Sets the vector 2.
		* @param x x value, default is 0.
		* @param y y value, default is 0.
		**/
		public Set(x?: number, y?: number): void;

		/**
		* Sets the vector 2 from a vector 2.
		* @param v Vector 2 to copy values from.
		**/
		public SetV(v: b2Vec2): void;

		/**
		* Sets the vector 2 to zero values.
		**/
		public SetZero(): void;

		/**
		* Subtracts the vector 2 from this vector 2.  The result is stored in this vector 2.
		* @param v Vector 2 to subtract.
		**/
		public Subtract(v: b2Vec2): void;
	}
}

declare namespace Box2D.Common.Math {

	/**
	* A 2D column vector with 3 elements.
	**/
	export class b2Vec3 {

		/**
		* x value.
		**/
		public x: number;

		/**
		* y value.
		**/
		public y: number;

		/**
		* z value.
		**/
		public z: number;

		/**
		* Construct using coordinates x,y,z.
		* @param x x value, default = 0.
		* @param y y value, default = 0.
		* @param z z value, default = 0.
		**/
		constructor(x?: number, y?: number, z?: number);

		/**
		* Adds the vector 3 to this vector 3.  The result is stored in this vector 3.
		* @param v Vector 3 to add.
		**/
		public Add(v: b2Vec3): void;

		/**
		* Creates a copy of the vector 3.
		* @return Copy of this vector 3.
		**/
		public Copy(): b2Vec3;

		/**
		* Gets the negative of this vector 3.
		* @return Negative copy of this vector 3.
		**/
		public GetNegative(): b2Vec3;

		/**
		* Vector multiplication.  Stores the result in this vector 3.
		* @param a Value to multiple the vector's values by.
		**/
		public Multiply(a: number): void;

		/**
		* Sets this vector 3 to its negative.
		**/
		public NegativeSelf(): void;

		/**
		* Sets the vector 3.
		* @param x x value, default is 0.
		* @param y y value, default is 0.
		* @param z z value, default is 0.
		**/
		public Set(x?: number, y?: number, z?: number): void;

		/**
		* Sets the vector 3 from a vector 3.
		* @param v Vector 3 to copy values from.
		**/
		public SetV(v: b2Vec3): void;

		/**
		* Sets the vector 3 to zero values.
		**/
		public SetZero(): void;

		/**
		* Subtracts the vector 3 from this vector 3.  The result is stored in this vector 3.
		* @param v Vector 3 to subtract.
		**/
		public Subtract(v: b2Vec3): void;
	}
}

declare namespace Box2D.Collision {

	/**
	* Axis aligned bounding box.
	**/
	export class b2AABB {

		/**
		* Lower bound.
		**/
		public lowerBound: Box2D.Common.Math.b2Vec2;

		/**
		* Upper bound.
		**/
		public upperBound: Box2D.Common.Math.b2Vec2;

		/**
		* Combines two AABBs into one with max values for upper bound and min values for lower bound.
		* @param aabb1 First AABB to combine.
		* @param aabb2 Second AABB to combine.
		* @return New AABB with max values from aabb1 and aabb2.
		**/
		public static Combine(aabb1: b2AABB, aabb2: b2AABB): b2AABB;

		/**
		* Combines two AABBs into one with max values for upper bound and min values for lower bound.  The result is stored in this AABB.
		* @param aabb1 First AABB to combine.
		* @param aabb2 Second AABB to combine.
		**/
		public Combine(aabb1: b2AABB, aabb2: b2AABB): void;

		/**
		* Determines if an AABB is contained within this one.
		* @param aabb AABB to see if it is contained.
		* @return True if aabb is contained, otherwise false.
		**/
		public Contains(aabb: b2AABB): boolean;

		/**
		* Gets the center of the AABB.
		* @return Center of this AABB.
		**/
		public GetCenter(): Box2D.Common.Math.b2Vec2;

		/**
		* Gets the extents of the AABB (half-widths).
		* @return Extents of this AABB.
		**/
		public GetExtents(): Box2D.Common.Math.b2Vec2;

		/**
		* Verify that the bounds are sorted.
		* @return True if the bounds are sorted, otherwise false.
		**/
		public IsValid(): boolean;

		/**
		* Perform a precise raycast against this AABB.
		* @param output Ray cast output values.
		* @param input Ray cast input values.
		* @return True if the ray cast hits this AABB, otherwise false.
		**/
		public RayCast(output: b2RayCastOutput, input: b2RayCastInput): boolean;

		/**
		* Tests if another AABB overlaps this AABB.
		* @param other Other AABB to test for overlap.
		* @return True if other overlaps this AABB, otherwise false.
		**/
		public TestOverlap(other: b2AABB): boolean;
	}
}

declare namespace Box2D.Collision {

	/**
	* We use contact ids to facilitate warm starting.
	**/
	export class b2ContactID {

		/**
		* Features
		**/
		public features: Features;

		/**
		* ID Key
		**/
		public Key: number;

		/**
		* Creates a new Contact ID.
		**/
		constructor();

		/**
		* Copies the Contact ID.
		* @return Copied Contact ID.
		**/
		public Copy(): b2ContactID;

		/**
		* Sets the Contact ID from a Contact ID.
		* @param id The Contact ID to copy values from.
		**/
		public Set(id: b2ContactID): void;
	}
}

declare namespace Box2D.Collision {

	/**
	* This structure is used to report contact points.
	**/
	export class b2ContactPoint {

		/**
		* The combined friction coefficient.
		**/
		public friction: number;

		/**
		* The contact id identifies the features in contact.
		**/
		public id: b2ContactID;

		/**
		* Points from shape1 to shape2.
		**/
		public normal: Box2D.Common.Math.b2Vec2;

		/**
		* Position in world coordinates.
		**/
		public position: Box2D.Common.Math.b2Vec2;

		/**
		* The combined restitution coefficient.
		**/
		public restitution: number;

		/**
		* The separation is negative when shapes are touching.
		**/
		public separation: number;

		/**
		* The first shape.
		**/
		public shape1: Shapes.b2Shape;

		/**
		* The second shape.
		**/
		public shape2: Shapes.b2Shape;

		/**
		* Velocity of point on body2 relative to point on body1 (pre-solver).
		**/
		public velocity: Box2D.Common.Math.b2Vec2;
	}
}

declare namespace Box2D.Collision {

	/**
	* Input for b2Distance. You have to option to use the shape radii in the computation. Even
	**/
	export class b2DistanceInput {

		/**
		* Proxy A
		**/
		public proxyA: b2DistanceProxy;

		/**
		* Proxy B
		**/
		public proxyB: b2DistanceProxy;

		/**
		* Transform A
		**/
		public transformA: Box2D.Common.Math.b2Transform;

		/**
		* Transform B
		**/
		public transformB: Box2D.Common.Math.b2Transform;

		/**
		* Use shape radii in computation?
		**/
		public useRadii: boolean;
	}
}

declare namespace Box2D.Collision {

	/**
	* Output calculation for b2Distance.
	**/
	export class b2DistanceOutput {

		/**
		*  Calculated distance.
		**/
		public distance: number;

		/**
		* Number of gjk iterations used in calculation.
		**/
		public iterations: number;

		/**
		* Closest point on shape A.
		**/
		public pointA: Box2D.Common.Math.b2Vec2;

		/**
		* Closest point on shape B.
		**/
		public pointB: Box2D.Common.Math.b2Vec2;
	}
}

declare namespace Box2D.Collision {

	/**
	* A distance proxy is used by the GJK algorithm. It encapsulates any shape.
	**/
	export class b2DistanceProxy {

		/**
		* Count
		**/
		public m_count: number;

		/**
		* Radius
		**/
		public m_radius: number;

		/**
		* Verticies
		**/
		public m_vertices: Box2D.Common.Math.b2Vec2[];

		/**
		* Get the supporting vertex index in the given direction.
		* @param d Direction to look for the supporting vertex.
		* @return Supporting vertex index.
		**/
		public GetSupport(d: Box2D.Common.Math.b2Vec2): number;

		/**
		* Get the supporting vertex in the given direction.
		* @param d Direction to look for the supporting vertex.
		* @return Supporting vertex.
		**/
		public GetSupportVertex(d: Box2D.Common.Math.b2Vec2): Box2D.Common.Math.b2Vec2;

		/**
		* Get a vertex by index.  Used by b2Distance.
		* @param index Vetex's index.
		* @return Vertex at the given index.
		**/
		public GetVertex(index: number): Box2D.Common.Math.b2Vec2;

		/**
		* Get the vertex count.
		* @return The number of vertices. (m_vertices.length)
		**/
		public GetVertexCount(): number;

		/**
		* Initialize the proxy using the given shape. The shape must remain in scope while the proxy is in use.
		* @param shape Shape to initialize the distance proxy.
		**/
		public Set(shape: Shapes.b2Shape): void;
	}
}

declare namespace Box2D.Collision {

	/**
	* A dynamic tree arranges data in a binary tree to accelerate queries such as volume queries and ray casts. Leafs are proxies with an AABB. In the tree we expand the proxy AABB by b2_fatAABBFactor so that the proxy AABB is bigger than the client object. This allows the client object to move by small amounts without triggering a tree update. Nodes are pooled.
	**/
	export class b2DynamicTree {

		/**
		* Constructing the tree initializes the node pool.
		**/
		constructor();

		/**
		* Create a proxy. Provide a tight fitting AABB and a userData.
		* @param aabb AABB.
		* @param userDate User defined data for this proxy.
		* @return Dynamic tree node.
		**/
		public CreateProxy(aabb: b2AABB, userData: any): b2DynamicTreeNode;

		/**
		* Destroy a proxy. This asserts if the id is invalid.
		* @param proxy Proxy to destroy.
		**/
		public DestroyProxy(proxy: b2DynamicTreeNode): void;

		/**
		* Gets the Fat AABB for the proxy.
		* @param proxy Proxy to retrieve Fat AABB.
		* @return Fat AABB for proxy.
		**/
		public GetFatAABB(proxy: b2DynamicTreeNode): b2AABB;

		/**
		* Get user data from a proxy. Returns null if the proxy is invalid.
		* Cast to your type on return.
		* @param proxy Proxy to retrieve user data from.
		* @return User data for proxy or null if proxy is invalid.
		**/
		public GetUserData(proxy: b2DynamicTreeNode): any;

		/**
		* Move a proxy with a swept AABB. If the proxy has moved outside of its fattened AABB, then the proxy is removed from the tree and re-inserted. Otherwise the function returns immediately.
		* @param proxy Proxy to move.
		* @param aabb Swept AABB.
		* @param displacement Extra AABB displacement.
		**/
		public MoveProxy(proxy: b2DynamicTreeNode, aabb: b2AABB, displacement: Box2D.Common.Math.b2Vec2): boolean;

		/**
		* Query an AABB for overlapping proxies. The callback is called for each proxy that overlaps the supplied AABB. The callback should match function signature fuction callback(proxy:b2DynamicTreeNode):Boolean and should return false to trigger premature termination.
		* @param callback Called for each proxy that overlaps the supplied AABB.
		*	param proxy Proxy overlapping the supplied AABB.
		* @aabb Proxies are query for overlap on this AABB.
		**/
		public Query(callback: (proxy: b2DynamicTreeNode) => boolean, aabb: b2AABB): void;

		/**
		* Ray-cast against the proxies in the tree. This relies on the callback to perform a exact ray-cast in the case were the proxy contains a shape. The callback also performs the any collision filtering. This has performance roughly equal to k log(n), where k is the number of collisions and n is the number of proxies in the tree.
		* @param callback Called for each proxy that is hit by the ray.
		*	param input Ray cast input data.
		*	param proxy The proxy hit by the ray cast.
		*	return Return value is the new value for maxFraction.
		* @param input Ray cast input data.  Query all proxies along this ray cast.
		**/
		public RayCast(callback: (input: b2RayCastInput, proxy: b2DynamicTreeNode) => number, input: b2RayCastInput): void;

		/**
		* Perform some iterations to re-balance the tree.
		* @param iterations Number of rebalance iterations to perform.
		**/
		public Rebalance(iterations: number): void;
	}
}

declare namespace Box2D.Collision {

	/**
	* The broad-phase is used for computing pairs and performing volume queries and ray casts. This broad-phase does not persist pairs. Instead, this reports potentially new pairs. It is up to the client to consume the new pairs and to track subsequent overlap.
	**/
	export class b2DynamicTreeBroadPhase implements IBroadPhase {

		/**
		* Creates the dynamic tree broad phase.
		**/
		constructor();

		/**
		* @see IBroadPhase.CreateProxy
		**/
		public CreateProxy(aabb: b2AABB, userData: any): b2DynamicTreeNode;

		/**
		* @see IBroadPhase.DestroyProxy
		**/
		public DestroyProxy(proxy: b2DynamicTreeNode): void;

		/**
		* @see IBroadPhase.GetFatAABB
		**/
		public GetFatAABB(proxy: b2DynamicTreeNode): b2AABB;

		/**
		* @see IBroadPhase.GetProxyCount
		**/
		public GetProxyCount(): number;

		/**
		* @see IBroadPhase.GetUserData
		**/
		public GetUserData(proxy: b2DynamicTreeNode): any;

		/**
		* @see IBroadPhase.MoveProxy
		**/
		public MoveProxy(proxy: b2DynamicTreeNode, aabb: b2AABB, displacement: Box2D.Common.Math.b2Vec2): void;

		/**
		* @see IBroadPhase.Query
		**/
		public Query(callback: (proxy: b2DynamicTreeNode) => boolean, aabb: b2AABB): void;

		/**
		* @see IBroadPhase.RayCast
		**/
		public RayCast(callback: (input: b2RayCastInput, proxy: b2DynamicTreeNode) => number, input: b2RayCastInput): void;

		/**
		* @see IBroadPhase.Rebalance
		**/
		public Rebalance(iterations: number): void;

		/**
		* Tests if two proxies overlap.
		* @param proxyA First proxy to test.
		* @param proxyB Second proxy to test.
		* @return True if the proxyA and proxyB overlap with Fat AABBs, otherwise false.
		**/
		public TestOverlap(proxyA: b2DynamicTreeNode, proxyB: b2DynamicTreeNode): boolean;

		/**
		* Update the pairs. This results in pair callbacks. This can only add pairs.
		* @param callback Called for all new proxy pairs.
		*	param userDataA Proxy A in the pair user data.
		*	param userDataB Proxy B in the pair user data.
		**/
		public UpdatePairs(callback: (userDataA: any, userDataB: any) => void ): void;

		/**
		* Validates the dynamic tree.
		* NOTE: this says "todo" in the current Box2DFlash code.
		**/
		public Validate(): void;
	}
}

declare namespace Box2D.Collision {

	/**
	* Empty declaration, used in many callbacks within b2DynamicTree.
	* Use the b2DynamicTree functions to extract data from this shell.
	**/
	export class b2DynamicTreeNode {

	}
}

declare namespace Box2D.Collision {

	/**
	* A manifold for two touching convex shapes. Box2D supports multiple types of contact: - clip point versus plane with radius - point versus point with radius (circles) The local point usage depends on the manifold type: -e_circles: the local center of circleA -e_faceA: the center of faceA -e_faceB: the center of faceB Similarly the local normal usage: -e_circles: not used -e_faceA: the normal on polygonA -e_faceB: the normal on polygonB We store contacts in this way so that position correction can account for movement, which is critical for continuous physics. All contact scenarios must be expressed in one of these types. This structure is stored across time steps, so we keep it small.
	**/
	export class b2Manifold {

		/**
		* Circles
		**/
		public static e_circles: number;

		/**
		* Face A
		**/
		public static e_faceA: number;

		/**
		* Face B
		**/
		public static e_faceB: number;

		/**
		* Not used for Type e_points
		**/
		public m_localPlaneNormal: Box2D.Common.Math.b2Vec2;

		/**
		* Usage depends on manifold type
		**/
		public m_localPoint: Box2D.Common.Math.b2Vec2;

		/**
		* The number of manifold points
		**/
		public m_pointCount: number;

		/**
		* The points of contact
		**/
		public m_points: b2ManifoldPoint[];

		/**
		* Manifold type.
		**/
		public m_type: number;

		/**
		* Creates a new manifold.
		**/
		constructor();

		/**
		* Copies the manifold.
		* @return Copy of this manifold.
		**/
		public Copy(): b2Manifold;

		/**
		* Resets this manifold.
		**/
		public Reset(): void;

		/**
		* Sets this manifold from another manifold.
		* @param m Manifold to copy values from.
		**/
		public Set(m: b2Manifold): void;
	}
}

declare namespace Box2D.Collision {

	/**
	* A manifold point is a contact point belonging to a contact manifold. It holds details related to the geometry and dynamics of the contact points. The local point usage depends on the manifold type: -e_circles: the local center of circleB -e_faceA: the local center of cirlceB or the clip point of polygonB -e_faceB: the clip point of polygonA This structure is stored across time steps, so we keep it small. Note: the impulses are used for internal caching and may not provide reliable contact forces, especially for high speed collisions.
	**/
	export class b2ManifoldPoint {

		/**
		* Contact ID.
		**/
		public m_id: b2ContactID;

		/**
		* Local contact point.
		**/
		public m_localpoint: Box2D.Common.Math.b2Vec2;

		/**
		* Normal impluse for this contact point.
		**/
		public m_normalImpulse: number;

		/**
		* Tangent impulse for contact point.
		**/
		public m_tangentImpulse: number;

		/**
		* Creates a new manifold point.
		**/
		constructor();

		/**
		* Resets this manifold point.
		**/
		public Reset(): void;

		/**
		* Sets this manifold point from a manifold point.
		* @param m The manifold point to copy values from.
		**/
		public Set(m: b2ManifoldPoint): void;
	}
}

declare namespace Box2D.Collision {

	/**
	* An oriented bounding box.
	**/
	export class b2OBB {

		/**
		* The local centroid.
		**/
		public center: Box2D.Common.Math.b2Vec2;

		/**
		* The half-widths.
		**/
		public extents: Box2D.Common.Math.b2Vec2;

		/**
		* The rotation matrix.
		**/
		public R: Box2D.Common.Math.b2Mat22;
	}
}

declare namespace Box2D.Collision {

	/**
	* Ray cast input data.
	**/
	export class b2RayCastInput {

		/**
		* Truncate the ray to reach up to this fraction from p1 to p2
		**/
		public maxFraction: number;

		/**
		* The start point of the ray.
		**/
		public p1: Box2D.Common.Math.b2Vec2;

		/**
		* The end point of the ray.
		**/
		public p2: Box2D.Common.Math.b2Vec2;

		/**
		* Creates a new ray cast input.
		* @param p1 Start point of the ray, default = null.
		* @param p2 End point of the ray, default = null.
		* @param maxFraction Truncate the ray to reach up to this fraction from p1 to p2.
		**/
		constructor(p1?: Box2D.Common.Math.b2Vec2, p2?: Box2D.Common.Math.b2Vec2, maxFraction?: number);
	}
}

declare namespace Box2D.Collision {

	/**
	* Results of a ray cast.
	**/
	export class b2RayCastOutput {

		/**
		* The fraction between p1 and p2 that the collision occurs at.
		**/
		public fraction: number;

		/**
		* The normal at the point of collision.
		**/
		public normal: Box2D.Common.Math.b2Vec2;
	}
}

declare namespace Box2D.Collision {

	/**
	* A line in space between two given vertices.
	**/
	export class b2Segment {

		/**
		* The starting point.
		**/
		public p1: Box2D.Common.Math.b2Vec2;

		/**
		* The ending point.
		**/
		public p2: Box2D.Common.Math.b2Vec2;

		/**
		* Extends or clips the segment so that it's ends lie on the boundary of the AABB.
		* @param aabb AABB to extend/clip the segement.
		**/
		public Extend(aabb: b2AABB): void;

		/**
		* See Extend, this works on the ending point.
		* @param aabb AABB to extend/clip the ending point.
		**/
		public ExtendBackward(aabb: b2AABB): void;

		/**
		* See Extend, this works on the starting point.
		* @param aabb AABB to extend/clip the starting point.
		**/
		public ExtendForward(aabb: b2AABB): void;

		/**
		* Ray cast against this segment with another segment.
		* @param lambda returns the hit fraction. You can use this to compute the contact point * p = (1 - lambda) * segment.p1 + lambda * segment.p2 * @normal Normal at the contact point.  If there is no intersection, the normal is not set.
		* @param segment Defines the begining and end point of the ray cast.
		* @param maxLambda a number typically in the range [0,1].
		* @return True if there is an intersection, otherwise false.
		**/
		public TestSegment(
			lambda: number[],
			normal: Box2D.Common.Math.b2Vec2,
			segment: b2Segment,
			maxLambda: number): boolean;
	}
}

declare namespace Box2D.Collision {

	/**
	* Used to warm start b2Distance. Set count to zero on first call.
	**/
	export class b2SimplexCache {

		/**
		* Number in cache.
		**/
		public count: number;

		/**
		* Vertices on shape a.
		**/
		public indexA: number[];

		/**
		* Vertices on shape b.
		**/
		public indexB: number[];

		/**
		* Length or area.
		**/
		public metric: number;
	}
}

declare namespace Box2D.Collision {

	/**
	* Inpute parameters for b2TimeOfImpact
	**/
	export class b2TOIInput {

		/**
		* Proxy A
		**/
		public proxyA: b2DistanceProxy;

		/**
		* Proxy B
		**/
		public proxyB: b2DistanceProxy;

		/**
		* Sweep A
		**/
		public sweepA: Box2D.Common.Math.b2Sweep;

		/**
		* Sweep B
		**/
		public sweepB: Box2D.Common.Math.b2Sweep;

		/**
		* Tolerance
		**/
		public tolerance: number;
	}
}

declare namespace Box2D.Collision {

	/**
	* This is used to compute the current state of a contact manifold.
	**/
	export class b2WorldManifold {

		/**
		* World vector pointing from A to B.
		**/
		public m_normal: Box2D.Common.Math.b2Vec2;

		/**
		* World contact point (point of intersection).
		**/
		public m_points: Box2D.Common.Math.b2Vec2[];

		/**
		* Creates a new b2WorldManifold.
		**/
		constructor();

		/**
		* Evaluate the manifold with supplied transforms. This assumes modest motion from the original state. This does not change the point count, impulses, etc. The radii must come from the shapes that generated the manifold.
		* @param manifold Manifold to evaluate.
		* @param xfA A transform.
		* @param radiusA A radius.
		* @param xfB B transform.
		* @param radiusB B radius.
		**/
		public Initialize(
			manifold: b2Manifold,
			xfA: Box2D.Common.Math.b2Transform,
			radiusA: number,
			xfB: Box2D.Common.Math.b2Transform,
			radiusB: number): void;
	}
}

declare namespace Box2D.Collision {

	/**
	* We use contact ids to facilitate warm starting.
	**/
	export class Features {

		/**
		* A value of 1 indicates that the reference edge is on shape2.
		**/
		public flip: number;

		/**
		* The edge most anti-parallel to the reference edge.
		**/
		public incidentEdge: number;

		/**
		* The vertex (0 or 1) on the incident edge that was clipped.
		**/
		public incidentVertex: number;

		/**
		* The edge that defines the outward contact normal.
		**/
		public referenceEdge: number;
	}
}

declare namespace Box2D.Collision {

	/**
	* Interface for objects tracking overlap of many AABBs.
	**/
	export interface IBroadPhase {

		/**
		* Create a proxy with an initial AABB. Pairs are not reported until UpdatePairs is called.
		* @param aabb Proxy Fat AABB.
		* @param userData User defined data.
		* @return Proxy created from aabb and userData.
		**/
		CreateProxy(aabb: b2AABB, userData: any): b2DynamicTreeNode;

		/**
		* Destroy a proxy. It is up to the client to remove any pairs.
		* @param proxy Proxy to destroy.
		**/
		DestroyProxy(proxy: b2DynamicTreeNode): void;

		/**
		* Get the Fat AABB for a proxy.
		* @param proxy Proxy to retrieve the Fat AABB.
		**/
		GetFatAABB(proxy: b2DynamicTreeNode): b2AABB;

		/**
		* Get the number of proxies.
		* @return Number of proxies.
		**/
		GetProxyCount(): number;

		/**
		* Get user data from a proxy. Returns null if the proxy is invalid.
		* @param proxy Proxy to retrieve user data from.
		* @return Gets the user data from proxy, or null if the proxy is invalid.
		**/
		GetUserData(proxy: b2DynamicTreeNode): any;

		/**
		* Call MoveProxy as many times as you like, then when you are done call UpdatePairs to finalized the proxy pairs (for your time step).
		* @param proxy Proxy to move.
		* @param aabb Swept AABB.
		* @param displacement Extra AABB displacement.
		**/
		MoveProxy(proxy: b2DynamicTreeNode, aabb: b2AABB, displacement: Box2D.Common.Math.b2Vec2): void;

		/**
		* Query an AABB for overlapping proxies. The callback is called for each proxy that overlaps the supplied AABB. The callback should match function signature fuction callback(proxy:b2DynamicTreeNode):Boolean and should return false to trigger premature termination.
		* @param callback Called for each proxy that overlaps the supplied AABB.
		*	param proxy Proxy overlapping the supplied AABB.
		* @param aabb Proxies are query for overlap on this AABB.
		**/
		Query(callback: (proxy: b2DynamicTreeNode) => boolean, aabb: b2AABB): void;

		/**
		* Ray-cast against the proxies in the tree. This relies on the callback to perform a exact ray-cast in the case were the proxy contains a shape. The callback also performs the any collision filtering. This has performance roughly equal to k log(n), where k is the number of collisions and n is the number of proxies in the tree.
		* @param callback Called for each proxy that is hit by the ray.
		*	param input Ray cast input data.
		*	param proxy The proxy hit by the ray cast.
		*	param return Return value is the new value for maxFraction.
		* @param input Ray cast input data.  Query all proxies along this ray cast.
		**/
		RayCast(callback: (input: b2RayCastInput, proxy: b2DynamicTreeNode) => number, input: b2RayCastInput): void;

		/**
		* Perform some iterations to re-balance the tree.
		* @param iterations Number of rebalance iterations to perform.
		**/
		Rebalance(iterations: number): void;
	}
}

declare namespace Box2D.Collision.Shapes {

	/**
	* A circle shape.
	**/
	export class b2CircleShape extends b2Shape {

		/**
		* Creates a new circle shape.
		* @param radius Circle radius.
		**/
		constructor(radius?: number);

		/**
		* Given a transform, compute the associated axis aligned bounding box for this shape.
		* @param aabb Calculated AABB, this argument is `out`.
		* @param xf Transform to calculate the AABB.
		**/
		public ComputeAABB(aabb: b2AABB, xf: Box2D.Common.Math.b2Transform): void;

		/**
		* Compute the mass properties of this shape using its dimensions and density. The inertia tensor is computed about the local origin, not the centroid.
		* @param massData Calculate the mass, this argument is `out`.
		* @param density
		**/
		public ComputeMass(massData: b2MassData, density: number): void;

		/**
		* Compute the volume and centroid of this shape intersected with a half plane
		* @param normal The surface normal.
		* @param offset The surface offset along the normal.
		* @param xf The shape transform.
		* @param c The centroid, this argument is `out`.
		**/
		public ComputeSubmergedArea(
			normal: Box2D.Common.Math.b2Vec2,
			offset: number,
			xf: Box2D.Common.Math.b2Transform,
			c: Box2D.Common.Math.b2Vec2): number;

		/**
		* Copies the circle shape.
		* @return Copy of this circle shape.
		**/
		public Copy(): b2CircleShape;

		/**
		* Get the local position of this circle in its parent body.
		* @return This circle's local position.
		**/
		public GetLocalPosition(): Box2D.Common.Math.b2Vec2;

		/**
		* Get the radius of the circle.
		* @return This circle's radius.
		**/
		public GetRadius(): number;

		/**
		* Cast a ray against this shape.
		* @param output Ray cast results, this argument is `out`.
		* @param input Ray cast input parameters.
		* @param transform The transform to be applied to the shape.
		* @return True if the ray hits the shape, otherwise false.
		**/
		public RayCast(
			output: b2RayCastOutput,
			input: b2RayCastInput,
			transform: Box2D.Common.Math.b2Transform): boolean;

		/**
		* Set the circle shape values from another shape.
		* @param other The other circle shape to copy values from.
		**/
		public Set(other: b2CircleShape): void;

		/**
		* Set the local position of this circle in its parent body.
		* @param position The new local position of this circle.
		**/
		public SetLocalPosition(position: Box2D.Common.Math.b2Vec2): void;

		/**
		* Set the radius of the circle.
		* @param radius The new radius of the circle.
		**/
		public SetRadius(radius: number): void;

		/**
		* Test a point for containment in this shape. This only works for convex shapes.
		* @param xf Shape world transform.
		* @param p Point to test against, in world coordinates.
		* @return True if the point is in this shape, otherwise false.
		**/
		public TestPoint(xf: Box2D.Common.Math.b2Transform, p: Box2D.Common.Math.b2Vec2): boolean;
	}
}

declare namespace Box2D.Collision.Shapes {

	/**
	* This structure is used to build edge shapes.
	**/
	export class b2EdgeChainDef {

		/**
		* Whether to create an extra edge between the first and last vertices.
		**/
		public isALoop: boolean;

		/**
		* The number of vertices in the chain.
		**/
		public vertexCount: number;

		/**
		* The vertices in local coordinates.
		**/
		public vertices: Box2D.Common.Math.b2Vec2;

		/**
		* Creates a new edge chain def.
		**/
		constructor();
	}
}

declare namespace Box2D.Collision.Shapes {

	/**
	* An edge shape.
	**/
	export class b2EdgeShape extends b2Shape {

		/**
		* Creates a new edge shape.
		* @param v1 First vertex
		* @param v2 Second vertex
		**/
		constructor(v1: Box2D.Common.Math.b2Vec2, v2: Box2D.Common.Math.b2Vec2);

		/**
		* Given a transform, compute the associated axis aligned bounding box for this shape.
		* @param aabb Calculated AABB, this argument is `out`.
		* @param xf Transform to calculate the AABB.
		**/
		public ComputeAABB(aabb: b2AABB, xf: Box2D.Common.Math.b2Transform): void;

		/**
		* Compute the mass properties of this shape using its dimensions and density. The inertia tensor is computed about the local origin, not the centroid.
		* @param massData Calculate the mass, this argument is `out`.
		**/
		public ComputeMass(massData: b2MassData, density: number): void;

		/**
		* Compute the volume and centroid of this shape intersected with a half plane
		* @param normal The surface normal.
		* @param offset The surface offset along the normal.
		* @param xf The shape transform.
		* @param c The centroid, this argument is `out`.
		**/
		public ComputeSubmergedArea(
			normal: Box2D.Common.Math.b2Vec2,
			offset: number,
			xf: Box2D.Common.Math.b2Transform,
			c: Box2D.Common.Math.b2Vec2): number;

		/**
		* Get the distance from vertex1 to vertex2.
		* @return Distance from vertex1 to vertex2.
		**/
		public GetLength(): number;

		/**
		* Get the local position of vertex1 in the parent body.
		* @return Local position of vertex1 in the parent body.
		**/
		public GetVertex1(): Box2D.Common.Math.b2Vec2;

		/**
		* Get the local position of vertex2 in the parent body.
		* @return Local position of vertex2 in the parent body.
		**/
		public GetVertex2(): Box2D.Common.Math.b2Vec2;

		/**
		* Get a core vertex 1 in local coordinates.  These vertices represent a smaller edge that is used for time of impact.
		* @return core vertex 1 in local coordinates.
		**/
		public GetCoreVertex1(): Box2D.Common.Math.b2Vec2;

		/**
		* Get a core vertex 2 in local coordinates.  These vertices represent a smaller edge that is used for time of impact.
		* @return core vertex 2 in local coordinates.
		**/
		public GetCoreVertex2(): Box2D.Common.Math.b2Vec2;

		/**
		* Get a perpendicular unit vector, pointing from the solid side to the empty side.
		* @return Normal vector.
		**/
		public GetNormalVector(): Box2D.Common.Math.b2Vec2;

		/**
		* Get a parallel unit vector, pointing from vertex 1 to vertex 2.
		* @return Vertex 1 to vertex 2 directional vector.
		**/
		public GetDirectionVector(): Box2D.Common.Math.b2Vec2;

		/**
		* Returns a unit vector halfway between direction and previous direction.
		* @return Halfway unit vector between direction and previous direction.
		**/
		public GetCorner1Vector(): Box2D.Common.Math.b2Vec2;

		/**
		* Returns a unit vector halfway between direction and previous direction.
		* @return Halfway unit vector between direction and previous direction.
		**/
		public GetCorner2Vector(): Box2D.Common.Math.b2Vec2;

		/**
		* Determines if the first corner of this edge bends towards the solid side.
		* @return True if convex, otherwise false.
		**/
		public Corner1IsConvex(): boolean;

		/**
		* Determines if the second corner of this edge bends towards the solid side.
		* @return True if convex, otherwise false.
		**/
		public Corner2IsConvex(): boolean;

		/**
		* Get the first vertex and apply the supplied transform.
		* @param xf Transform to apply.
		* @return First vertex with xf transform applied.
		**/
		public GetFirstVertex(xf: Box2D.Common.Math.b2Transform): Box2D.Common.Math.b2Vec2;

		/**
		* Get the next edge in the chain.
		* @return Next edge shape or null if there is no next edge shape.
		**/
		public GetNextEdge(): b2EdgeShape;

		/**
		* Get the previous edge in the chain.
		* @return Previous edge shape or null if there is no previous edge shape.
		**/
		public GetPrevEdge(): b2EdgeShape;

		/**
		* Get the support point in the given world direction with the supplied transform.
		* @param xf Transform to apply.
		* @param dX X world direction.
		* @param dY Y world direction.
		* @return Support point.
		**/
		public Support(xf: Box2D.Common.Math.b2Transform, dX: number, dY: number): Box2D.Common.Math.b2Vec2;

		/**
		* Cast a ray against this shape.
		* @param output Ray cast results, this argument is `out`.
		* @param input Ray cast input parameters.
		* @param transform The transform to be applied to the shape.
		* @return True if the ray hits the shape, otherwise false.
		**/
		public RayCast(
			output: b2RayCastOutput,
			input: b2RayCastInput,
			transform: Box2D.Common.Math.b2Transform): boolean;

		/**
		* Test a point for containment in this shape. This only works for convex shapes.
		* @param xf Shape world transform.
		* @param p Point to test against, in world coordinates.
		* @return True if the point is in this shape, otherwise false.
		**/
		public TestPoint(xf: Box2D.Common.Math.b2Transform, p: Box2D.Common.Math.b2Vec2): boolean;
	}
}

declare namespace Box2D.Collision.Shapes {

	/**
	* This holds the mass data computed for a shape.
	**/
	export class b2MassData {

		/**
		* The position of the shape's centroid relative to the shape's origin.
		**/
		public center: Box2D.Common.Math.b2Vec2;

		/**
		* The rotational inertia of the shape. This may be about the center or local origin, depending on usage.
		**/
		public I: number;

		/**
		* The mass of the shape, usually in kilograms.
		**/
		public mass: number;
	}
}

declare namespace Box2D.Collision.Shapes {

	/**
	* Convex polygon. The vertices must be in CCW order for a right-handed coordinate system with the z-axis coming out of the screen.
	**/
	export class b2PolygonShape extends b2Shape {

		/**
		* Creates a b2PolygonShape from a vertices list. This assumes the vertices define a convex polygon.  It is assumed that the exterior is the the right of each edge.
		* @param vertices List of vertices to create the polygon shape from.
		* @param vertexCount Number of vertices in the shape, default value is 0 and in the box2dweb.js code it is ignored.
		* @return Convex polygon shape.
		**/
		public static AsArray(vertices: Box2D.Common.Math.b2Vec2[], vertexCount?: number): b2PolygonShape;

		/**
		* Build vertices to represent an axis-aligned box.
		* @param hx The half-width.
		* @param hy The half-height.
		* @return Box polygon shape.
		**/
		public static AsBox(hx: number, hy: number): b2PolygonShape;

		/**
		* Creates a single edge from two vertices.
		* @param v1 First vertex.
		* @param v2 Second vertex.
		* @return Edge polygon shape.
		**/
		public static AsEdge(v1: Box2D.Common.Math.b2Vec2, b2: Box2D.Common.Math.b2Vec2): b2PolygonShape;

		/**
		* Build vertices to represent an oriented box.
		* @param hx The half-width.
		* @param hy The half-height.
		* @param center The center of the box in local coordinates, default is null (no center?)
		* @param angle The rotation of the box in local coordinates, default is 0.0.
		* @return Oriented box shape.
		**/
		public static AsOrientedBox(hx: number, hy: number, center?: Box2D.Common.Math.b2Vec2, angle?: number): b2PolygonShape;

		/**
		* This assumes the vertices define a convex polygon.  It is assumed that the exterior is the the right of each edge.
		* @param vertices List of vertices to create the polygon shape from.
		* @param vertexCount The number of vertices, default is 0 and in the box2dweb.js code it is ignored.
		* @return Convex polygon shape.
		**/
		public static AsVector(vertices: Box2D.Common.Math.b2Vec2[], vertexCount?: number): b2PolygonShape;

		/**
		* Given a transform, compute the associated axis aligned bounding box for this shape.
		* @param aabb Calculated AABB, this argument is `out`.
		* @param xf Transform to calculate the AABB.
		**/
		public ComputeAABB(aabb: b2AABB, xf: Box2D.Common.Math.b2Transform): void;

		/**
		* Compute the mass properties of this shape using its dimensions and density. The inertia tensor is computed about the local origin, not the centroid.
		* @param massData Calculate the mass, this argument is `out`.
		**/
		public ComputeMass(massData: b2MassData, density: number): void;

		/**
		* Compute the volume and centroid of this shape intersected with a half plane
		* @param normal The surface normal.
		* @param offset The surface offset along the normal.
		* @param xf The shape transform.
		* @param c The centroid, this argument is `out`.
		**/
		public ComputeSubmergedArea(
			normal: Box2D.Common.Math.b2Vec2,
			offset: number,
			xf: Box2D.Common.Math.b2Transform,
			c: Box2D.Common.Math.b2Vec2): number;

		/**
		* Clone the shape.
		**/
		public Copy(): b2PolygonShape;

		/**
		* Get the edge normal vectors. There is one for each vertex.
		* @return List of edge normal vectors for each vertex.
		**/
		public GetNormals(): Box2D.Common.Math.b2Vec2[];

		/**
		* Get the supporting vertex index in the given direction.
		* @param d Direction to look.
		* @return Vertex index supporting the direction.
		**/
		public GetSupport(d: Box2D.Common.Math.b2Vec2): number;

		/**
		* Get the supporting vertex in the given direction.
		* @param d Direciton to look.
		* @return Vertex supporting the direction.
		**/
		public GetSupportVertex(d: Box2D.Common.Math.b2Vec2): Box2D.Common.Math.b2Vec2;

		/**
		* Get the vertex count.
		* @return Vertex count.
		**/
		public GetVertexCount(): number;

		/**
		* Get the vertices in local coordinates.
		* @return List of the vertices in local coordinates.
		**/
		public GetVertices(): Box2D.Common.Math.b2Vec2[];

		/**
		* Cast a ray against this shape.
		* @param output Ray cast results, this argument is `out`.
		* @param input Ray cast input parameters.
		* @param transform The transform to be applied to the shape.
		* @return True if the ray hits the shape, otherwise false.
		**/
		public RayCast(
			output: b2RayCastOutput,
			input: b2RayCastInput,
			transform: Box2D.Common.Math.b2Transform): boolean;

		/**
		* Set the shape values from another shape.
		* @param other The other shape to copy values from.
		**/
		public Set(other: b2Shape): void;

		/**
		* Copy vertices. This assumes the vertices define a convex polygon.  It is assumed that the exterior is the the right of each edge.
		* @param vertices List of vertices to create the polygon shape from.
		* @param vertexCount Number of vertices in the shape, default value is 0 and in the box2dweb.js code it is ignored.
		* @return Convex polygon shape.
		**/
		public static SetAsArray(vertices: Box2D.Common.Math.b2Vec2[], vertexCount?: number): void;

		/**
		* Build vertices to represent an axis-aligned box.
		* @param hx The half-width.
		* @param hy The half-height.
		* @return Box polygon shape.
		**/
		public static SetAsBox(hx: number, hy: number): void;

		/**
		* Creates a single edge from two vertices.
		* @param v1 First vertex.
		* @param v2 Second vertex.
		* @return Edge polygon shape.
		**/
		public static SetAsEdge(v1: Box2D.Common.Math.b2Vec2, b2: Box2D.Common.Math.b2Vec2): void;

		/**
		* Build vertices to represent an oriented box.
		* @param hx The half-width.
		* @param hy The half-height.
		* @param center The center of the box in local coordinates, default is null (no center?)
		* @param angle The rotation of the box in local coordinates, default is 0.0.
		* @return Oriented box shape.
		**/
		public static SetAsOrientedBox(hx: number, hy: number, center?: Box2D.Common.Math.b2Vec2, angle?: number): void;

		/**
		* This assumes the vertices define a convex polygon.  It is assumed that the exterior is the the right of each edge.
		* @param vertices List of vertices to create the polygon shape from.
		* @param vertexCount The number of vertices, default is 0 and in the box2dweb.js code it is ignored.
		* @return Convex polygon shape.
		**/
		public static SetAsVector(vertices: any[], vertexCount?: number): void;

		/**
		* Test a point for containment in this shape. This only works for convex shapes.
		* @param xf Shape world transform.
		* @param p Point to test against, in world coordinates.
		* @return True if the point is in this shape, otherwise false.
		**/
		public static TestPoint(xf: Box2D.Common.Math.b2Transform, p: Box2D.Common.Math.b2Vec2): boolean;
	}
}

declare namespace Box2D.Collision.Shapes {

	/**
	* A shape is used for collision detection. Shapes are created in b2Body. You can use shape for collision detection before they are attached to the world.
	* Warning: you cannot reuse shapes.
	**/
	export class b2Shape {

		/**
		* Return value for TestSegment indicating a hit.
		**/
		public static e_hitCollide: number;

		/**
		* Return value for TestSegment indicating a miss.
		**/
		public static e_missCollide: number;

		/**
		* Return value for TestSegment indicating that the segment starting point, p1, is already inside the shape.
		**/
		public static startsInsideCollide: number;

		// Note: these enums are public in the source but no referenced by the documentation
		public static e_unknownShape: number;
		public static e_circleShape: number;
		public static e_polygonShape: number;
		public static e_edgeShape: number;
		public static e_shapeTypeCount: number;

		/**
		* Creates a new b2Shape.
		**/
		constructor();

		/**
		* Given a transform, compute the associated axis aligned bounding box for this shape.
		* @param aabb Calculated AABB, this argument is `out`.
		* @param xf Transform to calculate the AABB.
		**/
		public ComputeAABB(aabb: b2AABB, xf: Box2D.Common.Math.b2Transform): void;

		/**
		* Compute the mass properties of this shape using its dimensions and density. The inertia tensor is computed about the local origin, not the centroid.
		* @param massData Calculate the mass, this argument is `out`.
		* @param density Density.
		**/
		public ComputeMass(massData: b2MassData, density: number): void;

		/**
		* Compute the volume and centroid of this shape intersected with a half plane
		* @param normal The surface normal.
		* @param offset The surface offset along the normal.
		* @param xf The shape transform.
		* @param c The centroid, this argument is `out`.
		**/
		public ComputeSubmergedArea(
			normal: Box2D.Common.Math.b2Vec2,
			offset: number,
			xf: Box2D.Common.Math.b2Transform,
			c: Box2D.Common.Math.b2Vec2): number;

		/**
		* Clone the shape.
		**/
		public Copy(): b2Shape;

		/**
		* Get the type of this shape. You can use this to down cast to the concrete shape.
		**/
		public GetType(): number;

		/**
		* Cast a ray against this shape.
		* @param output Ray cast results, this argument is `out`.
		* @param input Ray cast input parameters.
		* @param transform The transform to be applied to the shape.
		* @param return True if the ray hits the shape, otherwise false.
		**/
		public RayCast(
			output: b2RayCastOutput,
			input: b2RayCastInput,
			transform: Box2D.Common.Math.b2Transform): boolean;

		/**
		* Set the shape values from another shape.
		* @param other The other shape to copy values from.
		**/
		public Set(other: b2Shape): void;

		/**
		* Build vertices to represent an axis-aligned box.
		* @param hx The half-width.
		* @param hy The half-height.
		* @return Box polygon shape.
		**/
		public SetAsBox(hx: number, hy: number): void;

		/**
		* Set the radius of the circle.
		* @param radius The new radius of the circle.
		**/
		public SetRadius(radius: number): void;

		/**
		* Test if two shapes overlap with the applied transforms.
		* @param shape1 shape to test for overlap with shape2.
		* @param transform1 shape1 transform to apply.
		* @param shape2 shape to test for overlap with shape1.
		* @param transform2 shape2 transform to apply.
		* @return True if shape1 and shape2 overlap, otherwise false.
		**/
		public static TestOverlap(
			shape1: b2Shape,
			transform1: Box2D.Common.Math.b2Transform,
			shape2: b2Shape,
			transform2: Box2D.Common.Math.b2Transform): boolean;

		/**
		* Test a point for containment in this shape. This only works for convex shapes.
		* @param xf Shape world transform.
		* @param p Point to test against, in world coordinates.
		* @return True if the point is in this shape, otherwise false.
		**/
		public TestPoint(xf: Box2D.Common.Math.b2Transform, p: Box2D.Common.Math.b2Vec2): boolean;
	}
}

declare namespace Box2D.Dynamics {

	/**
	* A rigid body.
	**/
	export class b2Body {

		/**
		* Dynamic Body
		**/
		public static b2_dynamicBody: number;

		/**
		* Kinematic Body
		**/
		public static b2_kinematicBody: number;

		/**
		* Static Body
		**/
		public static b2_staticBody: number;

		/**
		* Apply a force at a world point. If the force is not applied at the center of mass, it will generate a torque and affect the angular velocity. This wakes up the body.
		* @param force The world force vector, usually in Newtons (N).
		* @param point The world position of the point of application.
		**/
		public ApplyForce(force: Box2D.Common.Math.b2Vec2, point: Box2D.Common.Math.b2Vec2): void;

		/**
		* Apply an impulse at a point. This immediately modifies the velocity. It also modifies the angular velocity if the point of application is not at the center of mass. This wakes up the body.
		* @param impules The world impulse vector, usually in N-seconds or kg-m/s.
		* @param point The world position of the point of application.
		**/
		public ApplyImpulse(impulse: Box2D.Common.Math.b2Vec2, point: Box2D.Common.Math.b2Vec2): void;

		/**
		* Apply a torque. This affects the angular velocity without affecting the linear velocity of the center of mass. This wakes up the body.
		* @param torque Force applied about the z-axis (out of the screen), usually in N-m.
		**/
		public ApplyTorque(torque: number): void;

		/**
		* Creates a fixture and attach it to this body. Use this function if you need to set some fixture parameters, like friction. Otherwise you can create the fixture directly from a shape. If the density is non-zero, this function automatically updates the mass of the body. Contacts are not created until the next time step.
		* @warning This function is locked during callbacks.
		* @param def The fixture definition;
		* @return The created fixture.
		**/
		public CreateFixture(def: b2FixtureDef): b2Fixture;

		/**
		* Creates a fixture from a shape and attach it to this body. This is a convenience function. Use b2FixtureDef if you need to set parameters like friction, restitution, user data, or filtering. This function automatically updates the mass of the body.
		* @warning This function is locked during callbacks.
		* @param shape The shaped of the fixture (to be cloned).
		* @param density The shape density, default is 0.0, set to zero for static bodies.
		* @return The created fixture.
		**/
		public CreateFixture2(shape: Box2D.Collision.Shapes.b2Shape, density?: number): b2Fixture;

		/**
		* Destroy a fixture. This removes the fixture from the broad-phase and destroys all contacts associated with this fixture. This will automatically adjust the mass of the body if the body is dynamic and the fixture has positive density. All fixtures attached to a body are implicitly destroyed when the body is destroyed.
		* @warning This function is locked during callbacks.
		* @param fixture The fixed to be removed.
		**/
		public DestroyFixture(fixture: b2Fixture): void;

		/**
		* Get the angle in radians.
		* @return The current world rotation angle in radians
		**/
		public GetAngle(): number;

		/**
		* Get the angular damping of the body.
		* @return Angular damping of the body.
		**/
		public GetAngularDamping(): number;

		/**
		* Get the angular velocity.
		* @return The angular velocity in radians/second.
		**/
		public GetAngularVelocity(): number;

		/**
		* Get the list of all contacts attached to this body.
		* @return List of all contacts attached to this body.
		**/
		public GetContactList(): Contacts.b2ContactEdge;

		/**
		* Get the list of all controllers attached to this body.
		* @return List of all controllers attached to this body.
		**/
		public GetControllerList(): Controllers.b2ControllerEdge;

		/**
		* Get the definition containing the body properties.
		* @note This provides a feature specific to this port.
		* @return The body's definition.
		**/
		public GetDefinition(): b2BodyDef;

		/**
		* Get the list of all fixtures attached to this body.
		* @return List of all fixtures attached to this body.
		**/
		public GetFixtureList(): b2Fixture;

		/**
		* Get the central rotational inertia of the body.
		* @return The rotational inertia, usually in kg-m^2.
		**/
		public GetInertia(): number;

		/**
		* Get the list of all joints attached to this body.
		* @return List of all joints attached to this body.
		**/
		public GetJointList(): Joints.b2JointEdge;

		/**
		* Get the linear damping of the body.
		* @return The linear damping of the body.
		**/
		public GetLinearDamping(): number;

		/**
		* Get the linear velocity of the center of mass.
		* @return The linear velocity of the center of mass.
		**/
		public GetLinearVelocity(): Box2D.Common.Math.b2Vec2;

		/**
		* Get the world velocity of a local point.
		* @param localPoint Point in local coordinates.
		* @return The world velocity of the point.
		**/
		public GetLinearVelocityFromLocalPoint(localPoint: Box2D.Common.Math.b2Vec2): Box2D.Common.Math.b2Vec2;

		/**
		* Get the world linear velocity of a world point attached to this body.
		* @param worldPoint Point in world coordinates.
		* @return The world velocity of the point.
		**/
		public GetLinearVelocityFromWorldPoint(worldPoint: Box2D.Common.Math.b2Vec2): Box2D.Common.Math.b2Vec2;

		/**
		* Get the local position of the center of mass.
		* @return Local position of the center of mass.
		**/
		public GetLocalCenter(): Box2D.Common.Math.b2Vec2;

		/**
		* Gets a local point relative to the body's origin given a world point.
		* @param worldPoint Pointin world coordinates.
		* @return The corresponding local point relative to the body's origin.
		**/
		public GetLocalPoint(worldPoint: Box2D.Common.Math.b2Vec2): Box2D.Common.Math.b2Vec2;

		/**
		* Gets a local vector given a world vector.
		* @param worldVector World vector.
		* @return The corresponding local vector.
		**/
		public GetLocalVector(worldVector: Box2D.Common.Math.b2Vec2): Box2D.Common.Math.b2Vec2;

		/**
		* Get the total mass of the body.
		* @return The body's mass, usually in kilograms (kg).
		**/
		public GetMass(): number;

		/**
		* Get the mass data of the body. The rotational inertial is relative to the center of mass.
		* @param data Body's mass data, this argument is `out`.
		**/
		public GetMassData(data: Box2D.Collision.Shapes.b2MassData): void;

		/**
		* Get the next body in the world's body list.
		* @return Next body in the world's body list.
		**/
		public GetNext(): b2Body;

		/**
		* Get the world body origin position.
		* @return World position of the body's origin.
		**/
		public GetPosition(): Box2D.Common.Math.b2Vec2;

		/**
		* Get the body transform for the body's origin.
		* @return World transform of the body's origin.
		**/
		public GetTransform(): Box2D.Common.Math.b2Transform;

		/**
		* Get the type of this body.
		* @return Body type as uint.
		**/
		public GetType(): number;

		/**
		* Get the user data pointer that was provided in the body definition.
		* @return User's data, cast to the correct type.
		**/
		public GetUserData(): any;

		/**
		* Get the parent world of this body.
		* @return Body's world.
		**/
		public GetWorld(): b2World;

		/**
		* Get the world position of the center of mass.
		* @return World position of the center of mass.
		**/
		public GetWorldCenter(): Box2D.Common.Math.b2Vec2;

		/**
		* Get the world coordinates of a point given the local coordinates.
		* @param localPoint Point on the body measured relative to the body's origin.
		* @return localPoint expressed in world coordinates.
		**/
		public GetWorldPoint(localPoint: Box2D.Common.Math.b2Vec2): Box2D.Common.Math.b2Vec2;

		/**
		* Get the world coordinates of a vector given the local coordinates.
		* @param localVector Vector fixed in the body.
		* @return localVector expressed in world coordinates.
		**/
		public GetWorldVector(localVector: Box2D.Common.Math.b2Vec2): Box2D.Common.Math.b2Vec2;

		/**
		* Get the active state of the body.
		* @return True if the body is active, otherwise false.
		**/
		public IsActive(): boolean;

		/**
		* Get the sleeping state of this body.
		* @return True if the body is awake, otherwise false.
		**/
		public IsAwake(): boolean;

		/**
		* Is the body treated like a bullet for continuous collision detection?
		* @return True if the body is treated like a bullet, otherwise false.
		**/
		public IsBullet(): boolean;

		/**
		* Does this body have fixed rotation?
		* @return True for fixed, otherwise false.
		**/
		public IsFixedRotation(): boolean;

		/**
		* Is this body allowed to sleep?
		* @return True if the body can sleep, otherwise false.
		**/
		public IsSleepingAllowed(): boolean;

		/**
		* Merges another body into this. Only fixtures, mass and velocity are effected, Other properties are ignored.
		* @note This provides a feature specific to this port.
		**/
		public Merge(other: b2Body): void;

		/**
		* This resets the mass properties to the sum of the mass properties of the fixtures. This normally does not need to be called unless you called SetMassData to override the mass and later you want to reset the mass.
		**/
		public ResetMassData(): void;

		/**
		* Set the active state of the body. An inactive body is not simulated and cannot be collided with or woken up. If you pass a flag of true, all fixtures will be added to the broad-phase. If you pass a flag of false, all fixtures will be removed from the broad-phase and all contacts will be destroyed. Fixtures and joints are otherwise unaffected. You may continue to create/destroy fixtures and joints on inactive bodies. Fixtures on an inactive body are implicitly inactive and will not participate in collisions, ray-casts, or queries. Joints connected to an inactive body are implicitly inactive. An inactive body is still owned by a b2World object and remains in the body list.
		* @param flag True to activate, false to deactivate.
		**/
		public SetActive(flag: boolean): void;

		/**
		* Set the world body angle
		* @param angle New angle of the body.
		**/
		public SetAngle(angle: number): void;

		/**
		* Set the angular damping of the body.
		* @param angularDamping New angular damping value.
		**/
		public SetAngularDamping(angularDamping: number): void;

		/**
		* Set the angular velocity.
		* @param omega New angular velocity in radians/second.
		**/
		public SetAngularVelocity(omega: number): void;

		/**
		* Set the sleep state of the body. A sleeping body has vety low CPU cost.
		* @param flag True to set the body to awake, false to put it to sleep.
		**/
		public SetAwake(flag: boolean): void;

		/**
		* Should this body be treated like a bullet for continuous collision detection?
		* @param flag True for bullet, false for normal.
		**/
		public SetBullet(flag: boolean): void;

		/**
		* Set this body to have fixed rotation. This causes the mass to be reset.
		* @param fixed True for no rotation, false to allow for rotation.
		**/
		public SetFixedRotation(fixed: boolean): void;

		/**
		* Set the linear damping of the body.
		* @param linearDamping The new linear damping for this body.
		**/
		public SetLinearDamping(linearDamping: number): void;

		/**
		* Set the linear velocity of the center of mass.
		* @param v New linear velocity of the center of mass.
		**/
		public SetLinearVelocity(v: Box2D.Common.Math.b2Vec2): void;

		/**
		* Set the mass properties to override the mass properties of the fixtures Note that this changes the center of mass position. Note that creating or destroying fixtures can also alter the mass. This function has no effect if the body isn't dynamic.
		* @warning The supplied rotational inertia should be relative to the center of mass.
		* @param massData New mass data properties.
		**/
		public SetMassData(massData: Box2D.Collision.Shapes.b2MassData): void;

		/**
		* Set the world body origin position.
		* @param position New world body origin position.
		**/
		public SetPosition(position: Box2D.Common.Math.b2Vec2): void;

		/**
		* Set the position of the body's origin and rotation (radians). This breaks any contacts and wakes the other bodies.
		* @param position New world body origin position.
		* @param angle New world rotation angle of the body in radians.
		**/
		public SetPositionAndAngle(position: Box2D.Common.Math.b2Vec2, angle: number): void;

		/**
		* Is this body allowed to sleep
		* @param flag True if the body can sleep, false if not.
		**/
		public SetSleepingAllowed(flag: boolean): void;

		/**
		* Set the position of the body's origin and rotation (radians). This breaks any contacts and wakes the other bodies. Note this is less efficient than the other overload - you should use that if the angle is available.
		* @param xf Body's origin and rotation (radians).
		**/
		public SetTransform(xf: Box2D.Common.Math.b2Transform): void;

		/**
		* Set the type of this body. This may alter the mass and velocity
		* @param type Type enum.
		**/
		public SetType(type: number): void;

		/**
		* Set the user data. Use this to store your application specific data.
		* @param data The user data for this body.
		**/
		public SetUserData(data: any): void;

		/**
		* Splits a body into two, preserving dynamic properties
		* @note This provides a feature specific to this port.
		* @param callback
		* @return The newly created bodies from the split.
		**/
		public Split(callback: (fixture: b2Fixture) => boolean): b2Body;
	}
}

declare namespace Box2D.Dynamics {

	/**
	* A body definition holds all the data needed to construct a rigid body. You can safely re-use body definitions.
	**/
	export class b2BodyDef {

		/**
		* Does this body start out active?
		**/
		public active: boolean;

		/**
		* Set this flag to false if this body should never fall asleep. Note that this increases CPU usage.
		**/
		public allowSleep: boolean;

		/**
		* The world angle of the body in radians.
		**/
		public angle: number;

		/**
		* Angular damping is use to reduce the angular velocity. The damping parameter can be larger than 1.0f but the damping effect becomes sensitive to the time step when the damping parameter is large.
		**/
		public angularDamping: number;

		/**
		* The angular velocity of the body.
		**/
		public angularVelocity: number;

		/**
		* Is this body initially awake or sleeping?
		**/
		public awake: boolean;

		/**
		* Is this a fast moving body that should be prevented from tunneling through other moving bodies? Note that all bodies are prevented from tunneling through static bodies.
		* @warning You should use this flag sparingly since it increases processing time.
		**/
		public bullet: boolean;

		/**
		* Should this body be prevented from rotating? Useful for characters.
		**/
		public fixedRotation: boolean;

		/**
		* Scales the inertia tensor.
		* @warning Experimental
		**/
		public inertiaScale: number;

		/**
		* Linear damping is use to reduce the linear velocity. The damping parameter can be larger than 1.0f but the damping effect becomes sensitive to the time step when the damping parameter is large.
		**/
		public linearDamping: number;

		/**
		* The linear velocity of the body's origin in world co-ordinates.
		**/
		public linearVelocity: Box2D.Common.Math.b2Vec2;

		/**
		* The world position of the body. Avoid creating bodies at the origin since this can lead to many overlapping shapes.
		**/
		public position: Box2D.Common.Math.b2Vec2;

		/**
		* The body type: static, kinematic, or dynamic. A member of the b2BodyType class .
		* @note If a dynamic body would have zero mass, the mass is set to one.
		**/
		public type: number;

		/**
		* Use this to store application specific body data.
		**/
		public userData: any;
	}
}

declare namespace Box2D.Dynamics {

	/**
	* Implement this class to provide collision filtering. In other words, you can implement this class if you want finer control over contact creation.
	**/
	export class b2ContactFilter {

		/**
		* Return true if the given fixture should be considered for ray intersection. By default, userData is cast as a b2Fixture and collision is resolved according to ShouldCollide.
		* @note This function is not in the box2dweb.as code -- might not work.
		* @see b2World.Raycast()
		* @see b2ContactFilter.ShouldCollide()
		* @param userData User provided data.  Comments indicate that this might be a b2Fixture.
		* @return True if the fixture should be considered for ray intersection, otherwise false.
		**/
		public RayCollide(userData: any): boolean;

		/**
		* Return true if contact calculations should be performed between these two fixtures.
		* @warning For performance reasons this is only called when the AABBs begin to overlap.
		* @param fixtureA b2Fixture potentially colliding with fixtureB.
		* @param fixtureB b2Fixture potentially colliding with fixtureA.
		* @return True if fixtureA and fixtureB probably collide requiring more calculations, otherwise false.
		**/
		public ShouldCollide(fixtureA: b2Fixture, fixtureB: b2Fixture): boolean;
	}
}

declare namespace Box2D.Dynamics {

	/**
	* Contact impulses for reporting. Impulses are used instead of forces because sub-step forces may approach infinity for rigid body collisions. These match up one-to-one with the contact points in b2Manifold.
	**/
	export class b2ContactImpulse {

		/**
		* Normal impulses.
		**/
		public normalImpulses: Box2D.Common.Math.b2Vec2;

		/**
		* Tangent impulses.
		**/
		public tangentImpulses: Box2D.Common.Math.b2Vec2;
	}
}

declare namespace Box2D.Dynamics {

	/**
	* Implement this class to get contact information. You can use these results for things like sounds and game logic. You can also get contact results by traversing the contact lists after the time step. However, you might miss some contacts because continuous physics leads to sub-stepping. Additionally you may receive multiple callbacks for the same contact in a single time step. You should strive to make your callbacks efficient because there may be many callbacks per time step.
	* @warning You cannot create/destroy Box2D entities inside these callbacks.
	**/
	export class b2ContactListener {

		/**
		* Called when two fixtures begin to touch.
		* @param contact Contact point.
		**/
		public BeginContact(contact: Contacts.b2Contact): void;

		/**
		* Called when two fixtures cease to touch.
		* @param contact Contact point.
		**/
		public EndContact(contact: Contacts.b2Contact): void;

		/**
		* This lets you inspect a contact after the solver is finished. This is useful for inspecting impulses. Note: the contact manifold does not include time of impact impulses, which can be arbitrarily large if the sub-step is small. Hence the impulse is provided explicitly in a separate data structure. Note: this is only called for contacts that are touching, solid, and awake.
		* @param contact Contact point.
		* @param impulse Contact impulse.
		**/
		public PostSolve(contact: Contacts.b2Contact, impulse: b2ContactImpulse): void;

		/**
		* This is called after a contact is updated. This allows you to inspect a contact before it goes to the solver. If you are careful, you can modify the contact manifold (e.g. disable contact). A copy of the old manifold is provided so that you can detect changes. Note: this is called only for awake bodies. Note: this is called even when the number of contact points is zero. Note: this is not called for sensors. Note: if you set the number of contact points to zero, you will not get an EndContact callback. However, you may get a BeginContact callback the next step.
		* @param contact Contact point.
		* @param oldManifold Old manifold.
		**/
		public PreSolve(contact: Contacts.b2Contact, oldManifold: Box2D.Collision.b2Manifold): void;
	}
}

declare namespace Box2D.Dynamics {

	/**
	* Implement and register this class with a b2World to provide debug drawing of physics entities in your game.
	* @example Although Box2D is a physics engine and therefore has nothing to do with drawing, Box2dFlash provides such methods for debugging which are defined in the b2DebugDraw class. In Box2dWeb, a b2DebugDraw takes a canvas-context instead of a Sprite:
	*
	*	var debugDraw = new Box2D.Dynamics.b2DebugDraw();
	*	debugDraw.SetSprite(document.GetElementsByTagName("canvas")[0].getContext("2d"));
	**/
	export class b2DebugDraw {

		/**
		* Draw axis aligned bounding boxes.
		**/
		public static e_aabbBit: number;

		/**
		* Draw center of mass frame.
		**/
		public static e_centerOfMassBit: number;

		/**
		* Draw controllers.
		**/
		public static e_controllerBit: number;

		/**
		* Draw joint connections.
		**/
		public static e_jointBit: number;

		/**
		* Draw broad-phase pairs.
		**/
		public static e_pairBit: number;

		/**
		* Draw shapes.
		**/
		public static e_shapeBit: number;

		/**
		* Constructor.
		**/
		constructor();

		/**
		* Append flags to the current flags.
		* @param flags Flags to add.
		**/
		public AppendFlags(flags: number): void;

		/**
		* Clear flags from the current flags.
		* @param flags flags to clear.
		**/
		public ClearFlags(flags: number): void;

		/**
		* Draw a circle.
		* @param center Circle center point.
		* @param radius Circle radius.
		* @param color Circle draw color.
		**/
		public DrawCircle(center: Box2D.Common.Math.b2Vec2, radius: number, color: Box2D.Common.b2Color): void;

		/**
		* Draw a closed polygon provided in CCW order.
		* @param vertices Polygon verticies.
		* @param vertexCount Number of vertices in the polygon, usually vertices.length.
		* @param color Polygon draw color.
		**/
		public DrawPolygon(vertices: Box2D.Common.Math.b2Vec2[], vertexCount: number, color: Box2D.Common.b2Color): void;

		/**
		* Draw a line segment.
		* @param p1 Line beginpoint.
		* @param p2 Line endpoint.
		* @param color Line color.
		**/
		public DrawSegment(p1: Box2D.Common.Math.b2Vec2, p2: Box2D.Common.Math.b2Vec2, color: Box2D.Common.b2Color): void;

		/**
		* Draw a solid circle.
		* @param center Circle center point.
		* @param radius Circle radius.
		* @param axis Circle axis.
		* @param color Circle color.
		**/
		public DrawSolidCircle(center: Box2D.Common.Math.b2Vec2, radius: number, axis: Box2D.Common.Math.b2Vec2, color: Box2D.Common.b2Color): void;

		/**
		* Draw a solid closed polygon provided in CCW order.
		* @param vertices Polygon verticies.
		* @param vertexCount Number of vertices in the polygon, usually vertices.length.
		* @param color Polygon draw color.
		**/
		public DrawSolidPolygon(vertices: Box2D.Common.Math.b2Vec2[], vertexCount: number, color: Box2D.Common.b2Color): void;

		/**
		* Draw a transform. Choose your own length scale.
		* @param xf Transform to draw.
		**/
		public DrawTransform(xf: Box2D.Common.Math.b2Transform): void;

		/**
		* Get the alpha value used for lines.
		* @return Alpha value used for drawing lines.
		**/
		public GetAlpha(): number;

		/**
		* Get the draw scale.
		* @return Draw scale ratio.
		**/
		public GetDrawScale(): number;

		/**
		* Get the alpha value used for fills.
		* @return Alpha value used for drawing fills.
		**/
		public GetFillAlpha(): number;

		/**
		* Get the drawing flags.
		* @return Drawing flags.
		**/
		public GetFlags(): number;

		/**
		* Get the line thickness.
		* @return Line thickness.
		**/
		public GetLineThickness(): number;

		/**
		* Get the HTML Canvas Element for drawing.
		* @note box2dflash uses Sprite object, box2dweb uses CanvasRenderingContext2D, that is why this function is called GetSprite().
		* @return The HTML Canvas Element used for debug drawing.
		**/
		public GetSprite(): CanvasRenderingContext2D;

		/**
		* Get the scale used for drawing XForms.
		* @return Scale for drawing transforms.
		**/
		public GetXFormScale(): number;

		/**
		* Set the alpha value used for lines.
		* @param alpha Alpha value for drawing lines.
		**/
		public SetAlpha(alpha: number): void;

		/**
		* Set the draw scale.
		* @param drawScale Draw scale ratio.
		**/
		public SetDrawScale(drawScale: number): void;

		/**
		* Set the alpha value used for fills.
		* @param alpha Alpha value for drawing fills.
		**/
		public SetFillAlpha(alpha: number): void;

		/**
		* Set the drawing flags.
		* @param flags Sets the drawing flags.
		**/
		public SetFlags(flags: number): void;

		/**
		* Set the line thickness.
		* @param lineThickness The new line thickness.
		**/
		public SetLineThickness(lineThickness: number): void;

		/**
		* Set the HTML Canvas Element for drawing.
		* @note box2dflash uses Sprite object, box2dweb uses CanvasRenderingContext2D, that is why this function is called SetSprite().
		* @param canvas HTML Canvas Element to draw debug information to.
		**/
		public SetSprite(canvas: CanvasRenderingContext2D): void;

		/**
		* Set the scale used for drawing XForms.
		* @param xformScale The transform scale.
		**/
		public SetXFormScale(xformScale: number): void;
	}
}

declare namespace Box2D.Dynamics {

	/**
	* Joints and shapes are destroyed when their associated body is destroyed. Implement this listener so that you may nullify references to these joints and shapes.
	**/
	export class b2DestructionListener {

		/**
		* Called when any fixture is about to be destroyed due to the destruction of its parent body.
		* @param fixture b2Fixture being destroyed.
		**/
		public SayGoodbyeFixture(fixture: b2Fixture): void;

		/**
		* Called when any joint is about to be destroyed due to the destruction of one of its attached bodies.
		* @param joint b2Joint being destroyed.
		**/
		public SayGoodbyeJoint(joint: Joints.b2Joint): void;
	}
}

declare namespace Box2D.Dynamics {

	/**
	* This holds contact filtering data.
	**/
	export class b2FilterData {

		/**
		* The collision category bits. Normally you would just set one bit.
		**/
		public categoryBits: number;

		/**
		* Collision groups allow a certain group of objects to never collide (negative) or always collide (positive). Zero means no collision group. Non-zero group filtering always wins against the mask bits.
		**/
		public groupIndex: number;

		/**
		* The collision mask bits. This states the categories that this shape would accept for collision.
		**/
		public maskBits: number;

		/**
		* Creates a copy of the filter data.
		* @return Copy of this filter data.
		**/
		public Copy(): b2FilterData;
	}
}

declare namespace Box2D.Dynamics {

	/**
	* A fixture is used to attach a shape to a body for collision detection. A fixture inherits its transform from its parent. Fixtures hold additional non-geometric data such as friction, collision filters, etc. Fixtures are created via b2Body::CreateFixture.
	* @warning  you cannot reuse fixtures.
	**/
	export class b2Fixture {

		/**
		* Get the fixture's AABB. This AABB may be enlarge and/or stale. If you need a more accurate AABB, compute it using the shape and the body transform.
		* @return Fiture's AABB.
		**/
		public GetAABB(): Box2D.Collision.b2AABB;

		/**
		* Get the parent body of this fixture. This is NULL if the fixture is not attached.
		* @return The parent body.
		**/
		public GetBody(): b2Body;

		/**
		* Get the density of this fixture.
		* @return Density
		**/
		public GetDensity(): number;

		/**
		* Get the contact filtering data.
		* @return Filter data.
		**/
		public GetFilterData(): b2FilterData;

		/**
		* Get the coefficient of friction.
		* @return Friction.
		**/
		public GetFriction(): number;

		/**
		* Get the mass data for this fixture. The mass data is based on the density and the shape. The rotational inertia is about the shape's origin. This operation may be expensive.
		* @param massData This is a reference to a valid b2MassData, if it is null a new b2MassData is allocated and then returned.  Default = null.
		* @return Mass data.
		**/
		public GetMassData(massData?: Box2D.Collision.Shapes.b2MassData): Box2D.Collision.Shapes.b2MassData;

		/**
		* Get the next fixture in the parent body's fixture list.
		* @return Next fixture.
		**/
		public GetNext(): b2Fixture;

		/**
		* Get the coefficient of restitution.
		* @return Restitution.
		**/
		public GetRestitution(): number;

		/**
		* Get the child shape. You can modify the child shape, however you should not change the number of vertices because this will crash some collision caching mechanisms.
		* @return Fixture shape.
		**/
		public GetShape(): Box2D.Collision.Shapes.b2Shape;

		/**
		* Get the type of the child shape. You can use this to down cast to the concrete shape.
		* @return Shape type enum.
		**/
		public GetType(): number;

		/**
		* Get the user data that was assigned in the fixture definition. Use this to store your application specific data.
		* @return User provided data.  Cast to your object type.
		**/
		public GetUserData(): any;

		/**
		* Is this fixture a sensor (non-solid)?
		* @return True if the shape is a sensor, otherwise false.
		**/
		public IsSensor(): boolean;

		/**
		* Perform a ray cast against this shape.
		* @param output Ray cast results.  This argument is out.
		* @param input Ray cast input parameters.
		* @return True if the ray hits the shape, otherwise false.
		**/
		public RayCast(output: Box2D.Collision.b2RayCastOutput, input: Box2D.Collision.b2RayCastInput): boolean;

		/**
		* Set the density of this fixture. This will _not_ automatically adjust the mass of the body. You must call b2Body::ResetMassData to update the body's mass.
		* @param density The new density.
		**/
		public SetDensity(density: number): void;

		/**
		* Set the contact filtering data. This will not update contacts until the next time step when either parent body is active and awake.
		* @param filter The new filter data.
		**/
		public SetFilterData(filter: any): void;

		/**
		* Set the coefficient of friction.
		* @param friction The new friction coefficient.
		**/
		public SetFriction(friction: number): void;

		/**
		* Get the coefficient of restitution.
		* @param resitution The new restitution coefficient.
		**/
		public SetRestitution(restitution: number): void;

		/**
		* Set if this fixture is a sensor.
		* @param sensor True to set as a sensor, false to not be a sensor.
		**/
		public SetSensor(sensor: boolean): void;

		/**
		* Set the user data. Use this to store your application specific data.
		* @param data User provided data.
		**/
		public SetUserData(data: any): void;

		/**
		* Test a point for containment in this fixture.
		* @param p Point to test against, in world coordinates.
		* @return True if the point is in this shape, otherwise false.
		**/
		public TestPoint(p: Box2D.Common.Math.b2Vec2): boolean;
	}
}

declare namespace Box2D.Dynamics {

	/**
	* A fixture definition is used to create a fixture. This class defines an abstract fixture definition. You can reuse fixture definitions safely.
	**/
	export class b2FixtureDef {

		/**
		* The density, usually in kg/m^2.
		**/
		public density: number;

		/**
		* Contact filtering data.
		**/
		public filter: b2FilterData;

		/**
		* The friction coefficient, usually in the range [0,1].
		**/
		public friction: number;

		/**
		* A sensor shape collects contact information but never generates a collision response.
		**/
		public isSensor: boolean;

		/**
		* The restitution (elasticity) usually in the range [0,1].
		**/
		public restitution: number;

		/**
		* The shape, this must be set. The shape will be cloned, so you can create the shape on the stack.
		**/
		public shape: Box2D.Collision.Shapes.b2Shape;

		/**
		* Use this to store application specific fixture data.
		**/
		public userData: any;

		/**
		* The constructor sets the default fixture definition values.
		**/
		constructor();
	}
}

declare namespace Box2D.Dynamics {

	/**
	* The world class manages all physics entities, dynamic simulation, and asynchronous queries.
	**/
	export class b2World {

		/**
		* Locked
		**/
		public static e_locked: number;

		/**
		* New Fixture
		**/
		public static e_newFixture: number;

		/**
		* Creates a new world.
		* @param gravity The world gravity vector.
		* @param doSleep Improvie performance by not simulating inactive bodies.
		**/
		constructor(gravity: Box2D.Common.Math.b2Vec2, doSleep: boolean);

		/**
		* Add a controller to the world list.
		* @param c Controller to add.
		* @return Controller that was added to the world.
		**/
		public AddController(c: Controllers.b2Controller): Controllers.b2Controller;

		/**
		* Call this after you are done with time steps to clear the forces. You normally call this after each call to Step, unless you are performing sub-steps.
		**/
		public ClearForces(): void;

		/**
		* Create a rigid body given a definition. No reference to the definition is retained.
		* @param def Body's definition.
		* @return Created rigid body.
		**/
		public CreateBody(def: b2BodyDef): b2Body;

		/**
		* Creates a new controller.
		* @param controller New controller.
		* @return New controller.
		**/
		public CreateController(controller: Controllers.b2Controller): Controllers.b2Controller;

		/**
		* Create a joint to constrain bodies together. No reference to the definition is retained. This may cause the connected bodies to cease colliding.
		* @warning This function is locked during callbacks.
		* @param def Joint definition.
		* @return New created joint.
		**/
		public CreateJoint(def: Joints.b2JointDef): Joints.b2Joint;

		/**
		* Destroy a rigid body given a definition. No reference to the definition is retained. This function is locked during callbacks.
		* @param b Body to destroy.
		* @warning This function is locked during callbacks.
		**/
		public DestroyBody(b: b2Body): void;

		/**
		* Destroy a controller given the controller instance.
		* @warning This function is locked during callbacks.
		* @param controller Controller to destroy.
		**/
		public DestroyController(controller: Controllers.b2Controller): void;

		/**
		* Destroy a joint. This may cause the connected bodies to begin colliding.
		* @param j Joint to destroy.
		**/
		public DestroyJoint(j: Joints.b2Joint): void;

		/**
		* Call this to draw shapes and other debug draw data.
		**/
		public DrawDebugData(): void;

		/**
		* Get the number of bodies.
		* @return Number of bodies in this world.
		**/
		public GetBodyCount(): number;

		/**
		* Get the world body list. With the returned body, use b2Body::GetNext to get the next body in the world list. A NULL body indicates the end of the list.
		* @return The head of the world body list.
		**/
		public GetBodyList(): b2Body;

		/**
		* Get the number of contacts (each may have 0 or more contact points).
		* @return Number of contacts.
		**/
		public GetContactCount(): number;

		/**
		* Get the world contact list. With the returned contact, use b2Contact::GetNext to get the next contact in the world list. A NULL contact indicates the end of the list.
		* @return The head of the world contact list.
		**/
		public GetContactList(): Contacts.b2Contact;

		/**
		* Get the global gravity vector.
		* @return Global gravity vector.
		**/
		public GetGravity(): Box2D.Common.Math.b2Vec2;

		/**
		* The world provides a single static ground body with no collision shapes. You can use this to simplify the creation of joints and static shapes.
		* @return The ground body.
		**/
		public GetGroundBody(): b2Body;

		/**
		* Get the number of joints.
		* @return The number of joints in the world.
		**/
		public GetJointCount(): number;

		/**
		* Get the world joint list. With the returned joint, use b2Joint::GetNext to get the next joint in the world list. A NULL joint indicates the end of the list.
		* @return The head of the world joint list.
		**/
		public GetJointList(): Joints.b2Joint;

		/**
		* Get the number of broad-phase proxies.
		* @return Number of borad-phase proxies.
		**/
		public GetProxyCount(): number;

		/**
		* Is the world locked (in the middle of a time step).
		* @return True if the world is locked and in the middle of a time step, otherwise false.
		**/
		public IsLocked(): boolean;

		/**
		* Query the world for all fixtures that potentially overlap the provided AABB.
		* @param callback  A user implemented callback class. It should match signature function Callback(fixture:b2Fixture):Boolean.  Return true to continue to the next fixture.
		* @param aabb The query bounding box.
		**/
		public QueryAABB(callback: (fixutre: b2Fixture) => boolean, aabb: Box2D.Collision.b2AABB): void;

		/**
		* Query the world for all fixtures that contain a point.
		* @note This provides a feature specific to this port.
		* @param callback A user implemented callback class.  It should match signature function Callback(fixture:b2Fixture):Boolean.  Return true to continue to the next fixture.
		* @param p The query point.
		**/
		public QueryPoint(callback: (fixture: b2Fixture) => boolean, p: Box2D.Common.Math.b2Vec2): void;

		/**
		* Query the world for all fixtures that precisely overlap the provided transformed shape.
		* @note This provides a feature specific to this port.
		* @param callback A user implemented callback class.  It should match signature function Callback(fixture:b2Fixture):Boolean.  Return true to continue to the next fixture.
		* @param shape The query shape.
		* @param transform Optional transform, default = null.
		**/
		public QueryShape(callback: (fixture: b2Fixture) => boolean, shape: Box2D.Collision.Shapes.b2Shape, transform?: Box2D.Common.Math.b2Transform): void;

		/**
		* Ray-cast the world for all fixtures in the path of the ray. Your callback Controls whether you get the closest point, any point, or n-points The ray-cast ignores shapes that contain the starting point.
		* @param callback A callback function which must be of signature:
		*	function Callback(
		*		fixture:b2Fixture,	// The fixture hit by the ray
		*		point:b2Vec2,		// The point of initial intersection
		*		normal:b2Vec2,		// The normal vector at the point of intersection
		*		fraction:Number		// The fractional length along the ray of the intersection
		*	 ):Number
		*	 Callback should return the new length of the ray as a fraction of the original length. By returning 0, you immediately terminate. By returning 1, you continue wiht the original ray. By returning the current fraction, you proceed to find the closest point.
		* @param point1 The ray starting point.
		* @param point2 The ray ending point.
		**/
		public RayCast(callback: (fixture: b2Fixture, point: Box2D.Common.Math.b2Vec2, normal: Box2D.Common.Math.b2Vec2, fraction: number) => number, point1: Box2D.Common.Math.b2Vec2, point2: Box2D.Common.Math.b2Vec2): void;

		/**
		* Ray-cast the world for all fixture in the path of the ray.
		* @param point1 The ray starting point.
		* @param point2 The ray ending point.
		* @return Array of all the fixtures intersected by the ray.
		**/
		public RayCastAll(point1: Box2D.Common.Math.b2Vec2, point2: Box2D.Common.Math.b2Vec2): b2Fixture[];

		/**
		* Ray-cast the world for the first fixture in the path of the ray.
		* @param point1 The ray starting point.
		* @param point2 The ray ending point.
		* @return First fixture intersected by the ray.
		**/
		public RayCastOne(point1: Box2D.Common.Math.b2Vec2, point2: Box2D.Common.Math.b2Vec2): b2Fixture;

		/**
		* Removes the controller from the world.
		* @param c Controller to remove.
		**/
		public RemoveController(c: Controllers.b2Controller): void;

		/**
		* Use the given object as a broadphase. The old broadphase will not be cleanly emptied.
		* @warning This function is locked during callbacks.
		* @param broadphase: Broad phase implementation.
		**/
		public SetBroadPhase(broadPhase: Box2D.Collision.IBroadPhase): void;

		/**
		* Register a contact filter to provide specific control over collision. Otherwise the default filter is used (b2_defaultFilter).
		* @param filter Contact filter'er.
		**/
		public SetContactFilter(filter: b2ContactFilter): void;

		/**
		* Register a contact event listener.
		* @param listener Contact event listener.
		**/
		public SetContactListener(listener: b2ContactListener): void;

		/**
		* Enable/disable continuous physics. For testing.
		* @param flag True for continuous physics, otherwise false.
		**/
		public SetContinuousPhysics(flag: boolean): void;

		/**
		* Register a routine for debug drawing. The debug draw functions are called inside the b2World::Step method, so make sure your renderer is ready to consume draw commands when you call Step().
		* @param debugDraw Debug drawing instance.
		**/
		public SetDebugDraw(debugDraw: b2DebugDraw): void;

		/**
		* Destruct the world. All physics entities are destroyed and all heap memory is released.
		* @param listener Destruction listener instance.
		**/
		public SetDestructionListener(listener: b2DestructionListener): void;

		/**
		* Change the global gravity vector.
		* @param gravity New global gravity vector.
		**/
		public SetGravity(gravity: Box2D.Common.Math.b2Vec2): void;

		/**
		* Enable/disable warm starting. For testing.
		* @param flag True for warm starting, otherwise false.
		**/
		public SetWarmStarting(flag: boolean): void;

		/**
		* Take a time step. This performs collision detection, integration, and constraint solution.
		* @param dt The amout of time to simulate, this should not vary.
		* @param velocityIterations For the velocity constraint solver.
		* @param positionIterations For the position constraint solver.
		**/
		public Step(dt: number, velocityIterations: number, positionIterations: number): void;

		/**
		* Perform validation of internal data structures.
		**/
		public Validate(): void;
	}
}

declare namespace Box2D.Dynamics.Contacts {

	/**
	* The class manages contact between two shapes. A contact exists for each overlapping AABB in the broad-phase (except if filtered). Therefore a contact object may exist that has no contact points.
	**/
	export class b2Contact {

		/**
		* Constructor
		**/
		constructor();

		/**
		* Flag this contact for filtering. Filtering will occur the next time step.
		**/
		public FlagForFiltering(): void;

		/**
		* Get the first fixture in this contact.
		* @return First fixture in this contact.
		**/
		public GetFixtureA(): b2Fixture;

		/**
		* Get the second fixture in this contact.
		* @return Second fixture in this contact.
		**/
		public GetFixtureB(): b2Fixture;

		/**
		* Get the contact manifold. Do not modify the manifold unless you understand the internals of Box2D.
		* @return Contact manifold.
		**/
		public GetManifold(): Box2D.Collision.b2Manifold;

		/**
		* Get the next contact in the world's contact list.
		* @return Next contact in the world's contact list.
		**/
		public GetNext(): b2Contact;

		/**
		* Get the world manifold.
		* @param worldManifold World manifold out.
		* @return World manifold.
		**/
		public GetWorldManifold(worldManifold: Box2D.Collision.b2WorldManifold): void;

		/**
		* Does this contact generate TOI events for continuous simulation.
		* @return True for continous, otherwise false.
		**/
		public IsContinuous(): boolean;

		/**
		* Has this contact been disabled?
		* @return True if disabled, otherwise false.
		**/
		public IsEnabled(): boolean;

		/**
		* Is this contact a sensor?
		* @return True if sensor, otherwise false.
		**/
		public IsSensor(): boolean;

		/**
		* Is this contact touching.
		* @return True if contact is touching, otherwise false.
		**/
		public IsTouching(): boolean;

		/**
		* Enable/disable this contact. This can be used inside the pre-solve contact listener. The contact is only disabled for the current time step (or sub-step in continuous collision).
		* @param flag True to enable, false to disable.
		**/
		public SetEnabled(flag: boolean): void;

		/**
		* Change this to be a sensor or-non-sensor contact.
		* @param sensor True to be sensor, false to not be a sensor.
		**/
		public SetSensor(sensor: boolean): void;
	}
}

declare namespace Box2D.Dynamics.Contacts {

	/**
	* A contact edge is used to connect bodies and contacts together in a contact graph where each body is a node and each contact is an edge. A contact edge belongs to a doubly linked list maintained in each attached body. Each contact has two contact nodes, one for each attached body.
	**/
	export class b2ContactEdge {

		/**
		* Contact.
		**/
		public contact: b2Contact;

		/**
		* Next contact edge.
		**/
		public next: b2ContactEdge;

		/**
		* Contact body.
		**/
		public other: b2Body;

		/**
		* Previous contact edge.
		**/
		public prev: b2ContactEdge;
	}
}

declare namespace Box2D.Dynamics.Contacts {

	/**
	* This structure is used to report contact point results.
	**/
	export class b2ContactResult {

		/**
		* The contact id identifies the features in contact.
		**/
		public id: Box2D.Collision.b2ContactID;

		/**
		* Points from shape1 to shape2.
		**/
		public normal: Box2D.Common.Math.b2Vec2;

		/**
		* The normal impulse applied to body2.
		**/
		public normalImpulse: number;

		/**
		* Position in world coordinates.
		**/
		public position: Box2D.Common.Math.b2Vec2;

		/**
		* The first shape.
		**/
		public shape1: Box2D.Collision.Shapes.b2Shape;

		/**
		* The second shape.
		**/
		public shape2: Box2D.Collision.Shapes.b2Shape;

		/**
		* The tangent impulse applied to body2.
		**/
		public tangentImpulse: number;
	}
}

declare namespace Box2D.Dynamics.Controllers {

	/**
	* Base class for controllers. Controllers are a convience for encapsulating common per-step functionality.
	**/
	export class b2Controller {

		/**
		* Body count.
		**/
		public m_bodyCount: number;

		/**
		* List of bodies.
		**/
		public m_bodyList: b2ControllerEdge;

		/**
		* Adds a body to the controller.
		* @param body Body to add.
		**/
		public AddBody(body: b2Body): void;

		/**
		* Removes all bodies from the controller.
		**/
		public Clear(): void;

		/**
		* Debug drawing.
		* @param debugDraw Handle to drawer.
		**/
		public Draw(debugDraw: b2DebugDraw): void;

		/**
		* Gets the body list.
		* @return Body list.
		**/
		public GetBodyList(): b2ControllerEdge;

		/**
		* Gets the next controller.
		* @return Next controller.
		**/
		public GetNext(): b2Controller;

		/**
		* Gets the world.
		* @return World.
		**/
		public GetWorld(): b2World;

		/**
		* Removes a body from the controller.
		* @param body Body to remove from this controller.
		**/
		public RemoveBody(body: b2Body): void;

		/**
		* Step
		* @param step b2TimeStep -> Private internal class.  Not sure why this is exposed.
		**/
		public Step(step: any/*b2TimeStep*/): void;
	}
}

declare namespace Box2D.Dynamics.Controllers {

	/**
	* Controller Edge.
	**/
	export class b2ControllerEdge {

		/**
		* Body.
		**/
		public body: b2Body;

		/**
		* Provides quick access to the other end of this edge.
		**/
		public controller: b2Controller;

		/**
		* The next controller edge in the controller's body list.
		**/
		public nextBody: b2ControllerEdge;

		/**
		* The next controller edge in the body's controller list.
		**/
		public nextController: b2ControllerEdge;

		/**
		* The previous controller edge in the controller's body list.
		**/
		public prevBody: b2ControllerEdge;

		/**
		* The previous controller edge in the body's controller list.
		**/
		public prevController: b2ControllerEdge;
	}
}

declare namespace Box2D.Dynamics.Controllers {

	/**
	* Calculates buoyancy forces for fluids in the form of a half plane.
	**/
	export class b2BuoyancyController extends b2Controller {

		/**
		* Linear drag co-efficient.
		* @default = 1
		**/
		public angularDrag: number;

		/**
		* The fluid density.
		* @default = 0
		**/
		public density: number;

		/**
		* Gravity vector, if the world's gravity is not used.
		* @default = null
		**/
		public gravity: Box2D.Common.Math.b2Vec2;

		/**
		* Linear drag co-efficient.
		* @default = 2
		**/
		public linearDrag: number;

		/**
		* The outer surface normal.
		**/
		public normal: Box2D.Common.Math.b2Vec2;

		/**
		* The height of the fluid surface along the normal.
		* @default = 0
		**/
		public offset: number;

		/**
		* If false, bodies are assumed to be uniformly dense, otherwise use the shapes densities.
		* @default = false.
		**/
		public useDensity: boolean;

		/**
		* If true, gravity is taken from the world instead of the gravity parameter.
		* @default = true.
		**/
		public useWorldGravity: boolean;

		/**
		* Fluid velocity, for drag calculations.
		**/
		public velocity: Box2D.Common.Math.b2Vec2;
	}
}

declare namespace Box2D.Dynamics.Controllers {

	/**
	* Applies an acceleration every frame, like gravity
	**/
	export class b2ConstantAccelController extends b2Controller {

		/**
		* The acceleration to apply.
		**/
		public A: Box2D.Common.Math.b2Vec2;

		/**
		* @see b2Controller.Step
		**/
		public Step(step: any/* b2TimeStep*/): void;
	}
}

declare namespace Box2D.Dynamics.Controllers {

	/**
	* Applies an acceleration every frame, like gravity.
	**/
	export class b2ConstantForceController extends b2Controller {

		/**
		* The acceleration to apply.
		**/
		public A: Box2D.Common.Math.b2Vec2;

		/**
		* @see b2Controller.Step
		**/
		public Step(step: any/* b2TimeStep*/): void;
	}
}

declare namespace Box2D.Dynamics.Controllers {

	/**
	* Applies simplified gravity between every pair of bodies.
	**/
	export class b2GravityController extends b2Controller {

		/**
		* Specifies the strength of the gravitation force.
		* @default = 1
		**/
		public G: number;

		/**
		* If true, gravity is proportional to r^-2, otherwise r^-1.
		**/
		public invSqr: boolean;

		/**
		* @see b2Controller.Step
		**/
		public Step(step: any/* b2TimeStep*/): void;
	}
}

declare namespace Box2D.Dynamics.Controllers {

	/**
	* Applies top down linear damping to the controlled bodies The damping is calculated by multiplying velocity by a matrix in local co-ordinates.
	**/
	export class b2TensorDampingController extends b2Controller {

		/**
		* Set this to a positive number to clamp the maximum amount of damping done.
		* @default = 0
		**/
		public maxTimeStep: number;

		/**
		* Tensor to use in damping model.
		**/
		public T: Box2D.Common.Math.b2Mat22;

		/**
		* Helper function to set T in a common case.
		* @param xDamping x
		* @param yDamping y
		**/
		public SetAxisAligned(xDamping: number, yDamping: number): void;

		/**
		* @see b2Controller.Step
		**/
		public Step(step: any/* b2TimeStep*/): void;
	}
}

declare namespace Box2D.Dynamics.Joints {

	/**
	* The base joint class. Joints are used to constraint two bodies together in various fashions. Some joints also feature limits and motors.
	**/
	export class b2Joint {

		/**
		* Get the anchor point on bodyA in world coordinates.
		* @return Anchor A point.
		**/
		public GetAnchorA(): Box2D.Common.Math.b2Vec2;

		/**
		* Get the anchor point on bodyB in world coordinates.
		* @return Anchor B point.
		**/
		public GetAnchorB(): Box2D.Common.Math.b2Vec2;

		/**
		* Get the first body attached to this joint.
		* @return Body A.
		**/
		public GetBodyA(): b2Body;

		/**
		* Get the second body attached to this joint.
		* @return Body B.
		**/
		public GetBodyB(): b2Body;

		/**
		* Get the next joint the world joint list.
		* @return Next joint.
		**/
		public GetNext(): b2Joint;

		/**
		* Get the reaction force on body2 at the joint anchor in Newtons.
		* @param inv_dt
		* @return Reaction force (N)
		**/
		public GetReactionForce(inv_dt: number): Box2D.Common.Math.b2Vec2;

		/**
		* Get the reaction torque on body2 in N.
		* @param inv_dt
		* @return Reaction torque (N).
		**/
		public GetReactionTorque(inv_dt: number): number;

		/**
		* Get the type of the concrete joint.
		* @return Joint type.
		**/
		public GetType(): number;

		/**
		* Get the user data pointer.
		* @return User data.  Cast to your data type.
		**/
		public GetUserData(): any;

		/**
		* Short-cut function to determine if either body is inactive.
		* @return True if active, otherwise false.
		**/
		public IsActive(): boolean;

		/**
		* Set the user data pointer.
		* @param data Your custom data.
		**/
		public SetUserData(data: any): void;
	}
}

declare namespace Box2D.Dynamics.Joints {

	/**
	* Joint definitions are used to construct joints.
	**/
	export class b2JointDef {

		/**
		* The first attached body.
		**/
		public bodyA: b2Body;

		/**
		* The second attached body.
		**/
		public bodyB: b2Body;

		/**
		* Set this flag to true if the attached bodies should collide.
		**/
		public collideConnected: boolean;

		/**
		* The joint type is set automatically for concrete joint types.
		**/
		public type: number;

		/**
		* Use this to attach application specific data to your joints.
		**/
		public userData: any;

		/**
		* Constructor.
		**/
		constructor();
	}
}

declare namespace Box2D.Dynamics.Joints {

	/**
	* A joint edge is used to connect bodies and joints together in a joint graph where each body is a node and each joint is an edge. A joint edge belongs to a doubly linked list maintained in each attached body. Each joint has two joint nodes, one for each attached body.
	**/
	export class b2JointEdge {

		/**
		* The joint.
		**/
		public joint: b2Joint;

		/**
		* The next joint edge in the body's joint list.
		**/
		public next: b2JointEdge;

		/**
		* Provides quick access to the other body attached.
		**/
		public other: b2Body;

		/**
		* The previous joint edge in the body's joint list.
		**/
		public prev: b2JointEdge;
	}
}

declare namespace Box2D.Dynamics.Joints {

	/**
	* A distance joint constrains two points on two bodies to remain at a fixed distance from each other. You can view this as a massless, rigid rod.
	**/
	export class b2DistanceJoint extends b2Joint {

		/**
		* Get the anchor point on bodyA in world coordinates.
		* @return Body A anchor.
		**/
		public GetAnchorA(): Box2D.Common.Math.b2Vec2;

		/**
		* Get the anchor point on bodyB in world coordinates.
		* @return Body B anchor.
		**/
		public GetAnchorB(): Box2D.Common.Math.b2Vec2;

		/**
		* Gets the damping ratio.
		* @return Damping ratio.
		**/
		public GetDampingRatio(): number;

		/**
		* Gets the frequency.
		* @return Frequency.
		**/
		public GetFrequency(): number;

		/**
		* Gets the length of distance between the two bodies.
		* @return Length.
		**/
		public GetLength(): number;

		/**
		* Get the reaction force on body2 at the joint anchor in N.
		* @param inv_dt
		* @return Reaction force in N.
		**/
		public GetReactionForce(inv_dt: number): Box2D.Common.Math.b2Vec2;

		/**
		* Get the reaction torque on body 2 in N.
		* @param inv_dt
		* @return Reaction torque in N.
		**/
		public GetReactionTorque(inv_dt: number): number;

		/**
		* Sets the damping ratio.
		* @param ratio New damping ratio.
		**/
		public SetDampingRatio(ratio: number): void;

		/**
		* Sets the frequency.
		* @param hz New frequency (hertz).
		**/
		public SetFrequency(hz: number): void;

		/**
		* Sets the length of distance between the two bodies.
		* @param length New length.
		**/
		public SetLength(length: number): void;
	}
}

declare namespace Box2D.Dynamics.Joints {

	/**
	* Distance joint definition. This requires defining an anchor point on both bodies and the non-zero length of the distance joint. The definition uses local anchor points so that the initial configuration can violate the constraint slightly. This helps when saving and loading a game.
	* @warning Do not use a zero or short length.
	**/
	export class b2DistanceJointDef extends b2JointDef {

		/**
		* The damping ratio. 0 = no damping, 1 = critical damping.
		**/
		public dampingRatio: number;

		/**
		* The mass-spring-damper frequency in Hertz.
		**/
		public frequencyHz: number;

		/**
		* The natural length between the anchor points.
		**/
		public length: number;

		/**
		* The local anchor point relative to body1's origin.
		**/
		public localAnchorA: Box2D.Common.Math.b2Vec2;

		/**
		* The local anchor point relative to body2's origin.
		**/
		public localAnchorB: Box2D.Common.Math.b2Vec2;

		/**
		* Constructor.
		**/
		constructor();

		/**
		* Initialize the bodies, anchors, and length using the world anchors.
		* @param bA Body A.
		* @param bB Body B.
		* @param anchorA Anchor A.
		* @param anchorB Anchor B.
		**/
		public Initialize(bA: b2Body, bB: b2Body, anchorA: Box2D.Common.Math.b2Vec2, anchorB: Box2D.Common.Math.b2Vec2): void;
	}
}

declare namespace Box2D.Dynamics.Joints {

	/**
	* Friction joint. This is used for top-down friction. It provides 2D translational friction and angular friction.
	**/
	export class b2FrictionJoint extends b2Joint {

		/**
		* Angular mass.
		**/
		public m_angularMass: number;

		/**
		* Linear mass.
		**/
		public m_linearMass: Box2D.Common.Math.b2Mat22;

		/**
		* Get the anchor point on bodyA in world coordinates.
		* @return Body A anchor.
		**/
		public GetAnchorA(): Box2D.Common.Math.b2Vec2;

		/**
		* Get the anchor point on bodyB in world coordinates.
		* @return Body B anchor.
		**/
		public GetAnchorB(): Box2D.Common.Math.b2Vec2;

		/**
		* Gets the max force.
		* @return Max force.
		**/
		public GetMaxForce(): number;

		/**
		* Gets the max torque.
		* @return Max torque.
		**/
		public GetMaxTorque(): number;

		/**
		* Get the reaction force on body2 at the joint anchor in N.
		* @param inv_dt
		* @return Reaction force in N.
		**/
		public GetReactionForce(inv_dt: number): Box2D.Common.Math.b2Vec2;

		/**
		* Get the reaction torque on body 2 in N.
		* @return Reaction torque in N.
		**/
		public GetReactionTorque(inv_dt: number): number;

		/**
		* Sets the max force.
		* @param force New max force.
		**/
		public SetMaxForce(force: number): void;

		/**
		* Sets the max torque.
		* @param torque New max torque.
		**/
		public SetMaxTorque(torque: number): void;
	}
}

declare namespace Box2D.Dynamics.Joints {

	/**
	* Friction joint defintion.
	**/
	export class b2FrictionJointDef extends b2JointDef {

		/**
		* The local anchor point relative to body1's origin.
		**/
		public localAnchorA: Box2D.Common.Math.b2Vec2;

		/**
		* The local anchor point relative to body2's origin.
		**/
		public localAnchorB: Box2D.Common.Math.b2Vec2;

		/**
		* The maximum force in N.
		**/
		public maxForce: number;

		/**
		* The maximum friction torque in N-m.
		**/
		public maxTorque: number;

		/**
		* Constructor.
		**/
		constructor();

		/**
		* Initialize the bodies, anchors, axis, and reference angle using the world anchor and world axis.
		* @param bA Body A.
		* @param bB Body B.
		* @param anchor World anchor.
		**/
		public Initialize(bA: b2Body, bB: b2Body, anchor: Box2D.Common.Math.b2Vec2): void;
	}
}

declare namespace Box2D.Dynamics.Joints {

	/**
	* A gear joint is used to connect two joints together. Either joint can be a revolute or prismatic joint. You specify a gear ratio to bind the motions together: coordinate1 + ratio coordinate2 = constant The ratio can be negative or positive. If one joint is a revolute joint and the other joint is a prismatic joint, then the ratio will have units of length or units of 1/length.
	* @warning The revolute and prismatic joints must be attached to fixed bodies (which must be body1 on those joints).
	**/
	export class b2GearJoint extends b2Joint {

		/**
		* Get the anchor point on bodyA in world coordinates.
		* @return Body A anchor.
		**/
		public GetAnchorA(): Box2D.Common.Math.b2Vec2;

		/**
		* Get the anchor point on bodyB in world coordinates.
		* @return Body B anchor.
		**/
		public GetAnchorB(): Box2D.Common.Math.b2Vec2;

		/**
		* Get the gear ratio.
		* @return Gear ratio.
		**/
		public GetRatio(): number;

		/**
		* Get the reaction force on body2 at the joint anchor in N.
		* @param inv_dt
		* @return Reaction force in N.
		**/
		public GetReactionForce(inv_dt: number): Box2D.Common.Math.b2Vec2;

		/**
		* Get the reaction torque on body 2 in N.
		* @param inv_dt
		* @return Reaction torque in N.
		**/
		public GetReactionTorque(inv_dt: number): number;

		/**
		* Set the gear ratio.
		* @param force New gear ratio.
		**/
		public SetRatio(ratio: number): void;
	}
}

declare namespace Box2D.Dynamics.Joints {

	/**
	* Gear joint definition. This definition requires two existing revolute or prismatic joints (any combination will work). The provided joints must attach a dynamic body to a static body.
	**/
	export class b2GearJointDef extends b2JointDef {

		/**
		* The first revolute/prismatic joint attached to the gear joint.
		**/
		public joint1: b2Joint;

		/**
		* The second revolute/prismatic joint attached to the gear joint.
		**/
		public joint2: b2Joint;

		/**
		* The gear ratio.
		**/
		public ratio: number;

		/**
		* Constructor.
		**/
		constructor();
	}
}

declare namespace Box2D.Dynamics.Joints {

	/**
	* A line joint. This joint provides one degree of freedom: translation along an axis fixed in body1. You can use a joint limit to restrict the range of motion and a joint motor to drive the motion or to model joint friction.
	**/
	export class b2LineJoint extends b2Joint {

		/**
		* Enable/disable the joint limit.
		* @param flag True to enable, false to disable limits
		**/
		public EnableLimit(flag: boolean): void;

		/**
		* Enable/disable the joint motor.
		* @param flag True to enable, false to disable the motor.
		**/
		public EnableMotor(flag: boolean): void;

		/**
		* Get the anchor point on bodyA in world coordinates.
		* @return Body A anchor.
		**/
		public GetAnchorA(): Box2D.Common.Math.b2Vec2;

		/**
		* Get the anchor point on bodyB in world coordinates.
		* @return Body B anchor.
		**/
		public GetAnchorB(): Box2D.Common.Math.b2Vec2;

		/**
		* Get the current joint translation speed, usually in meters per second.
		* @return Joint speed.
		**/
		public GetJointSpeed(): number;

		/**
		* Get the current joint translation, usually in meters.
		* @return Joint translation.
		**/
		public GetJointTranslation(): number;

		/**
		* Get the lower joint limit, usually in meters.
		* @return Lower limit.
		**/
		public GetLowerLimit(): number;

		/**
		* Get the maximum motor force, usually in N.
		* @return Max motor force.
		**/
		public GetMaxMotorForce(): number;

		/**
		* Get the current motor force, usually in N.
		* @return Motor force.
		**/
		public GetMotorForce(): number;

		/**
		* Get the motor speed, usually in meters per second.
		* @return Motor speed.
		**/
		public GetMotorSpeed(): number;

		/**
		* Get the reaction force on body2 at the joint anchor in N.
		* @param inv_dt
		* @return Reaction force in N.
		**/
		public GetReactionForce(inv_dt: number): Box2D.Common.Math.b2Vec2;

		/**
		* Get the reaction torque on body 2 in N.
		* @param inv_dt
		* @return Reaction torque in N.
		**/
		public GetReactionTorque(inv_dt: number): number;

		/**
		* Get the upper joint limit, usually in meters.
		* @return Upper limit.
		**/
		public GetUpperLimit(): number;

		/**
		* Is the joint limit enabled?
		* @return True if enabled otherwise false.
		**/
		public IsLimitEnabled(): boolean;

		/**
		* Is the joint motor enabled?
		* @return True if enabled, otherwise false.
		**/
		public IsMotorEnabled(): boolean;

		/**
		* Set the joint limits, usually in meters.
		* @param lower Lower limit.
		* @param upper Upper limit.
		**/
		public SetLimits(lower: number, upper: number): void;

		/**
		* Set the maximum motor force, usually in N.
		* @param force New max motor force.
		**/
		public SetMaxMotorForce(force: number): void;

		/**
		* Set the motor speed, usually in meters per second.
		* @param speed New motor speed.
		**/
		public SetMotorSpeed(speed: number): void;
	}
}

declare namespace Box2D.Dynamics.Joints {

	/**
	* Line joint definition. This requires defining a line of motion using an axis and an anchor point. The definition uses local anchor points and a local axis so that the initial configuration can violate the constraint slightly. The joint translation is zero when the local anchor points coincide in world space. Using local anchors and a local axis helps when saving and loading a game.
	**/
	export class b2LineJointDef extends b2JointDef {

		/**
		* Enable/disable the joint limit.
		**/
		public enableLimit: boolean;

		/**
		* Enable/disable the joint motor.
		**/
		public enableMotor: boolean;

		/**
		* The local anchor point relative to body1's origin.
		**/
		public localAnchorA: Box2D.Common.Math.b2Vec2;

		/**
		* The local anchor point relative to body2's origin.
		**/
		public localAnchorB: Box2D.Common.Math.b2Vec2;

		/**
		* The local translation axis in bodyA.
		**/
		public localAxisA: Box2D.Common.Math.b2Vec2;

		/**
		* The lower translation limit, usually in meters.
		**/
		public lowerTranslation: number;

		/**
		* The maximum motor torque, usually in N-m.
		**/
		public maxMotorForce: number;

		/**
		* The desired motor speed in radians per second.
		**/
		public motorSpeed: number;

		/**
		* The upper translation limit, usually in meters.
		**/
		public upperTranslation: number;

		/**
		* Constructor.
		**/
		constructor();

		/**
		* Initialize the bodies, anchors, and length using the world anchors.
		* @param bA Body A.
		* @param bB Body B.
		* @param anchor Anchor.
		* @param axis Axis.
		**/
		public Initialize(bA: b2Body, bB: b2Body, anchor: Box2D.Common.Math.b2Vec2, axis: Box2D.Common.Math.b2Vec2): void;
	}
}

declare namespace Box2D.Dynamics.Joints {

	/**
	* A mouse joint is used to make a point on a body track a specified world point. This a soft constraint with a maximum force. This allows the constraint to stretch and without applying huge forces. Note: this joint is not fully documented as it is intended primarily for the testbed. See that for more instructions.
	**/
	export class b2MouseJoint extends b2Joint {

		/**
		* Get the anchor point on bodyA in world coordinates.
		* @return Body A anchor.
		**/
		public GetAnchorA(): Box2D.Common.Math.b2Vec2;

		/**
		* Get the anchor point on bodyB in world coordinates.
		* @return Body B anchor.
		**/
		public GetAnchorB(): Box2D.Common.Math.b2Vec2;

		/**
		* Gets the damping ratio.
		* @return Damping ratio.
		**/
		public GetDampingRatio(): number;

		/**
		* Gets the frequency.
		* @return Frequency.
		**/
		public GetFrequency(): number;

		/**
		* Gets the max force.
		* @return Max force.
		**/
		public GetMaxForce(): number;

		/**
		* Get the reaction force on body2 at the joint anchor in N.
		* @param inv_dt
		* @return Reaction force in N.
		**/
		public GetReactionForce(inv_dt: number): Box2D.Common.Math.b2Vec2;

		/**
		* Get the reaction torque on body 2 in N.
		* @param inv_dt
		* @return Reaction torque in N.
		**/
		public GetReactionTorque(inv_dt: number): number;

		/**
		* Gets the target.
		* @return Target.
		**/
		public GetTarget(): Box2D.Common.Math.b2Vec2;

		/**
		* Sets the damping ratio.
		* @param ratio New damping ratio.
		**/
		public SetDampingRatio(ratio: number): void;

		/**
		* Sets the frequency.
		* @param hz New frequency (hertz).
		**/
		public SetFrequency(hz: number): void;

		/**
		* Sets the max force.
		* @param maxForce New max force.
		**/
		public SetMaxForce(maxForce: number): void;

		/**
		* Use this to update the target point.
		* @param target New target.
		**/
		public SetTarget(target: Box2D.Common.Math.b2Vec2): void;
	}
}

declare namespace Box2D.Dynamics.Joints {

	/**
	* Mouse joint definition. This requires a world target point, tuning parameters, and the time step.
	**/
	export class b2MouseJointDef extends b2JointDef {

		/**
		* The damping ratio. 0 = no damping, 1 = critical damping.
		**/
		public dampingRatio: number;

		/**
		* The response speed.
		**/
		public frequencyHz: number;

		/**
		* The maximum constraint force that can be exerted to move the candidate body.
		**/
		public maxForce: number;

		/**
		* Constructor.
		**/
		constructor();
	}
}

declare namespace Box2D.Dynamics.Joints {

	/**
	* A prismatic joint. This joint provides one degree of freedom: translation along an axis fixed in body1. Relative rotation is prevented. You can use a joint limit to restrict the range of motion and a joint motor to drive the motion or to model joint friction.
	**/
	export class b2PrismaticJoint extends b2Joint {

		/**
		* Enable/disable the joint limit.
		* @param flag True to enable, false to disable.
		**/
		public EnableLimit(flag: boolean): void;

		/**
		* Enable/disable the joint motor.
		* @param flag True to enable, false to disable.
		**/
		public EnableMotor(flag: boolean): void;

		/**
		* Get the anchor point on bodyA in world coordinates.
		* @return Body A anchor.
		**/
		public GetAnchorA(): Box2D.Common.Math.b2Vec2;

		/**
		* Get the anchor point on bodyB in world coordinates.
		* @return Body B anchor.
		**/
		public GetAnchorB(): Box2D.Common.Math.b2Vec2;

		/**
		* Get the current joint translation speed, usually in meters per second.
		* @return Joint speed.
		**/
		public GetJointSpeed(): number;

		/**
		* Get the current joint translation, usually in meters.
		* @return Joint translation.
		**/
		public GetJointTranslation(): number;

		/**
		* Get the lower joint limit, usually in meters.
		* @return Lower limit.
		**/
		public GetLowerLimit(): number;

		/**
		* Get the current motor force, usually in N.
		* @return Motor force.
		**/
		public GetMotorForce(): number;

		/**
		* Get the motor speed, usually in meters per second.
		* @return Motor speed.
		**/
		public GetMotorSpeed(): number;

		/**
		* Get the reaction force on body2 at the joint anchor in N.
		* @param inv_dt
		* @return Reaction force in N.
		**/
		public GetReactionForce(inv_dt: number): Box2D.Common.Math.b2Vec2;

		/**
		* Get the reaction torque on body 2 in N.
		* @param inv_dt
		* @return Reaction torque in N.
		**/
		public GetReactionTorque(inv_dt: number): number;

		/**
		* Get the upper joint limit, usually in meters.
		* @return Upper limit.
		**/
		public GetUpperLimit(): number;

		/**
		* Is the joint limit enabled?
		* @return True if enabled otherwise false.
		**/
		public IsLimitEnabled(): boolean;

		/**
		* Is the joint motor enabled?
		* @return True if enabled, otherwise false.
		**/
		public IsMotorEnabled(): boolean;

		/**
		* Set the joint limits, usually in meters.
		* @param lower Lower limit.
		* @param upper Upper limit.
		**/
		public SetLimits(lower: number, upper: number): void;

		/**
		* Set the maximum motor force, usually in N.
		* @param force New max force.
		**/
		public SetMaxMotorForce(force: number): void;

		/**
		* Set the motor speed, usually in meters per second.
		* @param speed New motor speed.
		**/
		public SetMotorSpeed(speed: number): void;
	}
}

declare namespace Box2D.Dynamics.Joints {

	/**
	* Prismatic joint definition. This requires defining a line of motion using an axis and an anchor point. The definition uses local anchor points and a local axis so that the initial configuration can violate the constraint slightly. The joint translation is zero when the local anchor points coincide in world space. Using local anchors and a local axis helps when saving and loading a game.
	**/
	export class b2PrismaticJointDef extends b2JointDef {

		/**
		* Enable/disable the joint limit.
		**/
		public enableLimit: boolean;

		/**
		* Enable/disable the joint motor.
		**/
		public enableMotor: boolean;

		/**
		* The local anchor point relative to body1's origin.
		**/
		public localAnchorA: Box2D.Common.Math.b2Vec2;

		/**
		* The local anchor point relative to body2's origin.
		**/
		public localAnchorB: Box2D.Common.Math.b2Vec2;

		/**
		* The local translation axis in body1.
		**/
		public localAxisA: Box2D.Common.Math.b2Vec2;

		/**
		* The lower translation limit, usually in meters.
		**/
		public lowerTranslation: number;

		/**
		* The maximum motor torque, usually in N-m.
		**/
		public maxMotorForce: number;

		/**
		* The desired motor speed in radians per second.
		**/
		public motorSpeed: number;

		/**
		* The constrained angle between the bodies: bodyB_angle - bodyA_angle.
		**/
		public referenceAngle: number;

		/**
		* The upper translation limit, usually in meters.
		**/
		public upperTranslation: number;

		/**
		* Constructor.
		**/
		constructor();

		/**
		* Initialize the joint.
		* @param bA Body A.
		* @param bB Body B.
		* @param anchor Anchor.
		* @param axis Axis.
		**/
		public Initialize(bA: b2Body, bB: b2Body, anchor: Box2D.Common.Math.b2Vec2, axis: Box2D.Common.Math.b2Vec2): void;
	}
}

declare namespace Box2D.Dynamics.Joints {

	/**
	* The pulley joint is connected to two bodies and two fixed ground points. The pulley supports a ratio such that: length1 + ratio length2 <= constant Yes, the force transmitted is scaled by the ratio. The pulley also enforces a maximum length limit on both sides. This is useful to prevent one side of the pulley hitting the top.
	**/
	export class b2PullyJoint extends b2Joint {

		/**
		* Get the anchor point on bodyA in world coordinates.
		* @return Body A anchor.
		**/
		public GetAnchorA(): Box2D.Common.Math.b2Vec2;

		/**
		* Get the anchor point on bodyB in world coordinates.
		* @return Body B anchor.
		**/
		public GetAnchorB(): Box2D.Common.Math.b2Vec2;

		/**
		* Get the first ground anchor.
		**/
		public GetGroundAnchorA(): Box2D.Common.Math.b2Vec2;

		/**
		* Get the second ground anchor.
		**/
		public GetGroundAnchorB(): Box2D.Common.Math.b2Vec2;

		/**
		* Get the current length of the segment attached to body1.
		**/
		public GetLength1(): number;

		/**
		* Get the current length of the segment attached to body2.
		**/
		public GetLength2(): number;

		/**
		* Get the pulley ratio.
		**/
		public GetRatio(): number;

		/**
		* Get the reaction force on body2 at the joint anchor in N.
		* @param inv_dt
		* @return Reaction force in N.
		**/
		public GetReactionForce(inv_dt: number): Box2D.Common.Math.b2Vec2;

		/**
		* Get the reaction torque on body 2 in N.
		* @param inv_dt
		* @return Reaction torque in N.
		**/
		public GetReactionTorque(inv_dt: number): number;
	}
}

declare namespace Box2D.Dynamics.Joints {

	/**
	* Pulley joint definition. This requires two ground anchors, two dynamic body anchor points, max lengths for each side, and a pulley ratio.
	**/
	export class b2PullyJointDef extends b2JointDef {

		/**
		* The first ground anchor in world coordinates. This point never moves.
		**/
		public groundAnchorA: Box2D.Common.Math.b2Vec2;

		/**
		* The second ground anchor in world coordinates. This point never moves.
		**/
		public groundAnchorB: Box2D.Common.Math.b2Vec2;

		/**
		* The a reference length for the segment attached to bodyA.
		**/
		public lengthA: number;

		/**
		* The a reference length for the segment attached to bodyB.
		**/
		public lengthB: number;

		/**
		* The local anchor point relative to body1's origin.
		**/
		public localAnchorA: Box2D.Common.Math.b2Vec2;

		/**
		* The local anchor point relative to body2's origin.
		**/
		public localAnchorB: Box2D.Common.Math.b2Vec2;

		/**
		* The maximum length of the segment attached to bodyA.
		**/
		public maxLengthA: number;

		/**
		* The maximum length of the segment attached to bodyB.
		**/
		public maxLengthB: number;

		/**
		* The pulley ratio, used to simulate a block-and-tackle.
		**/
		public ratio: number;

		/**
		* Constructor.
		**/
		constructor();

		/**
		* Initialize the bodies, anchors, and length using the world anchors.
		* @param bA Body A.
		* @param bB Body B.
		* @param gaA Ground anchor A.
		* @param gaB Ground anchor B.
		* @param anchorA Anchor A.
		* @param anchorB Anchor B.
		**/
		public Initialize(bA: b2Body, bB: b2Body, gaA: Box2D.Common.Math.b2Vec2, gaB: Box2D.Common.Math.b2Vec2, anchorA: Box2D.Common.Math.b2Vec2, anchorB: Box2D.Common.Math.b2Vec2): void;
	}
}

declare namespace Box2D.Dynamics.Joints {

	/**
	* A revolute joint constrains to bodies to share a common point while they are free to rotate about the point. The relative rotation about the shared point is the joint angle. You can limit the relative rotation with a joint limit that specifies a lower and upper angle. You can use a motor to drive the relative rotation about the shared point. A maximum motor torque is provided so that infinite forces are not generated.
	**/
	export class b2RevoluteJoint extends b2Joint {

		/**
		* Enable/disable the joint limit.
		* @param flag True to enable, false to disable.
		**/
		public EnableLimit(flag: boolean): void;

		/**
		* Enable/disable the joint motor.
		* @param flag True to enable, false to diasable.
		**/
		public EnableMotor(flag: boolean): void;

		/**
		* Get the anchor point on bodyA in world coordinates.
		* @return Body A anchor.
		**/
		public GetAnchorA(): Box2D.Common.Math.b2Vec2;

		/**
		* Get the anchor point on bodyB in world coordinates.
		* @return Body B anchor.
		**/
		public GetAnchorB(): Box2D.Common.Math.b2Vec2;

		/**
		* Get the current joint angle in radians.
		* @return Joint angle.
		**/
		public GetJointAngle(): number;

		/**
		* Get the current joint angle speed in radians per second.
		* @return Joint speed.
		**/
		public GetJointSpeed(): number;

		/**
		* Get the lower joint limit in radians.
		* @return Lower limit.
		**/
		public GetLowerLimit(): number;

		/**
		* Get the motor speed in radians per second.
		* @return Motor speed.
		**/
		public GetMotorSpeed(): number;

		/**
		* Get the current motor torque, usually in N-m.
		* @return Motor torque.
		**/
		public GetMotorTorque(): number;

		/**
		* Get the reaction force on body2 at the joint anchor in N.
		* @param inv_dt
		* @return Reaction force in N.
		**/
		public GetReactionForce(inv_dt: number): Box2D.Common.Math.b2Vec2;

		/**
		* Get the reaction torque on body 2 in N.
		* @param inv_dt
		* @return Reaction torque in N.
		**/
		public GetReactionTorque(inv_dt: number): number;

		/**
		* Get the upper joint limit in radians.
		* @return Upper limit.
		**/
		public GetUpperLimit(): number;

		/**
		* Is the joint limit enabled?
		* @return True if enabled, false if disabled.
		**/
		public IsLimitEnabled(): boolean;

		/**
		* Is the joint motor enabled?
		* @return True if enabled, false if disabled.
		**/
		public IsMotorEnabled(): boolean;

		/**
		* Set the joint limits in radians.
		* @param lower New lower limit.
		* @param upper New upper limit.
		**/
		public SetLimits(lower: number, upper: number): void;

		/**
		* Set the maximum motor torque, usually in N-m.
		* @param torque New max torque.
		**/
		public SetMaxMotorTorque(torque: number): void;

		/**
		* Set the motor speed in radians per second.
		* @param speed New motor speed.
		**/
		public SetMotorSpeed(speed: number): void;
	}
}

declare namespace Box2D.Dynamics.Joints {

	/**
	* Revolute joint definition. This requires defining an anchor point where the bodies are joined. The definition uses local anchor points so that the initial configuration can violate the constraint slightly. You also need to specify the initial relative angle for joint limits. This helps when saving and loading a game. The local anchor points are measured from the body's origin rather than the center of mass because: 1. you might not know where the center of mass will be. 2. if you add/remove shapes from a body and recompute the mass, the joints will be broken.
	**/
	export class b2RevoluteJointDef extends b2JointDef {

		/**
		* A flag to enable joint limits.
		**/
		public enableLimit: boolean;

		/**
		* A flag to enable the joint motor.
		**/
		public enableMotor: boolean;

		/**
		* The local anchor point relative to body1's origin.
		**/
		public localAnchorA: Box2D.Common.Math.b2Vec2;

		/**
		* The local anchor point relative to body2's origin.
		**/
		public localAnchorB: Box2D.Common.Math.b2Vec2;

		/**
		* The lower angle for the joint limit (radians).
		**/
		public lowerAngle: number;

		/**
		* The maximum motor torque used to achieve the desired motor speed. Usually in N-m.
		**/
		public maxMotorTorque: number;

		/**
		* The desired motor speed. Usually in radians per second.
		**/
		public motorSpeed: number;

		/**
		* The bodyB angle minus bodyA angle in the reference state (radians).
		**/
		public referenceAngle: number;

		/**
		* The upper angle for the joint limit (radians).
		**/
		public upperAngle: number;

		/**
		* Constructor.
		**/
		constructor();

		/**
		* Initialize the bodies, achors, and reference angle using the world anchor.
		* @param bA Body A.
		* @param bB Body B.
		* @param anchor Anchor.
		**/
		public Initialize(bA: b2Body, bB: b2Body, anchor: Box2D.Common.Math.b2Vec2): void;
	}
}

declare namespace Box2D.Dynamics.Joints {

	/**
	* A weld joint essentially glues two bodies together. A weld joint may distort somewhat because the island constraint solver is approximate.
	**/
	export class b2WeldJoint extends b2Joint {

		/**
		* Get the anchor point on bodyA in world coordinates.
		* @return Body A anchor.
		**/
		public GetAnchorA(): Box2D.Common.Math.b2Vec2;

		/**
		* Get the anchor point on bodyB in world coordinates.
		* @return Body B anchor.
		**/
		public GetAnchorB(): Box2D.Common.Math.b2Vec2;

		/**
		* Get the reaction force on body2 at the joint anchor in N.
		* @param inv_dt
		* @return Reaction force in N.
		**/
		public GetReactionForce(inv_dt: number): Box2D.Common.Math.b2Vec2;

		/**
		* Get the reaction torque on body 2 in N.
		* @param inv_dt
		* @return Reaction torque in N.
		**/
		public GetReactionTorque(inv_dt: number): number;
	}
}

declare namespace Box2D.Dynamics.Joints {

	/**
	* Weld joint definition. You need to specify local anchor points where they are attached and the relative body angle. The position of the anchor points is important for computing the reaction torque.
	**/
	export class b2WeldJointDef extends b2JointDef {

		/**
		* The local anchor point relative to body1's origin.
		**/
		public localAnchorA: Box2D.Common.Math.b2Vec2;

		/**
		* The local anchor point relative to body2's origin.
		**/
		public localAnchorB: Box2D.Common.Math.b2Vec2;

		/**
		* The body2 angle minus body1 angle in the reference state (radians).
		**/
		public referenceAngle: number;

		/**
		* Constructor.
		**/
		constructor();

		/**
		* Initialize the bodies, anchors, axis, and reference angle using the world anchor and world axis.
		* @param bA Body A.
		* @param bB Body B.
		* @param anchor Anchor.
		**/
		public Initialize(bA: b2Body, bB: b2Body, anchor: Box2D.Common.Math.b2Vec2): void;
	}
}

// Generated by typings
// Source: custom_typings/stats.js/index.d.ts
interface Stats {
    domElement: HTMLElement;
    REVISION: number;
    setMode: (mode: number) => void;

    begin(): void;
    end(): number;
    update(): void;
}

interface StatsConstructor {
    new (): Stats;
}

declare var Stats: StatsConstructor;
