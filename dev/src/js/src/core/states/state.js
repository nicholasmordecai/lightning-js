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
            for (var _a = 0, params_1 = params; _a < params_1.length; _a++) {
                var i = params_1[_a];
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
        State.prototype.preloadComplete = function (loader, resources) {
            this.create();
        };
        return State;
    }(Lightning.Group));
    Lightning.State = State;
})(Lightning || (Lightning = {}));
