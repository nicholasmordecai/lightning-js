var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="./../reference.d.ts" />
/// <reference path="./../reference.d.ts" />
/// <reference path="./../reference.d.ts" />
/// <reference path="./../reference.d.ts" />
/// <reference path="./../reference.d.ts" />
/// <reference path="./../reference.d.ts" />
/// <reference path="./../reference.d.ts" />
/// <reference path="./../reference.d.ts" />
/// <reference path="./../reference.d.ts" />
var Lightning;
(function (Lightning) {
    var Maths = (function () {
        function Maths() {
        }
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
        Maths.rngInt = function (from, to) {
            return Math.floor(Math.random() * (to - from) + from);
        };
        /**
         * @description generate a random number
         *
         * @param  {boolean=false} negative
         */
        Maths.rng = function (negative) {
            if (negative === void 0) { negative = false; }
            if (negative) {
                return Math.random();
            }
            else {
                return -Math.random();
            }
        };
        /**
         * @description generate a random float between two values
         *
         * @param {number} from
         * @param {number} to
         */
        Maths.rngFloat = function (from, to) {
            return Math.random() * (to - from) + from;
        };
        /**
         * TODO
         * Generate random position in a given area
         *
         * @param {iPoint} from
         * @param {iPoint} to
         *
         * @returns {iPoint}
         */
        Maths.rndPos = function () {
            return { x: 0, y: 0 };
        };
        /**
         * TODO
         * @description Calculate distance between two positions
         *
         * @param {iPoint} pos1
         * @param {iPoint} pos2
         *
         * @returns {iPoint}
         */
        Maths.distanceBetween = function () {
            return { x: 0, y: 0 };
        };
        /**
        * TODO
        * @description Convert Hex to RGB
        *
        * @param {iPoint} pos1
        * @param {iPoint} pos2
        *
        * @returns {iPoint}
        */
        Maths.hextoRGB = function () {
            return { x: 0, y: 0 };
        };
        /**
        * TODO
        * @description Calculate RGB to Hex
        *
        * @param {iPoint} pos1
        * @param {iPoint} pos2
        *
        * @returns {iPoint}
        */
        Maths.rgbToHex = function () {
            return { x: 0, y: 0 };
        };
        return Maths;
    }());
    Lightning.Maths = Maths;
})(Lightning || (Lightning = {}));
/// <reference path="./../reference.d.ts" />
/**
 * Redirect functions for when something gets depreciated.
 * Should try not to do this as often as possible
 */
var Lightning;
(function (Lightning) {
    var Depreciated = (function () {
        function Depreciated() {
        }
        return Depreciated;
    }());
    Lightning.Depreciated = Depreciated;
})(Lightning || (Lightning = {}));
/// <reference path="./../../reference.d.ts" />
var Lightning;
(function (Lightning) {
    var Event = (function () {
        function Event(emitter) {
            this._proporgationAllowed = true;
            this._enabled = true;
            this._emitter = emitter;
            this._subscribers = [];
        }
        Event.prototype.addSubscriber = function (fn, ctx, once) {
            if (once === void 0) { once = false; }
            var subscriber = {};
            subscriber.fn = fn;
            subscriber.ctx = ctx;
            subscriber.once = once;
            this._subscribers.push(subscriber);
        };
        Event.prototype.emit = function (params) {
            if (!this._enabled)
                return;
            for (var i = 0; i < this._subscribers.length; i++) {
                var subscription = this._subscribers[i];
                subscription.fn.call(subscription.ctx, params);
                if (subscription.once) {
                    this.removeSubscriber(subscription);
                }
                if (!this._proporgationAllowed) {
                    return;
                }
            }
        };
        Event.prototype.removeSubscriber = function (subscriber) {
            for (var i = 0; i < this._subscribers.length; i++) {
                if (this._subscribers[i] === subscriber) {
                    this._subscribers.splice(i, 1);
                }
            }
        };
        Object.defineProperty(Event.prototype, "enabled", {
            get: function () {
                return this._enabled;
            },
            set: function (val) {
                this._enabled = val;
            },
            enumerable: true,
            configurable: true
        });
        return Event;
    }());
    Lightning.Event = Event;
})(Lightning || (Lightning = {}));
/// <reference path="./../../reference.d.ts" />
var Lightning;
(function (Lightning) {
    var EventEmitter = (function () {
        function EventEmitter() {
            this._events = {};
        }
        EventEmitter.prototype.create = function (key, emitOnce) {
            if (emitOnce === void 0) { emitOnce = false; }
            var event = new Lightning.Event(this);
            this._events[key] = event;
            return event;
        };
        EventEmitter.prototype.subscribe = function (key, fn, ctx) {
            if (ctx === void 0) { ctx = null; }
            this._events[key].addSubscriber(fn, ctx);
            return true;
        };
        EventEmitter.prototype.subscribeOnce = function (key, fn, ctx) {
            if (ctx === void 0) { ctx = null; }
            this._events[key].addSubscriber(fn, ctx, true);
            return true;
        };
        EventEmitter.prototype.emit = function (key, params) {
            if (params === void 0) { params = null; }
            this._events[key].emit(params);
            return true;
        };
        EventEmitter.prototype.event = function (key) {
            return this._events[key];
        };
        EventEmitter.prototype.remove = function (key) {
            this._events[key] = null;
            return true;
        };
        EventEmitter.prototype.enable = function (key) {
            this._events[key].enabled = true;
            return true;
        };
        EventEmitter.prototype.disable = function (key) {
            this._events[key].enabled = false;
            return true;
        };
        return EventEmitter;
    }());
    Lightning.EventEmitter = EventEmitter;
})(Lightning || (Lightning = {}));
/// <reference path="./../../reference.d.ts" />
var Lightning;
(function (Lightning) {
    var StorageManager = (function () {
        function StorageManager() {
            this._isLS = false;
            this.setItem = this.setItemFallback;
            this.getItem = this.getItemFallback;
            this.removeItem = this.removeItemFallback;
            this.exists = this.existsFallback;
            this.length = this.lengthFallback;
            this._map = {};
            if (this.localStorageAvailable()) {
                this._isLS = true;
                this.setItem = this.setItemLS;
                this.getItem = this.getItemLS;
                this.removeItem = this.removeItemLS;
                this.exists = this.existsLS;
                this.length = this.lengthLS;
            }
        }
        StorageManager.prototype.setItemLS = function (key, val) {
            localStorage.setItem(key, val);
            return true;
        };
        StorageManager.prototype.setItemFallback = function (key, val) {
            this._map[key] = val;
            return true;
        };
        StorageManager.prototype.getItemLS = function (key) {
            return localStorage.getItem(key) || null;
        };
        StorageManager.prototype.getItemFallback = function (key) {
            return this._map[key].val;
        };
        StorageManager.prototype.removeItemLS = function (key) {
            localStorage.removeItem(key);
            return true;
        };
        StorageManager.prototype.removeItemFallback = function (key) {
            if (this.exists(key)) {
                this._map[key] = null;
                return true;
            }
            else {
                return false;
            }
        };
        StorageManager.prototype.existsLS = function (key) {
            if (localStorage.getItem(key) === null) {
                return false;
            }
            else {
                return true;
            }
        };
        StorageManager.prototype.existsFallback = function (key) {
            if (this._map[key]) {
                return true;
            }
            else {
                return false;
            }
        };
        StorageManager.prototype.lengthLS = function () {
            var _lsTotal = 0, _xLen, _x;
            for (_x in localStorage) {
                _xLen = ((localStorage[_x].length + _x.length) * 2);
                _lsTotal += _xLen;
                console.log(_x.substr(0, 50) + " = " + (_xLen / 1024).toFixed(2) + " KB");
            }
            ;
            console.log("Total = " + (_lsTotal / 1024).toFixed(2) + " KB");
            return _lsTotal;
        };
        StorageManager.prototype.lengthFallback = function () {
            return Object.keys(this._map).length;
        };
        StorageManager.prototype.localStorageAvailable = function () {
            var a = 'a';
            try {
                localStorage.setItem(a, a);
                localStorage.removeItem(a);
                return true;
            }
            catch (e) {
                return false;
            }
        };
        return StorageManager;
    }());
    Lightning.StorageManager = StorageManager;
})(Lightning || (Lightning = {}));
/// <reference path="./../reference.d.ts" />
/**
 * A helper class for the 'Game'. It's used for all non essential public functions.
 * This is mostly used to keep the actual engine class neat, slim and easier to develop
 */
