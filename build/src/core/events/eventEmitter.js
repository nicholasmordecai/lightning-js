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
//# sourceMappingURL=eventEmitter.js.map