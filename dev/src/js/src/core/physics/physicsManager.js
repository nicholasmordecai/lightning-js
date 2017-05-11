/// <reference path="./../../reference.d.ts" />
var Lightning;
(function (Lightning) {
    var PhysicsManager = (function () {
        function PhysicsManager(game) {
            this.game = game;
            this._active = false;
        }
        PhysicsManager.prototype.update = function () {
            if (this._active) {
                // start updating the physics stuff here
            }
        };
        PhysicsManager.prototype.startPhysics = function () {
            this._physicsWorld = new Box2D.Dynamics.b2World(new Box2D.Common.Math.b2Vec2(0, 10), true);
        };
        PhysicsManager.prototype.collideOnWorldBounds = function () {
            this._physicsWorldBounds = new Box2D.Dynamics.b2BodyDef();
            var polyFixture = new Box2D.Dynamics.b2FixtureDef();
            polyFixture.shape = new Box2D.Collision.Shapes.b2PolygonShape();
            polyFixture.density = 1;
            this._physicsWorldBounds = new Box2D.Dynamics.b2BodyDef();
            this._physicsWorldBounds.type = Box2D.Dynamics.b2Body.b2_staticBody;
            //down
            polyFixture.shape.SetAsBox(10, 1);
            this._physicsWorldBounds.position.Set(9, this.game.height / 100 + 1);
            this.physics.CreateBody(this._physicsWorldBounds).CreateFixture(polyFixture);
            //left
            polyFixture.shape.SetAsBox(1, 100);
            this._physicsWorldBounds.position.Set(-1, 0);
            this.physics.CreateBody(this._physicsWorldBounds).CreateFixture(polyFixture);
            //right
            this._physicsWorldBounds.position.Set(this.game.height / 100, 0);
            this.physics.CreateBody(this._physicsWorldBounds).CreateFixture(polyFixture);
            this._physicsWorldBounds.type = Box2D.Dynamics.b2Body.b2_dynamicBody;
            var body = Box2D.Dynamics.b2Body;
        };
        Object.defineProperty(PhysicsManager.prototype, "physics", {
            get: function () {
                return this._physicsWorld;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PhysicsManager.prototype, "physicsWorldBounds", {
            get: function () {
                return this._physicsWorldBounds;
            },
            enumerable: true,
            configurable: true
        });
        return PhysicsManager;
    }());
    Lightning.PhysicsManager = PhysicsManager;
})(Lightning || (Lightning = {}));
