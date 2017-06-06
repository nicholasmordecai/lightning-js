/// <reference path="./../../reference.d.ts" />
/**
 * Physice Lite Body
 *
 */
var Lightning;
(function (Lightning) {
    var LitePhysicsBody = (function () {
        function LitePhysicsBody(obj, inheritAnchor) {
            if (inheritAnchor === void 0) { inheritAnchor = true; }
            this.active = true;
            this._objectRef = obj;
            this._destroyFlag = false;
            // this.angle = obj.angle;
            this.x = obj.x;
            this.y = obj.y;
            this._pauseCollisionDetection = false;
            this._velocity = { x: 0, y: 0 };
            this._deltaG = { x: 0, y: 0 };
            this.bounds = { x: 0, y: 0, width: obj.width, height: obj.height };
            this._collideOnWorldBounds = false;
            this.drag = 0;
            this._restitution = 1;
            if (inheritAnchor) {
                this.setAnchor(obj.anchor.x, obj.anchor.y);
            }
        }
        LitePhysicsBody.prototype.accelerateTo = function () {
        };
        LitePhysicsBody.prototype.updateObjectRefPosition = function () {
            this._objectRef.x = this.x;
            this._objectRef.y = this.y;
        };
        LitePhysicsBody.prototype.setAnchor = function (x, y) {
            if (y === void 0) { y = x; }
            this._bounds.x -= this._bounds.width * x;
            this._bounds.y -= this._bounds.height * y;
        };
        LitePhysicsBody.prototype.enableDebug = function () {
            this._graphics = new Lightning.Graphics();
            this._graphics.beginFill(0xff0000, 0.2);
            this._graphics.drawRect(this._bounds.x, this._bounds.y, this._bounds.width, this._bounds.height);
            this._graphics.endFill();
            this._objectRef.add(this._graphics);
        };
        Object.defineProperty(LitePhysicsBody.prototype, "bounds", {
            get: function () {
                return this._bounds;
            },
            set: function (val) {
                this._bounds = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LitePhysicsBody.prototype, "active", {
            get: function () {
                return this._active;
            },
            set: function (val) {
                this._active = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LitePhysicsBody.prototype, "drag", {
            get: function () {
                return this._drag;
            },
            set: function (val) {
                this._drag = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LitePhysicsBody.prototype, "restitution", {
            get: function () {
                return this._restitution;
            },
            set: function (val) {
                this._restitution = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LitePhysicsBody.prototype, "velocity", {
            get: function () {
                return this._velocity;
            },
            set: function (val) {
                this._velocity = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LitePhysicsBody.prototype, "hasMultipleBounds", {
            get: function () {
                return this._hasMultipleBounds;
            },
            set: function (val) {
                this._hasMultipleBounds = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LitePhysicsBody.prototype, "destroyFlag", {
            get: function () {
                return this._destroyFlag;
            },
            set: function (val) {
                this.destroyFlag = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LitePhysicsBody.prototype, "collideOnWorldBounds", {
            get: function () {
                return this._collideOnWorldBounds;
            },
            set: function (val) {
                this._collideOnWorldBounds = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LitePhysicsBody.prototype, "gravityEnabled", {
            get: function () {
                return this._gravityEnabled;
            },
            set: function (val) {
                this._gravityEnabled = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LitePhysicsBody.prototype, "objRef", {
            get: function () {
                return this._objectRef;
            },
            set: function (val) {
                this._objectRef = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LitePhysicsBody.prototype, "pauseCollisionDetection", {
            get: function () {
                return this._pauseCollisionDetection;
            },
            set: function (val) {
                this._pauseCollisionDetection = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LitePhysicsBody.prototype, "deltaG", {
            get: function () {
                return this._deltaG;
            },
            set: function (val) {
                this._deltaG = val;
            },
            enumerable: true,
            configurable: true
        });
        return LitePhysicsBody;
    }());
    Lightning.LitePhysicsBody = LitePhysicsBody;
})(Lightning || (Lightning = {}));
