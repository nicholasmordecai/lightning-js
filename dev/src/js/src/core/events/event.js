/// <reference path="./../../reference.d.ts" />
var Lightning;
(function (Lightning) {
    var Event = (function () {
        function Event(emitter, emitOnce) {
            this._emitter = emitter;
            this._subscribers = [];
            this._enabled = true;
            this._proporgationAllowed = true;
            this._emitOnce = emitOnce;
        }
        /**
         * Add a subscriber
         *
         * @param {Function} fn
         * @param {Object} ctx
         * @param {Array} params
         * @param {Boolean} once
         *
         * @returns {iEventSubscription}
         */
        Event.prototype.addSubscriber = function (fn, ctx, once, params) {
            if (once === void 0) { once = false; }
            if (params === void 0) { params = null; }
            var subscriber = {};
            subscriber.fn = fn;
            subscriber.ctx = ctx;
            subscriber.once = once;
            subscriber.params = params;
            this._subscribers.push(subscriber);
            return subscriber;
        };
        /**
         * When the event has been emitted, cycle through all subscribers and trigger their callback
         *
         * @param params
         *
         * @returns {void}
         */
        Event.prototype.emit = function (params) {
            // if the event has been dissabled
            if (!this._enabled)
                return;
            // loop over all subscribers
            for (var i = 0; i < this._subscribers.length; i++) {
                // store subscription for local reference
                var subscription = this._subscribers[i];
                // call the stored function within the specific subscription instance
                subscription.fn.call(subscription.ctx, subscription.params, this, params);
                // if the subscription was added once, then remove it now
                if (subscription.once) {
                    this.removeSubscriber(subscription);
                }
                // if the event is not allowed to propogate, stop here
                if (!this._proporgationAllowed) {
                    return;
                }
            }
        };
        /**
         * Remove a subscriber from the event
         *
         * @param subscriber
         *
         * @returns {boolean} true or false if the subscriber has been removed
         */
        Event.prototype.removeSubscriber = function (subscriber) {
            for (var i = 0; i < this._subscribers.length; i++) {
                if (this._subscribers[i] === subscriber) {
                    this._subscribers.splice(i, 1);
                    return true;
                }
            }
            return false;
        };
        Object.defineProperty(Event.prototype, "enabled", {
            /**
             * @description Public getter for event enabled
             *
             * @returns {boolean} Enabled
             */
            get: function () {
                return this._enabled;
            },
            /**
             * @description Public setter for event enabled
             *
             * @param {boolean} Enabled
             *
             * @returns {void}
             */
            set: function (val) {
                this._enabled = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Event.prototype, "emitOnce", {
            /**
             * @description Public getter for emit once
             *
             * @returns {boolean} EmitOnce
             */
            get: function () {
                return this._emitOnce;
            },
            /**
             * @description Public setter for emit once
             *
             * @param {boolean} EmitOnce
             *
             * @returns {void}
             */
            set: function (val) {
                this._emitOnce = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Event.prototype, "subscribers", {
            get: function () {
                return this._subscribers;
            },
            enumerable: true,
            configurable: true
        });
        return Event;
    }());
    Lightning.Event = Event;
})(Lightning || (Lightning = {}));
