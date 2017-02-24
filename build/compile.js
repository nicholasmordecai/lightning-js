var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="./../reference.d.ts" />
var Lightning;
(function (Lightning) {
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
        State.prototype.add = function () {
            var params = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                params[_i] = arguments[_i];
            }
            for (var _a = 0, params_1 = params; _a < params_1.length; _a++) {
                var i = params_1[_a];
                this.addChild(i);
            }
        };
        return State;
    }(PIXI.Container));
    Lightning.State = State;
})(Lightning || (Lightning = {}));
/// <reference path="./../reference.d.ts" />
var Lightning;
(function (Lightning) {
    /**
     * @description function for calculating scaling fonts
     *
     * @param {Object} game reference to the Engine instance
     * @param {number} size size of the font (in responsive pixels)
     * @param {string} font name of the font stored in resource cache
     *
     * @returns {string} concatinated string to pass directly to the PIXI.extras.BitmapText
     */
    function calcFont(game, size, font) {
        var str = ((game.width) / size).toString() + 'px ' + font;
        return str;
    }
    Lightning.calcFont = calcFont;
})(Lightning || (Lightning = {}));
/// <reference path="./../reference.d.ts" />
var Lightning;
(function (Lightning) {
    var Maths = (function () {
        function Maths() {
        }
        /**
         * @description generate a random integer between two values
         * @param  {number} from
         * @param  {number} to
         */
        Maths.rngInt = function (from, to) {
            return Math.floor(Math.random() * (to - from) + from);
        };
        /**
         * @description generate a random number
         *
         * @param  {boolean=false} negative
         */
        Maths.rng = function (negative) {
            if (negative === void 0) { negative = false; }
            if (negative) {
                return Math.random();
            }
            else {
                return -Math.random();
            }
        };
        /**
         * @description generate a random float between two values
         *
         * @param  {number} from
         * @param  {number} to
         */
        Maths.rngFloat = function (from, to) {
            return Math.random() * (to - from) + from;
        };
        /**
         * To Implement
         * random between two positions
         */
        Maths.rndPos = function () {
        };
        return Maths;
    }());
    Lightning.Maths = Maths;
})(Lightning || (Lightning = {}));
2;
/// <reference path="./../reference.d.ts" />
var Lightning;
(function (Lightning) {
    var DisplayObject = (function (_super) {
        __extends(DisplayObject, _super);
        function DisplayObject() {
            return _super.call(this) || this;
        }
        return DisplayObject;
    }(PIXI.DisplayObject));
    Lightning.DisplayObject = DisplayObject;
})(Lightning || (Lightning = {}));
/// <reference path="./../reference.d.ts" />
var Lightning;
(function (Lightning) {
    var Texture = (function (_super) {
        __extends(Texture, _super);
        function Texture() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Texture;
    }(PIXI.Texture));
    Lightning.Texture = Texture;
})(Lightning || (Lightning = {}));
/// <reference path="./../reference.d.ts" />
var Lightning;
(function (Lightning) {
    var Graphics = (function (_super) {
        __extends(Graphics, _super);
        function Graphics() {
            return _super.call(this) || this;
        }
        /**
         * @param  {} ...displayObjects
         */
        Graphics.prototype.add = function () {
            var displayObjects = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                displayObjects[_i] = arguments[_i];
            }
            for (var i = 0; i < displayObjects.length - 1; i++) {
                this.addChild(displayObjects[i]);
            }
        };
        return Graphics;
    }(PIXI.Graphics));
    Lightning.Graphics = Graphics;
})(Lightning || (Lightning = {}));
/// <reference path="./../reference.d.ts" />
var Lightning;
(function (Lightning) {
    var Sprite = (function (_super) {
        __extends(Sprite, _super);
        /**
         * @param  {PIXI.Texture=null} texture
         */
        function Sprite(texture) {
            if (texture === void 0) { texture = null; }
            return _super.call(this, texture) || this;
        }
        /**
         * @param  {boolean} val
         */
        Sprite.prototype.enableBody = function (val) {
            if (val) {
            }
        };
        /**
         * @param  {number} aX
         * @param  {number=aX} aY
         * @returns void
         */
        Sprite.prototype.setAnchor = function (aX, aY) {
            if (aY === void 0) { aY = aX; }
            this.anchor = new PIXI.Point(aX, aY);
        };
        /**
         * @param  {number} aX
         * @param  {number=aX} aY
         * @returns void
         */
        Sprite.prototype.setScale = function (aX, aY) {
            if (aY === void 0) { aY = aX; }
            this.scale = new PIXI.Point(aX, aY);
        };
        Object.defineProperty(Sprite.prototype, "body", {
            /**
             * @returns Box2D
             */
            get: function () {
                return this._body;
            },
            /**
             * @param  {Box2D.Dynamics.b2Body} body
             */
            set: function (body) {
                this._body = body;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @param  {} ...displayObjects
         */
        Sprite.prototype.add = function () {
            var displayObjects = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                displayObjects[_i] = arguments[_i];
            }
            for (var i = 0; i < displayObjects.length - 1; i++) {
                this.addChild(displayObjects[i]);
            }
        };
        Sprite.prototype.enableDrag = function (respectPosition) {
            var _this = this;
            if (respectPosition === void 0) { respectPosition = false; }
            this._respectPosition = respectPosition;
            // check to see if interaction is already enabled
            if (this.interactive === false) {
                this.interactive = true;
            }
            this.on('mousedown', function (e) {
                _this.startDrag(e);
            });
            this.on('touchstart', function (e) {
                _this.startDrag(e);
            });
            this.on('mouseup', function (e) {
                _this.stopDrag(e);
            });
            this.on('touchend', function (e) {
                _this.stopDrag(e);
            });
            /**
             * need to think about handling pointer events
             */
        };
        Sprite.prototype.startDrag = function (event) {
            if (this._respectPosition) {
                var rpx = event.data.global.x * window.devicePixelRatio - this.position.x;
                var rpy = event.data.global.y * window.devicePixelRatio - this.position.y;
                this._respectPositionValues = { x: rpx, y: rpy };
            }
            else {
                this._respectPositionValues = { x: 0, y: 0 };
            }
            this.on('mousemove', this.onDrag);
            this.on('touchmove', this.onDrag);
        };
        Sprite.prototype.stopDrag = function (event) {
            this.removeListener('mousemove', this.onDrag);
            this.removeListener('touchmove', this.onDrag);
        };
        Sprite.prototype.onDrag = function (event) {
            this.position = new PIXI.Point((event.data.global.x * window.devicePixelRatio) - this._respectPositionValues.x, (event.data.global.y * window.devicePixelRatio) - this._respectPositionValues.y);
        };
        return Sprite;
    }(PIXI.Sprite));
    Lightning.Sprite = Sprite;
})(Lightning || (Lightning = {}));
/// <reference path="./../reference.d.ts" />
/**
 * Notes: Need to add a shaddow parameter and function.
 * This should allow the user to set parameters such is
 *
 * make a button class that has multiple states for quick dev
 */
var Lightning;
(function (Lightning) {
    var Geometry;
    (function (Geometry) {
        /**
         * @description Draw a square
         *
         * @param {number} d dimension of the square in pixels
         *
         * @returns {Lightning.Graphics}
         */
        function Square(d) {
            var graphics = new PIXI.Graphics();
            graphics.beginFill(0xffffff, 1);
            graphics.drawRect(0, 0, d, d);
            graphics.endFill();
            return graphics;
        }
        Geometry.Square = Square;
        /**
         * @description Draw a rectangle
         *
         * @param {number} w width of the rectangle in pixels
         * @param {number} h height of the rectangle in pixels
         *
         * @returns {Lightning.Graphics}
         */
        function Rect(w, h) {
            var graphics = new PIXI.Graphics();
            graphics.beginFill(0xffffff, 1);
            graphics.drawRect(0, 0, w, h);
            graphics.endFill();
            return graphics;
        }
        Geometry.Rect = Rect;
        /**
         * @description Draw a Star (double square)
         *
         * @param {number} w width of the rectangle in pixels
         * @param {number} h height of the rectangle in pixels
         *
         * @returns {Lightning.Graphics}
         */
        function Star(w, h) {
            var graphics = new PIXI.Graphics();
            graphics.beginFill(0xffffff, 1);
            graphics.drawRect(0, 0, w, h);
            graphics.endFill();
            return graphics;
        }
        Geometry.Star = Star;
        /**
         * @description Draw a 3d rectangle
         *
         * @param {number} w width of the rectangle in pixels
         * @param {number} h height of the rectangle in pixels
         * @param {number} d depth of rectangle in pixels
         *
         * @returns {Lightning.Graphics}
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
        Geometry.Rect3D = Rect3D;
        /**
         * @description Draw a circle
         *
         * @param {number} r Radius of the circle in pixels
         *
         * @returns {Lightning.Graphics}
         */
        function Circle(r) {
            var graphics = new PIXI.Graphics();
            graphics.beginFill(0xffffff, 1);
            graphics.arc(75, 75, r, 0, Math.PI * 2, false);
            graphics.endFill();
            return graphics;
        }
        Geometry.Circle = Circle;
        /**
         * @description Draw a Triangle
         *
         * @param {number} l1 Length of the first triangle side
         * @param {number} l2 Length of the second triangle side
         *
         * @returns {Lightning.Graphics}
         */
        function Triangle(l1, l2) {
            if (l2 === void 0) { l2 = l1; }
            var graphics = new PIXI.Graphics();
            graphics.beginFill(0xffffff, 1);
            graphics.moveTo(l1 * 0.5, 0);
            graphics.lineTo(l2, l1);
            graphics.lineTo(0, l1);
            graphics.lineTo(l1 * 0.5, 0);
            graphics.endFill();
            return graphics;
        }
        Geometry.Triangle = Triangle;
    })(Geometry = Lightning.Geometry || (Lightning.Geometry = {}));
})(Lightning || (Lightning = {}));
/// <reference path="./../reference.d.ts" />
var Lightning;
(function (Lightning) {
    var HitArea = (function (_super) {
        __extends(HitArea, _super);
        /**
         *
         * @param game
         * @returns {HitArea}
         */
        function HitArea(game, width, height) {
            var _this = _super.call(this) || this;
            _this._debug = false;
            _this.game = game;
            _this.interactive = true;
            _this.alpha = 0.2;
            // check if the hitAreaDebug signal exists, if not then create it.
            // then add the debug function to that signal.
            if (_this.game.signals.has('hitAreaDebug')) {
                _this.game.signals.add('hitAreaDebug', _this.debug, _this);
            }
            else {
                _this.game.signals.create('hitAreaDebug');
                _this.game.signals.add('hitAreaDebug', _this.debug, _this);
            }
            _this.beginFill(0xffffff, 1);
            _this.drawRect(0, 0, width, height);
            _this.endFill();
            return _this;
        }
        HitArea.prototype.setRect = function (width, height) {
        };
        HitArea.prototype.setCircle = function (radius) {
        };
        /**
         * @description Pass a function to be added to the click events
         * @param fnct
         */
        HitArea.prototype.onClick = function (fnct) {
            this.on('click', fnct);
        };
        /**
         * @description Pass a function to be added to the mouse, pointer and touch down events
         * @param fnct
         */
        HitArea.prototype.down = function (fnct) {
            this.on('mousedown', fnct);
            this.on('touchend', fnct);
            if (this['pointertap'] !== undefined) {
                this.on('pointertap', fnct);
            }
            if (this['pointerdown'] !== undefined) {
                this.on('pointerdown', fnct);
            }
        };
        /**
         * @description Pass a function to be added to the mouse, touch and pointer up events
         * @param fnct
         */
        HitArea.prototype.up = function (fnct) {
            this.on('mouseup', fnct);
            this.on('touchend', fnct);
            if (this['pointerup'] !== undefined) {
                this.on('pointerup', fnct);
            }
        };
        /**
         * @description Pass a function to be added to the mouse, pointer and touch up outside events
         * @param fnct
         */
        HitArea.prototype.upOutside = function (fnct) {
            this.on('mouseupoutside', fnct);
            this.on('touchendoutside', fnct);
            if (this['pointerupoutside'] !== undefined) {
                this.on('pointerupoutside', fnct);
            }
        };
        /**
         * @description Pass a function to be added to the mouse and pointer over events
         * @param fnct
         */
        HitArea.prototype.over = function (fnct) {
            this.on('mouseover', fnct);
            if (this['pointerover'] !== undefined) {
                this.on('pointerover', fnct);
            }
        };
        /**
         * @description Pass a function to be added to the mouse and pointer out events
         * @param fnct
         */
        HitArea.prototype.out = function (fnct) {
            this.on('mouseout', fnct);
            if (this['pointerout'] !== undefined) {
                this.on('pointerout', fnct);
            }
        };
        /**
         * @description Pass a function to be added to the mouse and pointer move event
         * @param fnct
         */
        HitArea.prototype.move = function (fnct) {
            this.on('mousemove', fnct);
            if (this['pointermove'] !== undefined) {
                this.on('pointermove', fnct);
            }
        };
        /**
         * @description Pass a function to be added to the right click events
         * @param fnct
         */
        HitArea.prototype.rightClick = function (fnct) {
            this.on('rightclick', fnct);
        };
        /**
         * @description Pass a function to be added to the right down events
         * @param fnct
         */
        HitArea.prototype.rightDown = function (fnct) {
            this.on('rightdown', fnct);
        };
        /**
         * @description Pass a function to be added to the right up events
         * @param fnct
         */
        HitArea.prototype.rightUp = function (fnct) {
            this.on('rightup', fnct);
        };
        /**
         * @description Pass a function to be added to the right up outside events
         * @param fnct
         */
        HitArea.prototype.rightUpOutside = function (fnct) {
            this.on('rightupoutside', fnct);
        };
        /**
         * @description Pass a function to be added to the tap event
         *
         * @param fnct
         */
        HitArea.prototype.onTap = function (fnct) {
            this.on('tap', fnct);
        };
        /**
         * @description Sets the debug enabled / disabled and the alpha to 0.5 accordingly
         *
         * @param {Array} data passed in from the signal dispatch event
         */
        HitArea.prototype.debug = function (data) {
            /**
             * data [0] = true / false - debug mode enabled
             */
            if (data[0]) {
                this._debug = true;
                this.alpha = 0.5;
            }
            else {
                this._debug = false;
                this.alpha = 0;
            }
        };
        return HitArea;
    }(Lightning.Graphics));
    Lightning.HitArea = HitArea;
})(Lightning || (Lightning = {}));
/// <reference path="./../reference.d.ts" />
var Lightning;
(function (Lightning) {
    var Button = (function (_super) {
        __extends(Button, _super);
        /**
         * @param  {Engine} game
         * @param  {} texture=null
         */
        function Button(game, texture) {
            if (texture === void 0) { texture = null; }
            var _this = _super.call(this, texture) || this;
            _this._primitive = null;
            _this.game = game;
            _this.initalise();
            return _this;
        }
        /**
         */
        Button.prototype.initalise = function () {
            this.interactive = true;
            this._hitArea = new Lightning.HitArea(this.game, this.texture.width, this.texture.height);
            this.addChild(this._hitArea);
        };
        /**
         * @param  {number} aX
         * @param  {number=null} aY
         * @returns void
         */
        Button.prototype.setAnchor = function (aX, aY) {
            if (aY === void 0) { aY = aX; }
            this.anchor = new PIXI.Point(aX, aY);
            this._hitArea.x -= this.width * aX;
            this._hitArea.y -= this.height * aY;
        };
        Object.defineProperty(Button.prototype, "hit", {
            /**
             * @returns HitArea
             */
            get: function () {
                return this._hitArea;
            },
            enumerable: true,
            configurable: true
        });
        return Button;
    }(Lightning.Sprite));
    Lightning.Button = Button;
})(Lightning || (Lightning = {}));
/// <reference path="./../reference.d.ts" />
var Lightning;
(function (Lightning) {
    var Group = (function (_super) {
        __extends(Group, _super);
        function Group() {
            return _super.call(this) || this;
        }
        /**
         * @param  {} ...displayObjects
         */
        Group.prototype.add = function () {
            var displayObjects = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                displayObjects[_i] = arguments[_i];
            }
            for (var i = 0; i < displayObjects.length - 1; i++) {
                this.addChild(displayObjects[i]);
            }
        };
        return Group;
    }(PIXI.Container));
    Lightning.Group = Group;
})(Lightning || (Lightning = {}));
/// <reference path="./../reference.d.ts" />
var Lightning;
(function (Lightning) {
    var Particle = (function (_super) {
        __extends(Particle, _super);
        function Particle(texture, emitter) {
            var _this = _super.call(this, texture) || this;
            _this._velX = 0;
            _this._velY = 0;
            _this._gX = 0;
            _this._gY = 0;
            _this._alphaIncrement = null;
            _this._rotationIncrement = null;
            _this._scaleIncrement = null;
            _this._createdAt = null;
            _this._lifeSpan = null;
            _this._deadTime = null;
            _this._emitter = emitter;
            _this.setAnchor(0.5);
            return _this;
        }
        Particle.prototype.update = function () {
            if (this._deadTime <= Date.now()) {
                this._emitter.returnToPool(this);
                this.alpha = 1;
                this.scale = new PIXI.Point(1, 1);
                this.rotation = 0;
                this._deadTime = null;
                this._createdAt = null;
                this._lifeSpan = null;
            }
            // update velocity (from gravity)
            this._velX += this._gX;
            this._velY += this._gY;
            // update position
            this.x += this._velX;
            this.y += this._velY;
            // increment alpha
            if (this._alphaIncrement) {
                this.alpha += this._alphaIncrement;
            }
            // increment rotation
            if (this._rotationIncrement) {
                this.rotation += this._rotationIncrement;
            }
            // increment scale
            if (this._scaleIncrement) {
                this.setScale(this.scale.x + this._scaleIncrement.x, this.scale.y + this._scaleIncrement.y);
            }
        };
        Object.defineProperty(Particle.prototype, "velocity", {
            set: function (velocity) {
                this._velX = velocity.x;
                this._velY = velocity.y;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Particle.prototype, "gravity", {
            set: function (gravity) {
                this._gX = gravity.x;
                this._gY = gravity.y;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Particle.prototype, "lifeSpan", {
            set: function (time) {
                this._lifeSpan = time;
                this._deadTime = this._lifeSpan + Date.now();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Particle.prototype, "alphaIncrement", {
            set: function (val) {
                this._alphaIncrement = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Particle.prototype, "rotationIncrement", {
            set: function (val) {
                this._rotationIncrement = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Particle.prototype, "scaleIncrement", {
            set: function (scale) {
                this._scaleIncrement = { x: scale.x, y: scale.y };
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Particle.prototype, "createdAt", {
            set: function (val) {
                this._createdAt = val;
            },
            enumerable: true,
            configurable: true
        });
        return Particle;
    }(Lightning.Sprite));
    Lightning.Particle = Particle;
})(Lightning || (Lightning = {}));
/// <reference path="./../reference.d.ts" />
var Lightning;
(function (Lightning) {
    var ParticleEmitter = (function (_super) {
        __extends(ParticleEmitter, _super);
        function ParticleEmitter(state, x, y) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            var _this = _super.call(this) || this;
            _this._emit = false;
            _this._nextEmit = null;
            _this._interval = 500;
            _this._lastStart = null;
            _this._time = null;
            _this._textures = [];
            _this._deadPool = [];
            _this._gravity = { x: 0, y: 0.2 };
            _this._spread = { xFrom: -2, xTo: 2, yFrom: -2, yTo: 2 };
            _this._lifeSpanRange = { from: 3000, to: 3000 };
            _this._particleStrength = 1;
            _this._particleScaleRange = { xFrom: 0.7, xTo: 1, yFrom: 0.7, yTo: 1 };
            _this._particleAlphaRange = { from: 1, to: 1 };
            _this._particleRotationRange = { from: 0, to: 1.9 };
            _this._particleVelocityRange = { xFrom: -1, xTo: 1, yFrom: -4, yTo: -6 };
            _this._particleRotationIncrement = { from: 0, to: 0 };
            _this._particleScaleIncrement = { xFrom: 0, xTo: 0, yFrom: 0, yTo: 0 };
            _this._particleAlphaIncrement = { from: 0, to: 0 };
            _this.state = state;
            _this.x = x;
            _this.y = y;
            return _this;
        }
        ParticleEmitter.prototype.update = function () {
            for (var _i = 0, _a = this.children; _i < _a.length; _i++) {
                var i = _a[_i];
                i['update']();
            }
            if (this._time !== null && Date.now() > this._lastStart + this._time) {
                this.stop();
                return;
            }
            if (this._emit && this._nextEmit < Date.now()) {
                this._nextEmit = Date.now() + this._interval;
                this.fireEmitter();
            }
        };
        /**
         * @param  {string} key
         * @param  {DisplayObject} particle
         */
        ParticleEmitter.prototype.add = function () {
            var params = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                params[_i] = arguments[_i];
            }
            for (var _a = 0, params_2 = params; _a < params_2.length; _a++) {
                var i = params_2[_a];
                this._textures.push(i);
            }
        };
        ParticleEmitter.prototype.start = function (time) {
            if (time === void 0) { time = null; }
            if (time === 0) {
                this.fireEmitter();
            }
            else {
                this._emit = true;
                this._time = time;
                this._lastStart = Date.now();
            }
        };
        ParticleEmitter.prototype.fireEmitter = function () {
            if (this._particleStrength === 1) {
                this.createParticle();
            }
            else {
                for (var i = 0; i < this._particleStrength; i++) {
                    this.createParticle();
                }
            }
        };
        ParticleEmitter.prototype.createParticle = function () {
            // get the texture from the textures array
            var texture = this._textures[Math.floor(Math.random() * this._textures.length)];
            var particle = null;
            // create new particle
            if (this._deadPool.length > 0) {
                particle = this._deadPool.splice(0, 1)[0];
            }
            else {
                // increment the id hash value to create the particle
                particle = new Lightning.Particle(texture, this);
            }
            // set gravity
            particle.gravity = (this._gravity);
            // calculate positions
            var x = Lightning.Maths.rngInt(this._spread.xFrom, this._spread.xTo);
            var y = Lightning.Maths.rngInt(this._spread.yFrom, this._spread.yTo);
            particle.x = x;
            particle.y = y;
            // calculate random velocity ranges
            var rndVelX = Lightning.Maths.rngFloat(this._particleVelocityRange.xFrom, this._particleVelocityRange.xTo);
            var rndVelY = Lightning.Maths.rngFloat(this._particleVelocityRange.yFrom, this._particleVelocityRange.yTo);
            particle.velocity = ({ x: rndVelX, y: rndVelY });
            // calculate random life span
            var rndLifeSpan = Lightning.Maths.rngInt(this._lifeSpanRange.to, this._lifeSpanRange.from);
            particle.lifeSpan = rndLifeSpan;
            // calculate alpha
            if (this._particleAlphaRange) {
                var alpha = Lightning.Maths.rngFloat(this._particleAlphaRange.from, this._particleAlphaRange.to);
                particle.alpha = alpha;
            }
            // calculate scale
            if (this._particleScaleRange) {
                var scaleX = Lightning.Maths.rngFloat(this._particleScaleRange.xFrom, this._particleScaleRange.xTo);
                // commented this out because of undesiered effects
                // let scaleY:number = Maths.rngFloat(this._particleScaleRange.yFrom, this._particleScaleRange.yTo);
                particle.setScale(scaleX, scaleX);
            }
            // calculate rotation
            if (this._particleRotationRange) {
                var rotation = Lightning.Maths.rngFloat(this._particleRotationRange.from, this._particleRotationRange.to);
                particle.rotation = rotation;
            }
            // calculate rotation increment
            if (this._particleRotationIncrement) {
                var rotationIncrement = Lightning.Maths.rngFloat(this._particleRotationIncrement.from, this._particleRotationIncrement.to);
                particle.rotationIncrement = rotationIncrement;
            }
            // calculate alpha increment
            if (this._particleAlphaIncrement) {
                var alphaIncrement = Lightning.Maths.rngFloat(this._particleAlphaIncrement.from, this._particleAlphaIncrement.to);
                particle.alphaIncrement = alphaIncrement;
            }
            // calculate scale increment
            if (this._particleScaleIncrement) {
                var scaleIncrementX = Lightning.Maths.rngFloat(this._particleScaleIncrement.xFrom, this._particleScaleIncrement.xTo);
                // commented this out because it was causing the scaling to give undesired effects
                // let scaleIncrementY:number = Maths.rngFloat(this._particleScaleIncrement.yFrom, this._particleScaleIncrement.yTo);
                particle.scaleIncrement = { x: scaleIncrementX, y: scaleIncrementX };
            }
            particle.createdAt = Date.now();
            this.addChild(particle);
        };
        ParticleEmitter.prototype.stop = function () {
            this._emit = false;
        };
        ParticleEmitter.prototype.returnToPool = function (particle) {
            var p = this.removeChild(particle);
            this._deadPool.push(p);
        };
        ParticleEmitter.prototype.startDrag = function (event) {
            if (this._respectPosition) {
                var rpx = event.data.global.x * window.devicePixelRatio - this.position.x;
                var rpy = event.data.global.y * window.devicePixelRatio - this.position.y;
                this._respectPositionValues = { x: rpx, y: rpy };
            }
            else {
                this._respectPositionValues = { x: 0, y: 0 };
            }
            this.on('mousemove', this.onDrag);
            this.on('touchmove', this.onDrag);
        };
        ParticleEmitter.prototype.enableDrag = function (respectPosition) {
            var _this = this;
            if (respectPosition === void 0) { respectPosition = false; }
            this._respectPosition = respectPosition;
            // check to see if interaction is already enabled
            if (this.interactive === false) {
                this.interactive = true;
            }
            this.on('mousedown', function (e) {
                _this.startDrag(e);
            });
            this.on('touchstart', function (e) {
                _this.startDrag(e);
            });
            this.on('mouseup', function (e) {
                _this.stopDrag(e);
            });
            this.on('touchend', function (e) {
                _this.stopDrag(e);
            });
            /**
             * need to think about handling pointer events
             */
        };
        ParticleEmitter.prototype.stopDrag = function (event) {
            this.removeListener('mousemove', this.onDrag);
            this.removeListener('touchmove', this.onDrag);
        };
        ParticleEmitter.prototype.onDrag = function (event) {
            this.position = new PIXI.Point((event.data.global.x * window.devicePixelRatio) - this._respectPositionValues.x, (event.data.global.y * window.devicePixelRatio) - this._respectPositionValues.y);
        };
        ParticleEmitter.prototype.setSpread = function (xFrom, xTo, yFrom, yTo) {
            this._spread = { xFrom: xFrom, xTo: xTo, yFrom: yFrom, yTo: yTo };
        };
        ParticleEmitter.prototype.setGravity = function (x, y) {
            if (y === void 0) { y = x; }
            this._gravity = { x: x, y: y };
        };
        ParticleEmitter.prototype.setLifeSpan = function (from, to) {
            if (to === void 0) { to = from; }
            this._lifeSpanRange = { from: from, to: to };
        };
        ParticleEmitter.prototype.setInterval = function (val) {
            this._interval = val;
        };
        ParticleEmitter.prototype.setVelocityRange = function (xFrom, xTo, yFrom, yTo) {
            if (yFrom === void 0) { yFrom = xFrom; }
            if (yTo === void 0) { yTo = xTo; }
            this._particleVelocityRange = { xFrom: xFrom, xTo: xTo, yFrom: yFrom, yTo: yTo };
        };
        ParticleEmitter.prototype.setRotationIncrement = function (from, to) {
            if (to === void 0) { to = from; }
            this._particleRotationIncrement = { from: from, to: to };
        };
        ParticleEmitter.prototype.setScaleIncrement = function (xFrom, xTo, yFrom, yTo) {
            if (yFrom === void 0) { yFrom = xFrom; }
            if (yTo === void 0) { yTo = xTo; }
            this._particleScaleIncrement = { xFrom: xFrom, xTo: xTo, yFrom: yFrom, yTo: yTo };
        };
        ParticleEmitter.prototype.setAlphaIncrement = function (from, to) {
            if (to === void 0) { to = from; }
            this._particleAlphaIncrement = { from: from, to: to };
        };
        ParticleEmitter.prototype.setScaleRange = function (xFrom, xTo, yFrom, yTo) {
            if (yFrom === void 0) { yFrom = xFrom; }
            if (yTo === void 0) { yTo = xTo; }
            this._particleScaleRange = { xFrom: xFrom, xTo: xTo, yFrom: yFrom, yTo: yTo };
        };
        ParticleEmitter.prototype.setAlphaRange = function (from, to) {
            if (to === void 0) { to = from; }
            this._particleAlphaRange = { from: from, to: to };
        };
        ParticleEmitter.prototype.setRotationRange = function (from, to) {
            if (to === void 0) { to = from; }
            this._particleRotationRange = { from: from, to: to };
        };
        ParticleEmitter.prototype.setStrength = function (val) {
            this._particleStrength = val;
        };
        Object.defineProperty(ParticleEmitter.prototype, "alive", {
            get: function () {
                return this.children.length;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ParticleEmitter.prototype, "pool", {
            get: function () {
                return this._deadPool.length;
            },
            enumerable: true,
            configurable: true
        });
        return ParticleEmitter;
    }(Lightning.Group));
    Lightning.ParticleEmitter = ParticleEmitter;
})(Lightning || (Lightning = {}));
/// <reference path="./../reference.d.ts" />
var Lightning;
(function (Lightning) {
    var Parallax = (function (_super) {
        __extends(Parallax, _super);
        function Parallax(game, width, height) {
            if (width === void 0) { width = null; }
            if (height === void 0) { height = null; }
            var _this = _super.call(this) || this;
            _this._speed = null;
            _this._watch = null;
            _this.game = game;
            _this._width = width | _this.game.width;
            _this._height = height | _this.game.height;
            _this._tiles = [];
            return _this;
        }
        Parallax.prototype.add = function (key, texture, xSpeed, ySpeed) {
            if (xSpeed === void 0) { xSpeed = -0.3 * (this._tiles.length + 1); }
            if (ySpeed === void 0) { ySpeed = 0; }
            var object = new PIXI.extras.TilingSprite(texture, this._width, this._height);
            this.addChild(object);
            var tile = { key: key, object: object, updateX: xSpeed, updateY: ySpeed, updateRelative: 0 };
            this._tiles.push(tile);
        };
        Parallax.prototype.setUpdate = function (key, x, y) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            var tile = this.getTile(key);
            tile.updateX = x;
            tile.updateY = y;
        };
        Parallax.prototype.setSpeed = function (val) {
        };
        Parallax.prototype.update = function () {
            for (var _i = 0, _a = this._tiles; _i < _a.length; _i++) {
                var tile = _a[_i];
                if (this._watch) {
                }
                else {
                    if (this._speed) {
                        tile.object.tilePosition.x += tile.updateRelative * this._speed;
                        tile.object.tilePosition.y += tile.updateRelative * this._speed;
                    }
                    else {
                        tile.object.tilePosition.x += tile.updateX;
                        tile.object.tilePosition.y += tile.updateY;
                    }
                }
            }
        };
        Parallax.prototype.getTile = function (key) {
            for (var _i = 0, _a = this._tiles; _i < _a.length; _i++) {
                var tile = _a[_i];
                if (tile.key === key) {
                    return tile;
                }
            }
            console.info('no tile with key', key, 'found');
        };
        return Parallax;
    }(Lightning.Group));
    Lightning.Parallax = Parallax;
})(Lightning || (Lightning = {}));
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
var Lightning;
(function (Lightning) {
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
    })(Signals = Lightning.Signals || (Lightning.Signals = {}));
})(Lightning || (Lightning = {}));
/// <reference path="./../../reference.d.ts" />
var Lightning;
(function (Lightning) {
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
    })(Signals = Lightning.Signals || (Lightning.Signals = {}));
})(Lightning || (Lightning = {}));
/// <reference path="./../../reference.d.ts" />
var Lightning;
(function (Lightning) {
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
    })(Signals = Lightning.Signals || (Lightning.Signals = {}));
})(Lightning || (Lightning = {}));
/// <reference path="./../reference.d.ts" />
var Lightning;
(function (Lightning) {
    var Engine = (function () {
        // game engine constructor
        function Engine(width, height, canvasId) {
            if (canvasId === void 0) { canvasId = 'app'; }
            this._activateState = null;
            this._tweens = new Tween.TweenManager(this);
            this._signals = new Lightning.Signals.SignalManager(this);
            this._physicsActive = false;
            if (!canvasId) {
                var viewCanvas = document.createElement('canvas');
                viewCanvas.id = 'app';
                document.getElementById('app-container').appendChild(viewCanvas);
            }
            this._renderer = PIXI.autoDetectRenderer(width, height, { resolution: window.devicePixelRatio });
            this._renderer.autoResize = true;
            this._world = new PIXI.Container();
            this._world.scale = new PIXI.Point(1 / window.devicePixelRatio, 1 / window.devicePixelRatio);
            this._world.interactive = true;
            document.getElementById('app-container').appendChild(this._renderer.view);
            var canvas = document.querySelector('canvas');
            var scale = window.devicePixelRatio;
            var renderer = PIXI.autoDetectRenderer(width * scale, height * scale, canvas);
            canvas.style.width = width + 'px';
            canvas.style.height = height + 'px';
            // init the ticker
            this._ticker = PIXI.ticker.shared;
            this._ticker.autoStart = true;
            this._ticker.add(this.update, this);
        }
        // gets called on update
        Engine.prototype.update = function (time) {
            if (this._physicsActive) {
                this._physicsWorld.Step(1 / 60, 1, 1);
                this._physicsWorld.ClearForces();
            }
            if (this._activateState) {
                this._activateState.update();
            }
            this._tweens.update();
            this._renderer.render(this._world);
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
        Engine.prototype.startPhysics = function () {
            this._physicsWorld = new Box2D.Dynamics.b2World(new Box2D.Common.Math.b2Vec2(0, 10), true);
            this._physicsActive = true;
        };
        Engine.prototype.collideOnWorldBounds = function () {
            this._physicsWorldBounds = new Box2D.Dynamics.b2BodyDef();
            var polyFixture = new Box2D.Dynamics.b2FixtureDef();
            polyFixture.shape = new Box2D.Collision.Shapes.b2PolygonShape();
            polyFixture.density = 1;
            this._physicsWorldBounds = new Box2D.Dynamics.b2BodyDef();
            this._physicsWorldBounds.type = Box2D.Dynamics.b2Body.b2_staticBody;
            //down
            polyFixture.shape.SetAsBox(10, 1);
            this._physicsWorldBounds.position.Set(9, this.height / 100 + 1);
            this.physics.CreateBody(this._physicsWorldBounds).CreateFixture(polyFixture);
            //left
            polyFixture.shape.SetAsBox(1, 100);
            this._physicsWorldBounds.position.Set(-1, 0);
            this.physics.CreateBody(this._physicsWorldBounds).CreateFixture(polyFixture);
            //right
            this._physicsWorldBounds.position.Set(this.height / 100, 0);
            this.physics.CreateBody(this._physicsWorldBounds).CreateFixture(polyFixture);
            this._physicsWorldBounds.type = Box2D.Dynamics.b2Body.b2_dynamicBody;
            var body = Box2D.Dynamics.b2Body;
        };
        Engine.prototype.generateTexture = function () {
            var params = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                params[_i] = arguments[_i];
            }
            var textures = [];
            for (var _a = 0, params_3 = params; _a < params_3.length; _a++) {
                var i = params_3[_a];
                textures.push(this._renderer.generateTexture(i));
            }
            if (textures.length === 1) {
                return textures[0];
            }
            else {
                return textures;
            }
        };
        Engine.prototype.texture = function () {
            var params = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                params[_i] = arguments[_i];
            }
            var t = [];
            if (params.length > 1) {
                console.log('get multiple textures');
                for (var _a = 0, params_4 = params; _a < params_4.length; _a++) {
                    var i = params_4[_a];
                    t.push(Lightning.Texture.from(i));
                }
            }
            else {
                console.log('get single texture');
                t = Lightning.Texture.from(params[0]);
            }
            return t;
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
        Object.defineProperty(Engine.prototype, "center", {
            get: function () {
                return { x: this.width * 0.5, y: this.height * 0.5 };
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
        Object.defineProperty(Engine.prototype, "physics", {
            get: function () {
                return this._physicsWorld;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Engine.prototype, "physicsWorldBounds", {
            get: function () {
                return this._physicsWorldBounds;
            },
            enumerable: true,
            configurable: true
        });
        return Engine;
    }());
    Lightning.Engine = Engine;
})(Lightning || (Lightning = {}));
//# sourceMappingURL=compile.js.map