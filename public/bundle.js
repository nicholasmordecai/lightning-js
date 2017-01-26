var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="./../reference.d.ts" />
var Lightening;
(function (Lightening) {
    var State = (function (_super) {
        __extends(State, _super);
        function State(game) {
            var params = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                params[_i - 1] = arguments[_i];
            }
            var _this = _super.call(this) || this;
            _this.game = game;
            return _this;
        }
        State.prototype.init = function (params) {
        };
        State.prototype.start = function () {
        };
        State.prototype.update = function () {
        };
        State.prototype.create = function () {
        };
        return State;
    }(PIXI.Container));
    Lightening.State = State;
})(Lightening || (Lightening = {}));
/// <reference path="./../reference.d.ts" />
var Lightening;
(function (Lightening) {
    var Engine = (function () {
        // game engine constructor
        function Engine(width, height) {
            this._activateState = null;
            this._tweens = new Tween.TweenManager(this);
            this._stats = new Stats();
            this._signals = new Lightening.Signals.SignalManager(this);
            this._renderer = PIXI.autoDetectRenderer(width, height);
            this._world = new PIXI.Container();
            this._world.interactive = true;
            this._world.on('mousedown', function () {
                console.log('container mousedown');
            });
            document.getElementById('app-container').appendChild(this._renderer.view);
            // init the ticker
            this._ticker = PIXI.ticker.shared;
            this._ticker.autoStart = true;
            this._ticker.add(this.update, this);
            this.resize();
            this._stats.setMode(0);
            document.getElementById('app-container').appendChild(this._stats.domElement);
        }
        // gets called on update
        Engine.prototype.update = function (time) {
            this._stats.begin();
            this._activateState.update();
            this._tweens.update();
            this._renderer.render(this._world);
            this._stats.end();
        };
        Engine.prototype.resize = function () {
            var _this = this;
            window.onresize = function (event) {
                var w = window.innerWidth;
                var h = window.innerHeight;
                _this._renderer.view.style.width = w + "px";
                _this._renderer.view.style.height = h + "px";
                _this._renderer.resize(w, h);
            };
        };
        Engine.prototype.startState = function (state) {
            var params = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                params[_i - 1] = arguments[_i];
            }
            var nState = new state(this);
            this.initState(nState, params);
        };
        Engine.prototype.initState = function (state, params) {
            if (this._activateState === null) {
                this._world.addChild(state);
            }
            else {
                this._world.removeChild(this._activateState);
                this._world.addChild(state);
            }
            this._activateState = state;
            state.init(params);
        };
        Object.defineProperty(Engine.prototype, "backgroundColor", {
            set: function (val) {
                this._renderer.backgroundColor = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Engine.prototype, "state", {
            set: function (val) {
                this._activateState = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Engine.prototype, "world", {
            get: function () {
                return this._world;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Engine.prototype, "width", {
            get: function () {
                return this._renderer.width;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Engine.prototype, "height", {
            get: function () {
                return this._renderer.height;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Engine.prototype, "renderer", {
            get: function () {
                return this._renderer;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Engine.prototype, "tweens", {
            get: function () {
                return this._tweens;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Engine.prototype, "signals", {
            get: function () {
                return this._signals;
            },
            enumerable: true,
            configurable: true
        });
        return Engine;
    }());
    Lightening.Engine = Engine;
})(Lightening || (Lightening = {}));
/// <reference path="./../../reference.d.ts" />
var Lightening;
(function (Lightening) {
    var UI;
    (function (UI) {
        var Shapes;
        (function (Shapes) {
            /**
             * @description Draw a square
             *
             * @param {number} d dimension of the square in pixels
             *
             * @returns {PIXI.Graphics}
             */
            function Square(d) {
                var graphics = new PIXI.Graphics();
                graphics.beginFill(0xffffff, 1);
                graphics.drawRect(0, 0, d, d);
                graphics.endFill();
                return graphics;
            }
            Shapes.Square = Square;
            /**
             * @description Draw a rectangle
             *
             * @param {number} w width of the rectangle in pixels
             * @param {number} h height of the rectangle in pixels
             *
             * @returns {PIXI.Graphics}
             */
            function Rect(w, h) {
                var graphics = new PIXI.Graphics();
                graphics.beginFill(0xffffff, 1);
                graphics.drawRect(0, 0, w, h);
                graphics.endFill();
                return graphics;
            }
            Shapes.Rect = Rect;
            /**
             * @description Draw a Star (double square)
             *
             * @param {number} w width of the rectangle in pixels
             * @param {number} h height of the rectangle in pixels
             *
             * @returns {PIXI.Graphics}
             */
            function Star(w, h) {
                var graphics = new PIXI.Graphics();
                graphics.beginFill(0xffffff, 1);
                graphics.drawRect(0, 0, w, h);
                graphics.endFill();
                return graphics;
            }
            Shapes.Star = Star;
            /**
             * @description Draw a 3d rectangle
             *
             * @param {number} w width of the rectangle in pixels
             * @param {number} h height of the rectangle in pixels
             * @param {number} d depth of rectangle in pixels
             *
             * @returns {PIXI.Graphics}
             */
            function Rect3D(w, h, d) {
                w *= 2, h *= 2, d *= 2;
                var graphics = new PIXI.Graphics();
                // draw front
                graphics.beginFill(0xffffff, 1);
                graphics.drawRect(0, 0, w, h);
                graphics.endFill();
                // draw top side
                var topSide = new PIXI.Graphics();
                topSide.beginFill(0xd2d2d2, 1);
                topSide.moveTo(0, 0);
                topSide.lineTo(d, -d);
                topSide.lineTo(w + d, -d);
                topSide.lineTo(w, 0);
                topSide.lineTo(0, 0);
                topSide.endFill();
                graphics.addChild(topSide);
                //draw right ride
                var rightSide = new PIXI.Graphics();
                rightSide.beginFill(0xababab, 1);
                rightSide.moveTo(w, 0);
                rightSide.lineTo(w + d, -d);
                rightSide.lineTo(w + d, h - d);
                rightSide.lineTo(w, h);
                rightSide.lineTo(w, 0);
                rightSide.endFill();
                graphics.addChild(rightSide);
                return graphics;
            }
            Shapes.Rect3D = Rect3D;
            /**
             * @description Draw a circle
             *
             * @param {number} r Radius of the circle in pixels
             *
             * @returns {PIXI.Graphics}
             */
            function Circle(r) {
                var graphics = new PIXI.Graphics();
                graphics.beginFill(0xffffff, 1);
                graphics.arc(75, 75, r, 0, Math.PI * 2, false);
                graphics.endFill();
                return graphics;
            }
            Shapes.Circle = Circle;
            /**
             * @description Draw a Triangle
             *
             * @param {number} r Length of the triangle sides
             *
             * @returns {PIXI.Graphics}
             */
            function Triangle(l) {
                var graphics = new PIXI.Graphics();
                graphics.beginFill(0xffffff, 1);
                graphics.moveTo(l * 0.5, 0);
                graphics.lineTo(l, l);
                graphics.lineTo(0, l);
                graphics.lineTo(l * 0.5, 0);
                graphics.endFill();
                return graphics;
            }
            Shapes.Triangle = Triangle;
        })(Shapes = UI.Shapes || (UI.Shapes = {}));
    })(UI = Lightening.UI || (Lightening.UI = {}));
})(Lightening || (Lightening = {}));
/// <reference path="./../../reference.d.ts" />
var Lightening;
(function (Lightening) {
    var UI;
    (function (UI) {
        var Icons;
        (function (Icons) {
            /**
             * @description Draw a hamburger menu icon
             *
             * @param {number} s size of the icon in pixels
             *
             * @returns {PIXI.Graphics}
             */
            function Hamburger(s) {
                var graphics = new PIXI.Graphics();
                graphics.beginFill(0xffffff, 1);
                graphics.drawRect(0, 0, s, s * 0.15);
                graphics.drawRect(0, s * 0.4, s, s * 0.15);
                graphics.drawRect(0, s * 0.8, s, s * 0.15);
                graphics.endFill();
                return graphics;
            }
            Icons.Hamburger = Hamburger;
        })(Icons = UI.Icons || (UI.Icons = {}));
    })(UI = Lightening.UI || (Lightening.UI = {}));
})(Lightening || (Lightening = {}));
var Tween;
(function (Tween) {
    var Easing = (function () {
        function Easing() {
        }
        Easing.prototype.none = function (x, t, b, c, d) {
            return c * t / d + b;
        };
        Easing.prototype.easeInQuad = function (t, b, c, d) {
            return c * (t /= d) * t + b;
        };
        Easing.prototype.easeOutQuad = function (x, t, b, c, d) {
            return -c * (t /= d) * (t - 2) + b;
        };
        Easing.prototype.easeInOutQuad = function (x, t, b, c, d) {
            if ((t /= d / 2) < 1)
                return c / 2 * t * t + b;
            return -c / 2 * ((--t) * (t - 2) - 1) + b;
        };
        Easing.prototype.easeInCubic = function (x, t, b, c, d) {
            return c * (t /= d) * t * t + b;
        };
        Easing.prototype.easeOutCubic = function (x, t, b, c, d) {
            return c * ((t = t / d - 1) * t * t + 1) + b;
        };
        Easing.prototype.easeInOutCubic = function (x, t, b, c, d) {
            if ((t /= d / 2) < 1)
                return c / 2 * t * t * t + b;
            return c / 2 * ((t -= 2) * t * t + 2) + b;
        };
        Easing.prototype.easeInQuart = function (x, t, b, c, d) {
            return c * (t /= d) * t * t * t + b;
        };
        Easing.prototype.easeOutQuart = function (x, t, b, c, d) {
            return -c * ((t = t / d - 1) * t * t * t - 1) + b;
        };
        Easing.prototype.easeInOutQuart = function (x, t, b, c, d) {
            if ((t /= d / 2) < 1)
                return c / 2 * t * t * t * t + b;
            return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
        };
        Easing.prototype.easeInQuint = function (x, t, b, c, d) {
            return c * (t /= d) * t * t * t * t + b;
        };
        Easing.prototype.easeOutQuint = function (x, t, b, c, d) {
            return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
        };
        Easing.prototype.easeInOutQuint = function (x, t, b, c, d) {
            if ((t /= d / 2) < 1)
                return c / 2 * t * t * t * t * t + b;
            return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
        };
        Easing.prototype.easeInSine = function (x, t, b, c, d) {
            return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
        };
        Easing.prototype.easeOutSine = function (x, t, b, c, d) {
            return c * Math.sin(t / d * (Math.PI / 2)) + b;
        };
        Easing.prototype.easeInOutSine = function (x, t, b, c, d) {
            return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
        };
        Easing.prototype.easeInExpo = function (x, t, b, c, d) {
            return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
        };
        Easing.prototype.easeOutExpo = function (x, t, b, c, d) {
            return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
        };
        Easing.prototype.easeInOutExpo = function (x, t, b, c, d) {
            if (t == 0)
                return b;
            if (t == d)
                return b + c;
            if ((t /= d / 2) < 1)
                return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
            return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
        };
        Easing.prototype.easeInCirc = function (x, t, b, c, d) {
            return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
        };
        Easing.prototype.easeOutCirc = function (x, t, b, c, d) {
            return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
        };
        Easing.prototype.easeInOutCirc = function (x, t, b, c, d) {
            if ((t /= d / 2) < 1)
                return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
            return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
        };
        Easing.prototype.easeInElastic = function (x, t, b, c, d) {
            var s = 1.70158;
            var p = 0;
            var a = c;
            if (t == 0)
                return b;
            if ((t /= d) == 1)
                return b + c;
            if (!p)
                p = d * .3;
            if (a < Math.abs(c)) {
                a = c;
                var s = p / 4;
            }
            else
                var s = p / (2 * Math.PI) * Math.asin(c / a);
            return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
        };
        Easing.prototype.easeOutElastic = function (x, t, b, c, d) {
            var s = 1.70158;
            var p = 0;
            var a = c;
            if (t == 0)
                return b;
            if ((t /= d) == 1)
                return b + c;
            if (!p)
                p = d * .3;
            if (a < Math.abs(c)) {
                a = c;
                var s = p / 4;
            }
            else
                var s = p / (2 * Math.PI) * Math.asin(c / a);
            return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
        };
        Easing.prototype.easeInOutElastic = function (x, t, b, c, d) {
            var s = 1.70158;
            var p = 0;
            var a = c;
            if (t == 0)
                return b;
            if ((t /= d / 2) == 2)
                return b + c;
            if (!p)
                p = d * (.3 * 1.5);
            if (a < Math.abs(c)) {
                a = c;
                var s = p / 4;
            }
            else
                var s = p / (2 * Math.PI) * Math.asin(c / a);
            if (t < 1)
                return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
            return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
        };
        Easing.prototype.easeInBack = function (x, t, b, c, d, s) {
            if (s == undefined)
                s = 1.70158;
            return c * (t /= d) * t * ((s + 1) * t - s) + b;
        };
        Easing.prototype.easeOutBack = function (x, t, b, c, d, s) {
            if (s == undefined)
                s = 1.70158;
            return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
        };
        Easing.prototype.easeInOutBack = function (x, t, b, c, d, s) {
            if (s == undefined)
                s = 1.70158;
            if ((t /= d / 2) < 1)
                return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
            return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
        };
        Easing.prototype.easeOutBounce = function (x, t, b, c, d) {
            if ((t /= d) < (1 / 2.75)) {
                return c * (7.5625 * t * t) + b;
            }
            else if (t < (2 / 2.75)) {
                return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
            }
            else if (t < (2.5 / 2.75)) {
                return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
            }
            else {
                return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
            }
        };
        return Easing;
    }());
    Tween.Easing = Easing;
})(Tween || (Tween = {}));
/// <reference path="./Interfaces/Callback.ts" />
var Tween;
(function (Tween) {
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
    Tween.Events = Events;
})(Tween || (Tween = {}));
/// <reference path="./Interfaces/Property.ts" />
/// <reference path="./Interfaces/Callback.ts" />
/**
 * Frame class. Defines what each frame should consist of in an animation
 */
var Tween;
(function (Tween) {
    var Frame = (function () {
        function Frame(frameId, relative) {
            this._frameId = frameId;
            this._properties = new Array();
            this._relative = relative;
        }
        /**
         * Add another property to this frame
         */
        Frame.prototype.addProperty = function (property, val) {
            var p = { prop: property, val: val };
            this._properties.push(p);
        };
        Object.defineProperty(Frame.prototype, "frameId", {
            get: function () {
                return this._frameId;
            },
            set: function (value) {
                this._frameId = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Frame.prototype, "properties", {
            get: function () {
                return this._properties;
            },
            set: function (value) {
                this._properties = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Frame.prototype, "relative", {
            get: function () {
                return this._relative;
            },
            set: function (value) {
                this._relative = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Frame.prototype, "complex", {
            get: function () {
                return this._complex;
            },
            set: function (value) {
                this._complex = value;
            },
            enumerable: true,
            configurable: true
        });
        return Frame;
    }());
    Tween.Frame = Frame;
})(Tween || (Tween = {}));
var Tween;
(function (Tween_1) {
    var Tween = (function () {
        function Tween(parent) {
            // ready to play
            this._playFlag = false;
            // total number of frames
            this._maxFrames = 0;
            // the current frame number
            this._currentFrame = 0;
            // destroy on completion flag
            this._autoDestroy = false;
            // tween paused flag
            this._isPaused = false;
            // tween loop flag
            this._loop = false;
            // tween number of loops remaining
            this._loopsRemaining = 0;
            // tween ready for deletion flag
            this._deleteFlag = false;
            this.tweenManager = parent;
            this._frames = new Array();
            this._onStartCallbacks = new Tween_1.Events(this);
            this._onStopCallbacks = new Tween_1.Events(this);
            this._onLoopCallbacks = new Tween_1.Events(this);
            this._onPauseCallbacks = new Tween_1.Events(this);
            this._onTickCallbacks = new Tween_1.Events(this);
            this._onCompleteCallbacks = new Tween_1.Events(this);
            this._onDestroyCallbacks = new Tween_1.Events(this);
            this._onFrameCallbacks = new Tween_1.Events(this);
        }
        /**
         * Create an indivual frame at a specific position
         * @param  {number} frameId
         * @param  {number} val
         * @param  {string} property
         * @param  {boolean} relative
         */
        Tween.prototype.createFrame = function (frameId, properties, relative) {
            if (frameId == null) {
                frameId = this._frames.length;
            }
            for (var i = 0; i < properties.length; i++) {
                this.insertFrameValues(frameId, properties[i], relative);
            }
        };
        Tween.prototype.insertFrameValues = function (frameId, property, relative) {
            if (this._frames[frameId]) {
                var frame = this._frames[frameId];
                frame.addProperty(property['prop'], property['val']);
            }
            else {
                // this frame does not exist, create a new frame object
                var frame = new Tween_1.Frame(frameId, relative);
                frame.addProperty(property['prop'], property['val']);
                this._frames.push(frame);
            }
        };
        /**
         * Extend a frame with multiple properties
         * @param  {number} frameId
         * @param  {Array<Property>} properties
         * @param  {boolean} relative
         */
        Tween.prototype.extendFrame = function (frameId, properties, relative) {
            var frame = new Tween_1.Frame(frameId, relative);
            this._frames.push(frame);
            for (var _i = 0, properties_1 = properties; _i < properties_1.length; _i++) {
                var i = properties_1[_i];
                frame.properties.push(i);
            }
        };
        /**
         * Apply the current frame properties to an object
         * @param  {Object} obj
         */
        Tween.prototype.applyUpdate = function (obj) {
            // apply the new frame values (array)
            var curFrame = this._frames[this._currentFrame];
            for (var i = 0; i < curFrame.properties.length; i++) {
                var prop = curFrame.properties[i].prop;
                var val = curFrame.properties[i].val;
                obj[prop] = val;
            }
            // check if there is an event callback on this frame
            var frameSpecific = this._onFrameCallbacks.exists(this._currentFrame);
            if (frameSpecific) {
                frameSpecific.funct();
            }
            this._currentFrame++;
            if (this._currentFrame == this._frames.length) {
                this.end();
            }
            this.onTickTrigger();
        };
        /**
         * Deals with the tween end logic
         */
        Tween.prototype.end = function () {
            // if the tween loop is not enabled
            if (this._loop == false) {
                // if the tween is to auto-destroy on completion
                if (this._autoDestroy) {
                    this.onCompleteTrigger();
                    this.destroy();
                }
                else {
                    // pause the tween and reset it
                    this.onCompleteTrigger();
                    this._isPaused = true;
                    this.reset();
                }
            }
            else if (this._loopsRemaining > 0) {
                // if the tween has more loops
                this.loop();
            }
            else {
                //if the tween has no loops left
                if (this._autoDestroy) {
                    this.onCompleteTrigger();
                    this.destroy();
                }
                else {
                    this.onCompleteTrigger();
                    this._isPaused = true;
                    this.reset();
                }
            }
        };
        /**
         * When the tween manager starts a new tween, the on start callbacks are triggered
         */
        Tween.prototype.onStartTrigger = function () {
            this._onStartCallbacks.trigger();
        };
        /**
         * Called when the tween is destroyed (can only be done from outside this class)
         */
        Tween.prototype.onDestroyTrigger = function () {
            this._onDestroyCallbacks.trigger();
        };
        Tween.prototype.onFrameTrigger = function () {
            this._onFrameCallbacks.trigger();
        };
        /**
         * Called when the tween receives an update from the tween manager
         */
        Tween.prototype.onTickTrigger = function () {
            this._onTickCallbacks.trigger();
        };
        Tween.prototype.onCompleteTrigger = function () {
            this._onCompleteCallbacks.trigger();
        };
        /**
         * Reset the current frame to 0
         */
        Tween.prototype.reset = function () {
            this._currentFrame = 0;
        };
        Tween.prototype.start = function (obj, loop, loops, autoDestroy) {
            var tween = this.tweenManager.startDirect(obj, this, loop, loops, autoDestroy);
            return tween;
        };
        /**
         * Called when the tween is looped back to the beginning
         */
        Tween.prototype.loop = function () {
            this._onLoopCallbacks.trigger();
            this._loopsRemaining--;
            this._currentFrame = 0;
        };
        /**
         * Called by the user, or when
         */
        Tween.prototype.stop = function () {
            this._onStopCallbacks.trigger();
            this._isPaused = true;
            this._currentFrame = 0;
        };
        Tween.prototype.complete = function () {
            this.end();
        };
        Tween.prototype.chain = function (tween) {
            //// ---- need to implement simple chain function to make the api easier to use ---- /////
            // this._onCompleteCallbacks.addOnce(null, () => {
            // });
        };
        /**
         * Set the destroy flag ready for deletion on the next update
         */
        Tween.prototype.destroy = function () {
            this._isPaused = true;
            this._deleteFlag = true;
        };
        /**
         * Pause the tween
         */
        Tween.prototype.pause = function () {
            this._onPauseCallbacks.trigger();
            this._isPaused = true;
        };
        /**
         * Remove a frame from the frames array
         */
        Tween.prototype.removeFrame = function (frame, length) {
            if (length === void 0) { length = 1; }
            this._frames.splice(frame, length);
        };
        Object.defineProperty(Tween.prototype, "hasStarted", {
            /**
             *
             * @returns {boolean}
             */
            get: function () {
                if (this._currentFrame > 0) {
                    return true;
                }
                else {
                    return false;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Tween.prototype, "hasFinished", {
            /**
             * Calculates if the tween has been finished
             * @returns {boolean}
             */
            get: function () {
                if (this._currentFrame === this._maxFrames && this._loopsRemaining === 0) {
                    return true;
                }
                else {
                    return false;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Tween.prototype, "currentFrame", {
            /**
             * Returns the current frame number
             * @returns {number}
             */
            get: function () {
                return this._currentFrame;
            },
            /**
             * set the current frame number
             * @param {number} val
             */
            set: function (val) {
                this._currentFrame = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Tween.prototype, "maxFrames", {
            /**
             * Return the maximum number of frames in this tween (not taking into account loops)
             * @returns {number}
             */
            get: function () {
                return this._frames.length;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Tween.prototype, "frames", {
            /**
             * Returns an array of the tween frames
             */
            get: function () {
                return this._frames;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Tween.prototype, "autoDestroy", {
            /**
             * Returns if the tween is to auto destroy on completion
             * @returns {boolean}
             */
            get: function () {
                return this._autoDestroy;
            },
            /**
             * Sets the auto destroy flag
             * @param value
             */
            set: function (value) {
                this._autoDestroy = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Tween.prototype, "isPaused", {
            /**
             * Returns true if the tween is in a paused state
             * @returns {boolean}
             */
            get: function () {
                return this._isPaused;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Tween.prototype, "looping", {
            /**
             * Returns true if looping is enabled
             * @returns {boolean}
             */
            get: function () {
                return this._loop;
            },
            /**
             * Set the looping enabled
             * @param value
             */
            set: function (value) {
                this._loop = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Tween.prototype, "loopsRemaining", {
            /**
             * Returns the number of loops remaining
             * @returns {number}
             */
            get: function () {
                return this._loopsRemaining;
            },
            /**
             * Set the number of loops remaining
             * @param value
             */
            set: function (value) {
                this._loopsRemaining = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Tween.prototype, "deleteFlag", {
            /**
             * Returns true if the tween is ready to be deleted
             * @returns {boolean}
             */
            get: function () {
                return this._deleteFlag;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Tween.prototype, "playFlag", {
            get: function () {
                return this._playFlag;
            },
            set: function (value) {
                this._playFlag = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Tween.prototype, "frame", {
            set: function (val) {
                this._currentFrame = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Tween.prototype, "events", {
            get: function () {
                return {
                    "onStart": this._onStartCallbacks,
                    "onStop": this._onStopCallbacks,
                    "onLoop": this._onLoopCallbacks,
                    "onComplete": this._onCompleteCallbacks,
                    "onPause": this._onPauseCallbacks,
                    "onTick": this._onTickCallbacks,
                    "onDestroy": this._onDestroyCallbacks,
                    "onFrame": this._onFrameCallbacks
                };
            },
            enumerable: true,
            configurable: true
        });
        return Tween;
    }());
    Tween_1.Tween = Tween;
    /**
     * Notes
     *
     * 1. When resetting, the variables should reset to that of the initial creation including looping values etc
     * 2. Make a starting function that calls the parent to start the tween
     * 3. Potentially make functions to shuffle / reorder the events
    */
})(Tween || (Tween = {}));
/// <reference path="./../../reference.d.ts" />
var Tween;
(function (Tween) {
    var TweenManager = (function () {
        function TweenManager(game) {
            this.game = game;
            this._tweens = [];
            this._running = [];
            this._easing = new Tween.Easing();
        }
        /**
         * Makes a new instance of a tween
         * @param name
         * @returns {any}
         */
        TweenManager.prototype.newTween = function (name) {
            // -- TODO -- Need to change this._tweens[name] for this.find!
            // if tween name exists, throw error, else create blank tween data
            if (this._tweens[name]) {
                console.error('Tween with the name "' + name + '" already exists');
                return false;
            }
            else {
                this._tweens[name] = new Tween.Tween(this);
                return this._tweens[name];
            }
        };
        /**
         * Create a new tween
         * @param name
         * @param property
         * @param from
         * @param to
         * @param time
         * @param easing
         */
        TweenManager.prototype.create = function (name, props) {
            // if null is passed as a name, then don't give the tween a name or add it to the global array of tweens
            if (name == null) {
                var tween = new Tween.Tween(this);
                this.calculateFrames(tween, props);
                return tween;
            }
            else {
                // get a new instance of an tween
                var tween = this.newTween(name);
                this.calculateFrames(tween, props);
                return tween;
            }
        };
        /**
         * Create an tween array with no tween data
         * @param name
         */
        TweenManager.prototype.createEmpty = function (name) {
            if (name == null) {
                var tween = new Tween.Tween(this);
                return tween;
            }
            else {
                var tween = this.newTween(name);
                return tween;
            }
        };
        /**
         * Calculate the frames in an tween
         * @param tween
         * @param property
         * @param from
         * @param to
         * @param time
         * @param easing
         */
        TweenManager.prototype.calculateFrames = function (tween, props) {
            // calculate the number of frames as ms / 1000 * desired tween fps;
            for (var _i = 0, props_1 = props; _i < props_1.length; _i++) {
                var t = props_1[_i];
                var numOfFrames = (t.time / 1000) * 60;
                for (var i = 0; i <= numOfFrames; i++) {
                    var val = t.easing(null, i, t.from, t.to - t.from, numOfFrames);
                    tween.createFrame(i, [{ prop: t.prop, val: val }], false);
                }
            }
        };
        /**
         * Add a custom frame to the tween sequence
         * @param name
         * @param position
         * @param data
         */
        TweenManager.prototype.addFrame = function (name, position, data) {
            var tween = this.getTween(name);
        };
        /**
         * Combine 2 tween sequences together
         * @param name1
         * @param name2
         * @param position if -1 tween will chain at the end
         * @param destroyOriginals remove the original tweens after building the new one
         */
        TweenManager.prototype.extend = function (newName, tweens, position, destroyOriginals) {
            var tween = null;
            if (newName !== null) {
                tween = this.newTween(newName);
            }
            else {
                tween = new Tween.Tween(this);
            }
            // if tween creation failed, return
            if (tween instanceof Tween.Tween == false) {
                return;
            }
            ;
            var globalFrameId = 0;
            for (var i = 0; i < tweens.length; i++) {
                // get single tween
                var tempTween = null;
                if (typeof (tweens[i]) == 'string') {
                    tempTween = this.getTween(tweens[i]);
                }
                else {
                    tempTween = tweens[i];
                }
                // if tween was not found, return false
                if (!tempTween)
                    return false;
                for (var x = 0; x < tempTween.frames.length; x++) {
                    var frame = tempTween.frames[x];
                    tween.extendFrame(globalFrameId, frame.properties, frame.relative);
                }
            }
            return tween;
        };
        /**
         * Start a tween. Keeps the original safe and clones the object
         * @param obj object to be tweened
         * @param name name of the tween
         * @param loop if loops are enabled
         * @param loops number of times to loop
         * @param autoDestroy if is to auto destroy
         */
        TweenManager.prototype.start = function (obj, name, loop, loops, autoDestroy) {
            // retrieve the tween
            var tween = this.getTween(name);
            // if this is not a valid tween, return
            if (tween instanceof Tween.Tween == false) {
                return;
            }
            ;
            // if the tween is set to loop
            // deep clone the object to leave the original intact
            var curTween = Object.create(tween);
            if (loop) {
                curTween.loop = true;
                curTween.loopsRemaining = loops;
            }
            // set the auto destroy on completion
            curTween.autoDestroy = autoDestroy;
            // add the clone tween to the currently running array with the associated object
            var t = {
                tween: curTween,
                obj: obj
            };
            t.tween.onStartTrigger();
            this._running.push(t);
            return (t);
        };
        /**
         * Start a tween. Keeps the original safe and clones the object
         * @param obj object to be tweened
         * @param name name of the tween
         * @param loop if loops are enabled
         * @param loops number of times to loop
         * @param autoDestroy if is to auto destroy
         */
        TweenManager.prototype.startDirect = function (obj, tween, loop, loops, autoDestroy) {
            // deep clone the object to leave the original intact
            var curTween = Object.create(tween);
            if (loop) {
                curTween.loop = true;
                curTween.loopsRemaining = loops;
            }
            // set the auto destroy on completion
            curTween.autoDestroy = autoDestroy;
            // add the clone tween to the currently running array with the associated object
            var t = {
                tween: curTween,
                obj: obj
            };
            t.tween.onStartTrigger();
            this._running.push(t);
            return t;
        };
        /**
         * @param {string} name - Returns a deep cloned object of the requested tween
         */
        TweenManager.prototype.clone = function (name) {
            // retrieve the tween
            var tween = this.getTween(name);
            // if this is not a valid tween, return
            if (tween instanceof Tween.Tween == false) {
                return;
            }
            ;
            var clone = this.cloneObj(tween);
            return clone;
        };
        /**
         * Clones a tween object
         */
        TweenManager.prototype.cloneObj = function (obj) {
            if (!obj || (typeof obj != "object"))
                return obj;
            var clone = this.cloneEmptyObject(obj);
            this.copyObjectProps(obj, clone);
            return clone;
        };
        /**
         * Clone object properties
         */
        TweenManager.prototype.copyObjectProps = function (objFrom, objTo) {
            for (var i in objFrom) {
                if (!objFrom.hasOwnProperty(i))
                    continue;
                if (objFrom[i] instanceof Array) {
                    objTo[i] = [];
                    for (var n = 0; n < objFrom[i].length; n++) {
                        if (typeof objFrom[i][n] == "object" && objFrom[i][n] !== null) {
                            objTo[i][n] = this.cloneEmptyObject(objFrom[i][n]);
                            this.copyObjectProps(objFrom[i][n], objTo[i][n]);
                        }
                        else {
                            objTo[i][n] = objFrom[i][n];
                        }
                    }
                    continue;
                }
                if (this.isPlainObject(objFrom[i])) {
                    objTo[i] = {};
                    this.copyObjectProps(objFrom[i], objTo[i]);
                    continue;
                }
                objTo[i] = objFrom[i];
            }
        };
        /**
         * Call the object constructor, or initalise a new one
         */
        TweenManager.prototype.cloneEmptyObject = function (o) {
            return o.constructor ? new o.constructor() : {};
        };
        /**
         * Check on the object type
         */
        TweenManager.prototype.isPlainObject = function (o) {
            if (!o || !o.constructor)
                return false;
            return o.constructor === Object;
        };
        /**
         * Gets called every request frame update
         * If there are
         */
        TweenManager.prototype.update = function () {
            // put check if paused. If the running array is empty, set bool to false
            // only set this to true when a new tween is started (sleep mode)
            for (var i in this._running) {
                // if tween is not paused
                var tween = this._running[i].tween;
                var obj = this._running[i].obj;
                if (!tween.isPaused) {
                    tween.applyUpdate(obj);
                }
                else {
                    if (tween.deleteFlag) {
                        tween.onDestroyTrigger();
                        this._running.splice(parseInt(i), 1);
                    }
                    else {
                        tween.complete();
                    }
                }
            }
        };
        // TODO -- URGENT! This does not look or return tweens that are currently running
        /**
         * @param {string} name
         * @param {boolean} cached
         */
        TweenManager.prototype.remove = function (name, cached) {
            if (cached === void 0) { cached = false; }
            // look in both this._tweens and this._running for the tween
            var tween = this.getTween(name);
            // if tween creation failed, return
            if (tween instanceof Tween.Tween == false) {
                return;
            }
            ;
            // remove reference to this object
            tween = null;
        };
        /**
         * Return the tween by name
         * @param {string} name
         */
        TweenManager.prototype.getTween = function (name) {
            var flag = false;
            var index = null;
            // search the cached tweens array
            for (var i in this._tweens) {
                if (name === i) {
                    flag = true;
                    index = i;
                }
            }
            // search the currently running array
            for (var i in this._running) {
                if (name === i) {
                    flag = true;
                    index = i;
                }
            }
            // if tween has been found, return it, else throw error and return false
            if (!flag) {
                console.error('No tween with the name "' + name + '" found!');
                return false;
            }
            else {
                return this._tweens[index];
            }
        };
        /**
         * Shorter naming for retreiving a tween
         */
        TweenManager.prototype.find = function (name) {
            var tween = this.getTween(name);
            return tween || false;
        };
        Object.defineProperty(TweenManager.prototype, "easing", {
            /**
             * Provides access to Robert Penner's easing equations
             */
            get: function () {
                return this._easing;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TweenManager.prototype, "events", {
            /**
             * Give access to the events class
             */
            get: function () {
                return this._events;
            },
            enumerable: true,
            configurable: true
        });
        return TweenManager;
    }());
    Tween.TweenManager = TweenManager;
})(Tween || (Tween = {}));
/// <reference path="./../../reference.d.ts" />
var Lightening;
(function (Lightening) {
    var Signals;
    (function (Signals) {
        /**
         *	@desc       A TypeScript conversion of JS Signals by Miller Medeiros
        *               Released under the MIT license
        *				http://millermedeiros.github.com/js-signals/
        *
        *	@version	1.0 - 7th March 2013
        *
        *	@author 	Richard Davey, TypeScript conversion
        *	@author		Miller Medeiros, JS Signals
        *	@author		Robert Penner, AS Signals
        *
        *	@url		http://www.photonstorm.com
        */
        /**
         * Custom event broadcaster
         * <br />- inspired by Robert Penner's AS3 Signals.
         * @name Signal
         * @author Miller Medeiros
         * @constructor
         */
        var Signal = (function () {
            function Signal() {
                /**
                 * @property _bindings
                 * @type Array
                 * @private
                 */
                this._bindings = [];
                /**
                 * @property _prevParams
                 * @type Any
                 * @private
                 */
                this._prevParams = null;
                /**
                 * If Signal should keep record of previously dispatched parameters and
                 * automatically execute listener during `add()`/`addOnce()` if Signal was
                 * already dispatched before.
                 * @type boolean
                 */
                this.memorize = false;
                /**
                 * @type boolean
                 * @private
                 */
                this._shouldPropagate = true;
                /**
                 * If Signal is active and should broadcast events.
                 * <p><strong>IMPORTANT:</strong> Setting this property during a dispatch will only affect the next dispatch, if you want to stop the propagation of a signal use `halt()` instead.</p>
                 * @type boolean
                 */
                this.active = true;
            }
            /**
             * @method validateListener
             * @param {Any} listener
             * @param {Any} fnName
             */
            Signal.prototype.validateListener = function (listener, fnName) {
                if (typeof listener !== 'function') {
                    throw new Error('listener is a required param of {fn}() and should be a Function.'.replace('{fn}', fnName));
                }
            };
            /**
             * @param {Function} listener
             * @param {boolean} isOnce
             * @param {Object} [listenerContext]
             * @param {Number} [priority]
             * @return {SignalBinding}
             * @private
             */
            Signal.prototype._registerListener = function (listener, isOnce, listenerContext, priority) {
                var prevIndex = this._indexOfListener(listener, listenerContext);
                var binding;
                if (prevIndex !== -1) {
                    binding = this._bindings[prevIndex];
                    if (binding.isOnce() !== isOnce) {
                        throw new Error('You cannot add' + (isOnce ? '' : 'Once') + '() then add' + (!isOnce ? '' : 'Once') + '() the same listener without removing the relationship first.');
                    }
                }
                else {
                    binding = new Signals.SignalBinding(this, listener, isOnce, listenerContext, priority);
                    this._addBinding(binding);
                }
                if (this.memorize && this._prevParams) {
                    binding.execute(this._prevParams);
                }
                return binding;
            };
            /**
             * @method _addBinding
             * @param {SignalBinding} binding
             * @private
             */
            Signal.prototype._addBinding = function (binding) {
                //simplified insertion sort
                var n = this._bindings.length;
                do {
                    --n;
                } while (this._bindings[n] && binding.priority <= this._bindings[n].priority);
                this._bindings.splice(n + 1, 0, binding);
            };
            /**
             * @method _indexOfListener
             * @param {Function} listener
             * @return {number}
             * @private
             */
            Signal.prototype._indexOfListener = function (listener, context) {
                var n = this._bindings.length;
                var cur;
                while (n--) {
                    cur = this._bindings[n];
                    if (cur.getListener() === listener && cur.context === context) {
                        return n;
                    }
                }
                return -1;
            };
            /**
             * Check if listener was attached to Signal.
             * @param {Function} listener
             * @param {Object} [context]
             * @return {boolean} if Signal has the specified listener.
             */
            Signal.prototype.has = function (listener, context) {
                if (context === void 0) { context = null; }
                return this._indexOfListener(listener, context) !== -1;
            };
            /**
             * Add a listener to the signal.
             * @param {Function} listener Signal handler function.
             * @param {Object} [listenerContext] Context on which listener will be executed (object that should represent the `this` variable inside listener function).
             * @param {Number} [priority] The priority level of the event listener. Listeners with higher priority will be executed before listeners with lower priority. Listeners with same priority level will be executed at the same order as they were added. (default = 0)
             * @return {SignalBinding} An Object representing the binding between the Signal and listener.
             */
            Signal.prototype.add = function (listener, listenerContext, priority) {
                if (listenerContext === void 0) { listenerContext = null; }
                if (priority === void 0) { priority = 0; }
                this.validateListener(listener, 'add');
                return this._registerListener(listener, false, listenerContext, priority);
            };
            /**
             * Add listener to the signal that should be removed after first execution (will be executed only once).
             * @param {Function} listener Signal handler function.
             * @param {Object} [listenerContext] Context on which listener will be executed (object that should represent the `this` variable inside listener function).
             * @param {Number} [priority] The priority level of the event listener. Listeners with higher priority will be executed before listeners with lower priority. Listeners with same priority level will be executed at the same order as they were added. (default = 0)
             * @return {SignalBinding} An Object representing the binding between the Signal and listener.
             */
            Signal.prototype.addOnce = function (listener, listenerContext, priority) {
                if (listenerContext === void 0) { listenerContext = null; }
                if (priority === void 0) { priority = 0; }
                this.validateListener(listener, 'addOnce');
                return this._registerListener(listener, true, listenerContext, priority);
            };
            /**
             * Remove a single listener from the dispatch queue.
             * @param {Function} listener Handler function that should be removed.
             * @param {Object} [context] Execution context (since you can add the same handler multiple times if executing in a different context).
             * @return {Function} Listener handler function.
             */
            Signal.prototype.remove = function (listener, context) {
                if (context === void 0) { context = null; }
                this.validateListener(listener, 'remove');
                var i = this._indexOfListener(listener, context);
                if (i !== -1) {
                    this._bindings[i]._destroy(); //no reason to a SignalBinding exist if it isn't attached to a signal
                    this._bindings.splice(i, 1);
                }
                return listener;
            };
            /**
             * Remove all listeners from the Signal.
             */
            Signal.prototype.removeAll = function () {
                var n = this._bindings.length;
                while (n--) {
                    this._bindings[n]._destroy();
                }
                this._bindings.length = 0;
            };
            /**
             * @return {number} Number of listeners attached to the Signal.
             */
            Signal.prototype.getNumListeners = function () {
                return this._bindings.length;
            };
            /**
             * Stop propagation of the event, blocking the dispatch to next listeners on the queue.
             * <p><strong>IMPORTANT:</strong> should be called only during signal dispatch, calling it before/after dispatch won't affect signal broadcast.</p>
             * @see Signal.prototype.disable
             */
            Signal.prototype.halt = function () {
                this._shouldPropagate = false;
            };
            /**
             * Dispatch/Broadcast Signal to all listeners added to the queue.
             * @param {...*} [params] Parameters that should be passed to each handler.
             */
            Signal.prototype.dispatch = function () {
                var paramsArr = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    paramsArr[_i] = arguments[_i];
                }
                if (!this.active) {
                    return;
                }
                var n = this._bindings.length;
                var bindings;
                if (this.memorize) {
                    this._prevParams = paramsArr;
                }
                if (!n) {
                    //should come after memorize
                    return;
                }
                bindings = this._bindings.slice(0); //clone array in case add/remove items during dispatch
                this._shouldPropagate = true; //in case `halt` was called before dispatch or during the previous dispatch.
                //execute all callbacks until end of the list or until a callback returns `false` or stops propagation
                //reverse loop since listeners with higher priority will be added at the end of the list
                do {
                    n--;
                } while (bindings[n] && this._shouldPropagate && bindings[n].execute(paramsArr) !== false);
            };
            /**
             * Forget memorized arguments.
             * @see Signal.memorize
             */
            Signal.prototype.forget = function () {
                this._prevParams = null;
            };
            /**
             * Remove all bindings from signal and destroy any reference to external objects (destroy Signal object).
             * <p><strong>IMPORTANT:</strong> calling any method on the signal instance after calling dispose will throw errors.</p>
             */
            Signal.prototype.dispose = function () {
                this.removeAll();
                delete this._bindings;
                delete this._prevParams;
            };
            /**
             * @return {string} String representation of the object.
             */
            Signal.prototype.toString = function () {
                return '[Signal active:' + this.active + ' numListeners:' + this.getNumListeners() + ']';
            };
            return Signal;
        }());
        /**
         * Signals Version Number
         * @property VERSION
         * @type String
         * @const
         */
        Signal.VERSION = '1.0.0';
        Signals.Signal = Signal;
    })(Signals = Lightening.Signals || (Lightening.Signals = {}));
})(Lightening || (Lightening = {}));
/// <reference path="./../../reference.d.ts" />
var Lightening;
(function (Lightening) {
    var Signals;
    (function (Signals) {
        /*
        *	@desc   	An object that represents a binding between a Signal and a listener function.
        *               Released under the MIT license
        *				http://millermedeiros.github.com/js-signals/
        *
        *	@version	1.0 - 7th March 2013
        *
        *	@author 	Richard Davey, TypeScript conversion
        *	@author		Miller Medeiros, JS Signals
        *	@author		Robert Penner, AS Signals
        *
        *	@url		http://www.kiwijs.org
        *
        */
        var SignalBinding = (function () {
            /**
             * Object that represents a binding between a Signal and a listener function.
             * <br />- <strong>This is an internal constructor and shouldn't be called by regular users.</strong>
             * <br />- inspired by Joa Ebert AS3 SignalBinding and Robert Penner's Slot classes.
             * @author Miller Medeiros
             * @constructor
             * @internal
             * @name SignalBinding
             * @param {Signal} signal Reference to Signal object tha
             * listener is currently bound to.
             * @param {Function} listener Handler function bound to the signal.
             * @param {boolean} isOnce If binding should be executed just once.
             * @param {Object} [listenerContext] Context on which listener will be executed (object that should represent the `this` variable inside listener function).
             * @param {Number} [priority] The priority level of the event listener. (default = 0).
             */
            function SignalBinding(signal, listener, isOnce, listenerContext, priority) {
                if (priority === void 0) { priority = 0; }
                /**
                 * If binding is active and should be executed.
                 * @type boolean
                 */
                this.active = true;
                /**
                 * Default parameters passed to listener during `Signal.dispatch` and `SignalBinding.execute`. (curried parameters)
                 * @type Array|null
                 */
                this.params = null;
                this._listener = listener;
                this._isOnce = isOnce;
                this.context = listenerContext;
                this._signal = signal;
                this.priority = priority || 0;
            }
            /**
             * Call listener passing arbitrary parameters.
             * <p>If binding was added using `Signal.addOnce()` it will be automatically removed from signal dispatch queue, this method is used internally for the signal dispatch.</p>
             * @param {Array} [paramsArr] Array of parameters that should be passed to the listener
             * @return {*} Value returned by the listener.
             */
            SignalBinding.prototype.execute = function (paramsArr) {
                var handlerReturn;
                var params;
                if (this.active && !!this._listener) {
                    params = this.params ? this.params.concat(paramsArr) : paramsArr;
                    handlerReturn = this._listener.apply(this.context, params);
                    if (this._isOnce) {
                        this.detach();
                    }
                }
                return handlerReturn;
            };
            /**
             * Detach binding from signal.
             * - alias to: mySignal.remove(myBinding.getListener());
             * @return {Function|null} Handler function bound to the signal or `null` if binding was previously detached.
             */
            SignalBinding.prototype.detach = function () {
                return this.isBound() ? this._signal.remove(this._listener, this.context) : null;
            };
            /**
             * @return {Boolean} `true` if binding is still bound to the signal and have a listener.
             */
            SignalBinding.prototype.isBound = function () {
                return (!!this._signal && !!this._listener);
            };
            /**
             * @return {boolean} If SignalBinding will only be executed once.
             */
            SignalBinding.prototype.isOnce = function () {
                return this._isOnce;
            };
            /**
             * @return {Function} Handler function bound to the signal.
             */
            SignalBinding.prototype.getListener = function () {
                return this._listener;
            };
            /**
             * @return {Signal} Signal that listener is currently bound to.
             */
            SignalBinding.prototype.getSignal = function () {
                return this._signal;
            };
            /**
             * Delete instance properties
             * @private
             */
            SignalBinding.prototype._destroy = function () {
                delete this._signal;
                delete this._listener;
                delete this.context;
            };
            /**
             * @return {string} String representation of the object.
             */
            SignalBinding.prototype.toString = function () {
                return '[SignalBinding isOnce:' + this._isOnce + ', isBound:' + this.isBound() + ', active:' + this.active + ']';
            };
            return SignalBinding;
        }());
        Signals.SignalBinding = SignalBinding;
    })(Signals = Lightening.Signals || (Lightening.Signals = {}));
})(Lightening || (Lightening = {}));
/// <reference path="./../../reference.d.ts" />
var Lightening;
(function (Lightening) {
    var Signals;
    (function (Signals) {
        /**
         * Signal Manager class for storing, manipulating and general management of signals throughout the game
         */
        var SignalManager = (function () {
            /**
             * signal manager constructor
             * @param game
             */
            function SignalManager(game) {
                this.game = game;
                this._signals = {};
            }
            SignalManager.prototype.getInsatance = function () {
            };
            /**
             * create a new signal
             * @param str
             * @returns {any}
             */
            SignalManager.prototype.create = function (str) {
                try {
                    this._signals[str] = new Signals.Signal();
                    return this._signals[str];
                }
                catch (e) {
                    console.error(e.message);
                    return null;
                }
            };
            /**
             * add a function to the signal to fire on dispatch
             * @param str
             * @param fnct
             * @param listenerContext? = null
             */
            SignalManager.prototype.add = function (str, fnct, listenerContext) {
                if (listenerContext === void 0) { listenerContext = null; }
                try {
                    var s = this.signal(str);
                    this.signal(str).add(fnct, listenerContext);
                }
                catch (e) {
                    console.error(e.message);
                }
            };
            /**
             * add a function to the signal to fire only once on dispatch, then automatically destroy the function
             * @param str
             * @param fnct
             */
            SignalManager.prototype.addOnce = function (str, fnct) {
                try {
                    this.signal(str).addOnce(fnct);
                }
                catch (e) {
                    console.error(e.message);
                }
            };
            /**
             * destroy the entire signal
             * @param str
             */
            SignalManager.prototype.destroy = function (str) {
                try {
                    var s = this.signal(str);
                    s = null;
                }
                catch (e) {
                    console.error(e.message);
                }
            };
            /**
             * set the state of the signal (active, inactive)
             * @param str
             * @param val
             */
            SignalManager.prototype.active = function (str, val) {
                try {
                    this.signal(str).active = val;
                }
                catch (e) {
                    console.error(e.message);
                }
            };
            /**
             * dispatch a signal with all the parameters
             * @param str
             * @param params
             */
            SignalManager.prototype.dispatch = function (str) {
                var params = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    params[_i - 1] = arguments[_i];
                }
                try {
                    this.signal(str).dispatch(params);
                }
                catch (e) {
                    console.error(e.message);
                }
            };
            /**
             * return a signal
             * @param str
             * @returns {any}
             */
            SignalManager.prototype.signal = function (str) {
                for (var i in this._signals) {
                    if (i === str) {
                        return this._signals[i];
                    }
                }
                console.error('No signal exists with the key "' + str + '"');
            };
            /**
             * check if signal is already created
             * @param name
             * @return boolean
             */
            SignalManager.prototype.has = function (name) {
                return this._signals[name] !== undefined;
            };
            return SignalManager;
        }());
        Signals.SignalManager = SignalManager;
    })(Signals = Lightening.Signals || (Lightening.Signals = {}));
})(Lightening || (Lightening = {}));
/// <reference path="./../reference.d.ts" />
var Lightening;
(function (Lightening) {
    var States;
    (function (States) {
        var BootState = (function (_super) {
            __extends(BootState, _super);
            function BootState(game) {
                return _super.call(this, game) || this;
            }
            BootState.prototype.init = function (params) {
                this.create();
            };
            BootState.prototype.create = function () {
                this.game.renderer.backgroundColor = Lightening.Utils.Colours.BG;
                new States.PreloadState(this.game);
            };
            BootState.prototype.update = function () {
                console.log('update boot');
            };
            return BootState;
        }(Lightening.State));
        States.BootState = BootState;
    })(States = Lightening.States || (Lightening.States = {}));
})(Lightening || (Lightening = {}));
/// <reference path="./../reference.d.ts" />
var Lightening;
(function (Lightening) {
    var States;
    (function (States) {
        var GameState = (function (_super) {
            __extends(GameState, _super);
            function GameState(game) {
                var _this = _super.call(this, game) || this;
                _this.RADIANS = Math.PI / 180;
                _this.DEGREES = 180 / Math.PI;
                _this._bodies = [];
                _this._actors = [];
                _this.hitTest = function (x1, y1, w1, h1, x2, y2, w2, h2) {
                    if (x1 + w1 > x2)
                        if (x1 < x2 + w2)
                            if (y1 + h1 > y2)
                                if (y1 < y2 + h2)
                                    return true;
                    return false;
                };
                return _this;
            }
            GameState.prototype.init = function (params) {
                this.world = new Box2D.Dynamics.b2World(new Box2D.Common.Math.b2Vec2(0, 10), true);
                var polyFixture = new Box2D.Dynamics.b2FixtureDef();
                polyFixture.shape = new Box2D.Collision.Shapes.b2PolygonShape();
                polyFixture.density = 1;
                var circleFixture = new Box2D.Dynamics.b2FixtureDef();
                circleFixture.shape = new Box2D.Collision.Shapes.b2CircleShape();
                circleFixture.density = 1;
                circleFixture.restitution = 0.7;
                var bodyDef = new Box2D.Dynamics.b2BodyDef();
                bodyDef.type = Box2D.Dynamics.b2Body.b2_staticBody;
                //down
                polyFixture.shape.SetAsBox(10, 1);
                bodyDef.position.Set(9, this.game.height / 100 + 1);
                this.world.CreateBody(bodyDef).CreateFixture(polyFixture);
                //left
                polyFixture.shape.SetAsBox(1, 100);
                bodyDef.position.Set(-1, 0);
                this.world.CreateBody(bodyDef).CreateFixture(polyFixture);
                //right
                bodyDef.position.Set(this.game.height / 100 + 1, 0);
                this.world.CreateBody(bodyDef).CreateFixture(polyFixture);
                bodyDef.type = Box2D.Dynamics.b2Body.b2_dynamicBody;
                for (var i = 0; i < 40; i++) {
                    bodyDef.position.Set(this.rndRange(0, this.game.width) / 100, -this.rndRange(50, 5000) / 100);
                    var body = this.world.CreateBody(bodyDef);
                    var s;
                    if (Math.random() > 0.5) {
                        s = this.rndRange(70, 100);
                        circleFixture.shape.SetRadius(s / 2 / 100);
                        body.CreateFixture(circleFixture);
                        this._bodies.push(body);
                        var ball = new PIXI.Sprite(PIXI.Texture.fromImage("assets/ball.png"));
                        this.addChild(ball);
                        ball['i'] = i;
                        ball.anchor.x = ball.anchor.y = 0.5;
                        ball.scale.x = ball.scale.y = s / 100;
                        this._actors[this._actors.length] = ball;
                    }
                    else {
                        s = this.rndRange(50, 100);
                        polyFixture.shape.SetAsBox(s / 2 / 100, s / 2 / 100);
                        body.CreateFixture(polyFixture);
                        this._bodies.push(body);
                        var box = new PIXI.Sprite(PIXI.Texture.fromImage("assets/box.jpg"));
                        this.addChild(box);
                        box['i'] = i;
                        box.anchor.x = box.anchor.y = 0.5;
                        box.scale.x = s / 100;
                        box.scale.y = s / 100;
                        this._actors[this._actors.length] = box;
                    }
                }
            };
            GameState.prototype.rndRange = function (min, max) {
                return min + (Math.random() * (max - min));
            };
            GameState.prototype.rndIntRange = function (min, max) {
                return Math.round(this.rndRange(min, max));
            };
            GameState.prototype.toRadians = function (degrees) {
                return degrees * this.RADIANS;
            };
            GameState.prototype.toDegrees = function (radians) {
                return radians * this.DEGREES;
            };
            GameState.prototype.create = function () {
            };
            GameState.prototype.update = function () {
                this.world.Step(1 / 60, 3, 3);
                this.world.ClearForces();
                var n = this._actors.length;
                for (var i = 0; i < n; i++) {
                    var body = this._bodies[i];
                    var actor = this._actors[i];
                    var position = body.GetPosition();
                    actor.position.x = position.x * 100;
                    actor.position.y = position.y * 100;
                    actor.rotation = body.GetAngle();
                }
            };
            return GameState;
        }(Lightening.State));
        States.GameState = GameState;
    })(States = Lightening.States || (Lightening.States = {}));
})(Lightening || (Lightening = {}));
/// <reference path="./../reference.d.ts" />
var Lightening;
(function (Lightening) {
    var States;
    (function (States) {
        var PreloadState = (function (_super) {
            __extends(PreloadState, _super);
            function PreloadState(game) {
                return _super.call(this, game) || this;
            }
            PreloadState.prototype.init = function (params) {
                this.create();
            };
            /**
             * Create function
             */
            PreloadState.prototype.create = function () {
                var _this = this;
                this.game.signals.create('preloadComplete');
                this.game.signals.add('preloadComplete', function () {
                    _this.game.startState(States.GameState);
                });
                // setup the loader
                var loader = new PIXI.loaders.Loader();
                loader.on('error', this.error, this);
                loader.on('load', this.load, this);
                loader.once('complete', this.complete, this);
                // add all your assets here
                loader.add('assets/ball.png');
                loader.add('assets/box.jpg');
                // start the loader
                loader.load();
            };
            /**
             * Called if the loader produces an error
             */
            PreloadState.prototype.error = function (err) {
                console.log(err);
            };
            /**
             * Called when a single file has completed loading
             */
            PreloadState.prototype.load = function (loader, resource) {
                // get the name of the loaded asset
                var file = resource.name;
                // remove the directory if you wish
                file = file.replace(/^.*[\\\/]/, '');
                var progress = resource.progressChunk;
                console.log('File:', file, 'loaded. Progress:', progress);
            };
            /**
             * Called when the loader has finished loading everything
             */
            PreloadState.prototype.complete = function () {
                this.game.signals.dispatch('preloadComplete', {});
            };
            return PreloadState;
        }(Lightening.State));
        States.PreloadState = PreloadState;
    })(States = Lightening.States || (Lightening.States = {}));
})(Lightening || (Lightening = {}));
/// <reference path="./../reference.d.ts" />
var Lightening;
(function (Lightening) {
    var Utils;
    (function (Utils) {
        var Colours;
        (function (Colours) {
            Colours.DARK = 0x161520;
            Colours.BG = 0x222232;
            Colours.MEDIUM = 0x565691;
            Colours.LIGHTBLUE = 0xAEDEDB;
            Colours.GOLD = 0xF0D66F;
            Colours.DIAMOND = 0x3BB0DD;
            Colours.ORANGE = 0xF04F50;
            Colours.WHITE = 0xFFFFFF;
        })(Colours = Utils.Colours || (Utils.Colours = {}));
    })(Utils = Lightening.Utils || (Lightening.Utils = {}));
})(Lightening || (Lightening = {}));
/// <reference path="./reference.d.ts" />
var app;
(function (app_1) {
    var app = (function () {
        function app() {
            this.game = new Lightening.Engine(window.innerWidth, window.innerHeight);
            this.game.startState(Lightening.States.PreloadState);
        }
        return app;
    }());
    app_1.app = app;
})(app || (app = {}));
new app.app();
