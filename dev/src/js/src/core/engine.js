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
        function Engine(width, height, wrapperId, options) {
            var _this = _super.call(this) || this;
            console.log(height);
            console.log(options);
            _this.initalise(width, height, wrapperId, _this.prepareOptions(options));
            return _this;
        }
        Engine.prototype.prepareOptions = function (options) {
            console.log(options);
            var ops = {
                skipHello: options.skipHello || true,
                autoStart: options.autoStart || true,
                renderer: options.renderer || 'auto',
                resolution: options.resolution || 1,
                scaleManeger: options.scaleManeger || true,
                device: options.device || true,
                storage: options.storage || true,
                events: options.events || true,
                keyboard: options.keyboard || true,
                physicsLite: options.physicsLite || true,
                box2d: options.box2d || false,
                services: options.services || true,
                sockets: options.sockets || false,
                states: options.states || true,
                tweens: options.tweens || true,
                parallax: options.parallax || true,
                particles: options.particles || true,
                timer: options.timer || true,
                webfonts: options.webfonts || true,
                debug: options.debug || true,
                maths: options.maths || true,
            };
            return ops;
        };
        Engine.prototype.initalise = function (width, height, wrapperId, options) {
            /**
             * Say Hello
             */
            if (options.skipHello === null || options.skipHello === undefined || options.skipHello === true) {
                this.displayInfo();
            }
            /**
             * Initalise the Scale Manager
             */
            if (options.scaleManeger === null || options.scaleManeger === undefined || options.scaleManeger === true) {
                this._scaleManager = new Lightning.Scale(this, width, height, 0);
            }
            /**
             * Initalise the Device
             */
            if (options.device === null || options.device === undefined || options.device === true) {
                this._device = new Lightning.Device(this);
            }
            /**
             * THIS NEEDS A TIDY UP!
             */
            // setup the canvas
            var wrapper = document.createElement('div');
            wrapper.id = wrapperId || '';
            document.body.appendChild(wrapper);
            this._renderer = PIXI.autoDetectRenderer(width, height, { resolution: this._scaleManager.devicePixelRatio });
            wrapper.appendChild(this._renderer.view);
            this._scaleManager.resizeThrottler(true);
            this._scaleManager.alignVertically();
            this._renderer.resize(width, height);
            this._world = new Lightning.Group();
            this._world.interactive = true;
            /**
             * Initalise the Ticker
             */
            this._ticker = PIXI.ticker.shared;
            this._ticker.autoStart = false;
            this._ticker.add(this.update, this);
            /**
             * Initalise the Storage Manager
             */
            if (options.storage === null || options.storage === undefined || options.storage === true) {
                this._storageManager = new Lightning.StorageManager();
            }
            /**
             * Initalise the Global Event Emitter
             */
            if (options.events === null || options.events === undefined || options.events === true) {
                this._eventEmitter = new Lightning.EventEmitter();
            }
            /**
             * Initalise the Keyboard Manager
             */
            if (options.keyboard === null || options.keyboard === undefined || options.keyboard === true) {
                this._keyboardManager = new Lightning.KeyboardManager(this);
            }
            /**
             * Initalise the Lite Physics
             */
            if (options.physicsLite === null || options.physicsLite === undefined || options.physicsLite === true) {
                this._physicsLite = new Lightning.LitePhysicsManager(this);
            }
            /**
             * Initalise the Service Manager
             */
            if (options.services === null || options.services === undefined || options.services === true) {
                this._serviceManager = new Lightning.ServiceManager(this);
            }
            /**
             * Initalise the State Manager
             */
            if (options.states === null || options.states === undefined || options.states === true) {
                this._stateManager = new Lightning.StateManager(this);
            }
            /**
             * Initalise the State Manager
             */
            if (options.tweens === null || options.tweens === undefined || options.tweens === true) {
                this._tweenManager = new Lightning.TweenManeger(this);
            }
            console.log(options.autoStart);
            /**
             * Start the update loop automatically
             */
            if (options.autoStart === null || options.autoStart === undefined || options.autoStart === true) {
                console.log('huh?');
                this.start();
            }
        };
        /**
         * @description Main entry for every update function. This is called by the ticker on every request frame update
         *
         * @param {number} time
         *
         * @returns {void}
         */
        Engine.prototype.update = function (time) {
            this._renderer.render(this._world);
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
