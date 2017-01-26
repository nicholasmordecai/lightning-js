/// <reference path="./../reference.d.ts" />

namespace Lightening {
    export namespace States {
        export class GameState extends State {

            private RADIANS:number = Math.PI / 180;
            private DEGREES:number = 180 / Math.PI;
            private isBegin;
            private mouseJoint;
            private _bodies:Array<any> = [];
            private _actors:PIXI.Container = new PIXI.Container();

            constructor(game:Engine) {
                super(game);
            }

            init(params) {

                this.addChild(this._actors);
        
                const polyFixture:Box2D.Dynamics.b2FixtureDef = new Box2D.Dynamics.b2FixtureDef();
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
                this.game.physics.CreateBody(bodyDef).CreateFixture(polyFixture);
                
                //left
                polyFixture.shape.SetAsBox(1, 100);
                bodyDef.position.Set(-1, 0);
                this.game.physics.CreateBody(bodyDef).CreateFixture(polyFixture);
                
                //right
                bodyDef.position.Set(this.game.height / 100, 0);
                this.game.physics.CreateBody(bodyDef).CreateFixture(polyFixture);
                bodyDef.type = Box2D.Dynamics.b2Body.b2_dynamicBody;
                
                for (var i = 0; i < 40; i++)
                {
                    bodyDef.position.Set(this.rndRange(0, this.game.width) / 100, -this.rndRange(50, 5000) / 100);
                    var body = this.game.physics.CreateBody(bodyDef);
                    circleFixture.shape.SetRadius(0.5);
                    body.CreateFixture(circleFixture);
                    var ball = new UI.Sprite(PIXI.Texture.fromImage("assets/ball.png"));
                    ball.body = body;
                    ball.anchor.x = ball.anchor.y = 0.5;
                    this._actors.addChild(ball);
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

            create() {
            
            }

            update() {
                for(let actor of this._actors.children) {
                    actor.x = actor['body'].GetPosition().x * 100;
                    actor.y = actor['body'].GetPosition().y * 100;
                    actor.rotation = actor['body']['GetAngle']();
                }
            }
        }
    }
}