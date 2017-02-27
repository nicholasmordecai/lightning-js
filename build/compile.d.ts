/// <reference path="../src/reference.d.ts" />
declare namespace Lightning {
    class State extends PIXI.Container {
        protected game: Engine;
        constructor(game: Engine, ...params: any[]);
        init(params: any): void;
        start(): void;
        update(): void;
        create(): void;
        add(...params: Array<DisplayObject>): void;
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
    /**
     * @description function for calculating scaling fonts
     *
     * @param {Object} game reference to the Engine instance
     * @param {number} size size of the font (in responsive pixels)
     * @param {string} font name of the font stored in resource cache
     *
     * @returns {string} concatinated string to pass directly to the PIXI.extras.BitmapText
     */
    function calcFont(game: Engine, size: number, font: string): string;
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
         * @param  {number} from
         * @param  {number} to
         */
        static rngFloat(from: number, to: number): number;
        /**
         * To Implement
         * random between two positions
         */
        static rndPos(): void;
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
        private _debug;
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
        /**
         * @description Sets the debug enabled / disabled and the alpha to 0.5 accordingly
         *
         * @param {Array} data passed in from the signal dispatch event
         */
        debug(data: any): void;
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
interface iPosition {
    x: number;
    y: number;
}
interface iRange {
    from: number;
    to: number;
}
interface iPointRange {
    xFrom: number;
    xTo: number;
    yFrom: number;
    yTo: number;
}
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
        protected _respectPositionValues: iPosition;
        protected _deadPool: Array<Particle>;
        protected _gravity: iPosition;
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
declare namespace Tween {
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
/**
 * Callback interface. Defines the properties of a callback request for a specific frame in the animation
 */
interface Callback {
    name: string;
    funct: Function;
    functContext: any;
    functParams: any[];
    frame: number;
    once: boolean;
}
declare namespace Tween {
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
interface Property {
    prop: string;
    val: number;
}
/**
 * Frame class. Defines what each frame should consist of in an animation
 */
declare namespace Tween {
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
        properties: Array<Property>;
        relative: boolean;
        complex: boolean;
    }
}
declare namespace Tween {
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
        extendFrame(frameId: number, properties: Array<Property>, relative: boolean): void;
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
declare namespace Tween {
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
         * signal manager constructor
         * @param game
         */
        constructor(game: Engine);
        getInsatance(): void;
        /**
         * create a new signal
         * @param str
         * @returns {any}
         */
        create(str: string): Signal;
        /**
         * add a function to the signal to fire on dispatch
         * @param str
         * @param fnct
         * @param listenerContext? = null
         */
        add(str: string, fnct: Function, listenerContext?: any): void;
        /**
         * add a function to the signal to fire only once on dispatch, then automatically destroy the function
         * @param str
         * @param fnct
         */
        addOnce(str: string, fnct: Function): void;
        /**
         * destroy the entire signal
         * @param str
         */
        destroy(str: string): void;
        /**
         * set the state of the signal (active, inactive)
         * @param str
         * @param val
         */
        active(str: string, val: boolean): void;
        /**
         * dispatch a signal with all the parameters
         * @param str
         * @param params
         */
        dispatch(str: string, ...params: any[]): void;
        /**
         * return a signal
         * @param str
         * @returns {any}
         */
        signal(str: string): Signal;
        /**
         * check if signal is already created
         * @param name
         * @return boolean
         */
        has(name: string): boolean;
    }
}
declare namespace Lightning {
    class Engine {
        private _renderer;
        private _world;
        private _hud;
        private _ticker;
        private _activateState;
        private _tweens;
        private _signals;
        private _physics;
        private _physicsActive;
        private _physicsWorld;
        private _physicsWorldBounds;
        constructor(width: any, height: any, canvasId?: string);
        update(time: any): void;
        startState(state: any, ...params: any[]): void;
        initState(state: State, params: any): void;
        startPhysics(): void;
        collideOnWorldBounds(): void;
        generateTexture(...params: any[]): any;
        texture(...params: any[]): any;
        backgroundColor: number;
        state: State;
        readonly world: PIXI.Container;
        readonly width: number;
        readonly height: number;
        readonly center: {
            x: number;
            y: number;
        };
        readonly renderer: PIXI.CanvasRenderer | PIXI.WebGLRenderer;
        readonly tweens: Tween.TweenManager;
        readonly signals: Signals.SignalManager;
        readonly physics: Box2D.Dynamics.b2World;
        readonly physicsWorldBounds: Box2D.Dynamics.b2BodyDef;
        readonly hud: HUD;
    }
}
