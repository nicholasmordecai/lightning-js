/// <reference path="./../../reference.d.ts" />

namespace Lightning {
    export class PhysicsManager {
        
        protected game:Engine;
        protected _active:boolean;
        private _physicsWorld:Box2D.Dynamics.b2World;
        private _physicsWorldBounds:Box2D.Dynamics.b2BodyDef;

        constructor(game:Engine) {
            this.game = game;
            this._active = false;
        }

        update() {
            if(this._active) {
                // start updating the physics stuff here
            }
        }

        startPhysics() {
            this._physicsWorld = new Box2D.Dynamics.b2World(new Box2D.Common.Math.b2Vec2(0, 10),  true);
        }

        collideOnWorldBounds():void {
            this._physicsWorldBounds = new Box2D.Dynamics.b2BodyDef();
            let polyFixture:Box2D.Dynamics.b2FixtureDef = new Box2D.Dynamics.b2FixtureDef();
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

            let body = Box2D.Dynamics.b2Body;
        }

        public get physics():Box2D.Dynamics.b2World {
            return this._physicsWorld;
        }

        public get physicsWorldBounds():Box2D.Dynamics.b2BodyDef {
            return this._physicsWorldBounds
        }
    }
}