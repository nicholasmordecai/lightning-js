/// <reference path="./../reference.d.ts" />

namespace Lightening {
    export namespace States {
        export class GameState extends State {

            private RADIANS:number = Math.PI / 180;
            private DEGREES:number = 180 / Math.PI;
            private isBegin;
            private mouseJoint;
            private world;
            private _bodies:Array<any> = [];
            private _actors:Array<any> = [];

            constructor(game:Engine) {
                super(game);
            }

            init(params) {
                this.world = new Box2D.Dynamics.b2World(new Box2D.Common.Math.b2Vec2(0, 10),  true);
        
                const polyFixture = new Box2D.Dynamics.b2FixtureDef();
                polyFixture.shape = new Box2D.Collision.Shapes.b2PolygonShape();
                polyFixture.density = 1;
                
                const circleFixture	= new Box2D.Dynamics.b2FixtureDef();
                circleFixture.shape	= new Box2D.Collision.Shapes.b2CircleShape();
                circleFixture.density = 1;
                circleFixture.restitution = 0.7;

                const bodyDef = new Box2D.Dynamics.b2BodyDef();
                bodyDef.type = Box2D.Dynamics.b2Body.b2_staticBody;
            
                //down
                polyFixture.shape.SetAsBox(10, 1);
                bodyDef.position.Set(9, this.game.height / 100 + 1);
                this.world.CreateBody(bodyDef).CreateFixture(polyFixture);
                
                //left
                polyFixture.shape.SetAsBox(1, 100);
                bodyDef.position.Set(-1, 0);
                this.world.CreateBody(bodyDef).CreateFixture(polyFixture);
                
                //right
                bodyDef.position.Set(this.game.height / 100 + 1, 0);
                this.world.CreateBody(bodyDef).CreateFixture(polyFixture);
                bodyDef.type = Box2D.Dynamics.b2Body.b2_dynamicBody;
                
                for (var i = 0; i < 40; i++)
                {
                    bodyDef.position.Set(this.rndRange(0, this.game.width) / 100, -this.rndRange(50, 5000) / 100);
                    var body = this.world.CreateBody(bodyDef);
                    var s;
                    if (Math.random() > 0.5)
                    {
                        s = this.rndRange(70, 100);
                        circleFixture.shape.SetRadius(s / 2 / 100);
                        body.CreateFixture(circleFixture);
                        this._bodies.push(body);
                        
                        var ball = new PIXI.Sprite(PIXI.Texture.fromImage("assets/ball.png"));
                        this.addChild(ball);
                        ball['i'] = i;
                        ball.anchor.x = ball.anchor.y = 0.5;
                        ball.scale.x = ball.scale.y = s / 100;
                        
                        this._actors[this._actors.length] = ball;
                    }
                    else
                    {
                        s = this.rndRange(50, 100);
                        polyFixture.shape.SetAsBox(s / 2 / 100, s / 2 / 100);
                        body.CreateFixture(polyFixture);
                        this._bodies.push(body);
                        
                        var box = new PIXI.Sprite(PIXI.Texture.fromImage("assets/box.jpg"));
                        this.addChild(box);
                        box['i'] = i;
                        box.anchor.x = box.anchor.y = 0.5;
                        box.scale.x = s / 100;
                        box.scale.y = s / 100;
                        
                        this._actors[this._actors.length] = box;
                    }
                }
        
            }

            rndRange(min, max)
            {
                return min + (Math.random() * (max - min));
            }

            rndIntRange(min, max)
            {
                return Math.round(this.rndRange(min, max));
            }

            toRadians(degrees)
            {
                return degrees * this.RADIANS;
            }

            toDegrees(radians)
            {
                return radians * this.DEGREES;
            }

            hitTest = function(x1, y1, w1, h1, x2, y2, w2, h2)
            {
                if (x1 + w1 > x2)
                    if (x1 < x2 + w2)
                        if (y1 + h1 > y2)
                            if (y1 < y2 + h2)
                                return true;

                return false;
            }

            create() {
            
            }

            update() {
                        
                this.world.Step(1 / 60,  3,  3);
                this.world.ClearForces();
                
                const n = this._actors.length;
                for (var i = 0; i < n; i++) {
                    var body  = this._bodies[i];
                    var actor = this._actors[i];
                    var position = body.GetPosition();
                    actor.position.x = position.x * 100;
                    actor.position.y = position.y * 100;
                    actor.rotation = body.GetAngle();
                }           
            }
        }
    }
}