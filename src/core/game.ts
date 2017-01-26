/// <reference path="./../reference.d.ts" />

namespace Lightening {

    export class Engine {

        private _renderer: PIXI.WebGLRenderer | PIXI.CanvasRenderer;
        private _world: PIXI.Container;
        private _ticker:PIXI.ticker.Ticker;
        private _activateState:State = null;
        private _tweens = new Tween.TweenManager(this);
        private _stats = new Stats();
        private _signals:Signals.SignalManager = new Signals.SignalManager(this);

        // game engine constructor
        constructor(width, height) {
            this._renderer = PIXI.autoDetectRenderer(width, height);
            this._world = new PIXI.Container();
            this._world.interactive = true;
            this._world.on('mousedown', () => {
                console.log('container mousedown');
            });

            document.getElementById('app-container').appendChild(this._renderer.view);
            
            // init the ticker
            this._ticker = PIXI.ticker.shared;
            this._ticker.autoStart = true;
            this._ticker.add(this.update, this);

            this.resize();
            this._stats.setMode(0);
            document.getElementById('app-container').appendChild(this._stats.domElement);
        }

        // gets called on update
        update(time):void {
            this._stats.begin();
            this._activateState.update();
            this._tweens.update();
            this._renderer.render(this._world);
            this._stats.end();
        }

        resize() {
            window.onresize = (event) => {
                let w:number = window.innerWidth;
                let h:number = window.innerHeight;    
 
                this._renderer.view.style.width = w + "px";    
                this._renderer.view.style.height = h + "px";    
 
                this._renderer.resize(w, h);
            }
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

        public get renderer():PIXI.CanvasRenderer | PIXI.WebGLRenderer {
            return this._renderer;
        }

        public get tweens():Tween.TweenManager {
            return this._tweens;
        }

        public get signals():Signals.SignalManager {
            return this._signals;
        }
    }
}