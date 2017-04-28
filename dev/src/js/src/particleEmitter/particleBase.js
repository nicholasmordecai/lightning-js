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
    var ParticleBase = (function (_super) {
        __extends(ParticleBase, _super);
        function ParticleBase() {
            var _this = _super.call(this) || this;
            _this._autoCull = true;
            _this._velX = 0;
            _this._velY = 0;
            _this._gX = 0;
            _this._gY = 0;
            _this._alphaIncrement = null;
            _this._rotationIncrement = null;
            _this._scaleIncrement = null;
            _this._isDead = false;
            _this._createdAt = null;
            _this._lifeSpan = null;
            _this._deadTime = null;
            _this._lifeTime = null;
            return _this;
        }
        ParticleBase.prototype.updateSimple = function (time) {
            if (this._deadTime <= this._lifeTime) {
                this.returnToPool();
                return;
            }
            if (this._autoCull) {
                if (this.y > this._maxY || this.y < this._minY || this.x > this._maxX || this.x < this._minX) {
                    this.returnToPool();
                    return;
                }
            }
            // increment alpha
            if (this._alphaIncrement) {
                this.alpha += this._alphaIncrement;
                if (this.alpha <= 0) {
                    this.returnToPool();
                }
            }
            // increment rotation
            if (this._rotationIncrement) {
                this.rotation += this._rotationIncrement;
            }
            // increment scale
            if (this._scaleIncrement) {
                this.scale.x += this._scaleIncrement.x;
                this.scale.y += this._scaleIncrement.y;
            }
            // update velocity (from gravity)
            this._velX += this._gX;
            this._velY += this._gY;
            // update position
            this.x += this._velX;
            this.y += this._velY;
            if (!this._isDead) {
                this.updateTransform();
                this._lifeTime += time;
            }
        };
        ParticleBase.prototype.updateComplex = function (time) {
            if (this._deadTime <= this._lifeTime) {
                this.returnToPool();
                return;
            }
            for (var _i = 0, _a = this._emitter.gravityWells; _i < _a.length; _i++) {
                var i = _a[_i];
                var mass = i['mass'];
                var particleGlobal = this.getGlobalPosition();
                var gravityGlobal = i.getGlobalPosition();
                // let d = this.getDistance(particleGlobal.x, particleGlobal.y, gravityGlobal.x, gravityGlobal.y);
                var d = 0;
                // if(d < 100) {
                //     this.returnToPool();
                //     return;
                // }
                // let G = 6.5;
                // for(let i of this._emitter.gravityWells) {
                //     let mass = i['mass'];
                //     let particleGlobal = this.getGlobalPosition();
                //     let gravityGlobal = i.getGlobalPosition();
                //     let d = this.getDistance(particleGlobal.x, particleGlobal.y, gravityGlobal.x, gravityGlobal.y);
                //     // if(d < 100) {
                //     //     this.returnToPool();
                //     //     return;
                //     // }
                //     let f = G * (mass * 1) / d
                //     if(particleGlobal.x - gravityGlobal.x < 0) {
                //         this._velX += f;
                //     } else {
                //         this._velX += -f;
                //     }
                //     if(particleGlobal.y - gravityGlobal.y < 0) {
                //         this._velY += f;
                //     } else {
                //         this._velY += -f;
                //     }
                // }
                var f = this._emitter.nGravity * (mass * 1) / d;
                if (particleGlobal.x - gravityGlobal.x < 0) {
                    this._velX += f;
                }
                else {
                    this._velX += -f;
                }
                if (particleGlobal.y - gravityGlobal.y < 0) {
                    this._velY += f;
                }
                else {
                    this._velY += -f;
                }
            }
        };
        return ParticleBase;
    }(PIXI.Sprite));
    Lightning.ParticleBase = ParticleBase;
})(Lightning || (Lightning = {}));
