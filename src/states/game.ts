/// <reference path="./../reference.d.ts" />

namespace Lightning {
    export namespace States {
        export class GameState extends State {

            private RADIANS:number = Math.PI / 180;
            private DEGREES:number = 180 / Math.PI;
            private isBegin;
            private mouseJoint;
            private _bodies:Array<any> = [];
            private _actors:PIXI.Container = new PIXI.Container();
            private _physicsBounds:Box2D.Dynamics.b2BodyDef;

            constructor(game:Engine) {
                super(game);
            }

            init(params) {
                this.game.collideOnWorldBounds();
                this.addChild(this._actors);
                
                let circleFixture	= new Box2D.Dynamics.b2FixtureDef();
                circleFixture.shape	= new Box2D.Collision.Shapes.b2CircleShape();
                circleFixture.density = 1;
                circleFixture.restitution = 0.7;
                
                for (var i = 0; i < 40; i++) {
                    setTimeout(() => {
                        
                        let ball = new UI.Sprite(PIXI.Texture.fromImage("assets/ball.png"));

                        this.game.physicsWorldBounds.position.Set(this.game.width / 2 / 100, this.game.height * 0.2 / 100);
                        let body = this.game.physics.CreateBody(this.game.physicsWorldBounds);
                        circleFixture.shape.SetRadius(ball.width / 200);
                        body.CreateFixture(circleFixture);

                        ball.body = body;
                        ball.anchor.x = ball.anchor.y = 0.5;
                        this._actors.addChild(ball);
                }, 1000 * i);
                    
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