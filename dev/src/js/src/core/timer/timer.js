/// <reference path="./../../reference.d.ts" />
var Lightning;
(function (Lightning) {
    var Timer = (function () {
        function Timer(game, interval, autoStart, loop, autoDestroy) {
            if (interval === void 0) { interval = 1000; }
            if (autoStart === void 0) { autoStart = true; }
            if (loop === void 0) { loop = true; }
            if (autoDestroy === void 0) { autoDestroy = false; }
            this.game = game;
            // set initial properties
            this._interval = interval;
            this._isLoop = loop;
            this._autoDestroy = autoDestroy;
            this._lastTick = 0;
            this._currentTime = 0;
            this._active = false;
            // create events
            this._events = new Lightning.EventEmitter();
            this._events.create('tick');
            this._events.create('start');
            this._events.create('stop');
            this._events.create('reset');
            this._events.create('destroy');
            if (autoStart) {
                this._active = true;
            }
            // put this update as a callback inside the engine ticker
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
        Timer.prototype.start = function () {
            this._active = true;
        };
        Timer.prototype.stop = function () {
            this._active = false;
        };
        Timer.prototype.reset = function () {
            this._currentTime = 0;
            this._lastTick = 0;
        };
        Timer.prototype.destroy = function () {
            this._active = null;
            this._autoDestroy = null;
            this.game.ticker.remove(this.update, this);
            this._currentTime = null;
            this._events.destroy();
            this._interval = null;
            this._isLoop = null;
            this._lastTick = null;
        };
        Object.defineProperty(Timer.prototype, "events", {
            get: function () {
                return this._events;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Timer.prototype, "interval", {
            get: function () {
                return this._interval;
            },
            set: function (val) {
                this._interval = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Timer.prototype, "autoDestroy", {
            get: function () {
                return this._autoDestroy;
            },
            set: function (val) {
                this._autoDestroy = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Timer.prototype, "loop", {
            get: function () {
                return this._isLoop;
            },
            set: function (val) {
                this._isLoop = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Timer.prototype, "active", {
            get: function () {
                return this._active;
            },
            set: function (val) {
                this._active = val;
            },
            enumerable: true,
            configurable: true
        });
        return Timer;
    }());
    Lightning.Timer = Timer;
})(Lightning || (Lightning = {}));
