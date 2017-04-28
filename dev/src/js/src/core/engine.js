/// <reference path="./../reference.d.ts" />
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Lightning;
(function (Lightning) {
    var Engine = (function (_super) {
        __extends(Engine, _super);
        /**
         * @description Engine constructor
         *
         * @param {number} width
         * @param {number} height
         * @param {string} canvasId
         */
        function Engine(width, height, wrapperId) {
            if (wrapperId === void 0) { wrapperId = null; }
            var _this = _super.call(this) || this;
            // setup the canvas
            var wrapper = document.createElement('div');
            wrapper.id = wrapperId || '';
            document.body.appendChild(wrapper);
            _this._dpr = window.devicePixelRatio;
            _this._renderer = PIXI.autoDetectRenderer(width, height, { resolution: _this._dpr });
            _this._renderer.autoResize = true;
            wrapper.appendChild(_this._renderer.view);
            _this._debug = new Lightning.Debug(_this);
            _this._world = new PIXI.Container();
            _this._world.scale = new PIXI.Point(1 / window.devicePixelRatio, 1 / window.devicePixelRatio);
            _this._world.interactive = true;
            _this._tweens = new Lightning.TweenManager(_this);
            _this._storageManager = new Lightning.StorageManager();
            _this._eventEmitter = new Lightning.EventEmitter();
            // let scale = window.devicePixelRatio;
            _this._renderer.resize(width, height);
            // create the physicsManager 
            _this._physicsManager = new Lightning.PhysicsManager(_this);
            // create a new services manager
            _this._serviceManager = new Lightning.ServiceManager(_this);
            // create the state StateManager
            _this._stateManager = new Lightning.StateManager(_this);
            // init the ticker
            _this._ticker = PIXI.ticker.shared;
            _this._ticker.autoStart = false;
            _this._ticker.add(_this.update, _this);
            return _this;
        }
        /**
         * @description Main entry for every update function. This is called by the ticker on every request frame update
         *
         * @param {number} time
         *
         * @returns {void}
         */
        Engine.prototype.update = function (time) {
            this._physicsManager.update();
            this._tweens.update();
            this._stateManager.update(time);
            this._renderer.render(this._world);
        };
        /**
         * @description Start the ticker
         *
         * @returns {boolean}
         */
        Engine.prototype.start = function () {
            //this._ticker.start();
            return true;
        };
        /**
         * @description Stop the ticker
         *
         * @returns {boolean}
         */
        Engine.prototype.stop = function () {
            this._ticker.stop();
            return true;
        };
        return Engine;
    }(Lightning.EngineHelper));
    Lightning.Engine = Engine;
})(Lightning || (Lightning = {}));
/**
 * TODOS
 * Implement some sort of global cache system for any kind of object
 * Implement the services manager for backend calls
 * Implement a timer service to create and keep track of timers
 * Implement some sort of socket connectivity manager
 * Write some nice transitions for the state manager
 * Implement an animatins class for extending pixi animations
 * Move enableDrag function to the display object
 * Particle emitter clear pool
 * Particle emitter add to world instead of child of the emitter
 * Super Light Sprite
 * Think about how to implement a light sprite for particles so they dont take up so much performance. It sucks on safari!
 * Particle emitter make a pre-create class that lets you store pooled sprited before the state is started
 * Think about making a debug module that's a container in it's own right. It should accept x number of text values
 *   and sort through them accordinly, ensuring nothing is ever overlapped
 * Need to give responsive device pixel ration some serious consideration
 * Build a built in FPS meter in debug module
 * Explore the posibility of using light ray casting?
 * Particle emitter presets??
 * Utalise isMobilejs for mobile detection
 * Build a webfont loader
 */
/**
 * TODO ORDER
 *
 * 1. Implement a timer service to create and keep track of timers
 * 2. Implement the services manager for backend calls
 * 3. Move enableDrag function to the display object
 * 4. Build a decent Debug class
 *  4.1 Count total objects
 *  4.2 Count all textures on the GPU (possible sizes also)
 */ 
