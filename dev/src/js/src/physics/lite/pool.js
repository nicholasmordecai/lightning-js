/// <reference path="./../../reference.d.ts" />
/**
 * Physice Lite Pool
 *
 */
var Lightning;
(function (Lightning) {
    var LitePhysicsPool = (function () {
        function LitePhysicsPool(selfCollide) {
            this._enabled = true;
            this._bodies = [];
            this._selfCollide = selfCollide;
            this._destroyFlag = false;
        }
        LitePhysicsPool.prototype.add = function () {
            var bodies = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                bodies[_i] = arguments[_i];
            }
            for (var _a = 0, bodies_1 = bodies; _a < bodies_1.length; _a++) {
                var body = bodies_1[_a];
                this._bodies.push(body);
            }
            return bodies;
        };
        LitePhysicsPool.prototype.destroy = function () {
            for (var _i = 0, _a = this._bodies; _i < _a.length; _i++) {
                var body = _a[_i];
                body.destroyFlag = true;
            }
            this._destroyFlag = true;
        };
        LitePhysicsPool.prototype.remove = function () {
            var bodies = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                bodies[_i] = arguments[_i];
            }
            var removed = [];
            for (var _a = 0, bodies_2 = bodies; _a < bodies_2.length; _a++) {
                var body = bodies_2[_a];
                for (var i = this._bodies.length - 1; i >= 0; i--) {
                    if (this._bodies[i] === body) {
                        removed.push(this._bodies.splice(i, 1)[0]);
                    }
                }
            }
            return removed;
        };
        Object.defineProperty(LitePhysicsPool.prototype, "enabled", {
            get: function () {
                return this._enabled;
            },
            set: function (val) {
                this._enabled = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LitePhysicsPool.prototype, "selfCollide", {
            get: function () {
                return this.selfCollide;
            },
            set: function (val) {
                this.selfCollide = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LitePhysicsPool.prototype, "bodies", {
            get: function () {
                return this._bodies;
            },
            set: function (val) {
                this._bodies = val;
            },
            enumerable: true,
            configurable: true
        });
        return LitePhysicsPool;
    }());
    Lightning.LitePhysicsPool = LitePhysicsPool;
})(Lightning || (Lightning = {}));
