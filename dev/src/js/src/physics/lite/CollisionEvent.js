/// <reference path="./../../reference.d.ts" />
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
 * Physice Lite Pool
 *
 */
var Lightning;
(function (Lightning) {
    var LitePhysicsCollisionEvent = (function (_super) {
        __extends(LitePhysicsCollisionEvent, _super);
        function LitePhysicsCollisionEvent(objects1, objects2, oneWayCollision) {
            if (oneWayCollision === void 0) { oneWayCollision = false; }
            var _this = _super.call(this) || this;
            _this._isEnabled = true;
            _this._oneWayCollision = oneWayCollision;
            _this._destroyFlag = false;
            _this._onCollideCallback = [];
            _this._b1 = objects1;
            _this._b2 = objects2;
            return _this;
        }
        LitePhysicsCollisionEvent.prototype.onCollide = function (fn, ctx) {
            var params = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                params[_i - 2] = arguments[_i];
            }
            this._onCollideCallback.push({ fn: fn, ctx: ctx, params: params });
        };
        LitePhysicsCollisionEvent.prototype.collisionDetected = function (b1, b2) {
            for (var _i = 0, _a = this._onCollideCallback; _i < _a.length; _i++) {
                var i = _a[_i];
                i.fn.apply(i.ctx, [b1, b2, i.params]);
            }
        };
        LitePhysicsCollisionEvent.prototype.destroy = function () {
            for (var _i = 0, _a = this._b1; _i < _a.length; _i++) {
                var body = _a[_i];
                body.destroyFlag = true;
            }
            for (var _b = 0, _c = this._b2; _b < _c.length; _b++) {
                var body = _c[_b];
                body.destroyFlag = true;
            }
            this._destroyFlag = true;
        };
        Object.defineProperty(LitePhysicsCollisionEvent.prototype, "enabled", {
            get: function () {
                return this._isEnabled;
            },
            set: function (val) {
                this._isEnabled = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LitePhysicsCollisionEvent.prototype, "oneWayCollision", {
            get: function () {
                return this._oneWayCollision;
            },
            set: function (val) {
                this._oneWayCollision = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LitePhysicsCollisionEvent.prototype, "b1", {
            get: function () {
                return this._b1;
            },
            set: function (val) {
                this._b1 = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LitePhysicsCollisionEvent.prototype, "b2", {
            get: function () {
                return this._b2;
            },
            set: function (val) {
                this._b2 = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LitePhysicsCollisionEvent.prototype, "bodies", {
            get: function () {
                return [].concat(this._b1, this._b2);
            },
            enumerable: true,
            configurable: true
        });
        return LitePhysicsCollisionEvent;
    }(Lightning.EventEmitter));
    Lightning.LitePhysicsCollisionEvent = LitePhysicsCollisionEvent;
})(Lightning || (Lightning = {}));
