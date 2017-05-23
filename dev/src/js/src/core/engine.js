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
            _this.displayInfo();
            _this._scaleManager = new Lightning.Scale(_this, width, height, 2);
            _this._device = new Lightning.Device(_this);
            // setup the canvas
            var wrapper = document.createElement('div');
            wrapper.id = wrapperId || '';
            document.body.appendChild(wrapper);
            _this._renderer = PIXI.autoDetectRenderer(width, height, { resolution: _this._scaleManager.devicePixelRatio });
            wrapper.appendChild(_this._renderer.view);
            _this._scaleManager.resizeThrottler(true);
            _this._scaleManager.alignVertically();
            _this._renderer.resize(width, height);
            _this._world = new Lightning.Group();
            _this._world.interactive = true;
            _this._storageManager = new Lightning.StorageManager();
            _this._eventEmitter = new Lightning.EventEmitter();
            // init the ticker
            _this._ticker = PIXI.ticker.shared;
            _this._ticker.autoStart = false;
            _this._ticker.add(_this.update, _this);
            // create the physicsManager 
            // this._physicsManager = new PhysicsManager(this);
            _this._physicsLite = new Lightning.LitePhysicsManager(_this);
            // create a new services manager
            _this._serviceManager = new Lightning.ServiceManager(_this);
            // create the state StateManager
            _this._stateManager = new Lightning.StateManager(_this);
            // create instance of tween manager
            _this._tweenManager = new Lightning.TweenManeger(_this);
            _this.start();
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
            this._renderer.render(this._world);
            this._stateManager.update(time);
        };
        /**
         * @description Start the ticker
         *
         * @returns {boolean}
         */
        Engine.prototype.start = function () {
            this._ticker.start();
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
 * Explore the posibility of using light ray casting?
 * Particle emitter presets??
 * Build a webfont loader
 * Think about how best to implement some kind of camera system
 */
/**
 * TODO ORDER
 *
 * 2. Comprehensive Scale Manager
 * 3. Re-configure how states work
 *      1. Not happy with having to call funtions when manually overriding them
 *
 */ 
