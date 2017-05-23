/// <reference path="./../../reference.d.ts" />
/**
 * Physice Lite Body
 *
 */
var Lightning;
(function (Lightning) {
    var LitePhysicsBody = (function () {
        function LitePhysicsBody(obj) {
            this.active = true;
            this._objectRef = obj;
            this._destroyFlag = false;
            this.angle = obj.y;
            this.x = obj.x;
            this.y = obj.y;
            this._velocity = { x: 0, y: 0 };
            this.bounds = { x: 0, y: 0, width: obj.width, height: obj.height };
            this.drag = 0;
        }
        LitePhysicsBody.prototype.updateObjectRefPosition = function () {
            this._objectRef.x = this.x;
            this._objectRef.y = this.y;
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
        return LitePhysicsBody;
    }());
    Lightning.LitePhysicsBody = LitePhysicsBody;
})(Lightning || (Lightning = {}));