var Lightning;
(function (Lightning) {
    var EngineHelper = (function () {
        function EngineHelper() {
        }
        EngineHelper.prototype.generateTexture = function () {
            var params = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                params[_i] = arguments[_i];
            }
            var t = [];
            if (params.length > 1) {
                for (var _a = 0, params_1 = params; _a < params_1.length; _a++) {
                    var i = params_1[_a];
                    t.push(this._renderer.generateTexture(i));
                }
            }
            else {
                t = this._renderer.generateTexture(params[0]);
            }
            return t;
        };
        EngineHelper.prototype.goFullscreen = function () {
            if (document.documentElement.requestFullscreen) {
                document.documentElement['requestFullscreen']();
            }
            else if (document.documentElement['mozRequestFullScreen']) {
                document.documentElement['mozRequestFullScreen']();
            }
            else if (document.documentElement.webkitRequestFullscreen) {
                document.documentElement['webkitRequestFullscreen']();
            }
            else if (document.documentElement['msRequestFullscreen']) {
                document.documentElement['msRequestFullscreen']();
            }
        };
        EngineHelper.prototype.texture = function () {
            var params = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                params[_i] = arguments[_i];
            }
            var t = [];
            if (params.length > 1) {
                for (var _a = 0, params_2 = params; _a < params_2.length; _a++) {
                    var i = params_2[_a];
                    t.push(Lightning.Texture.from(i));
                }
            }
            else {
                t = Lightning.Texture.from(params[0]);
            }
            return t;
        };
        Object.defineProperty(EngineHelper.prototype, "backgroundColor", {
            set: function (val) {
                this._renderer.backgroundColor = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EngineHelper.prototype, "world", {
            get: function () {
                return this._world;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EngineHelper.prototype, "width", {
            get: function () {
                return this._renderer.width;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EngineHelper.prototype, "height", {
            get: function () {
                return this._renderer.height;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EngineHelper.prototype, "center", {
            get: function () {
                return { x: this.width * 0.5, y: this.height * 0.5 };
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EngineHelper.prototype, "renderer", {
            get: function () {
                return this._renderer;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EngineHelper.prototype, "tweens", {
            get: function () {
                return this._tweens;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EngineHelper.prototype, "states", {
            get: function () {
                return this._stateManager;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EngineHelper.prototype, "fps", {
            get: function () {
                return this._ticker.FPS;
            },
            set: function (fps) {
                this._ticker.FPS = fps;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EngineHelper.prototype, "minFPS", {
            get: function () {
                return this._ticker.minFPS;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EngineHelper.prototype, "elapsedTime", {
            get: function () {
                return this._ticker.elapsedMS;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EngineHelper.prototype, "deltaTime", {
            get: function () {
                return this._ticker.deltaTime;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EngineHelper.prototype, "lastTime", {
            get: function () {
                return this._ticker.lastTime;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EngineHelper.prototype, "dpr", {
            get: function () {
                return this._dpr;
            },
            set: function (val) {
                this._dpr = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EngineHelper.prototype, "storage", {
            get: function () {
                return this._storageManager;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EngineHelper.prototype, "events", {
            get: function () {
                return this._eventEmitter;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EngineHelper.prototype, "ticker", {
            get: function () {
                return this._ticker;
            },
            enumerable: true,
            configurable: true
        });
        return EngineHelper;
    }());
    Lightning.EngineHelper = EngineHelper;
})(Lightning || (Lightning = {}));
/// <reference path="./../../reference.d.ts" />
var Lightning;
(function (Lightning) {
    var Timer = (function () {
        function Timer(game, interval, autoStart, loop, autoDestroy) {
            if (autoStart === void 0) { autoStart = true; }
            if (loop === void 0) { loop = true; }
            if (autoDestroy === void 0) { autoDestroy = false; }
            this._events = new Lightning.EventEmitter();
            this._currentTime = 0;
            this._lastTick = 0;
            this._active = false;
            this.game = game;
            this._interval = interval;
            this._isLoop = loop;
            this._autoDestroy = autoDestroy;
            this._events.create('tick');
            this._events.create('start');
            this._events.create('stop');
            this._events.create('reset');
            this._events.create('destroy');
            if (autoStart) {
                this._active = true;
            }
            this.game.ticker.add(this.update, this);
        }
        Timer.prototype.update = function (time) {
            if (this._active) {
                this._currentTime += this.game.ticker.elapsedMS;
                if (this._currentTime >= this._lastTick + this._interval) {
                    this._lastTick = this._currentTime;
                    this._events.emit('tick', time);
                    if (this._isLoop === false) {
                        this.stop();
                    }
                }
            }
        };
        Timer.prototype.add = function (fn, ctx) {
            if (ctx === void 0) { ctx = null; }
            this._events.subscribe('tick', fn, ctx);
        };
        Timer.prototype.start = function () {
            this._active = true;
        };
        Timer.prototype.stop = function () {
            this._active = false;
            if (this._autoDestroy) {
                this.destroy();
            }
        };
        Timer.prototype.reset = function () {
            this._currentTime = 0;
            this._lastTick = 0;
        };
        Timer.prototype.destroy = function () {
        };
        Timer.prototype.remove = function () {
        };
        return Timer;
    }());
    Lightning.Timer = Timer;
})(Lightning || (Lightning = {}));
/// <reference path="./../../reference.d.ts" />
var Lightning;
(function (Lightning) {
    var State = (function (_super) {
        __extends(State, _super);
        /**
         * @description State constructor
         *
         * @param {Engine} game
         */
        function State(game) {
            var _this = _super.call(this) || this;
            _this.game = game;
            _this.events = new Lightning.EventEmitter();
            _this.loader = new PIXI.loaders.Loader();
            _this.loader.onError.add(_this.preloadError, _this);
            _this.loader.onLoad.add(_this.preloadSingle, _this);
            _this.loader.onComplete.add(_this.preloadComplete, _this);
            return _this;
        }
        /**
         * @description Initalization function
         *
         * @param {Array} params
         *
         * @returns {void}
         */
        State.prototype.init = function (params) {
            this.preload();
        };
        /**
         * @description Preload function. Used as a helper function to preload assets into the texture cache. Will skip and call the create function if there are no resources to load
         *
         * @returns {void}
         */
        State.prototype.preload = function () {
            if (Object.keys(this.loader.resources).length < 1) {
                this.create();
            }
        };
        /**
         * @description Create function. Called after the preload function is complete or there is nothing to preload
         *
         * @returns {void}
         */
        State.prototype.create = function () {
        };
        /**
         * @description Update function. This is called by the state manager on every tick
         */
        State.prototype.update = function (time) {
            if (time === void 0) { time = null; }
        };
        /**
         * @description Add children to this state. Helper functions should be migrated at some point
         *
         * @returns {boolean}
         */
        State.prototype.add = function () {
            var params = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                params[_i] = arguments[_i];
            }
            for (var _a = 0, params_3 = params; _a < params_3.length; _a++) {
                var i = params_3[_a];
                this.addChild(i);
            }
            return true;
        };
        /**
         * @description Called if the loader produces an error
         *
         * @returns {void}
         */
        State.prototype.preloadError = function (err) {
            console.log(err);
        };
        /**
         * @description Called when a single file has completed loading
         *
         * @returns {void}
         */
        State.prototype.preloadSingle = function (loader, resource) {
            // get the name of the loaded asset
            var file = resource.name;
            // remove the directory if you wish
            file = file.replace(/^.*[\\\/]/, '');
            var progress = resource.progressChunk;
        };
        /**
         * @description Called when the loader has finished loading everything
         *
         * @returns {void}
         */
        State.prototype.preloadComplete = function (resources) {
            this.create();
        };
        return State;
    }(PIXI.Container));
    Lightning.State = State;
})(Lightning || (Lightning = {}));
/// <reference path="./../../reference.d.ts" />
var Lightning;
(function (Lightning) {
    var StateManager = (function () {
        /**
         * @description StateManager constructor
         *
         * @param {Engine} game
         */
        function StateManager(game) {
            this.game = game;
            this._states = [];
            this._activeStates = [];
        }
        /**
         * @description Update loop. Called from the game ticker and is used to call each state update function individually
         */
        StateManager.prototype.update = function (time) {
            for (var _i = 0, _a = this._activeStates; _i < _a.length; _i++) {
                var state = _a[_i];
                state.update(time);
            }
        };
        /**
         * @description Initalize a single state. Usually called from the start function, though this can be bypassed and a custom state injected via this function
         *
         * @param {State} state
         * @param {Array} params
         *
         * @returns {boolean}
         */
        StateManager.prototype.init = function (state) {
            var params = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                params[_i - 1] = arguments[_i];
            }
            state.init(params);
            this.addToActive(state);
            return true;
        };
        /**
         * @description Start a state. This function is called in order to add a state to the world display list and call the init function if the state is to auto initalize
         */
        StateManager.prototype.start = function (key, autoInit) {
            if (autoInit === void 0) { autoInit = true; }
            var params = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                params[_i - 2] = arguments[_i];
            }
            var map = this.findState(key);
            this.game.world.addChild(map.state);
            map.worldIndex = this.game.world.getChildIndex(map.state);
            if (autoInit) {
                this.init(map.state, params);
            }
        };
        /**
         * @description Leaves the state renderable and interactive but disables it's update procedure
         *
         * @param {string} key
         *
         * @returns {boolean}
         */
        StateManager.prototype.pause = function (key) {
            var state = this.findState(key).state;
            this._activeStates.splice(this.findActiveIndex(state));
            return true;
        };
        /**
         * @description Re-enabled the state's update procedure
         *
         * @param {string} key
         *
         * @returns {boolean}
         */
        StateManager.prototype.unpause = function (key) {
            var state = this.findState(key).state;
            this.addToActive(state);
            return true;
        };
        /**
         * TODO
         * @description Will reset the state by nullifying it and calling the constructor to re-initalize it
         */
        StateManager.prototype.reset = function () {
            // let state = this.findState('').state;
            // let newState = state.constructor();
        };
        /**
         * @description Will remove the state from the render list and update loop. It will also set all
         * interactivity to false as well as visibility and renderable.
         * Will store it's current position in the display list incase it is to be re-enabled at the same position
         *
         * @returns {boolean}
         */
        StateManager.prototype.disable = function (key) {
            var map = this.findState(key);
            var state = map.state;
            // store the world index
            map.worldIndex = this.game.world.getChildIndex(map.state);
            // disable properties
            state.interactive = false;
            state.interactiveChildren = false;
            state.visible = false;
            state.renderable = false;
            // remove from the display list
            this.game.world.removeChild(state);
            // get index from array and splice
            this._activeStates.splice(this.findActiveIndex(state));
            return true;
        };
        /**
         * @description Will re-enable a state exactly as it was before being disabled.
         * Sets all visibility, interactivity and renderable to true.
         * If last index is passed, it will use the previous position in the world display list
         * If the index is passed, it will be added to the world display list where the index is
         * If last index is false and index is null, then it will get added to the top of the world display list
         *
         * @returns {boolean}
         */
        StateManager.prototype.enable = function (key, lastIndex, index) {
            if (lastIndex === void 0) { lastIndex = true; }
            if (index === void 0) { index = null; }
            var map = this.findState(key);
            var state = map.state;
            state.visible = true;
            state.renderable = true;
            state.interactive = true;
            state.interactiveChildren = true;
            if (lastIndex === true) {
                this.game.world.addChildAt(state, map.worldIndex);
            }
            else if (index !== null) {
                this.game.world.addChildAt(state, index);
            }
            else {
                this.game.world.addChild(state);
            }
            return true;
        };
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
        StateManager.prototype.destroy = function (key) {
            // get the state
            var state = this.findState(key).state;
            // disable properties
            state.visible = false;
            state.renderable = false;
            state.interactive = false;
            state.interactiveChildren = false;
            // remove from the game world
            this.game.world.removeChild(state);
            // get index from array and splice
            this._activeStates.splice(this.findActiveIndex(state));
            // finally, nullify so GC can free up space
            state = null;
            return true;
        };
        /**
         * @description Adds a new state to the state StateManager
         *
         * @param {string} key
         * @param {State} state
         *
         * @returns {boolean}
         */
        StateManager.prototype.add = function (key, state) {
            var newMap = {};
            newMap.key = key;
            newMap.state = state;
            newMap.active = false;
            newMap.worldIndex = null;
            newMap.fps = 60;
            this._states.push(newMap);
            return true;
        };
        /**
         * @description Adds a state to the active states array if it's not already there
         *
         * @param {State} state
         *
         * @returns {boolean}
         */
        StateManager.prototype.addToActive = function (state) {
            var exists = false;
            for (var _i = 0, _a = this._activeStates; _i < _a.length; _i++) {
                var i = _a[_i];
                if (i === state) {
                    exists = true;
                }
            }
            if (!exists) {
                this._activeStates.push(state);
                return true;
            }
            else {
                return false;
            }
        };
        /**
         * TODO
         * @description Will create a texture of the state as it currently is and apply it to the state as it's only renderable child. This could be used when large state transitions are happening and the display list gets too large and effects performance
         */
        StateManager.prototype.freeze = function () {
        };
        /**
         * @description Loop through the states array and match by key. If one is found, then the entire state map is returned
         *
         * @param {string} key
         *
         * @returns {State}
         */
        StateManager.prototype.findState = function (key) {
            for (var _i = 0, _a = this._states; _i < _a.length; _i++) {
                var i = _a[_i];
                if (i.key === key) {
                    return i;
                }
            }
            return null;
        };
        /**
         * @description Loops through all active states and matches by a state
         *
         * @param {state}
         *
         * @returns {number}
         */
        StateManager.prototype.findActiveIndex = function (state) {
            var count = 0;
            for (var _i = 0, _a = this._activeStates; _i < _a.length; _i++) {
                var i = _a[_i];
                if (i === state) {
                    return count;
                }
                count++;
            }
            return null;
        };
        return StateManager;
    }());
    Lightning.StateManager = StateManager;
})(Lightning || (Lightning = {}));
/// <reference path="./../../reference.d.ts" />
var Lightning;
(function (Lightning) {
    var PhysicsManager = (function () {
        function PhysicsManager(game) {
            this.game = game;
            this._active = false;
        }
        PhysicsManager.prototype.update = function () {
            if (this._active) {
            }
        };
        PhysicsManager.prototype.startPhysics = function () {
            this._physicsWorld = new Box2D.Dynamics.b2World(new Box2D.Common.Math.b2Vec2(0, 10), true);
        };
        PhysicsManager.prototype.collideOnWorldBounds = function () {
            this._physicsWorldBounds = new Box2D.Dynamics.b2BodyDef();
            var polyFixture = new Box2D.Dynamics.b2FixtureDef();
            polyFixture.shape = new Box2D.Collision.Shapes.b2PolygonShape();
            polyFixture.density = 1;
            this._physicsWorldBounds = new Box2D.Dynamics.b2BodyDef();
            this._physicsWorldBounds.type = Box2D.Dynamics.b2Body.b2_staticBody;
            //down
            polyFixture.shape.SetAsBox(10, 1);
            this._physicsWorldBounds.position.Set(9, this.game.height / 100 + 1);
            this.physics.CreateBody(this._physicsWorldBounds).CreateFixture(polyFixture);
            //left
            polyFixture.shape.SetAsBox(1, 100);
            this._physicsWorldBounds.position.Set(-1, 0);
            this.physics.CreateBody(this._physicsWorldBounds).CreateFixture(polyFixture);
            //right
            this._physicsWorldBounds.position.Set(this.game.height / 100, 0);
            this.physics.CreateBody(this._physicsWorldBounds).CreateFixture(polyFixture);
            this._physicsWorldBounds.type = Box2D.Dynamics.b2Body.b2_dynamicBody;
            var body = Box2D.Dynamics.b2Body;
        };
        Object.defineProperty(PhysicsManager.prototype, "physics", {
            get: function () {
                return this._physicsWorld;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PhysicsManager.prototype, "physicsWorldBounds", {
            get: function () {
                return this._physicsWorldBounds;
            },
            enumerable: true,
            configurable: true
        });
        return PhysicsManager;
    }());
    Lightning.PhysicsManager = PhysicsManager;
})(Lightning || (Lightning = {}));
/// <reference path="./../reference.d.ts" />
var Lightning;
(function (Lightning) {
    var Input = (function () {
        function Input(game) {
            this.game = game;
            this.window = window.parent || window;
            // found an issue using keyboard input inside an iframe.. need to fix asap!
            //this.window.addEventListener('keydown', this.onKeyDown);
        }
        Input.prototype.onKeyDown = function (key) {
            console.log(key);
        };
        Input.prototype.addKey = function (keyCode, fn) {
            var key = {};
            key.code = keyCode;
            key.isDown = false;
            key.isUp = true;
            key.press = undefined;
            key.release = undefined;
            //The `downHandler`
            key.downHandler = function (event) {
                if (event.keyCode === key.code) {
                    if (key.isUp && key.press)
                        key.press();
                    key.isDown = true;
                    key.isUp = false;
                }
                event.preventDefault();
            };
            //The `upHandler`
            key.upHandler = function (event) {
                if (event.keyCode === key.code) {
                    if (key.isDown && key.release)
                        key.release();
                    key.isDown = false;
                    key.isUp = true;
                }
                event.preventDefault();
            };
        };
        return Input;
    }());
    Lightning.Input = Input;
})(Lightning || (Lightning = {}));
// var realWindow = window.parent || window;
// realWindow.addEventListener(    "keydown", key.downHandler.bind(key), false  ); 
// realWindow.addEventListener(    "keyup", key.upHandler.bind(key), false  ); 
/// <reference path="./../reference.d.ts" />
var Lightning;
(function (Lightning) {
    var DisplayObject = (function (_super) {
        __extends(DisplayObject, _super);
        function DisplayObject() {
            return _super.call(this) || this;
        }
        return DisplayObject;
    }(PIXI.DisplayObject));
    Lightning.DisplayObject = DisplayObject;
})(Lightning || (Lightning = {}));
/// <reference path="./../reference.d.ts" />
var Lightning;
(function (Lightning) {
    var Texture = (function (_super) {
        __extends(Texture, _super);
        function Texture() {
            return _super.apply(this, arguments) || this;
        }
        return Texture;
    }(PIXI.Texture));
    Lightning.Texture = Texture;
})(Lightning || (Lightning = {}));
/// <reference path="./../reference.d.ts" />
var Lightning;
(function (Lightning) {
    var Graphics = (function (_super) {
        __extends(Graphics, _super);
        function Graphics() {
            return _super.call(this) || this;
        }
        /**
         * @param  {} ...displayObjects
         */
        Graphics.prototype.add = function () {
            var displayObjects = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                displayObjects[_i] = arguments[_i];
            }
            for (var i = 0; i < displayObjects.length - 1; i++) {
                this.addChild(displayObjects[i]);
            }
        };
        return Graphics;
    }(PIXI.Graphics));
    Lightning.Graphics = Graphics;
})(Lightning || (Lightning = {}));
/// <reference path="./../reference.d.ts" />
var Lightning;
(function (Lightning) {
    var Sprite = (function (_super) {
        __extends(Sprite, _super);
        /**
         * @param  {PIXI.Texture=null} texture
         */
        function Sprite(texture) {
            if (texture === void 0) { texture = null; }
            var _this = _super.call(this, texture) || this;
            _this._events = new Lightning.EventEmitter();
            return _this;
        }
        /**
         * @param  {boolean} val
         */
        Sprite.prototype.enableBody = function (val) {
            if (val) {
            }
        };
        /**
         * @param  {number} aX
         * @param  {number=aX} aY
         * @returns void
         */
        Sprite.prototype.setAnchor = function (aX, aY) {
            if (aY === void 0) { aY = aX; }
            this.anchor = new PIXI.Point(aX, aY);
        };
        /**
         * @param  {number} aX
         * @param  {number=aX} aY
         * @returns void
         */
        Sprite.prototype.setScale = function (aX, aY) {
            if (aY === void 0) { aY = aX; }
            this.scale.x = aX;
            this.scale.y = aY;
        };
        Object.defineProperty(Sprite.prototype, "body", {
            /**
             * @returns Box2D
             */
            get: function () {
                return this._body;
            },
            /**
             * @param  {Box2D.Dynamics.b2Body} body
             */
            set: function (body) {
                this._body = body;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @param  {} ...displayObjects
         */
        Sprite.prototype.add = function () {
            var displayObjects = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                displayObjects[_i] = arguments[_i];
            }
            for (var i = 0; i < displayObjects.length - 1; i++) {
                this.addChild(displayObjects[i]);
            }
        };
        Sprite.prototype.enableDrag = function (respectPosition) {
            var _this = this;
            if (respectPosition === void 0) { respectPosition = false; }
            this._respectPosition = respectPosition;
            // check to see if interaction is already enabled
            if (this.interactive === false) {
                this.interactive = true;
            }
            this.on('mousedown', function (e) {
                _this.startDrag(e);
            });
            this.on('touchstart', function (e) {
                _this.startDrag(e);
            });
            this.on('mouseup', function (e) {
                _this.stopDrag(e);
            });
            this.on('touchend', function (e) {
                _this.stopDrag(e);
            });
            /**
             * need to think about handling pointer events
             */
        };
        Sprite.prototype.startDrag = function (event) {
            if (this._respectPosition) {
                var rpx = event.data.global.x * window.devicePixelRatio - this.position.x;
                var rpy = event.data.global.y * window.devicePixelRatio - this.position.y;
                this._respectPositionValues = { x: rpx, y: rpy };
            }
            else {
                this._respectPositionValues = { x: 0, y: 0 };
            }
            this.on('mousemove', this.onDrag);
            this.on('touchmove', this.onDrag);
        };
        Sprite.prototype.stopDrag = function (event) {
            this.removeListener('mousemove', this.onDrag);
            this.removeListener('touchmove', this.onDrag);
        };
        Sprite.prototype.onDrag = function (event) {
            this.position = new PIXI.Point((event.data.global.x * window.devicePixelRatio) - this._respectPositionValues.x, (event.data.global.y * window.devicePixelRatio) - this._respectPositionValues.y);
        };
        return Sprite;
    }(PIXI.Sprite));
    Lightning.Sprite = Sprite;
})(Lightning || (Lightning = {}));
/// <reference path="./../reference.d.ts" />
var Lightning;
(function (Lightning) {
    var Group = (function (_super) {
        __extends(Group, _super);
        function Group() {
            var _this = _super.call(this) || this;
            _this._events = new Lightning.EventEmitter;
            return _this;
        }
        /**
         * @param  {} ...displayObjects
         */
        Group.prototype.add = function () {
            var displayObjects = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                displayObjects[_i] = arguments[_i];
            }
            for (var i = 0; i < displayObjects.length - 1; i++) {
                this.addChild(displayObjects[i]);
            }
        };
        return Group;
    }(PIXI.Container));
    Lightning.Group = Group;
})(Lightning || (Lightning = {}));
/// <reference path="./../reference.d.ts" />
/**
 * Order the world when created
 */
var Lightning;
(function (Lightning) {
    var HUD = (function (_super) {
        __extends(HUD, _super);
        function HUD(game) {
            var _this = _super.call(this) || this;
            _this.game = game;
            return _this;
        }
        return HUD;
    }(Lightning.Group));
    Lightning.HUD = HUD;
})(Lightning || (Lightning = {}));
/// <reference path="./../reference.d.ts" />
var Lightning;
(function (Lightning) {
    var BitmapText = (function (_super) {
        __extends(BitmapText, _super);
        function BitmapText() {
            return _super.apply(this, arguments) || this;
        }
        // constructor() {
        //     super();
        // }
        /**
         * @description function for calculating scaling fonts
         *
         * @param {Object} game reference to the Engine instance
         * @param {number} size size of the font (in responsive pixels)
         * @param {string} font name of the font stored in resource cache
         *
         * @returns {string} concatinated string to pass directly to the PIXI.extras.BitmapText
         */
        BitmapText.prototype.calcFont = function (game, size, font) {
            var str = ((game.width) / size).toString() + 'px ' + font;
            return str;
        };
        return BitmapText;
    }(PIXI.extras.BitmapText));
    Lightning.BitmapText = BitmapText;
})(Lightning || (Lightning = {}));
/// <reference path="./../reference.d.ts" />
/**
 * Notes: Need to add a shaddow parameter and function.
 * This should allow the user to set parameters such is
 *
 * make a button class that has multiple states for quick dev
 */
var Lightning;
(function (Lightning) {
    var Geometry;
    (function (Geometry) {
        /**
         * @description Draw a square
         *
         * @param {number} d dimension of the square in pixels
         *
         * @returns {Lightning.Graphics}
         */
        function Square(d) {
            var graphics = new PIXI.Graphics();
            graphics.beginFill(0xffffff, 1);
            graphics.drawRect(0, 0, d, d);
            graphics.endFill();
            return graphics;
        }
        Geometry.Square = Square;
        /**
         * @description Draw a rectangle
         *
         * @param {number} w width of the rectangle in pixels
         * @param {number} h height of the rectangle in pixels
         *
         * @returns {Lightning.Graphics}
         */
        function Rect(w, h) {
            var graphics = new PIXI.Graphics();
            graphics.beginFill(0xffffff, 1);
            graphics.drawRect(0, 0, w, h);
            graphics.endFill();
            return graphics;
        }
        Geometry.Rect = Rect;
        /**
         * @description Draw a Star (double square)
         *
         * @param {number} w width of the rectangle in pixels
         * @param {number} h height of the rectangle in pixels
         *
         * @returns {Lightning.Graphics}
         */
        function Star(w, h) {
            var graphics = new PIXI.Graphics();
            graphics.beginFill(0xffffff, 1);
            graphics.drawRect(0, 0, w, h);
            graphics.endFill();
            return graphics;
        }
        Geometry.Star = Star;
        /**
         * @description Draw a 3d rectangle
         *
         * @param {number} w width of the rectangle in pixels
         * @param {number} h height of the rectangle in pixels
         * @param {number} d depth of rectangle in pixels
         *
         * @returns {Lightning.Graphics}
         */
        function Rect3D(w, h, d) {
            w *= 2, h *= 2, d *= 2;
            var graphics = new PIXI.Graphics();
            // draw front
            graphics.beginFill(0xffffff, 1);
            graphics.drawRect(0, 0, w, h);
            graphics.endFill();
            // draw top side
            var topSide = new PIXI.Graphics();
            topSide.beginFill(0xd2d2d2, 1);
            topSide.moveTo(0, 0);
            topSide.lineTo(d, -d);
            topSide.lineTo(w + d, -d);
            topSide.lineTo(w, 0);
            topSide.lineTo(0, 0);
            topSide.endFill();
            graphics.addChild(topSide);
            //draw right ride
            var rightSide = new PIXI.Graphics();
            rightSide.beginFill(0xababab, 1);
            rightSide.moveTo(w, 0);
            rightSide.lineTo(w + d, -d);
            rightSide.lineTo(w + d, h - d);
            rightSide.lineTo(w, h);
            rightSide.lineTo(w, 0);
            rightSide.endFill();
            graphics.addChild(rightSide);
            return graphics;
        }
        Geometry.Rect3D = Rect3D;
        /**
         * @description Draw a circle
         *
         * @param {number} r Radius of the circle in pixels
         *
         * @returns {Lightning.Graphics}
         */
        function Circle(r) {
            // think about how to implement responsive graphic drawings
            r = r * window.devicePixelRatio;
            var graphics = new PIXI.Graphics();
            graphics.beginFill(0xffffff, 1);
            graphics.arc(75, 75, r, 0, Math.PI * 2, false);
            graphics.endFill();
            return graphics;
        }
        Geometry.Circle = Circle;
        /**
         * @description Draw a Triangle
         *
         * @param {number} l1 Length of the first triangle side
         * @param {number} l2 Length of the second triangle side
         *
         * @returns {Lightning.Graphics}
         */
        function Triangle(l1, l2) {
            if (l2 === void 0) { l2 = l1; }
            var graphics = new PIXI.Graphics();
            graphics.beginFill(0xffffff, 1);
            graphics.moveTo(l1 * 0.5, 0);
            graphics.lineTo(l2, l1);
            graphics.lineTo(0, l1);
            graphics.lineTo(l1 * 0.5, 0);
            graphics.endFill();
            return graphics;
        }
        Geometry.Triangle = Triangle;
    })(Geometry = Lightning.Geometry || (Lightning.Geometry = {}));
})(Lightning || (Lightning = {}));
/// <reference path="./../reference.d.ts" />
var Lightning;
(function (Lightning) {
    var HitArea = (function (_super) {
        __extends(HitArea, _super);
        /**
         *
         * @param game
         * @returns {HitArea}
         */
        function HitArea(game, width, height) {
            var _this = _super.call(this) || this;
            _this.game = game;
            _this.interactive = true;
            _this.alpha = 0;
            _this.beginFill(0xffffff, 1);
            _this.drawRect(0, 0, width, height);
            _this.endFill();
            return _this;
        }
        HitArea.prototype.setRect = function (width, height) {
        };
        HitArea.prototype.setCircle = function (radius) {
        };
        /**
         * @description Pass a function to be added to the click events
         * @param fnct
         */
        HitArea.prototype.onClick = function (fnct) {
            this.on('click', fnct);
        };
        /**
         * @description Pass a function to be added to the mouse, pointer and touch down events
         * @param fnct
         */
        HitArea.prototype.down = function (fnct) {
            this.on('mousedown', fnct);
            this.on('touchend', fnct);
            if (this['pointertap'] !== undefined) {
                this.on('pointertap', fnct);
            }
            if (this['pointerdown'] !== undefined) {
                this.on('pointerdown', fnct);
            }
        };
        /**
         * @description Pass a function to be added to the mouse, touch and pointer up events
         * @param fnct
         */
        HitArea.prototype.up = function (fnct) {
            this.on('mouseup', fnct);
            this.on('touchend', fnct);
            if (this['pointerup'] !== undefined) {
                this.on('pointerup', fnct);
            }
        };
        /**
         * @description Pass a function to be added to the mouse, pointer and touch up outside events
         * @param fnct
         */
        HitArea.prototype.upOutside = function (fnct) {
            this.on('mouseupoutside', fnct);
            this.on('touchendoutside', fnct);
            if (this['pointerupoutside'] !== undefined) {
                this.on('pointerupoutside', fnct);
            }
        };
        /**
         * @description Pass a function to be added to the mouse and pointer over events
         * @param fnct
         */
        HitArea.prototype.over = function (fnct) {
            this.on('mouseover', fnct);
            if (this['pointerover'] !== undefined) {
                this.on('pointerover', fnct);
            }
        };
        /**
         * @description Pass a function to be added to the mouse and pointer out events
         * @param fnct
         */
        HitArea.prototype.out = function (fnct) {
            this.on('mouseout', fnct);
            if (this['pointerout'] !== undefined) {
                this.on('pointerout', fnct);
            }
        };
        /**
         * @description Pass a function to be added to the mouse and pointer move event
         * @param fnct
         */
        HitArea.prototype.move = function (fnct) {
            this.on('mousemove', fnct);
            if (this['pointermove'] !== undefined) {
                this.on('pointermove', fnct);
            }
        };
        /**
         * @description Pass a function to be added to the right click events
         * @param fnct
         */
        HitArea.prototype.rightClick = function (fnct) {
            this.on('rightclick', fnct);
        };
        /**
         * @description Pass a function to be added to the right down events
         * @param fnct
         */
        HitArea.prototype.rightDown = function (fnct) {
            this.on('rightdown', fnct);
        };
        /**
         * @description Pass a function to be added to the right up events
         * @param fnct
         */
        HitArea.prototype.rightUp = function (fnct) {
            this.on('rightup', fnct);
        };
        /**
         * @description Pass a function to be added to the right up outside events
         * @param fnct
         */
        HitArea.prototype.rightUpOutside = function (fnct) {
            this.on('rightupoutside', fnct);
        };
        /**
         * @description Pass a function to be added to the tap event
         *
         * @param fnct
         */
        HitArea.prototype.onTap = function (fnct) {
            this.on('tap', fnct);
        };
        return HitArea;
    }(Lightning.Graphics));
    Lightning.HitArea = HitArea;
})(Lightning || (Lightning = {}));
/// <reference path="./../reference.d.ts" />
var Lightning;
(function (Lightning) {
    var Button = (function (_super) {
        __extends(Button, _super);
        /**
         * @param  {Engine} game
         * @param  {} texture=null
         */
        function Button(game, texture) {
            if (texture === void 0) { texture = null; }
            var _this = _super.call(this, texture) || this;
            _this._primitive = null;
            _this.game = game;
            _this.initalise();
            return _this;
        }
        /**
         */
        Button.prototype.initalise = function () {
            this.interactive = true;
            this._hitArea = new Lightning.HitArea(this.game, this.texture.width, this.texture.height);
            this.addChild(this._hitArea);
        };
        /**
         * @param  {number} aX
         * @param  {number=null} aY
         * @returns void
         */
        Button.prototype.setAnchor = function (aX, aY) {
            if (aY === void 0) { aY = aX; }
            this.anchor = new PIXI.Point(aX, aY);
            this._hitArea.x -= this.width * aX;
            this._hitArea.y -= this.height * aY;
        };
        Object.defineProperty(Button.prototype, "hit", {
            /**
             * @returns HitArea
             */
            get: function () {
                return this._hitArea;
            },
            enumerable: true,
            configurable: true
        });
        return Button;
    }(Lightning.Sprite));
    Lightning.Button = Button;
})(Lightning || (Lightning = {}));
/// <reference path="./../reference.d.ts" />
var Lightning;
(function (Lightning) {
    var ParticleBase = (function (_super) {
        __extends(ParticleBase, _super);
        function ParticleBase() {
            var _this = _super.call(this) || this;
            _this._autoCull = true;
            _this._velX = 0;
            _this._velY = 0;
            _this._gX = 0;
            _this._gY = 0;
            _this._alphaIncrement = null;
            _this._rotationIncrement = null;
            _this._scaleIncrement = null;
            _this._isDead = false;
            _this._createdAt = null;
            _this._lifeSpan = null;
            _this._deadTime = null;
            _this._lifeTime = null;
            return _this;
        }
        ParticleBase.prototype.updateSimple = function (time) {
            // get delta time from update instead of getting date.now //
            if (this._deadTime <= this._lifeTime) {
                this.returnToPool();
                return;
            }
            if (this._autoCull) {
                if (this.y > this._maxY || this.y < this._minY || this.x > this._maxX || this.x < this._minX) {
                    this.returnToPool();
                    return;
                }
            }
            // increment alpha
            if (this._alphaIncrement) {
                this.alpha += this._alphaIncrement;
                if (this.alpha <= 0) {
                    this.returnToPool();
                }
            }
            // increment rotation
            if (this._rotationIncrement) {
                this.rotation += this._rotationIncrement;
            }
            // increment scale
            if (this._scaleIncrement) {
                this.scale.x += this._scaleIncrement.x;
                this.scale.y += this._scaleIncrement.y;
            }
            // update velocity (from gravity)
            this._velX += this._gX;
            this._velY += this._gY;
            // update position
            this.x += this._velX;
            this.y += this._velY;
            if (!this._isDead) {
                this.updateTransform();
                this._lifeTime += time;
            }
        };
        ParticleBase.prototype.updateComplex = function (time) {
            if (this._deadTime <= this._lifeTime) {
                this.returnToPool();
                return;
            }
            for (var _i = 0, _a = this._emitter.gravityWells; _i < _a.length; _i++) {
                var i = _a[_i];
                var mass = i['mass'];
                var particleGlobal = this.getGlobalPosition();
                var gravityGlobal = i.getGlobalPosition();
                // let d = this.getDistance(particleGlobal.x, particleGlobal.y, gravityGlobal.x, gravityGlobal.y);
                var d = 0;
                // if(d < 100) {
                //     this.returnToPool();
                //     return;
                // }
                // let G = 6.5;
                // for(let i of this._emitter.gravityWells) {
                //     let mass = i['mass'];
                //     let particleGlobal = this.getGlobalPosition();
                //     let gravityGlobal = i.getGlobalPosition();
                //     let d = this.getDistance(particleGlobal.x, particleGlobal.y, gravityGlobal.x, gravityGlobal.y);
                //     // if(d < 100) {
                //     //     this.returnToPool();
                //     //     return;
                //     // }
                //     let f = G * (mass * 1) / d
                //     if(particleGlobal.x - gravityGlobal.x < 0) {
                //         this._velX += f;
                //     } else {
                //         this._velX += -f;
                //     }
                //     if(particleGlobal.y - gravityGlobal.y < 0) {
                //         this._velY += f;
                //     } else {
                //         this._velY += -f;
                //     }
                // }
                var f = this._emitter.nGravity * (mass * 1) / d;
                if (particleGlobal.x - gravityGlobal.x < 0) {
                    this._velX += f;
                }
                else {
                    this._velX += -f;
                }
                if (particleGlobal.y - gravityGlobal.y < 0) {
                    this._velY += f;
                }
                else {
                    this._velY += -f;
                }
            }
        };
        return ParticleBase;
    }(PIXI.Sprite));
    Lightning.ParticleBase = ParticleBase;
})(Lightning || (Lightning = {}));
/// <reference path="./../reference.d.ts" />
var Lightning;
(function (Lightning) {
    var Particle = (function (_super) {
        __extends(Particle, _super);
        function Particle(texture, emitter, minX, maxX, minY, maxY) {
            var _this = _super.call(this) || this;
            _this.returnToPool = _this._returnToPool;
            _this.update = _this.updateSimple;
            _this._texture = texture;
            _this._emitter = emitter;
            _this.children = null;
            _this._minX = minX;
            _this._minY = minY;
            _this._maxX = maxX;
            _this._maxY = maxY;
            _this.anchor.set(0.5);
            return _this;
            // check the interaction is turned off completly.. seems to still being called -> processInteractive
        }
        // override functions to make sure that it doesn't check for chilren, visible etc
        Particle.prototype.renderWebGL = function (renderer) {
            if (this.renderable) {
                this._renderWebGL(renderer);
            }
        };
        Particle.prototype.renderAdvancedWebGL = function (renderer) {
            // add this object to the batch, only rendered if it has a texture.
            if (this.renderable) {
                this._renderWebGL(renderer);
            }
            // double check if this is actually needed. feels like it's only called if the texture is changed, in which case.. don't do it!
            renderer.flush();
        };
        Particle.prototype.renderCanvas = function (renderer) {
            if (this.renderable) {
                this._renderCanvas(renderer);
            }
        };
        Particle.prototype.updateTransform = function () {
            this._boundsID++;
            this.transform.updateTransform(this.parent.transform);
            // TODO: check render flags, how to process stuff here
            this.worldAlpha = this.alpha * this.parent.worldAlpha;
        };
        Particle.prototype.destroy = function () {
            this.removeAllListeners('');
            if (this.parent) {
                this.parent.removeChild(this);
            }
            this.transform = null;
            this.parent = null;
            this.interactiveChildren = false;
        };
        Particle.prototype.calculateBounds = function () {
            this._bounds.clear();
            this._calculateBounds();
            this._lastBoundsID = this._boundsID;
        };
        Particle.prototype._returnToPool = function () {
            this._isDead = true;
            this.renderable = false;
            this.visible = false;
            this._emitter.returnToPool(this);
        };
        Object.defineProperty(Particle.prototype, "velocity", {
            set: function (velocity) {
                this._velX = velocity.x;
                this._velY = velocity.y;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Particle.prototype, "gravity", {
            set: function (gravity) {
                this._gX = gravity.x;
                this._gY = gravity.y;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Particle.prototype, "lifeSpan", {
            set: function (time) {
                this._lifeSpan = time;
                this._deadTime = this._lifeSpan + Date.now();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Particle.prototype, "alphaIncrement", {
            set: function (val) {
                this._alphaIncrement = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Particle.prototype, "rotationIncrement", {
            set: function (val) {
                this._rotationIncrement = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Particle.prototype, "scaleIncrement", {
            set: function (scale) {
                this._scaleIncrement = { x: scale.x, y: scale.y };
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Particle.prototype, "createdAt", {
            set: function (val) {
                this._createdAt = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Particle.prototype, "lifeTime", {
            set: function (val) {
                this._lifeTime = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Particle.prototype, "isDead", {
            get: function () {
                return this._isDead;
            },
            set: function (val) {
                this._isDead = val;
            },
            enumerable: true,
            configurable: true
        });
        return Particle;
    }(Lightning.ParticleBase));
    Lightning.Particle = Particle;
})(Lightning || (Lightning = {}));
/// <reference path="./../reference.d.ts" />
/**
 * Fade in / Scale in sprites - optional
 * Simple / Advanced -- for creating ultra performant particles in the 50k+ range
 * Colour Shift
 * Checking the container class in pixi, I should think about refactoring the calculate bounds function.. if it's looping over 10k children to calculate it's bounds, that's going to get expensive!
 */
var Lightning;
(function (Lightning) {
    var ParticleEmitter = (function (_super) {
        __extends(ParticleEmitter, _super);
        function ParticleEmitter(state, x, y) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            var _this = _super.call(this) || this;
            _this._debug = false;
            _this._emit = false;
            _this._nextEmit = null;
            _this._interval = 100;
            _this._lastStart = null;
            _this._time = null;
            _this._textures = [];
            _this._deadPool = [];
            _this._gravity = { x: 0 * window.devicePixelRatio, y: 0.2 * window.devicePixelRatio };
            _this._nGravity = 6.5;
            _this._spread = { xFrom: -2 * window.devicePixelRatio, xTo: 2 * window.devicePixelRatio, yFrom: -2 * window.devicePixelRatio, yTo: 2 * window.devicePixelRatio };
            _this._lifeSpanRange = { from: 3000, to: 3000 };
            _this._particleStrength = 1;
            _this._particleScaleRange = { xFrom: 0.7, xTo: 1, yFrom: 0.7, yTo: 1 };
            _this._particleAlphaRange = { from: 1, to: 1 };
            _this._particleRotationRange = { from: 0, to: 1.9 };
            _this._particleVelocityRange = { xFrom: -1 * window.devicePixelRatio, xTo: 1 * window.devicePixelRatio, yFrom: -4 * window.devicePixelRatio, yTo: -6 * window.devicePixelRatio };
            _this._particleRotationIncrement = { from: 0, to: 0 };
            _this._particleScaleIncrement = { xFrom: 0, xTo: 0, yFrom: 0, yTo: 0 };
            _this._particleAlphaIncrement = { from: 0, to: 0 };
            _this.state = state;
            _this.game = state.game;
            _this.x = x;
            _this.y = y;
            _this.gravityWells = [];
            _this.obstacles = [];
            var t = Lightning.Geometry.Rect(50, 50);
            var sprite = new Lightning.Sprite(_this.game.generateTexture(t));
            sprite['mass'] = 4;
            sprite.setAnchor(0.5);
            sprite.tint = 0xff22aa;
            _this.game.world.addChild(sprite);
            sprite.x = _this.game.center.x - 75;
            sprite.y = _this.game.center.y - 100;
            sprite.enableDrag();
            _this.obstacles.push(sprite);
            var sprite2 = new Lightning.Sprite(_this.game.generateTexture(t));
            sprite2.enableDrag();
            sprite2.setAnchor(0.5);
            sprite2['mass'] = 6;
            sprite2.tint = 0x00aa22;
            _this.game.world.addChild(sprite2);
            sprite2.x = _this.game.center.x + 75;
            sprite2.y = _this.game.center.y + 120;
            _this.obstacles.push(sprite2);
            _this.game.ticker.add(_this.tick, _this);
            return _this;
        }
        ParticleEmitter.prototype.tick = function (time) {
            for (var _i = 0, _a = this.children; _i < _a.length; _i++) {
                var i = _a[_i];
                // see if it's more performant to use an array for alivePool, and remove dead object from there
                if (!i['isDead']) {
                    i['update'](time);
                }
            }
            if (this._time !== null && Date.now() > this._lastStart + this._time) {
                this.stop();
                return;
            }
            // get delta time from update loop
            if (this._emit && this._nextEmit < Date.now()) {
                this._nextEmit = Date.now() + this._interval;
                this.fireEmitter();
            }
        };
        ParticleEmitter.prototype.updateTransform = function () {
            this._boundsID++;
            this.transform.updateTransform(this.parent.transform);
            // TODO: check render flags, how to process stuff here
            this.worldAlpha = this.alpha * this.parent.worldAlpha;
        };
        ;
        /**
         * @param  {string} key
         * @param  {DisplayObject} particle
         */
        ParticleEmitter.prototype.add = function () {
            var params = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                params[_i] = arguments[_i];
            }
            for (var _a = 0, params_4 = params; _a < params_4.length; _a++) {
                var i = params_4[_a];
                this._textures.push(i);
            }
        };
        ParticleEmitter.prototype.start = function (time) {
            if (time === void 0) { time = null; }
            if (time === 0) {
                this.fireEmitter();
            }
            else {
                this._emit = true;
                this._time = time;
                this._lastStart = Date.now();
            }
        };
        ParticleEmitter.prototype.fireEmitter = function () {
            if (this._particleStrength === 1) {
                this.createParticle();
            }
            else {
                for (var i = 0; i < this._particleStrength; i++) {
                    this.createParticle();
                }
            }
        };
        ParticleEmitter.prototype.createParticle = function () {
            // get the texture from the textures array
            var texture = this._textures[Math.floor(Math.random() * this._textures.length)];
            var particle = null;
            var isChild = false;
            // // create new particle
            if (this._deadPool.length > 0) {
                particle = this._deadPool.pop();
                particle.isDead = false;
                particle.visible = true;
                particle.renderable = true;
                isChild = true;
            }
            else {
                // increment the id hash value to create the particle
                particle = new Lightning.Particle(texture, this, -this.x, this.game.width - this.x, -this.y, this.game.height - this.y);
            }
            // set gravity -- need to move the gravity into the emitter, not the particle
            particle.gravity = (this._gravity);
            // calculate positions
            var x = Lightning.Maths.rngInt(this._spread.xFrom, this._spread.xTo);
            var y = Lightning.Maths.rngInt(this._spread.yFrom, this._spread.yTo);
            particle.x = x;
            particle.y = y;
            // calculate random velocity ranges
            var rndVelX = Lightning.Maths.rngFloat(this._particleVelocityRange.xFrom, this._particleVelocityRange.xTo);
            var rndVelY = Lightning.Maths.rngFloat(this._particleVelocityRange.yFrom, this._particleVelocityRange.yTo);
            particle.velocity = ({ x: rndVelX, y: rndVelY });
            // calculate random life span
            var rndLifeSpan = Lightning.Maths.rngInt(this._lifeSpanRange.to, this._lifeSpanRange.from);
            particle.lifeSpan = rndLifeSpan;
            // calculate alpha
            if (this._particleAlphaRange) {
                var alpha = Lightning.Maths.rngFloat(this._particleAlphaRange.from, this._particleAlphaRange.to);
                particle.alpha = alpha;
            }
            // calculate scale
            if (this._particleScaleRange) {
                var scaleX = Lightning.Maths.rngFloat(this._particleScaleRange.xFrom, this._particleScaleRange.xTo);
                // commented this out because of undesiered effects
                // let scaleY:number = Maths.rngFloat(this._particleScaleRange.yFrom, this._particleScaleRange.yTo);
                particle.scale.x = scaleX;
                particle.scale.y = scaleX;
            }
            // calculate rotation
            if (this._particleRotationRange) {
                var rotation = Lightning.Maths.rngFloat(this._particleRotationRange.from, this._particleRotationRange.to);
                particle.rotation = rotation;
            }
            // calculate rotation increment
            if (this._particleRotationIncrement) {
                var rotationIncrement = Lightning.Maths.rngFloat(this._particleRotationIncrement.from, this._particleRotationIncrement.to);
                particle.rotationIncrement = rotationIncrement;
            }
            // calculate alpha increment
            if (this._particleAlphaIncrement) {
                var alphaIncrement = Lightning.Maths.rngFloat(this._particleAlphaIncrement.from, this._particleAlphaIncrement.to);
                particle.alphaIncrement = alphaIncrement;
            }
            // calculate scale increment
            if (this._particleScaleIncrement) {
                var scaleIncrementX = Lightning.Maths.rngFloat(this._particleScaleIncrement.xFrom, this._particleScaleIncrement.xTo);
                // commented this out because it was causing the scaling to give undesired effects
                // let scaleIncrementY:number = Maths.rngFloat(this._particleScaleIncrement.yFrom, this._particleScaleIncrement.yTo);
                particle.scaleIncrement = { x: scaleIncrementX, y: scaleIncrementX };
            }
            particle.createdAt = Date.now();
            particle.lifeTime = 0;
            if (!isChild) {
                this.addChild(particle);
            }
            // call the particle's update transformation to create / re-create it's matrix
            particle.updateTransform();
        };
        ParticleEmitter.prototype.stop = function () {
            this._emit = false;
        };
        ParticleEmitter.prototype.returnToPool = function (particle) {
            this._deadPool.push(particle);
        };
        /**
         * TODO this seems to break the create particle function for some reason
         */
        ParticleEmitter.prototype.clearPool = function () {
            for (var i = 0; i < this._deadPool.length; i++) {
                this._deadPool[i].destroy();
            }
        };
        ParticleEmitter.prototype.startDrag = function (event) {
            if (this._respectPosition) {
                var rpx = event.data.global.x * window.devicePixelRatio - this.position.x;
                var rpy = event.data.global.y * window.devicePixelRatio - this.position.y;
                this._respectPositionValues = { x: rpx, y: rpy };
            }
            else {
                this._respectPositionValues = { x: 0, y: 0 };
            }
            this.on('mousemove', this.onDrag);
            this.on('touchmove', this.onDrag);
        };
        ParticleEmitter.prototype.enableDebug = function (interval, floatLeft, floatTop) {
            var _this = this;
            if (interval === void 0) { interval = 500; }
            if (floatLeft === void 0) { floatLeft = true; }
            if (floatTop === void 0) { floatTop = true; }
            var font = { fontSize: 16 * window.devicePixelRatio, fill: 0xffffff };
            var gap = 25 * window.devicePixelRatio;
            this._aliveText = new PIXI.Text('Alive: ' + this.alive, font);
            this._deadPoolText = new PIXI.Text('Dead: ' + this.pool, font);
            this._intervalText = new PIXI.Text('Interval: ' + this._interval, font);
            this._strengthText = new PIXI.Text('Strength: ' + this._particleStrength, font);
            var x, y;
            if (floatLeft) {
                x = this.game.width * 0.02;
            }
            else {
                x = this.game.width * 0.85;
            }
            if (floatTop) {
                y = this.game.height * 0.02;
            }
            else {
                y = this.game.height * 0.75;
            }
            this._aliveText.x = x;
            this._aliveText.y = y;
            this._deadPoolText.x = x;
            this._deadPoolText.y = y + gap;
            this._intervalText.x = x;
            this._intervalText.y = y + (gap * 2);
            this._strengthText.x = x;
            this._strengthText.y = y + (gap * 3);
            this.state.add(this._aliveText, this._deadPoolText, this._intervalText, this._strengthText);
            this._debugFn = setInterval(function () {
                _this._aliveText.text = 'Alive: ' + _this.alive;
                _this._deadPoolText.text = 'Dead: ' + _this.pool;
                _this._intervalText.text = 'Interval: ' + _this._interval;
                _this._strengthText.text = 'Strength: ' + _this._particleStrength;
            }, interval);
        };
        ParticleEmitter.prototype.enableDrag = function (respectPosition) {
            var _this = this;
            if (respectPosition === void 0) { respectPosition = false; }
            this._respectPosition = respectPosition;
            // check to see if interaction is already enabled
            if (this.interactive === false) {
                this.interactive = true;
            }
            this.on('mousedown', function (e) {
                _this.startDrag(e);
            });
            this.on('touchstart', function (e) {
                _this.startDrag(e);
            });
            this.on('mouseup', function (e) {
                _this.stopDrag(e);
            });
            this.on('touchend', function (e) {
                _this.stopDrag(e);
            });
            /**
             * need to think about handling pointer events
             */
        };
        ParticleEmitter.prototype.stopDrag = function (event) {
            this.removeListener('mousemove', this.onDrag);
            this.removeListener('touchmove', this.onDrag);
        };
        ParticleEmitter.prototype.onDrag = function (event) {
            this.position = new PIXI.Point((event.data.global.x * window.devicePixelRatio) - this._respectPositionValues.x, (event.data.global.y * window.devicePixelRatio) - this._respectPositionValues.y);
        };
        ParticleEmitter.prototype.setSpread = function (xFrom, xTo, yFrom, yTo) {
            this._spread = { xFrom: xFrom * window.devicePixelRatio, xTo: xTo * window.devicePixelRatio, yFrom: yFrom * window.devicePixelRatio, yTo: yTo * window.devicePixelRatio };
        };
        ParticleEmitter.prototype.setGravity = function (x, y) {
            if (y === void 0) { y = x; }
            this._gravity = { x: x * window.devicePixelRatio, y: y * window.devicePixelRatio };
        };
        ParticleEmitter.prototype.setLifeSpan = function (from, to) {
            if (to === void 0) { to = from; }
            this._lifeSpanRange = { from: from, to: to };
        };
        ParticleEmitter.prototype.setInterval = function (val) {
            this._interval = val;
        };
        ParticleEmitter.prototype.setVelocityRange = function (xFrom, xTo, yFrom, yTo) {
            if (yFrom === void 0) { yFrom = xFrom; }
            if (yTo === void 0) { yTo = xTo; }
            this._particleVelocityRange = { xFrom: xFrom * window.devicePixelRatio, xTo: xTo * window.devicePixelRatio, yFrom: yFrom * window.devicePixelRatio, yTo: yTo * window.devicePixelRatio };
        };
        ParticleEmitter.prototype.setRotationIncrement = function (from, to) {
            if (to === void 0) { to = from; }
            this._particleRotationIncrement = { from: from, to: to };
        };
        ParticleEmitter.prototype.setScaleIncrement = function (xFrom, xTo, yFrom, yTo) {
            if (yFrom === void 0) { yFrom = xFrom; }
            if (yTo === void 0) { yTo = xTo; }
            this._particleScaleIncrement = { xFrom: xFrom, xTo: xTo, yFrom: yFrom, yTo: yTo };
        };
        ParticleEmitter.prototype.setAlphaIncrement = function (from, to) {
            if (to === void 0) { to = from; }
            this._particleAlphaIncrement = { from: from, to: to };
        };
        ParticleEmitter.prototype.setScaleRange = function (xFrom, xTo, yFrom, yTo) {
            if (yFrom === void 0) { yFrom = xFrom; }
            if (yTo === void 0) { yTo = xTo; }
            this._particleScaleRange = { xFrom: xFrom, xTo: xTo, yFrom: yFrom, yTo: yTo };
        };
        ParticleEmitter.prototype.setAlphaRange = function (from, to) {
            if (to === void 0) { to = from; }
            this._particleAlphaRange = { from: from, to: to };
        };
        ParticleEmitter.prototype.setRotationRange = function (from, to) {
            if (to === void 0) { to = from; }
            this._particleRotationRange = { from: from, to: to };
        };
        ParticleEmitter.prototype.setStrength = function (val) {
            this._particleStrength = val;
        };
        Object.defineProperty(ParticleEmitter.prototype, "alive", {
            get: function () {
                var c = 0;
                for (var _i = 0, _a = this.children; _i < _a.length; _i++) {
                    var i = _a[_i];
                    if (!i['isDead'])
                        c++;
                }
                return c;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ParticleEmitter.prototype, "pool", {
            get: function () {
                return this._deadPool.length;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ParticleEmitter.prototype, "nGravity", {
            get: function () {
                return this._nGravity;
            },
            set: function (val) {
                this._nGravity = val;
            },
            enumerable: true,
            configurable: true
        });
        return ParticleEmitter;
    }(Lightning.Group));
    Lightning.ParticleEmitter = ParticleEmitter;
})(Lightning || (Lightning = {}));
/// <reference path="./../reference.d.ts" />
var Lightning;
(function (Lightning) {
    var Parallax = (function (_super) {
        __extends(Parallax, _super);
        /**
         * @param  {Engine} game
         * @param  {number=null} width
         * @param  {number=null} height
         */
        function Parallax(game, width, height) {
            if (width === void 0) { width = null; }
            if (height === void 0) { height = null; }
            var _this = _super.call(this) || this;
            _this._scrollSpeed = 1;
            _this._incMultiplier = 0.3;
            _this._watch = null;
            _this._watchX = false;
            _this._watchY = false;
            _this._watchOffset = { x: 0, y: 0 };
            _this._lastWatch = { x: 0, y: 0 };
            _this._watchIncMultiplier = { x: 0.8, y: 0.8 };
            _this._watchDampner = { x: 50, y: 50 };
            _this._referenceOffset = { x: 0, y: 0 };
            _this.game = game;
            _this._width = width | _this.game.width;
            _this._height = height | _this.game.height;
            _this._tiles = [];
            return _this;
        }
        /**
         * @param  {string} key
         * @param  {Texture} texture
         * @param  {boolean=false} xy
         */
        Parallax.prototype.add = function (key, texture, xy) {
            if (xy === void 0) { xy = false; }
            var xSpeed = 0;
            var ySpeed = 0;
            if (xy) {
                ySpeed = this._incMultiplier * (this._tiles.length + 1);
            }
            else {
                xSpeed = this._incMultiplier * (this._tiles.length + 1);
            }
            var object = new PIXI.extras.TilingSprite(texture, this._width, this._height);
            this.addChild(object);
            var tile = { key: key, object: object, updateX: xSpeed, updateY: ySpeed, updateRelative: 0, index: this._tiles.length + 1 };
            this._tiles.push(tile);
        };
        /**
         *
         */
        Parallax.prototype.update = function () {
            var x, y = 0;
            if (this._watchX) {
                var currentPositionX = this._watch.x - this._referenceOffset.x;
                x = (currentPositionX - this._lastWatch.x) / this._watchDampner.x;
                this._lastWatch.x = currentPositionX;
            }
            if (this._watchY) {
                var currentPositionY = this._watch.y - this._referenceOffset.y;
                y = (currentPositionY - this._lastWatch.y) / this._watchDampner.y;
                this._lastWatch.y = currentPositionY;
            }
            for (var _i = 0, _a = this._tiles; _i < _a.length; _i++) {
                var tile = _a[_i];
                tile.object.tilePosition.x += tile.updateX * this._scrollSpeed;
                tile.object.tilePosition.y += tile.updateY * this._scrollSpeed;
                tile.object.tilePosition.x += x * tile.index * this._watchIncMultiplier.x;
                tile.object.tilePosition.y -= y * tile.index * this._watchIncMultiplier.y;
            }
        };
        /**
         * @param  {string} key
         */
        Parallax.prototype.getTile = function (key) {
            for (var _i = 0, _a = this._tiles; _i < _a.length; _i++) {
                var tile = _a[_i];
                if (tile.key === key) {
                    return tile;
                }
            }
            console.info('no tile with key', key, 'found');
        };
        /**
         * @param  {any} val
         * @returns void
         */
        Parallax.prototype.setWatch = function (val, x, y) {
            if (x === void 0) { x = true; }
            if (y === void 0) { y = true; }
            this._watch = val;
            this._watchX = x;
            this._watchY = y;
        };
        /**
         * @param  {number} x
         * @param  {number=x} y
         * @returns void
         */
        Parallax.prototype.setWatchOffset = function (x, y) {
            if (y === void 0) { y = x; }
            this._watchOffset = { x: x, y: y };
        };
        /**
         * @param  {boolean=false} x
         * @param  {boolean=false} y
         */
        Parallax.prototype.setWatchXY = function (x, y) {
            if (x === void 0) { x = false; }
            if (y === void 0) { y = false; }
            this._watchX = x;
            this._watchY = y;
        };
        /**
         * @param  {number} x
         * @param  {number=x} y
         * @returns void
         */
        Parallax.prototype.setReferenceOffset = function (x, y) {
            if (y === void 0) { y = x; }
            this._referenceOffset = { x: x, y: y };
        };
        Parallax.prototype.setWatchDampner = function (x, y) {
            if (y === void 0) { y = x; }
            this._watchDampner.x = x;
            this._watchDampner.y = y;
        };
        /**
         * @param  {string} key
         * @param  {number=0} x
         * @param  {number=0} y
         * @returns void
         */
        Parallax.prototype.setUpdate = function (key, x, y) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            var tile = this.getTile(key);
            tile.updateX = x;
            tile.updateY = y;
        };
        /**
         * @param  {number} val
         * @returns void
         */
        Parallax.prototype.setScrollSpeed = function (val) {
            this._scrollSpeed = val;
        };
        /**
         * @param  {number} val
         * @param  {boolean=false} reset
         * @param  {boolean=false} xy
         * @returns void
         */
        Parallax.prototype.setIncrementMultiplier = function (val, reset, xy) {
            if (reset === void 0) { reset = false; }
            if (xy === void 0) { xy = false; }
            this._scrollSpeed = val;
            if (reset) {
                for (var _i = 0, _a = this._tiles; _i < _a.length; _i++) {
                    var tile = _a[_i];
                    if (xy) {
                        var xSpeed = 0;
                        var ySpeed = this._incMultiplier * (this._tiles.length + 1);
                        tile.updateX = xSpeed;
                        tile.updateY = ySpeed;
                    }
                    else {
                        var xSpeed = this._incMultiplier * (this._tiles.length + 1);
                        var ySpeed = 0;
                        tile.updateX = xSpeed;
                        tile.updateY = ySpeed;
                    }
                }
            }
        };
        /**
         * @param  {number} x
         * @param  {number=x} y
         * @returns void
         */
        Parallax.prototype.setWatchIncerementMultiplier = function (x, y) {
            if (y === void 0) { y = x; }
            this._watchIncMultiplier.x = x;
            this._watchIncMultiplier.y = y;
        };
        Object.defineProperty(Parallax.prototype, "scrollSpeed", {
            /**
             * @returns number
             */
            get: function () {
                return this._scrollSpeed;
            },
            enumerable: true,
            configurable: true
        });
        return Parallax;
    }(Lightning.Group));
    Lightning.Parallax = Parallax;
})(Lightning || (Lightning = {}));
/// <reference path="./../reference.d.ts" />
var Lightning;
(function (Lightning) {
    var Easing = (function () {
        function Easing() {
        }
        Easing.prototype.none = function (x, t, b, c, d) {
            return c * t / d + b;
        };
        Easing.prototype.easeInQuad = function (t, b, c, d) {
            return c * (t /= d) * t + b;
        };
        Easing.prototype.easeOutQuad = function (x, t, b, c, d) {
            return -c * (t /= d) * (t - 2) + b;
        };
        Easing.prototype.easeInOutQuad = function (x, t, b, c, d) {
            if ((t /= d / 2) < 1)
                return c / 2 * t * t + b;
            return -c / 2 * ((--t) * (t - 2) - 1) + b;
        };
        Easing.prototype.easeInCubic = function (x, t, b, c, d) {
            return c * (t /= d) * t * t + b;
        };
        Easing.prototype.easeOutCubic = function (x, t, b, c, d) {
            return c * ((t = t / d - 1) * t * t + 1) + b;
        };
        Easing.prototype.easeInOutCubic = function (x, t, b, c, d) {
            if ((t /= d / 2) < 1)
                return c / 2 * t * t * t + b;
            return c / 2 * ((t -= 2) * t * t + 2) + b;
        };
        Easing.prototype.easeInQuart = function (x, t, b, c, d) {
            return c * (t /= d) * t * t * t + b;
        };
        Easing.prototype.easeOutQuart = function (x, t, b, c, d) {
            return -c * ((t = t / d - 1) * t * t * t - 1) + b;
        };
        Easing.prototype.easeInOutQuart = function (x, t, b, c, d) {
            if ((t /= d / 2) < 1)
                return c / 2 * t * t * t * t + b;
            return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
        };
        Easing.prototype.easeInQuint = function (x, t, b, c, d) {
            return c * (t /= d) * t * t * t * t + b;
        };
        Easing.prototype.easeOutQuint = function (x, t, b, c, d) {
            return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
        };
        Easing.prototype.easeInOutQuint = function (x, t, b, c, d) {
            if ((t /= d / 2) < 1)
                return c / 2 * t * t * t * t * t + b;
            return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
        };
        Easing.prototype.easeInSine = function (x, t, b, c, d) {
            return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
        };
        Easing.prototype.easeOutSine = function (x, t, b, c, d) {
            return c * Math.sin(t / d * (Math.PI / 2)) + b;
        };
        Easing.prototype.easeInOutSine = function (x, t, b, c, d) {
            return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
        };
        Easing.prototype.easeInExpo = function (x, t, b, c, d) {
            return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
        };
        Easing.prototype.easeOutExpo = function (x, t, b, c, d) {
            return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
        };
        Easing.prototype.easeInOutExpo = function (x, t, b, c, d) {
            if (t == 0)
                return b;
            if (t == d)
                return b + c;
            if ((t /= d / 2) < 1)
                return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
            return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
        };
        Easing.prototype.easeInCirc = function (x, t, b, c, d) {
            return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
        };
        Easing.prototype.easeOutCirc = function (x, t, b, c, d) {
            return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
        };
        Easing.prototype.easeInOutCirc = function (x, t, b, c, d) {
            if ((t /= d / 2) < 1)
                return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
            return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
        };
        Easing.prototype.easeInElastic = function (x, t, b, c, d) {
            var s = 1.70158;
            var p = 0;
            var a = c;
            if (t == 0)
                return b;
            if ((t /= d) == 1)
                return b + c;
            if (!p)
                p = d * .3;
            if (a < Math.abs(c)) {
                a = c;
                var s = p / 4;
            }
            else
                var s = p / (2 * Math.PI) * Math.asin(c / a);
            return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
        };
        Easing.prototype.easeOutElastic = function (x, t, b, c, d) {
            var s = 1.70158;
            var p = 0;
            var a = c;
            if (t == 0)
                return b;
            if ((t /= d) == 1)
                return b + c;
            if (!p)
                p = d * .3;
            if (a < Math.abs(c)) {
                a = c;
                var s = p / 4;
            }
            else
                var s = p / (2 * Math.PI) * Math.asin(c / a);
            return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
        };
        Easing.prototype.easeInOutElastic = function (x, t, b, c, d) {
            var s = 1.70158;
            var p = 0;
            var a = c;
            if (t == 0)
                return b;
            if ((t /= d / 2) == 2)
                return b + c;
            if (!p)
                p = d * (.3 * 1.5);
            if (a < Math.abs(c)) {
                a = c;
                var s = p / 4;
            }
            else
                var s = p / (2 * Math.PI) * Math.asin(c / a);
            if (t < 1)
                return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
            return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
        };
        Easing.prototype.easeInBack = function (x, t, b, c, d, s) {
            if (s == undefined)
                s = 1.70158;
            return c * (t /= d) * t * ((s + 1) * t - s) + b;
        };
        Easing.prototype.easeOutBack = function (x, t, b, c, d, s) {
            if (s == undefined)
                s = 1.70158;
            return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
        };
        Easing.prototype.easeInOutBack = function (x, t, b, c, d, s) {
            if (s == undefined)
                s = 1.70158;
            if ((t /= d / 2) < 1)
                return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
            return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
        };
        Easing.prototype.easeOutBounce = function (x, t, b, c, d) {
            if ((t /= d) < (1 / 2.75)) {
                return c * (7.5625 * t * t) + b;
            }
            else if (t < (2 / 2.75)) {
                return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
            }
            else if (t < (2.5 / 2.75)) {
                return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
            }
            else {
                return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
            }
        };
        return Easing;
    }());
    Lightning.Easing = Easing;
})(Lightning || (Lightning = {}));
/// <reference path="./../reference.d.ts" />
var Lightning;
(function (Lightning) {
    var Events = (function () {
        /**
         * Construct a new event class
         * @param {Object} tween
         */
        function Events(tween) {
            this.tween = tween;
            this._events = new Array();
        }
        /**
         * Add a new event
         * @param  {string} name
         * @param  {Function} funct
         */
        Events.prototype.add = function (funct, functContext) {
            if (functContext === void 0) { functContext = null; }
            var functParams = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                functParams[_i - 2] = arguments[_i];
            }
            var event = {};
            event.funct = funct;
            event.frame = null;
            event.functContext = functContext;
            event.functParams = functParams;
            event.once = false;
            this._events.push(event);
        };
        /**
         * Add an event that gets destroyed on use
         * @param  {string} name
         * @param  {Function} funct
         */
        Events.prototype.addOnce = function (funct, functContext) {
            if (functContext === void 0) { functContext = null; }
            var functParams = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                functParams[_i - 2] = arguments[_i];
            }
            var event = {};
            event.funct = funct;
            event.functContext = functContext;
            event.functParams = functParams;
            event.frame = null;
            event.once = true;
            this._events.push(event);
        };
        Events.prototype.addAtFrame = function (funct, frame, functContext) {
            if (functContext === void 0) { functContext = null; }
            var functParams = [];
            for (var _i = 3; _i < arguments.length; _i++) {
                functParams[_i - 3] = arguments[_i];
            }
            var event = {};
            event.funct = funct;
            event.functContext = functContext;
            event.functParams = functParams;
            event.frame = frame;
            event.once = false;
            this._events.push(event);
        };
        Events.prototype.addOnceAtFrame = function (funct, frame, functContext) {
            if (functContext === void 0) { functContext = null; }
            var functParams = [];
            for (var _i = 3; _i < arguments.length; _i++) {
                functParams[_i - 3] = arguments[_i];
            }
            var event = {};
            event.funct = funct;
            event.functContext = functContext;
            event.functParams = functParams;
            event.frame = frame;
            event.once = true;
            this._events.push(event);
        };
        /**
         * When the event is triggered, fire all the functions in the events array
         */
        Events.prototype.trigger = function () {
            for (var i = 0; i < this._events.length; i++) {
                var event_1 = this._events[i];
                event_1.funct.apply(event_1.functContext, event_1.functParams);
                // if event is flagged as a once only
                // remove it from the events array
                if (event_1.once) {
                    this._events.splice(i, 1);
                }
            }
        };
        /**
         * Removes an event from the array - finds the position using the findPosition function
         * @param  {string} name
         */
        Events.prototype.remove = function (name) {
            var position = this.findPosition(name);
            if (position !== -1) {
                this._events.splice(position, 1);
            }
        };
        Events.prototype.exists = function (frame) {
            for (var _i = 0, _a = this._events; _i < _a.length; _i++) {
                var i = _a[_i];
                if (i.frame === frame) {
                    return i;
                }
            }
            return false;
        };
        /**
         * Re-instanciates the events array, destroying all events
         */
        Events.prototype.removeAll = function () {
            this._events = new Array();
        };
        /**
         * Returns an event instance
         * @param  {string} ref
         */
        Events.prototype.find = function (ref) {
            for (var _i = 0, _a = this._events; _i < _a.length; _i++) {
                var i = _a[_i];
                if (i.name === ref) {
                    return i;
                }
            }
            return false;
        };
        /**
         * Returns the position of an event
         * @param  {string} ref
         */
        Events.prototype.findPosition = function (ref) {
            for (var i in this._events) {
                if (this._events[i].name === ref) {
                    return parseInt(i);
                }
            }
            return -1;
        };
        return Events;
    }());
    Lightning.Events = Events;
})(Lightning || (Lightning = {}));
/// <reference path="./../reference.d.ts" />
/**
 * Frame class. Defines what each frame should consist of in an animation
 */
var Lightning;
(function (Lightning) {
    var Frame = (function () {
        function Frame(frameId, relative) {
            this._frameId = frameId;
            this._properties = new Array();
            this._relative = relative;
        }
        /**
         * Add another property to this frame
         */
        Frame.prototype.addProperty = function (property, val) {
            var p = { prop: property, val: val };
            this._properties.push(p);
        };
        Object.defineProperty(Frame.prototype, "frameId", {
            get: function () {
                return this._frameId;
            },
            set: function (value) {
                this._frameId = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Frame.prototype, "properties", {
            get: function () {
                return this._properties;
            },
            set: function (value) {
                this._properties = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Frame.prototype, "relative", {
            get: function () {
                return this._relative;
            },
            set: function (value) {
                this._relative = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Frame.prototype, "complex", {
            get: function () {
                return this._complex;
            },
            set: function (value) {
                this._complex = value;
            },
            enumerable: true,
            configurable: true
        });
        return Frame;
    }());
    Lightning.Frame = Frame;
})(Lightning || (Lightning = {}));
/// <reference path="./../reference.d.ts" />
var Lightning;
(function (Lightning) {
    var Tween = (function () {
        function Tween(parent) {
            // ready to play
            this._playFlag = false;
            // total number of frames
            this._maxFrames = 0;
            // the current frame number
            this._currentFrame = 0;
            // destroy on completion flag
            this._autoDestroy = false;
            // tween paused flag
            this._isPaused = false;
            // tween loop flag
            this._loop = false;
            // tween number of loops remaining
            this._loopsRemaining = 0;
            // tween ready for deletion flag
            this._deleteFlag = false;
            this.tweenManager = parent;
            this._frames = new Array();
            this._onStartCallbacks = new Lightning.Events(this);
            this._onStopCallbacks = new Lightning.Events(this);
            this._onLoopCallbacks = new Lightning.Events(this);
            this._onPauseCallbacks = new Lightning.Events(this);
            this._onTickCallbacks = new Lightning.Events(this);
            this._onCompleteCallbacks = new Lightning.Events(this);
            this._onDestroyCallbacks = new Lightning.Events(this);
            this._onFrameCallbacks = new Lightning.Events(this);
        }
        /**
         * Create an indivual frame at a specific position
         * @param  {number} frameId
         * @param  {number} val
         * @param  {string} property
         * @param  {boolean} relative
         */
        Tween.prototype.createFrame = function (frameId, properties, relative) {
            if (frameId == null) {
                frameId = this._frames.length;
            }
            for (var i = 0; i < properties.length; i++) {
                this.insertFrameValues(frameId, properties[i], relative);
            }
        };
        Tween.prototype.insertFrameValues = function (frameId, property, relative) {
            if (this._frames[frameId]) {
                var frame = this._frames[frameId];
                frame.addProperty(property['prop'], property['val']);
            }
            else {
                // this frame does not exist, create a new frame object
                var frame = new Lightning.Frame(frameId, relative);
                frame.addProperty(property['prop'], property['val']);
                this._frames.push(frame);
            }
        };
        /**
         * Extend a frame with multiple properties
         * @param  {number} frameId
         * @param  {Array<Property>} properties
         * @param  {boolean} relative
         */
        Tween.prototype.extendFrame = function (frameId, properties, relative) {
            var frame = new Lightning.Frame(frameId, relative);
            this._frames.push(frame);
            for (var _i = 0, properties_1 = properties; _i < properties_1.length; _i++) {
                var i = properties_1[_i];
                frame.properties.push(i);
            }
        };
        /**
         * Apply the current frame properties to an object
         * @param  {Object} obj
         */
        Tween.prototype.applyUpdate = function (obj) {
            // apply the new frame values (array)
            var curFrame = this._frames[this._currentFrame];
            for (var i = 0; i < curFrame.properties.length; i++) {
                var prop = curFrame.properties[i].prop;
                var val = curFrame.properties[i].val;
                obj[prop] = val;
            }
            // check if there is an event callback on this frame
            var frameSpecific = this._onFrameCallbacks.exists(this._currentFrame);
            if (frameSpecific) {
                frameSpecific.funct();
            }
            this._currentFrame++;
            if (this._currentFrame == this._frames.length) {
                this.end();
            }
            this.onTickTrigger();
        };
        /**
         * Deals with the tween end logic
         */
        Tween.prototype.end = function () {
            // if the tween loop is not enabled
            if (this._loop == false) {
                // if the tween is to auto-destroy on completion
                if (this._autoDestroy) {
                    this.onCompleteTrigger();
                    this.destroy();
                }
                else {
                    // pause the tween and reset it
                    this.onCompleteTrigger();
                    this._isPaused = true;
                    this.reset();
                }
            }
            else if (this._loopsRemaining > 0) {
                // if the tween has more loops
                this.loop();
            }
            else {
                //if the tween has no loops left
                if (this._autoDestroy) {
                    this.onCompleteTrigger();
                    this.destroy();
                }
                else {
                    this.onCompleteTrigger();
                    this._isPaused = true;
                    this.reset();
                }
            }
        };
        /**
         * When the tween manager starts a new tween, the on start callbacks are triggered
         */
        Tween.prototype.onStartTrigger = function () {
            this._onStartCallbacks.trigger();
        };
        /**
         * Called when the tween is destroyed (can only be done from outside this class)
         */
        Tween.prototype.onDestroyTrigger = function () {
            this._onDestroyCallbacks.trigger();
        };
        Tween.prototype.onFrameTrigger = function () {
            this._onFrameCallbacks.trigger();
        };
        /**
         * Called when the tween receives an update from the tween manager
         */
        Tween.prototype.onTickTrigger = function () {
            this._onTickCallbacks.trigger();
        };
        Tween.prototype.onCompleteTrigger = function () {
            this._onCompleteCallbacks.trigger();
        };
        /**
         * Reset the current frame to 0
         */
        Tween.prototype.reset = function () {
            this._currentFrame = 0;
        };
        Tween.prototype.start = function (obj, loop, loops, autoDestroy) {
            var tween = this.tweenManager.startDirect(obj, this, loop, loops, autoDestroy);
            return tween;
        };
        /**
         * Called when the tween is looped back to the beginning
         */
        Tween.prototype.loop = function () {
            this._onLoopCallbacks.trigger();
            this._loopsRemaining--;
            this._currentFrame = 0;
        };
        /**
         * Called by the user, or when
         */
        Tween.prototype.stop = function () {
            this._onStopCallbacks.trigger();
            this._isPaused = true;
            this._currentFrame = 0;
        };
        Tween.prototype.complete = function () {
            this.end();
        };
        Tween.prototype.chain = function (tween) {
            //// ---- need to implement simple chain function to make the api easier to use ---- /////
            // this._onCompleteCallbacks.addOnce(null, () => {
            // });
        };
        /**
         * Set the destroy flag ready for deletion on the next update
         */
        Tween.prototype.destroy = function () {
            this._isPaused = true;
            this._deleteFlag = true;
        };
        /**
         * Pause the tween
         */
        Tween.prototype.pause = function () {
            this._onPauseCallbacks.trigger();
            this._isPaused = true;
        };
        /**
         * Remove a frame from the frames array
         */
        Tween.prototype.removeFrame = function (frame, length) {
            if (length === void 0) { length = 1; }
            this._frames.splice(frame, length);
        };
        Object.defineProperty(Tween.prototype, "hasStarted", {
            /**
             *
             * @returns {boolean}
             */
            get: function () {
                if (this._currentFrame > 0) {
                    return true;
                }
                else {
                    return false;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Tween.prototype, "hasFinished", {
            /**
             * Calculates if the tween has been finished
             * @returns {boolean}
             */
            get: function () {
                if (this._currentFrame === this._maxFrames && this._loopsRemaining === 0) {
                    return true;
                }
                else {
                    return false;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Tween.prototype, "currentFrame", {
            /**
             * Returns the current frame number
             * @returns {number}
             */
            get: function () {
                return this._currentFrame;
            },
            /**
             * set the current frame number
             * @param {number} val
             */
            set: function (val) {
                this._currentFrame = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Tween.prototype, "maxFrames", {
            /**
             * Return the maximum number of frames in this tween (not taking into account loops)
             * @returns {number}
             */
            get: function () {
                return this._frames.length;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Tween.prototype, "frames", {
            /**
             * Returns an array of the tween frames
             */
            get: function () {
                return this._frames;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Tween.prototype, "autoDestroy", {
            /**
             * Returns if the tween is to auto destroy on completion
             * @returns {boolean}
             */
            get: function () {
                return this._autoDestroy;
            },
            /**
             * Sets the auto destroy flag
             * @param value
             */
            set: function (value) {
                this._autoDestroy = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Tween.prototype, "isPaused", {
            /**
             * Returns true if the tween is in a paused state
             * @returns {boolean}
             */
            get: function () {
                return this._isPaused;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Tween.prototype, "looping", {
            /**
             * Returns true if looping is enabled
             * @returns {boolean}
             */
            get: function () {
                return this._loop;
            },
            /**
             * Set the looping enabled
             * @param value
             */
            set: function (value) {
                this._loop = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Tween.prototype, "loopsRemaining", {
            /**
             * Returns the number of loops remaining
             * @returns {number}
             */
            get: function () {
                return this._loopsRemaining;
            },
            /**
             * Set the number of loops remaining
             * @param value
             */
            set: function (value) {
                this._loopsRemaining = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Tween.prototype, "deleteFlag", {
            /**
             * Returns true if the tween is ready to be deleted
             * @returns {boolean}
             */
            get: function () {
                return this._deleteFlag;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Tween.prototype, "playFlag", {
            get: function () {
                return this._playFlag;
            },
            set: function (value) {
                this._playFlag = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Tween.prototype, "frame", {
            set: function (val) {
                this._currentFrame = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Tween.prototype, "events", {
            get: function () {
                return {
                    "onStart": this._onStartCallbacks,
                    "onStop": this._onStopCallbacks,
                    "onLoop": this._onLoopCallbacks,
                    "onComplete": this._onCompleteCallbacks,
                    "onPause": this._onPauseCallbacks,
                    "onTick": this._onTickCallbacks,
                    "onDestroy": this._onDestroyCallbacks,
                    "onFrame": this._onFrameCallbacks
                };
            },
            enumerable: true,
            configurable: true
        });
        return Tween;
    }());
    Lightning.Tween = Tween;
    /**
     * Notes
     *
     * 1. When resetting, the variables should reset to that of the initial creation including looping values etc
     * 2. Make a starting function that calls the parent to start the tween
     * 3. Potentially make functions to shuffle / reorder the events
    */
})(Lightning || (Lightning = {}));
/// <reference path="./../reference.d.ts" />
var Lightning;
(function (Lightning) {
    var TweenManager = (function () {
        function TweenManager(game) {
            this.game = game;
            this._tweens = [];
            this._running = [];
            this._easing = new Lightning.Easing();
        }
        /**
         * Makes a new instance of a tween
         * @param name
         * @returns {any}
         */
        TweenManager.prototype.newTween = function (name) {
            // -- TODO -- Need to change this._tweens[name] for this.find!
            // if tween name exists, throw error, else create blank tween data
            if (this._tweens[name]) {
                console.error('Tween with the name "' + name + '" already exists');
                return false;
            }
            else {
                this._tweens[name] = new Lightning.Tween(this);
                return this._tweens[name];
            }
        };
        /**
         * Create a new tween
         * @param name
         * @param property
         * @param from
         * @param to
         * @param time
         * @param easing
         */
        TweenManager.prototype.create = function (name, props) {
            // if null is passed as a name, then don't give the tween a name or add it to the global array of tweens
            if (name == null) {
                var tween = new Lightning.Tween(this);
                this.calculateFrames(tween, props);
                return tween;
            }
            else {
                // get a new instance of an tween
                var tween = this.newTween(name);
                this.calculateFrames(tween, props);
                return tween;
            }
        };
        /**
         * Create an tween array with no tween data
         * @param name
         */
        TweenManager.prototype.createEmpty = function (name) {
            if (name == null) {
                var tween = new Lightning.Tween(this);
                return tween;
            }
            else {
                var tween = this.newTween(name);
                return tween;
            }
        };
        /**
         * Calculate the frames in an tween
         * @param tween
         * @param property
         * @param from
         * @param to
         * @param time
         * @param easing
         */
        TweenManager.prototype.calculateFrames = function (tween, props) {
            // calculate the number of frames as ms / 1000 * desired tween fps;
            for (var _i = 0, props_1 = props; _i < props_1.length; _i++) {
                var t = props_1[_i];
                var numOfFrames = (t.time / 1000) * 60;
                for (var i = 0; i <= numOfFrames; i++) {
                    var val = t.easing(null, i, t.from, t.to - t.from, numOfFrames);
                    tween.createFrame(i, [{ prop: t.prop, val: val }], false);
                }
            }
        };
        /**
         * Add a custom frame to the tween sequence
         * @param name
         * @param position
         * @param data
         */
        TweenManager.prototype.addFrame = function (name, position, data) {
            var tween = this.getTween(name);
        };
        /**
         * Combine 2 tween sequences together
         * @param name1
         * @param name2
         * @param position if -1 tween will chain at the end
         * @param destroyOriginals remove the original tweens after building the new one
         */
        TweenManager.prototype.extend = function (newName, tweens, position, destroyOriginals) {
            var tween = null;
            if (newName !== null) {
                tween = this.newTween(newName);
            }
            else {
                tween = new Lightning.Tween(this);
            }
            // if tween creation failed, return
            if (tween instanceof Lightning.Tween == false) {
                return;
            }
            ;
            var globalFrameId = 0;
            for (var i = 0; i < tweens.length; i++) {
                // get single tween
                var tempTween = null;
                if (typeof (tweens[i]) == 'string') {
                    tempTween = this.getTween(tweens[i]);
                }
                else {
                    tempTween = tweens[i];
                }
                // if tween was not found, return false
                if (!tempTween)
                    return false;
                for (var x = 0; x < tempTween.frames.length; x++) {
                    var frame = tempTween.frames[x];
                    tween.extendFrame(globalFrameId, frame.properties, frame.relative);
                }
            }
            return tween;
        };
        /**
         * Start a tween. Keeps the original safe and clones the object
         * @param obj object to be tweened
         * @param name name of the tween
         * @param loop if loops are enabled
         * @param loops number of times to loop
         * @param autoDestroy if is to auto destroy
         */
        TweenManager.prototype.start = function (obj, name, loop, loops, autoDestroy) {
            // retrieve the tween
            var tween = this.getTween(name);
            // if this is not a valid tween, return
            if (tween instanceof Lightning.Tween == false) {
                return;
            }
            ;
            // if the tween is set to loop
            // deep clone the object to leave the original intact
            var curTween = Object.create(tween);
            if (loop) {
                curTween.loop = true;
                curTween.loopsRemaining = loops;
            }
            // set the auto destroy on completion
            curTween.autoDestroy = autoDestroy;
            // add the clone tween to the currently running array with the associated object
            var t = {
                tween: curTween,
                obj: obj
            };
            t.tween.onStartTrigger();
            this._running.push(t);
            return (t);
        };
        /**
         * Start a tween. Keeps the original safe and clones the object
         * @param obj object to be tweened
         * @param name name of the tween
         * @param loop if loops are enabled
         * @param loops number of times to loop
         * @param autoDestroy if is to auto destroy
         */
        TweenManager.prototype.startDirect = function (obj, tween, loop, loops, autoDestroy) {
            // deep clone the object to leave the original intact
            var curTween = Object.create(tween);
            if (loop) {
                curTween.loop = true;
                curTween.loopsRemaining = loops;
            }
            // set the auto destroy on completion
            curTween.autoDestroy = autoDestroy;
            // add the clone tween to the currently running array with the associated object
            var t = {
                tween: curTween,
                obj: obj
            };
            t.tween.onStartTrigger();
            this._running.push(t);
            return t;
        };
        /**
         * @param {string} name - Returns a deep cloned object of the requested tween
         */
        TweenManager.prototype.clone = function (name) {
            // retrieve the tween
            var tween = this.getTween(name);
            // if this is not a valid tween, return
            if (tween instanceof Lightning.Tween == false) {
                return;
            }
            ;
            var clone = this.cloneObj(tween);
            return clone;
        };
        /**
         * Clones a tween object
         */
        TweenManager.prototype.cloneObj = function (obj) {
            if (!obj || (typeof obj != "object"))
                return obj;
            var clone = this.cloneEmptyObject(obj);
            this.copyObjectProps(obj, clone);
            return clone;
        };
        /**
         * Clone object properties
         */
        TweenManager.prototype.copyObjectProps = function (objFrom, objTo) {
            for (var i in objFrom) {
                if (!objFrom.hasOwnProperty(i))
                    continue;
                if (objFrom[i] instanceof Array) {
                    objTo[i] = [];
                    for (var n = 0; n < objFrom[i].length; n++) {
                        if (typeof objFrom[i][n] == "object" && objFrom[i][n] !== null) {
                            objTo[i][n] = this.cloneEmptyObject(objFrom[i][n]);
                            this.copyObjectProps(objFrom[i][n], objTo[i][n]);
                        }
                        else {
                            objTo[i][n] = objFrom[i][n];
                        }
                    }
                    continue;
                }
                if (this.isPlainObject(objFrom[i])) {
                    objTo[i] = {};
                    this.copyObjectProps(objFrom[i], objTo[i]);
                    continue;
                }
                objTo[i] = objFrom[i];
            }
        };
        /**
         * Call the object constructor, or initalise a new one
         */
        TweenManager.prototype.cloneEmptyObject = function (o) {
            return o.constructor ? new o.constructor() : {};
        };
        /**
         * Check on the object type
         */
        TweenManager.prototype.isPlainObject = function (o) {
            if (!o || !o.constructor)
                return false;
            return o.constructor === Object;
        };
        /**
         * Gets called every request frame update
         * If there are
         */
        TweenManager.prototype.update = function () {
            // put check if paused. If the running array is empty, set bool to false
            // only set this to true when a new tween is started (sleep mode)
            for (var i in this._running) {
                // if tween is not paused
                var tween = this._running[i].tween;
                var obj = this._running[i].obj;
                if (!tween.isPaused) {
                    tween.applyUpdate(obj);
                }
                else {
                    if (tween.deleteFlag) {
                        tween.onDestroyTrigger();
                        this._running.splice(parseInt(i), 1);
                    }
                    else {
                        tween.complete();
                    }
                }
            }
        };
        // TODO -- URGENT! This does not look or return tweens that are currently running
        /**
         * @param {string} name
         * @param {boolean} cached
         */
        TweenManager.prototype.remove = function (name, cached) {
            if (cached === void 0) { cached = false; }
            // look in both this._tweens and this._running for the tween
            var tween = this.getTween(name);
            // if tween creation failed, return
            if (tween instanceof Lightning.Tween == false) {
                return;
            }
            ;
            // remove reference to this object
            tween = null;
        };
        /**
         * Return the tween by name
         * @param {string} name
         */
        TweenManager.prototype.getTween = function (name) {
            var flag = false;
            var index = null;
            // search the cached tweens array
            for (var i in this._tweens) {
                if (name === i) {
                    flag = true;
                    index = i;
                }
            }
            // search the currently running array
            for (var i in this._running) {
                if (name === i) {
                    flag = true;
                    index = i;
                }
            }
            // if tween has been found, return it, else throw error and return false
            if (!flag) {
                console.error('No tween with the name "' + name + '" found!');
                return false;
            }
            else {
                return this._tweens[index];
            }
        };
        /**
         * Shorter naming for retreiving a tween
         */
        TweenManager.prototype.find = function (name) {
            var tween = this.getTween(name);
            return tween || false;
        };
        Object.defineProperty(TweenManager.prototype, "easing", {
            /**
             * Provides access to Robert Penner's easing equations
             */
            get: function () {
                return this._easing;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TweenManager.prototype, "events", {
            /**
             * Give access to the events class
             */
            get: function () {
                return this._events;
            },
            enumerable: true,
            configurable: true
        });
        return TweenManager;
    }());
    Lightning.TweenManager = TweenManager;
})(Lightning || (Lightning = {}));
/// <reference path="./../reference.d.ts" />
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
        function Engine(width, height, canvasId) {
            if (canvasId === void 0) { canvasId = 'app'; }
            var _this = _super.call(this) || this;
            console.log('Lightning-js | version : 0.4.0');
            _this._dpr = window.devicePixelRatio;
            _this._eventEmitter = new Lightning.EventEmitter;
            if (!canvasId) {
                var viewCanvas = document.createElement('canvas');
                viewCanvas.id = 'app';
                document.getElementById('app-container').appendChild(viewCanvas);
            }
            _this._tweens = new Lightning.TweenManager(_this);
            _this._storageManager = new Lightning.StorageManager();
            _this._renderer = PIXI.autoDetectRenderer(width, height, { resolution: _this._dpr });
            _this._renderer.autoResize = true;
            _this._world = new PIXI.Container();
            _this._world.scale = new PIXI.Point(1 / window.devicePixelRatio, 1 / window.devicePixelRatio);
            _this._world.interactive = true;
            document.getElementById('app-container').appendChild(_this._renderer.view);
            // let scale = window.devicePixelRatio;
            _this._renderer.resize(width, height);
            // create the physicsManager 
            _this._physicsManager = new Lightning.PhysicsManager(_this);
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
 *  Think about how to implement a light sprite for particles so they dont take up so much performance. It sucks on safari!
 * Particle emitter make a pre-create class that lets you store pooled sprited before the state is started
 * Think about making a debug module that's a container in it's own right. It should accept x number of text values
 *  and sort through them accordinly, ensuring nothing is ever overlapped
 * Need to give responsive device pixel ration some serious consideration
 * Build a built in FPS meter in debug module
 * Explore the posibility of using light ray casting?
 * Particle emitter presets??
 * Utalise isMobilejs for mobile detection
 * Build a webfont loader
 */ 
//# sourceMappingURL=compile.js.map