/// <reference path="./../../reference.d.ts" />

namespace Lightning {
    export class PhysicsManager {
        
        protected game:Engine;
        protected _active:boolean;
        private _physicsWorld:Box2D.Dynamics.b2World;
        private _physicsWorldBounds:Box2D.Dynamics.b2BodyDef;

        private scaleFactor:number = 100;

        constructor(game:Engine) {
            this.game = game;
            this._active = false;
        }

        public update() {
            if(this._active) {
                this._physicsWorld.Step(1 / 60  , 10 , 10 );
                this._physicsWorld.DrawDebugData();
                this._physicsWorld.ClearForces();

                let next = this._physicsWorld.GetBodyList();
                while(next !== null) {
                    let current = next; 
                    next = next.GetNext();
                    if(current['sprite']) {
                        current['sprite'].x = current.GetPosition().x * 100;
                        current['sprite'].y = current.GetPosition().y * 100;
                        current['sprite'].rotation = current.GetAngle();
                    }
                }
            }
        }

        public startPhysics() {
            this._physicsWorld = new Box2D.Dynamics.b2World(new Box2D.Common.Math.b2Vec2(0, 4),  true);
            this.collideOnWorldBounds();
            this.setupDebugDraw();
            this._active = true;
        }

        public setupDebugDraw() {
            var b2DebugDraw = Box2D.Dynamics.b2DebugDraw
            var debugDraw = new b2DebugDraw();
            var canvas = <HTMLCanvasElement>document.getElementById("box2d-debug");
            var ctx = canvas.getContext("2d");
            debugDraw.SetSprite(ctx);
            debugDraw.SetFillAlpha(0.3);
            debugDraw.SetDrawScale(100);
            debugDraw.SetLineThickness(1.0);
            debugDraw.SetFlags(
              b2DebugDraw.e_shapeBit | 
               b2DebugDraw.e_jointBit);
            this._physicsWorld.SetDebugDraw(debugDraw);
        };

        public createBody(displayObject, shape: "square" | "circle" | "polygon" = "square", vertices: Array<number> = []) {
            let bodyDef = new Box2D.Dynamics.b2BodyDef;
            bodyDef.type = Box2D.Dynamics.b2Body.b2_dynamicBody;
            bodyDef.position.Set(displayObject.x / 100, displayObject.y / 100);
            bodyDef.angle = 0;

            let fixtureDef = new Box2D.Dynamics.b2FixtureDef();
            fixtureDef.density = 1;
            fixtureDef.friction = 0.9;
            fixtureDef.restitution = 0.7;
            if(shape === "square") {
                fixtureDef.shape = new Box2D.Collision.Shapes.b2PolygonShape();
                fixtureDef.shape.SetAsBox((displayObject.width / 2) / 100, (displayObject.height / 2) / 100);
            } else if (shape === "circle") {
                fixtureDef.shape = new Box2D.Collision.Shapes.b2CircleShape((displayObject.width / 2) / 100);            
            } else if (shape === "polygon") {
                let len = vertices.length;

                if(len < 6) {
                    console.error('Not enough vertices were passed. At least 3 vertices are required to create a polygon');
                    return;
                }

                if(Maths.isEven(len)) {
                    console.error('You did not pass an even number of vertices:', vertices);
                    return;
                }

                let b2Vecs: Array<Box2D.Common.Math.b2Vec2> = [];

                for(let i = 0; i < len; i+= 2) {
                    let vector = new Box2D.Common.Math.b2Vec2();
                    vector.Set(vertices[i] * 0.01, vertices[(i + 1)] * 0.01);
                    b2Vecs.push(vector);
                }

                let shape = new Box2D.Collision.Shapes.b2PolygonShape();
                shape.SetAsArray(b2Vecs, b2Vecs.length);
                fixtureDef.shape = shape;
                
            } else {
               console.error('Incorrect shape was passed. Please use "square, circle, polygon" - note, default is square');
               return; 
            }

            let body = this._physicsWorld.CreateBody(bodyDef);
            body['sprite'] = displayObject;
            body.CreateFixture(fixtureDef);

            return body;
        }

        public createLine(x: number, y: number, p1x: number, p1y: number, p2x: number, p2y: number) {
            var bodyDef = new Box2D.Dynamics.b2BodyDef;
            bodyDef.type = Box2D.Dynamics.b2Body.b2_staticBody;
            bodyDef.position.SetV(new Box2D.Common.Math.b2Vec2(x / 100, y / 100));
            
            let fixtureDef = new Box2D.Dynamics.b2FixtureDef();
            fixtureDef.density = 1;
            fixtureDef.shape = new Box2D.Collision.Shapes.b2PolygonShape();
            fixtureDef.shape.SetAsEdge(new Box2D.Common.Math.b2Vec2(p1x / 100, p1y / 100), new Box2D.Common.Math.b2Vec2(p2x / 100, p2y / 100));
            
            let body = this._physicsWorld.CreateBody(bodyDef);
            body.CreateFixture(fixtureDef);
        }

        collideOnWorldBounds():void {
            this._physicsWorldBounds = new Box2D.Dynamics.b2BodyDef();
            let polyFixture:Box2D.Dynamics.b2FixtureDef = new Box2D.Dynamics.b2FixtureDef();
            polyFixture.shape = new Box2D.Collision.Shapes.b2PolygonShape();
            polyFixture.density = 1;

            this._physicsWorldBounds = new Box2D.Dynamics.b2BodyDef();
            this._physicsWorldBounds.type = Box2D.Dynamics.b2Body.b2_staticBody;

            // top
            polyFixture.shape.SetAsBox(this.game.width, 0.01);
            this._physicsWorldBounds.position.Set(0, 0);
            this.physics.CreateBody(this._physicsWorldBounds).CreateFixture(polyFixture);
        
            // down
            this._physicsWorldBounds.position.Set(0, this.game.height / 100);
            this.physics.CreateBody(this._physicsWorldBounds).CreateFixture(polyFixture);
            
            // left
            polyFixture.shape.SetAsBox(0.01, this.game.height / 100);
            this._physicsWorldBounds.position.Set(0, 0);
            this.physics.CreateBody(this._physicsWorldBounds).CreateFixture(polyFixture);
            
            // right
            this._physicsWorldBounds.position.Set(this.game.width / 100, this.game.height / 100);
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