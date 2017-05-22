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
 * Scope Definitions
 *
 */
var Lightning;
(function (Lightning) {
    var LitePhysicsManager = (function (_super) {
        __extends(LitePhysicsManager, _super);
        function LitePhysicsManager(game) {
            var _this = _super.call(this, game, true, true) || this;
            _this.game = game;
            _this._worldBounds = { x: 0, y: 0, width: _this.game.width, height: _this.game.height };
            _this._enabled = false;
            return _this;
        }
        /**
         * initalise / reset the properties when enabled, not constructed
         */
        LitePhysicsManager.prototype.enable = function () {
            this._enabled = true;
            this._pools = {};
            this._paused = false;
        };
        LitePhysicsManager.prototype.disable = function () {
            this._enabled = false;
        };
        LitePhysicsManager.prototype.update = function () {
            if (!this._enabled)
                return;
            if (this._paused)
                return;
            for (var i in this._pools) {
                for (var _i = 0, _a = this._pools[i].bodies; _i < _a.length; _i++) {
                    var body = _a[_i];
                    // do stuff to each body here
                }
            }
        };
        LitePhysicsManager.prototype.createPool = function (key, selfCollide) {
            if (selfCollide === void 0) { selfCollide = true; }
            var objects = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                objects[_i - 2] = arguments[_i];
            }
            if (this._pools[key] !== null || this._pools[key] !== undefined) {
                this._pools[key] = new Lightning.LitePhysicsPool(selfCollide);
                for (var _a = 0, objects_1 = objects; _a < objects_1.length; _a++) {
                    var i = objects_1[_a];
                    this._pools[key].add(i);
                }
            }
            else {
                console.info('Physics pool with key:', key, 'alread exists');
                return null;
            }
        };
        LitePhysicsManager.prototype.removePool = function (key) {
            this._pools[key].destroy();
        };
        LitePhysicsManager.prototype.pool = function (key) {
            return this._pools[key];
        };
        LitePhysicsManager.prototype.updatePosition = function (body) {
            body.x += body.velocity.x;
            body.y += body.velocity.y;
            body.updateObjectRefPosition();
        };
        LitePhysicsManager.prototype.checkWorldCollide = function (body) {
            if (body.x + body.width >= this._worldBounds.width + this._worldBounds.x) {
                // right side collide
                if (body.velocity.x < 1) {
                    body.velocity.x = body._velocity.x *= -1 * body.restitution;
                }
                else if (body._velocity.x < 0) {
                    body.x = body.view.core.renderer.width - body.width;
                    body.velocity.x = 0;
                }
                body.velocity.x = body.velocity.x *= -1 * body.restitution;
                // left side collide
            }
            else if (body.x <= this._worldBounds.x) {
                if (body.velocity.x < -1) {
                    body.velocity.x = body.velocity.x *= -1 * body.restitution;
                }
                else if (body.velocity.x < 0) {
                    body.x = 0;
                    body.velocity.x = 0;
                }
            }
            // if (this.y + this.height > this.view.core.renderer.height) {
            //     if (this._velocity.y > 1) {
            //         this._velocity.y = this._velocity.y *= -1 * this._restitution
            //     } else if (this._velocity.y > 0) {
            //         this.y = this.view.core.renderer.height - this.height;
            //         this._velocity.y = 0;
            //     }
            // } else if (this.y < 0) {
            //     if (this._velocity.y < -1) {
            //         this._velocity.y = this._velocity.y *= -1 * this._restitution
            //     } else if (this._velocity.y < 0) {
            //         this.y = 0;
            //         this._velocity.y = 0;
            //     }
            // }
        };
        return LitePhysicsManager;
    }(Lightning.Plugin));
    Lightning.LitePhysicsManager = LitePhysicsManager;
})(Lightning || (Lightning = {}));
