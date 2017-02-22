/// <reference path="./../reference.d.ts" />

namespace Lightning {

    export class Engine {

        private _renderer: PIXI.WebGLRenderer | PIXI.CanvasRenderer;
        private _world: PIXI.Container;
        private _ticker:PIXI.ticker.Ticker;
        private _activateState:State = null;
        private _tweens = new Tween.TweenManager(this);
        private _signals:Signals.SignalManager = new Signals.SignalManager(this);
        private _physicsActive:boolean = false;
        private _physicsWorld:Box2D.Dynamics.b2World;
        private _physicsWorldBounds:Box2D.Dynamics.b2BodyDef;
        
        // game engine constructor
        constructor(width, height, canvasId:string = 'app') {

            if(!canvasId) {
                let viewCanvas = document.createElement('canvas');
                viewCanvas.id = 'app';
                document.getElementById('app-container').appendChild(viewCanvas);
            }
            
            this._renderer = PIXI.autoDetectRenderer(width, height, {resolution:window.devicePixelRatio});
            this._renderer.autoResize = true;
            this._world = new PIXI.Container();
            this._world.scale = new PIXI.Point(1 / window.devicePixelRatio, 1 / window.devicePixelRatio);
            this._world.interactive = true;

            document.getElementById('app-container').appendChild(this._renderer.view);

            let canvas = document.querySelector('canvas');
            let scale = window.devicePixelRatio;
            let renderer = PIXI.autoDetectRenderer(width * scale, height * scale, canvas);
            canvas.style.width = width + 'px';
            canvas.style.height = height + 'px';
            
            // init the ticker
            this._ticker = PIXI.ticker.shared;
            this._ticker.autoStart = true;
            this._ticker.add(this.update, this);
        }

        // gets called on update
        update(time):void {
            if(this._physicsActive) {
                this._physicsWorld.Step(1 / 60,  1, 1);
                this._physicsWorld.ClearForces();
            }
            if(this._activateState) {
                this._activateState.update();
            }
            this._tweens.update();
            this._renderer.render(this._world);
        }

        startState(state, ...params) {
            let nState = new state(this);
            this.initState(nState, params);
        }

        initState(state:State, params) {
            if(this._activateState === null) {
                this._world.addChild(state);
            } else {
                this._world.removeChild(this._activateState);
                this._world.addChild(state);
            }
            this._activateState = state;
            state.init(params);
        }

        startPhysics() {
            this._physicsWorld = new Box2D.Dynamics.b2World(new Box2D.Common.Math.b2Vec2(0, 10),  true);
            this._physicsActive = true;
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
            this._physicsWorldBounds.position.Set(9, this.height / 100 + 1);
            this.physics.CreateBody(this._physicsWorldBounds).CreateFixture(polyFixture);
            
            //left
            polyFixture.shape.SetAsBox(1, 100);
            this._physicsWorldBounds.position.Set(-1, 0);
            this.physics.CreateBody(this._physicsWorldBounds).CreateFixture(polyFixture);
            
            //right
            this._physicsWorldBounds.position.Set(this.height / 100, 0);
            this.physics.CreateBody(this._physicsWorldBounds).CreateFixture(polyFixture);
            this._physicsWorldBounds.type = Box2D.Dynamics.b2Body.b2_dynamicBody;

            let body = Box2D.Dynamics.b2Body;
            
        }

        public set backgroundColor(val:number) {
            this._renderer.backgroundColor = val;
        }

        public set state(val:State) {
            this._activateState = val;
        }

        public get world():PIXI.Container {
            return this._world;
        }

        public get width():number {
            return this._renderer.width;
        }

        public get height():number {
            return this._renderer.height;
        }

        public get center():{x:number, y:number} {
            return {x: this.width * 0.5, y: this.height * 0.5}
        }

        public get renderer():PIXI.CanvasRenderer | PIXI.WebGLRenderer {
            return this._renderer;
        }

        public get tweens():Tween.TweenManager {
            return this._tweens;
        }

        public get signals():Signals.SignalManager {
            return this._signals;
        }

        public get physics():Box2D.Dynamics.b2World {
            return this._physicsWorld;
        }

        public get physicsWorldBounds():Box2D.Dynamics.b2BodyDef {
            return this._physicsWorldBounds
        }
    }
}