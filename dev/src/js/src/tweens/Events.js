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
