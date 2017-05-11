/// <reference path="./../../reference.d.ts" />
var Lightning;
(function (Lightning) {
    var EventEmitter = (function () {
        function EventEmitter() {
            this._events = {};
            this._enabled = true;
        }
        /**
         * @description Create an event
         *
         * @param {string} key
         * @param {boolean} emitOnce
         *
         * @returns {Event}
         */
        EventEmitter.prototype.create = function (key, emitOnce) {
            if (emitOnce === void 0) { emitOnce = false; }
            var event = new Lightning.Event(this, emitOnce);
            this._events[key] = event;
            this._events[key].emitOnce = emitOnce;
            return event;
        };
        /**
         * @description Destroy this timer
         *
         * @returns {void}
         */
        EventEmitter.prototype.destroy = function () {
            this._events = null;
            this._enabled = null;
        };
        /**
         * @description Subscribe to an event
         *
         * @param {string} key
         * @param {Function} fn
         * @param {Object} ctx
         * @param {Array} params
         *
         * @returns {Event}
         */
        EventEmitter.prototype.subscribe = function (key, fn, ctx) {
            if (ctx === void 0) { ctx = null; }
            var params = [];
            for (var _i = 3; _i < arguments.length; _i++) {
                params[_i - 3] = arguments[_i];
            }
            return this._events[key].addSubscriber(fn, ctx, false, params);
        };
        /**
         * @description Subscribe to an event once. Same process as regular subscription, however gets removed after first emit
         *
         * @param {string} key
         * @param {Function} fn
         * @param {Object} ctx
         * @param {Array} params
         *
         * @returns {Event}
         */
        EventEmitter.prototype.subscribeOnce = function (key, fn, ctx) {
            if (ctx === void 0) { ctx = null; }
            var params = [];
            for (var _i = 3; _i < arguments.length; _i++) {
                params[_i - 3] = arguments[_i];
            }
            return this._events[key].addSubscriber(fn, ctx, true, params);
        };
        /**
         * @description Emits any events with the given key
         *
         * @param {string} key
         * @param {Array} params
         *
         * @returns {void}
         */
        EventEmitter.prototype.emit = function (key) {
            var params = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                params[_i - 1] = arguments[_i];
            }
            // check if event emitter is enabled
            if (!this._enabled)
                return;
            this._events[key].emit(params);
        };
        /**
         * @description returns an event by it's key pair value
         *
         * @param {string} key
         *
         * @returns {Event}
         */
        EventEmitter.prototype.event = function (key) {
            return this._events[key];
        };
        /**
         * @description Remove an event from the emitter
         *
         * @param {string} key
         *
         * @returns {Event}
         */
        EventEmitter.prototype.remove = function (key) {
            var event = this._events[key];
            this._events[key] = null;
            return event;
        };
        /**
         * @description Remove a callback from an event
         *
         * @param {string} key
         * @param {iEventSubscription} event
         *
         * @returns {void}
         */
        EventEmitter.prototype.unsubscribe = function (key, event) {
            this._events[key].removeSubscriber(event);
        };
        /**
         * @description Enable a specific event
         *
         * @param {string} key
         *
         * @returns {boolean}
         */
        EventEmitter.prototype.enableEvent = function (key) {
            this._events[key].enabled = true;
            return true;
        };
        /**
         * @description Disable a specific event
         *
         * @param {string} key
         *
         * @returns {boolean}
         */
        EventEmitter.prototype.disableEvent = function (key) {
            this._events[key].enabled = false;
            return true;
        };
        Object.defineProperty(EventEmitter.prototype, "enabled", {
            /**
             * @description Public getter fro the emitter enabled property
             *
             * @returns {boolean} enabled
             */
            get: function () {
                return this._enabled;
            },
            /**
             * @description Public setter for the emitter enabled property
             *
             * @param {boolean} enabled
             */
            set: function (val) {
                this._enabled = val;
            },
            enumerable: true,
            configurable: true
        });
        return EventEmitter;
    }());
    Lightning.EventEmitter = EventEmitter;
})(Lightning || (Lightning = {}));
