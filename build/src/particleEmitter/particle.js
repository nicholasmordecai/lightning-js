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
    var Particle = (function (_super) {
        __extends(Particle, _super);
        function Particle(texture, emitter, minX, maxX, minY, maxY) {
            var _this = _super.call(this) || this;
            _this.returnToPool = _this._returnToPool;
            _this.update = _this.updateSimple;
            _this._texture = texture;
            _this._emitter = emitter;
            _this.children = null;
            _this._minX = minX;
            _this._minY = minY;
            _this._maxX = maxX;
            _this._maxY = maxY;
            _this.anchor.set(0.5);
            return _this;
            // check the interaction is turned off completly.. seems to still being called -> processInteractive
        }
        // override functions to make sure that it doesn't check for chilren, visible etc
        Particle.prototype.renderWebGL = function (renderer) {
            if (this.renderable) {
                this._renderWebGL(renderer);
            }
        };
        Particle.prototype.renderAdvancedWebGL = function (renderer) {
            // add this object to the batch, only rendered if it has a texture.
            if (this.renderable) {
                this._renderWebGL(renderer);
            }
            // double check if this is actually needed. feels like it's only called if the texture is changed, in which case.. don't do it!
            renderer.flush();
        };
        Particle.prototype.renderCanvas = function (renderer) {
            if (this.renderable) {
                this._renderCanvas(renderer);
            }
        };
        Particle.prototype.updateTransform = function () {
            this._boundsID++;
            this.transform.updateTransform(this.parent.transform);
            // TODO: check render flags, how to process stuff here
            this.worldAlpha = this.alpha * this.parent.worldAlpha;
        };
        Particle.prototype.destroy = function () {
            this.removeAllListeners('');
            if (this.parent) {
                this.parent.removeChild(this);
            }
            this.transform = null;
            this.parent = null;
            this.interactiveChildren = false;
        };
        Particle.prototype.calculateBounds = function () {
            this._bounds.clear();
            this._calculateBounds();
            this._lastBoundsID = this._boundsID;
        };
        Particle.prototype._returnToPool = function () {
            this._isDead = true;
            this.renderable = false;
            this.visible = false;
            this._emitter.returnToPool(this);
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
        Object.defineProperty(Particle.prototype, "lifeTime", {
            set: function (val) {
                this._lifeTime = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Particle.prototype, "isDead", {
            get: function () {
                return this._isDead;
            },
            set: function (val) {
                this._isDead = val;
            },
            enumerable: true,
            configurable: true
        });
        return Particle;
    }(Lightning.ParticleBase));
    Lightning.Particle = Particle;
})(Lightning || (Lightning = {}));
//# sourceMappingURL=particle.js.map