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
    interface iEventSubscription {
        fn: Function;
        ctx: Object;
        once: boolean;
    }
}
declare namespace Lightning {
    interface iParticle {
        lifeSpan: number;
    }
}
declare namespace Lightning {
    interface iServiceAction {
        route: string;
        headers: Array<{
            content: string;
            value: string;
        }>;
        actionType: string;
        body: any;
        cb: Function;
        ctx: Object;
    }
}
declare namespace Lightning {
    class Request {
        private service;
        private _endpoint;
        private _actionType;
        private _headers;
        private _body;
        private _cb;
        private _ctx;
        private _responseData;
        private _requestSucceeded;
        private _timeout;
        private _retries;
        private _currentAttempt;
        constructor(service: Service, actionType: string, headers?: Array<{
            content: string;
            value: any;
        }>, body?: Object, cb?: Function, ctx?: Object);
        dispose(): void;
        call(): string;
        private handleFailure(xhr);
        private requestWasSuccessful(statusCode);
        private endRequest();
        private createRequest();
    }
}
declare namespace Lightning {
    class Service {
        private manager;
        private _endpoint;
        private _headers;
        private _requests;
        private _actions;
        private _key;
        constructor(manager: ServiceManager, key: string, endpoint: string, headers?: Array<{
            content: string;
            value: any;
        }>);
        registerAction(key: string, route: string, actionType?: string, headers?: Array<{
            content: string;
            value: any;
        }>, body?: any, cb?: Function, ctx?: Object): iServiceAction;
        call(key: string, body?: any): Request;
        destroy(): boolean;
        despose(request: Request): boolean;
        create(actionType: string, headers?: Array<{
            content: string;
            value: any;
        }>, body?: Object, cb?: Function, ctx?: Object): Request;
        readonly endpoint: string;
    }
}
declare namespace Lightning {
    class ServiceManager {
        private game;
        private _services;
        constructor(game: Engine);
        create(key: string, endpoint: string, headers?: Array<{
            content: string;
            value: any;
        }>): void;
        getService(key: string): Service;
        destroy(key: string): void;
    }
}
declare namespace Lightning {
    class Maths {
        /**
         * Rng's seem to perform a little crappy. Should think about making some sort of RNG pool??
         * - An array of pre-randomized numbers, then shuffeled randly. You then index your way through little
         * - just simply picking the next number in sequence.
         */
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
        static distanceBetween(obj1: any, obj2: any): any;
        /**
        * TODO
        * @description Convert Hex to RGB
        *
        * @param {iPoint} pos1
        * @param {iPoint} pos2
        *
        * @returns {iPoint}
        */
        static hextoRGB(hex: any, out: any): any;
        /**
        * TODO
        * @description Calculate RGB to Hex
        *
        * @param {iPoint} pos1
        * @param {iPoint} pos2
        *
        * @returns {iPoint}
        */
        static rgbToHex(r: number, g: number, b: number): any;
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
declare module Lightning {
    class Debug {
        private engine;
        constructor(engine: Engine);
        /**
         * @description recursive pattern to loop over every child and recursivly loop over all of it's children and returning a count of them all from the root object.
         * You can use a specific root display object, or you can leave blank and it will default to the world stage.
         *
         * Example:
         * this.game.debug.displayCount();
         * this.game.debug.displayCount(myContainer);
         *
         * @see {Lightning.Engine}
         *
         * @param rootObject
         * @returns {number}
         */
        private displayCount(rootObject?);
    }
}
declare namespace Lightning {
    class Cache {
    }
}
declare namespace Lightning {
    class Event {
        private _emitter;
        private _subscribers;
        private _proporgationAllowed;
        private _enabled;
        constructor(emitter: EventEmitter);
        addSubscriber(fn: Function, ctx: Object, once?: boolean): void;
        emit(params: any): void;
        removeSubscriber(subscriber: iEventSubscription): void;
        enabled: boolean;
    }
}
declare namespace Lightning {
    class EventEmitter {
        private _events;
        constructor();
        create(key: string, emitOnce?: boolean): Event;
        subscribe(key: string, fn: Function, ctx?: Object): boolean;
        subscribeOnce(key: string, fn: Function, ctx?: Object): boolean;
        emit(key: string, params?: Array<any>): boolean;
        event(key: string): Event;
        remove(key: string): boolean;
        enable(key: string): boolean;
        disable(key: string): boolean;
    }
}
declare namespace Lightning {
    class StorageManager {
        private _isLS;
        private _map;
        setItem: Function;
        getItem: Function;
        removeItem: Function;
        removeAll: Function;
        exists: Function;
        length: Function;
        constructor();
        /**
         *
         * @param key
         * @param val
         */
        private setItemLS(key, val);
        /**
         *
         * @param key
         * @param val
         */
        private setItemFallback(key, val);
        /**
         *
         * @param key
         */
        private getItemLS(key);
        /**
         *
         * @param key
         */
        private getItemFallback(key);
        /**
         *
         * @param key
         */
        private removeItemLS(key);
        /**
         *
         * @param key
         */
        private removeItemFallback(key);
        /**
         *
         * @param key
         */
        private existsLS(key);
        /**
         *
         * @param key
         */
        private existsFallback(key);
        /**
         *
         */
        private lengthLS();
        /**
         *
         */
        private lengthFallback();
        /**
         *
         */
        private localStorageAvailable();
    }
}
/**
 * A helper class for the 'Game'. It's used for all non essential public functions.
 * This is mostly used to keep the actual engine class neat, slim and easier to develop
 */
declare namespace Lightning {
    class EngineHelper {
        protected _dpr: number;
        protected _renderer: PIXI.WebGLRenderer | PIXI.CanvasRenderer;
        protected _world: PIXI.Container;
        protected _hud: HUD;
        protected _ticker: PIXI.ticker.Ticker;
        protected _tweens: TweenManager;
        protected _stateManager: StateManager;
        protected _physicsManager: PhysicsManager;
        protected _eventEmitter: EventEmitter;
        protected _storageManager: StorageManager;
        protected _serviceManager: ServiceManager;
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
        readonly states: StateManager;
        fps: number;
        readonly minFPS: number;
        readonly elapsedTime: number;
        readonly deltaTime: number;
        readonly lastTime: number;
        dpr: number;
        readonly storage: StorageManager;
        readonly events: EventEmitter;
        readonly ticker: PIXI.ticker.Ticker;
        service(key: string): Service;
        readonly services: ServiceManager;
    }
}
declare namespace Lightning {
    class Timer {
        private game;
        private _events;
        private _currentTime;
        private _lastTick;
        private _autoDestroy;
        private _isLoop;
        private _interval;
        private _active;
        constructor(game: Engine, interval: number, autoStart?: boolean, loop?: boolean, autoDestroy?: boolean);
        update(time: any): void;
        add(fn: Function, ctx?: Object): void;
        start(): void;
        stop(): void;
        reset(): void;
        destroy(): void;
        remove(): void;
    }
}
declare namespace Lightning {
    class State extends PIXI.Container {
        game: Engine;
        loader: PIXI.loaders.Loader;
        events: EventEmitter;
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
        update(time?: number): void;
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
        preloadComplete(loader: any, resources: any): void;
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
        update(time: number): void;
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
        private parent;
        constructor(parent: DisplayObject);
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
        private _events;
        protected _body: Box2D.Dynamics.b2Body;
        protected _respectPosition: boolean;
        protected _respectPositionValues: {
            x: number;
            y: number;
        };
        protected _input: Input;
        /**
         * @param  {PIXI.Texture=null} texture
         */
        constructor(texture?: PIXI.Texture);
        enableInput(): void;
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
        readonly input: Input;
    }
}
declare namespace Lightning {
    class Group extends PIXI.Container {
        _events: EventEmitter;
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
    class ParticleBase extends PIXI.Sprite {
        protected _texture: PIXI.Texture;
        protected _emitter: ParticleEmitter;
        protected _minX: number;
        protected _maxX: number;
        protected _minY: number;
        protected _maxY: number;
        protected _autoCull: boolean;
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
        protected _isDead: boolean;
        protected _createdAt: number;
        protected _lifeSpan: number;
        protected _deadTime: number;
        protected _lifeTime: number;
        update: (time: number) => void;
        returnToPool: () => void;
        constructor();
        updateSimple(time: number): void;
        updateComplex(time: number): void;
    }
}
declare namespace Lightning {
    class Particle extends ParticleBase {
        constructor(texture: PIXI.Texture, emitter: ParticleEmitter, minX: number, maxX: number, minY: number, maxY: number);
        renderWebGL(renderer: any): void;
        renderAdvancedWebGL(renderer: any): void;
        renderCanvas(renderer: any): void;
        updateTransform(): void;
        destroy(): void;
        calculateBounds(): void;
        _returnToPool(): void;
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
        lifeTime: number;
        isDead: boolean;
    }
}
/**
 * Fade in / Scale in sprites - optional
 * Simple / Advanced -- for creating ultra performant particles in the 50k+ range
 * Colour Shift
 * Checking the container class in pixi, I should think about refactoring the calculate bounds function.. if it's looping over 10k children to calculate it's bounds, that's going to get expensive!
 */
declare namespace Lightning {
    class ParticleEmitter extends Group {
        protected game: Engine;
        protected state: State;
        protected _debug: boolean;
        protected _debugFn: any;
        protected _aliveText: PIXI.Text;
        protected _deadPoolText: PIXI.Text;
        protected _intervalText: PIXI.Text;
        protected _strengthText: PIXI.Text;
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
        protected _nGravity: number;
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
        gravityWells: Array<any>;
        obstacles: Array<any>;
        constructor(state: State, x?: number, y?: number);
        private tick(time);
        updateTransform(): void;
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
        /**
         * TODO this seems to break the create particle function for some reason
         */
        private clearPool();
        startDrag(event: PIXI.interaction.InteractionEvent): void;
        enableDebug(interval?: number, floatLeft?: boolean, floatTop?: boolean): void;
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
        nGravity: number;
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
declare namespace Lightning {
    class Engine extends EngineHelper {
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
