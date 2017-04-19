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
//# sourceMappingURL=event.js.map