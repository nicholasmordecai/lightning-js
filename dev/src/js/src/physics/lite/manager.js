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
 * TODO
 *
 * Body acceleration
 * Calculate drag when calculating velocity
 * Create local gravity pools
 * Calculate restitution on bounce
 * Fix for when two bodies become attached
 *      use AABB collision resolution and check the bodies are still moving towards eachother
 * Fix some bodies passing straight through
 *      I think this is because when a body becomes attached, the maximum amountn of events a being triggered
 * Apply mass to bodies
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
            _this._gravity = { x: 0, y: 0.1 };
            return _this;
        }
        /**
         * initalise / reset the properties when enabled, not constructed
         */
        LitePhysicsManager.prototype.enablePhysics = function () {
            this._enabled = true;
            this._pools = {};
            this._collisionEvents = {};
            this._paused = false;
        };
        LitePhysicsManager.prototype.disable = function () {
            this._enabled = false;
        };
        LitePhysicsManager.prototype.preUpdate = function () {
            // handle deletion pre update
            for (var i in this._pools) {
                for (var _i = 0, _a = this._pools[i].bodies; _i < _a.length; _i++) {
                    var body = _a[_i];
                    if (body.destroyFlag === true) {
                        body.objRef.destroy();
                        this._pools[i].remove(body);
                    }
                }
            }
            for (var i in this._collisionEvents) {
                for (var _b = 0, _c = this._collisionEvents[i].bodies; _b < _c.length; _b++) {
                    var body = _c[_b];
                    if (body.destroyFlag === true) {
                        body.objRef.destroy();
                        this._pools[i].remove(body);
                    }
                }
            }
            this.mainUpdate();
        };
        LitePhysicsManager.prototype.mainUpdate = function () {
            for (var i in this._pools) {
                for (var _i = 0, _a = this._pools[i].bodies; _i < _a.length; _i++) {
                    var body = _a[_i];
                    if (body.collideOnWorldBounds) {
                        this.checkWorldCollide(body);
                    }
                    if (body.gravityEnabled) {
                        this.calculateGravity(body);
                    }
                    this.updatePosition(body);
                }
            }
            for (var i in this._collisionEvents) {
                this.checkCollisions(this._collisionEvents[i]);
                for (var _b = 0, _c = this._collisionEvents[i].bodies; _b < _c.length; _b++) {
                    var body = _c[_b];
                    if (body.collideOnWorldBounds) {
                        this.checkWorldCollide(body);
                    }
                    if (body.gravityEnabled) {
                        this.calculateGravity(body);
                    }
                    this.updatePosition(body);
                }
            }
            this.postUpdate();
        };
        LitePhysicsManager.prototype.postUpdate = function () {
            for (var i in this._pools) {
                for (var _i = 0, _a = this._pools[i].bodies; _i < _a.length; _i++) {
                    var body = _a[_i];
                    if (body.destroyFlag === true) {
                        body.objRef.destroy();
                        this._pools[i].remove(body);
                    }
                }
            }
            for (var i in this._collisionEvents) {
                for (var _b = 0, _c = this._collisionEvents[i].bodies; _b < _c.length; _b++) {
                    var body = _c[_b];
                    if (body.destroyFlag === true) {
                        body.objRef.destroy();
                        this._pools[i].remove(body);
                    }
                }
            }
        };
        LitePhysicsManager.prototype.update = function (dt) {
            if (!this._enabled)
                return;
            if (this._paused)
                return;
            this.preUpdate();
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
                    return this._pools[key];
                }
                return this._pools[key];
            }
            else {
                console.info('Physics pool with key:', key, 'alread exists');
                return null;
            }
        };
        LitePhysicsManager.prototype.createCollisionEvent = function (key, objects1, objects2) {
            if (this._collisionEvents[key] !== null || this._collisionEvents[key] !== undefined) {
                if (objects1 instanceof Array === false) {
                    objects1 = [objects1];
                }
                if (objects2 instanceof Array === false) {
                    objects2 = [objects2];
                }
                this._collisionEvents[key] = new Lightning.LitePhysicsCollisionEvent(objects1, objects2);
                return this._collisionEvents[key];
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
        LitePhysicsManager.prototype.collisionEvents = function (key) {
            return this._collisionEvents[key];
        };
        LitePhysicsManager.prototype.removeCollisionEvents = function (key) {
        };
        LitePhysicsManager.prototype.reset = function () {
            this._pools = {};
            this._collisionEvents = {};
        };
        LitePhysicsManager.prototype.updatePosition = function (body) {
            body.velocity.x += body.deltaG.x;
            body.velocity.y += body.deltaG.y;
            body.x += body.velocity.x;
            body.y += body.velocity.y;
            body.deltaG.x = 0;
            body.deltaG.y = 0;
            body.updateObjectRefPosition();
        };
        LitePhysicsManager.prototype.checkWorldCollide = function (body) {
            //left
            if (body.x <= this._worldBounds.x) {
                body.velocity.x *= -1;
            }
            //right
            if (body.x >= this._worldBounds.width) {
                body.velocity.x *= -1;
            }
            //down
            if (body.y <= this._worldBounds.height) {
                body.velocity.y *= -1;
            }
            //up
            if (body.y >= this._worldBounds.y) {
                body.velocity.y *= -1;
            }
        };
        LitePhysicsManager.prototype.calculateGravity = function (body) {
            // checks if world gravity has already been applied
            if (body.deltaG.x === 0 && body.deltaG.y === 0) {
                body.deltaG.x = this._gravity.x;
                body.deltaG.y = this._gravity.y;
            }
        };
        LitePhysicsManager.prototype.checkCollisions = function (collisionEvent) {
            for (var _i = 0, _a = collisionEvent.b1; _i < _a.length; _i++) {
                var i = _a[_i];
                for (var _b = 0, _c = collisionEvent.b2; _b < _c.length; _b++) {
                    var t = _c[_b];
                    if (this.AABBvsAABB(i, t) === true) {
                        // check to see if the body's collision detection is paused
                        if (!i.pauseCollisionDetection || !t.pauseCollisionDetection) {
                            //this.resolveAABB(i, t);
                            collisionEvent.collisionDetected(i, t);
                        }
                        return true;
                    }
                }
            }
        };
        LitePhysicsManager.prototype.checkPoolCollisions = function (pool) {
            if (pool.bodies.length < 2)
                return;
            var c = 1;
            for (var _i = 0, _a = pool.bodies; _i < _a.length; _i++) {
                var body = _a[_i];
                for (var i = c; i < pool.bodies.length; i++) {
                    // body = the body we're currently on
                    // the body we're checking against
                    var body2 = pool.bodies[i];
                    // check two colisions here
                    if (this.AABBvsAABB(body, body2) === true) {
                        //this.resolveAABB(body, body2);
                    }
                }
                c++;
            }
        };
        LitePhysicsManager.prototype.AABBvsAABB = function (b1, b2) {
            if (b1.x < b2.x + b2.bounds.width &&
                b1.x + b1.bounds.width > b2.x &&
                b1.y < b2.y + b2.bounds.height &&
                b1.bounds.height + b1.y > b2.y) {
                return true;
            }
            else {
                return false;
            }
        };
        LitePhysicsManager.prototype.resolveAABB = function (b1, b2) {
            var b1KEx = 0.5 * b1.mass * (b1.velocity.x * b1.velocity.x);
            var b1KEy = 0.5 * b1.mass * (b1.velocity.y * b1.velocity.y);
            var b2KEx = 0.5 * b2.mass * (b2.velocity.x * b2.velocity.x);
            var b2KEy = 0.5 * b2.mass * (b2.velocity.y * b2.velocity.y);
            var diffx = Math.abs(b1KEx - b2KEx);
            var diffy = Math.abs(b1KEy - b2KEy);
            if (!b1.static) {
                b1.velocity.x -= Math.sqrt(diffx / b2.mass);
                b1.velocity.y -= Math.sqrt(diffy / b2.mass);
            }
            if (!b2.static) {
                b2.velocity.x -= Math.sqrt(diffx / b1.mass);
                b2.velocity.y -= Math.sqrt(diffy / b1.mass);
            }
        };
        LitePhysicsManager.prototype.outOfBounds = function (body) {
            //left
            if (body.x <= this._worldBounds.x) {
                console.log('out of bounds left');
            }
            //right
            if (body.x >= this._worldBounds.width) {
                console.log('out of bounds right');
            }
            //down
            if (body.y >= this._worldBounds.height) {
                console.log('out of bounds down');
            }
            //up
            if (body.y <= this._worldBounds.y) {
                console.log('out of bounds up');
            }
        };
        return LitePhysicsManager;
    }(Lightning.Plugin));
    Lightning.LitePhysicsManager = LitePhysicsManager;
})(Lightning || (Lightning = {}));
