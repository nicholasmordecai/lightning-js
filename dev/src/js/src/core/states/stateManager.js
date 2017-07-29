/// <reference path="./../../reference.d.ts" />
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
/**
 * TODO
 *
 * Refactor arrays of states and active states for dictionary definition objects
 * Implement freeze state feature
 * Possibly refactor the state destroy method (cycle through and also destroy all physics bodies associated with that state)
 * Reset / Restart the state
 * Easy to use prepare function, to create a state, but not allow it to be rendered until ready
 */
var Lightning;
(function (Lightning) {
    var StateManager = (function (_super) {
        __extends(StateManager, _super);
        /**
         * @description StateManager constructor
         *
         * @param {Engine} game
         */
        function StateManager(game) {
            var _this = _super.call(this, game) || this;
            _this.game = game;
            _this._states = [];
            _this._activeStates = [];
            _this._verbose = true;
            return _this;
        }
        /**
         * @description Update loop. Called from the game ticker and is used to call each state update function individually
         */
        StateManager.prototype.update = function (time) {
            for (var _i = 0, _a = this._activeStates; _i < _a.length; _i++) {
                var map = _a[_i];
                map.state.update(time);
            }
        };
        /**
         * @description Start a state. This function is called in order to add a state to the world display list and call the init function if the state is to auto initalize
         */
        StateManager.prototype.start = function (key, destroyCurrentStates, autoInit) {
            if (destroyCurrentStates === void 0) { destroyCurrentStates = true; }
            if (autoInit === void 0) { autoInit = true; }
            var params = [];
            for (var _i = 3; _i < arguments.length; _i++) {
                params[_i - 3] = arguments[_i];
            }
            if (this._verbose)
                console.info('StateManager - Start State: "' + key + '"');
            if (destroyCurrentStates) {
                for (var _a = 0, _b = this._activeStates; _a < _b.length; _a++) {
                    var map_1 = _b[_a];
                    // ignore destroying the state being started if it's already active
                    if (map_1.key !== key) {
                        this.destroy(map_1.key);
                    }
                }
            }
            var map = this.findState(key);
            var state = map.state;
            console.log(state);
            this.game.world.addChild(state);
            state.visible = true;
            state.renderable = true;
            state.interactive = true;
            state.interactiveChildren = true;
            if (autoInit) {
                this.init(map, params);
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
        StateManager.prototype.init = function (map) {
            var params = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                params[_i - 1] = arguments[_i];
            }
            if (this._verbose)
                console.info('StateManager - Initalising State: "' + map.key + '"');
            var state = map.state;
            state.construct(this.game);
            this.addToActive(map);
            state.init(params);
        };
        /**
         * @description Leaves the state renderable and interactive but disables it's update procedure
         *
         * @param {string} key
         *
         * @returns {boolean}
         */
        StateManager.prototype.pause = function (key) {
            var state = this.findState(key);
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
            var state = this.findState(key);
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
            this._activeStates.splice(this.findActiveIndex(map));
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
            if (this._verbose)
                console.info('StateManeger - Destroying State: "' + key + '"');
            // get the state
            var map = this.findState(key);
            var state = map.state;
            // get index from array and splice first, to stop any updates whilst the state is being destroyed
            map.active = false;
            this._activeStates.splice(this.findActiveIndex(map));
            // disable properties
            state.visible = false;
            state.renderable = false;
            state.interactive = false;
            state.interactiveChildren = false;
            // destroy stuff
            this.destroyAllChildren(state);
            /**
             * Should find a more robust way of doing this
             */
            // remove from the game world
            this.game.world.removeChild(state);
            /**
             * Give thoughts to how to better clean up a destroyed state
             */
            // finally, nullify so GC can free up space
            // state = null;
            return true;
        };
        StateManager.prototype.destroyAllChildren = function (rootObject) {
            for (var _i = 0, _a = rootObject.children; _i < _a.length; _i++) {
                var child = _a[_i];
                child.destroy();
            }
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
            if (this._verbose)
                console.info('StateManager - Adding New State: "' + key + '"');
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
        StateManager.prototype.addToActive = function (map) {
            if (!this.isActive(map)) {
                this._activeStates.push(map);
                map.active = true;
                return true;
            }
            else {
                return false;
            }
        };
        StateManager.prototype.isActive = function (map) {
            var exists = false;
            for (var _i = 0, _a = this._activeStates; _i < _a.length; _i++) {
                var i = _a[_i];
                if (i.key === map.key) {
                    exists = true;
                }
            }
            return false;
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
        StateManager.prototype.findActiveIndex = function (map) {
            var count = 0;
            for (var _i = 0, _a = this._activeStates; _i < _a.length; _i++) {
                var i = _a[_i];
                if (i.key === map.key) {
                    return count;
                }
                count++;
            }
            return null;
        };
        Object.defineProperty(StateManager.prototype, "verbose", {
            get: function () {
                return this._verbose;
            },
            set: function (val) {
                this._verbose = val;
            },
            enumerable: true,
            configurable: true
        });
        return StateManager;
    }(Lightning.Plugin));
    Lightning.StateManager = StateManager;
})(Lightning || (Lightning = {}));
