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
//# sourceMappingURL=timer.js.map