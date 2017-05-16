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
/**
 * Fade in / Scale in sprites - optional
 * Simple / Advanced -- for creating ultra performant particles in the 50k+ range
 * Colour Shift
 * Checking the container class in pixi, I should think about refactoring the calculate bounds function.. if it's looping over 10k children to calculate it's bounds, that's going to get expensive!
 */
var Lightning;
(function (Lightning) {
    var ParticleEmitter = (function (_super) {
        __extends(ParticleEmitter, _super);
        function ParticleEmitter(state, x, y) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            var _this = _super.call(this) || this;
            _this._debug = false;
            _this._emit = false;
            _this._nextEmit = null;
            _this._interval = 100;
            _this._lastStart = null;
            _this._time = null;
            _this._textures = [];
            _this._deadPool = [];
            _this._gravity = { x: 0 * window.devicePixelRatio, y: 0.2 * window.devicePixelRatio };
            _this._nGravity = 6.5;
            _this._spread = { xFrom: -2 * window.devicePixelRatio, xTo: 2 * window.devicePixelRatio, yFrom: -2 * window.devicePixelRatio, yTo: 2 * window.devicePixelRatio };
            _this._lifeSpanRange = { from: 3000, to: 3000 };
            _this._particleStrength = 1;
            _this._particleScaleRange = { xFrom: 0.7, xTo: 1, yFrom: 0.7, yTo: 1 };
            _this._particleAlphaRange = { from: 1, to: 1 };
            _this._particleRotationRange = { from: 0, to: 1.9 };
            _this._particleVelocityRange = { xFrom: -1 * window.devicePixelRatio, xTo: 1 * window.devicePixelRatio, yFrom: -4 * window.devicePixelRatio, yTo: -6 * window.devicePixelRatio };
            _this._particleRotationIncrement = { from: 0, to: 0 };
            _this._particleScaleIncrement = { xFrom: 0, xTo: 0, yFrom: 0, yTo: 0 };
            _this._particleAlphaIncrement = { from: 0, to: 0 };
            _this.state = state;
            _this.game = state.game;
            _this.x = x;
            _this.y = y;
            _this.gravityWells = [];
            _this.obstacles = [];
            var t = Lightning.Geometry.Circle(15);
            var sprite = new Lightning.Sprite(_this.game.generateTexture(t));
            sprite['mass'] = 0.1;
            sprite.setAnchor(0.5);
            sprite.tint = 0xff22aa;
            _this.state.add(sprite);
            sprite.x = _this.game.center.x - 75;
            sprite.y = _this.game.center.y - 100;
            sprite.enableDrag();
            _this.gravityWells.push(sprite);
            _this.game.ticker.add(_this.tick, _this);
            return _this;
        }
        ParticleEmitter.prototype.tick = function (time) {
            for (var _i = 0, _a = this.children; _i < _a.length; _i++) {
                var i = _a[_i];
                // see if it's more performant to use an array for alivePool, and remove dead object from there
                if (!i['isDead']) {
                    i['update'](time);
                }
            }
            if (this._time !== null && Date.now() > this._lastStart + this._time) {
                this.stop();
                return;
            }
            // get delta time from update loop
            if (this._emit && this._nextEmit < Date.now()) {
                this._nextEmit = Date.now() + this._interval;
                this.fireEmitter();
            }
        };
        ParticleEmitter.prototype.updateTransform = function () {
            this._boundsID++;
            this.transform.updateTransform(this.parent.transform);
            // TODO: check render flags, how to process stuff here
            this.worldAlpha = this.alpha * this.parent.worldAlpha;
        };
        ;
        /**
         * @param  {string} key
         * @param  {DisplayObject} particle
         */
        ParticleEmitter.prototype.add = function () {
            var params = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                params[_i] = arguments[_i];
            }
            for (var _a = 0, params_1 = params; _a < params_1.length; _a++) {
                var i = params_1[_a];
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
            var isChild = false;
            // // create new particle
            if (this._deadPool.length > 0) {
                particle = this._deadPool.pop();
                particle.isDead = false;
                particle.visible = true;
                particle.renderable = true;
                isChild = true;
            }
            else {
                // increment the id hash value to create the particle
                particle = new Lightning.Particle(texture, this, -this.x, this.game.width - this.x, -this.y, this.game.height - this.y);
            }
            // set gravity -- need to move the gravity into the emitter, not the particle
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
                particle.scale.x = scaleX;
                particle.scale.y = scaleX;
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
            particle.lifeTime = 0;
            if (!isChild) {
                this.addChild(particle);
            }
            // call the particle's update transformation to create / re-create it's matrix
            particle.updateTransform();
        };
        ParticleEmitter.prototype.stop = function () {
            this._emit = false;
        };
        ParticleEmitter.prototype.returnToPool = function (particle) {
            this._deadPool.push(particle);
        };
        /**
         * TODO this seems to break the create particle function for some reason
         */
        ParticleEmitter.prototype.clearPool = function () {
            for (var i = 0; i < this._deadPool.length; i++) {
                this._deadPool[i].destroy();
            }
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
        ParticleEmitter.prototype.enableDebug = function (interval, floatLeft, floatTop) {
            var _this = this;
            if (interval === void 0) { interval = 500; }
            if (floatLeft === void 0) { floatLeft = true; }
            if (floatTop === void 0) { floatTop = true; }
            var font = { fontSize: 16 * window.devicePixelRatio, fill: 0xffffff };
            var gap = 25 * window.devicePixelRatio;
            this._aliveText = new Lightning.Text('Alive: ' + this.alive, font);
            this._deadPoolText = new Lightning.Text('Dead: ' + this.pool, font);
            this._intervalText = new Lightning.Text('Interval: ' + this._interval, font);
            this._strengthText = new Lightning.Text('Strength: ' + this._particleStrength, font);
            var x, y;
            if (floatLeft) {
                x = this.game.width * 0.02;
            }
            else {
                x = this.game.width * 0.85;
            }
            if (floatTop) {
                y = this.game.height * 0.02;
            }
            else {
                y = this.game.height * 0.75;
            }
            this._aliveText.x = x;
            this._aliveText.y = y;
            this._deadPoolText.x = x;
            this._deadPoolText.y = y + gap;
            this._intervalText.x = x;
            this._intervalText.y = y + (gap * 2);
            this._strengthText.x = x;
            this._strengthText.y = y + (gap * 3);
            this.state.add(this._aliveText, this._deadPoolText, this._intervalText, this._strengthText);
            this._debugFn = setInterval(function () {
                _this._aliveText.text = 'Alive: ' + _this.alive;
                _this._deadPoolText.text = 'Dead: ' + _this.pool;
                _this._intervalText.text = 'Interval: ' + _this._interval;
                _this._strengthText.text = 'Strength: ' + _this._particleStrength;
            }, interval);
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
            this._spread = { xFrom: xFrom * window.devicePixelRatio, xTo: xTo * window.devicePixelRatio, yFrom: yFrom * window.devicePixelRatio, yTo: yTo * window.devicePixelRatio };
        };
        ParticleEmitter.prototype.setGravity = function (x, y) {
            if (y === void 0) { y = x; }
            this._gravity = { x: x * window.devicePixelRatio, y: y * window.devicePixelRatio };
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
            this._particleVelocityRange = { xFrom: xFrom * window.devicePixelRatio, xTo: xTo * window.devicePixelRatio, yFrom: yFrom * window.devicePixelRatio, yTo: yTo * window.devicePixelRatio };
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
                var c = 0;
                for (var _i = 0, _a = this.children; _i < _a.length; _i++) {
                    var i = _a[_i];
                    if (!i['isDead'])
                        c++;
                }
                return c;
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
        Object.defineProperty(ParticleEmitter.prototype, "nGravity", {
            get: function () {
                return this._nGravity;
            },
            set: function (val) {
                this._nGravity = val;
            },
            enumerable: true,
            configurable: true
        });
        return ParticleEmitter;
    }(Lightning.Group));
    Lightning.ParticleEmitter = ParticleEmitter;
})(Lightning || (Lightning = {}));
