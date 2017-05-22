/// <reference path="./../reference.d.ts" />
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
    /**
     * TODO
     * 1. FPS
     */
    var Tween = (function (_super) {
        __extends(Tween, _super);
        function Tween(manager, obj, autoDestroy) {
            if (autoDestroy === void 0) { autoDestroy = false; }
            var _this = _super.call(this) || this;
            _this._manager = manager;
            _this._objRef = obj;
            _this._chains = [];
            _this._live = true;
            _this._anims = [];
            _this._length = 0;
            _this._currentPosition = 0;
            _this._fps = 60;
            _this._interval = 1000 / _this._fps;
            _this._active = false;
            _this._started = false;
            _this._paused = false;
            _this._loops = 0;
            _this._toBeDestroyed = false;
            _this._autoDestroy = autoDestroy;
            _this.create('start');
            _this.create('pause');
            _this.create('tick');
            _this.create('loop');
            _this.create('complete');
            _this.create('reset');
            _this.create('destroy');
            return _this;
        }
        Tween.prototype.update = function (dt) {
            if (this._paused)
                return;
            this._currentPosition++;
            // calc new position for each anim
            for (var _i = 0, _a = this._anims; _i < _a.length; _i++) {
                var anim = _a[_i];
                if (anim.live) {
                    anim = anim;
                    if (anim.cDelay < anim.delay) {
                        anim.cDelay++;
                    }
                    else {
                        if (anim.cPos < anim.maxPos) {
                            var newFrameData = anim.easing(this._currentPosition * this._interval, anim.from, anim.to - anim.from, anim.time);
                            this._objRef[anim.property] = newFrameData;
                            anim.cPos++;
                        }
                    }
                }
                else {
                    anim = anim;
                    if (anim.cDelay < anim.delay) {
                        anim.cDelay++;
                    }
                    else {
                        if (anim.cPos < anim.maxPos) {
                            this._objRef[anim.property] = anim.frames[anim.cPos];
                            anim.cPos++;
                        }
                    }
                }
            }
            if (this._currentPosition >= this._length) {
                if (this._loops > 1 || this._loops === -1) {
                    this.loop();
                }
                else {
                    this.complete();
                }
            }
            this.emit('tick', this);
        };
        Tween.prototype.createAnim = function (from, to, time, property, easing, delay) {
            if (delay === void 0) { delay = 0; }
            delay = Math.round((delay * (this._fps / 60)) / (1000 / 60));
            var anim = { from: from, to: to, time: time, property: property, delay: delay, cDelay: 0, easing: easing, cPos: 0, maxPos: Math.round(time / this._interval) + delay, live: true };
            this._anims.push(anim);
        };
        Tween.prototype.importAnim = function (property, frames, delay) {
            if (delay === void 0) { delay = 0; }
            delay = Math.round((delay * (this._fps / 60)) / (1000 / 60));
            var anim = { frames: frames, property: property, cPos: 0, maxPos: frames.length, delay: delay, cDelay: 0, live: false };
            this._anims.push(anim);
        };
        Tween.prototype.exportAnim = function (key) {
            var anim = this._anims[key];
            if (anim) {
                return anim.frames;
            }
        };
        Tween.prototype.start = function () {
            this._currentPosition = 0;
            this._started = true;
            this._paused = false;
            this._active = true;
            for (var _i = 0, _a = this._anims; _i < _a.length; _i++) {
                var anim = _a[_i];
                if (anim.maxPos > this._length) {
                    this._length = anim.maxPos;
                }
                anim.cPos = 0;
            }
            this._manager.start(this);
            this.emit('start', this);
        };
        Tween.prototype.complete = function () {
            this._active = false;
            this._started = false;
            for (var _i = 0, _a = this._chains; _i < _a.length; _i++) {
                var i = _a[_i];
                i.start();
            }
            this.emit('complete', this);
        };
        Tween.prototype.pause = function (val) {
            this._paused = val;
            this.emit('pause');
        };
        Tween.prototype.loop = function () {
            if (this._loops !== -1) {
                this._loops--;
            }
            this._currentPosition = 0;
            for (var _i = 0, _a = this._anims; _i < _a.length; _i++) {
                var anim = _a[_i];
                anim.cPos = 0;
            }
            this.emit('loop', this);
        };
        Tween.prototype.destroy = function () {
            this._active = false;
            this._paused = null;
            this._anims = null;
            this._chains = null;
            this._currentPosition = null;
            this._frames = null;
            this._length = 0;
            this._loops = null;
            this._objRef = null;
            this._started = null;
            this._manager.destroy(this);
            this.emit('destroy', this);
        };
        Tween.prototype.reset = function () {
            this._active = false;
            this._paused = false;
            this._currentPosition = 0;
            this._started = false;
            this.emit('reset', this);
        };
        Tween.prototype.moveTo = function (frame) {
            if (this._live) {
                if (frame >= this._length) {
                    this._currentPosition = 0;
                    return 0;
                }
                else {
                    this._currentPosition = frame;
                    return frame;
                }
            }
            else {
                if (frame >= this._frames.length - 1) {
                    this._currentPosition = 0;
                    return 0;
                }
                else {
                    this._currentPosition = frame;
                    return frame;
                }
            }
        };
        Tween.prototype.chain = function () {
            var tweens = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                tweens[_i] = arguments[_i];
            }
            for (var _a = 0, tweens_1 = tweens; _a < tweens_1.length; _a++) {
                var i = tweens_1[_a];
                this._chains.push(i);
            }
        };
        Object.defineProperty(Tween.prototype, "active", {
            get: function () {
                return this._active;
            },
            set: function (val) {
                this._active = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Tween.prototype, "loops", {
            get: function () {
                return this._loops;
            },
            set: function (val) {
                this._loops = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Tween.prototype, "fps", {
            get: function () {
                return this._fps;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Tween.prototype, "interval", {
            // public set fps(val:number) {
            //     this._fps = val;
            //     this._interval = 1000 / this._fps;
            // }
            get: function () {
                return this._interval;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Tween.prototype, "length", {
            get: function () {
                return this._length;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Tween.prototype, "autoDestroy", {
            get: function () {
                return this._autoDestroy;
            },
            set: function (val) {
                this._autoDestroy = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Tween.prototype, "started", {
            get: function () {
                return this._started;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Tween.prototype, "manager", {
            get: function () {
                return this._manager;
            },
            set: function (val) {
                this._manager = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Tween.prototype, "toBeDestroyed", {
            get: function () {
                return this._toBeDestroyed;
            },
            set: function (val) {
                this._toBeDestroyed = val;
            },
            enumerable: true,
            configurable: true
        });
        return Tween;
    }(Lightning.EventEmitter));
    Lightning.Tween = Tween;
})(Lightning || (Lightning = {}));
