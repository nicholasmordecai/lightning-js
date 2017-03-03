/// <reference path="./../reference.d.ts" />

namespace Lightning {

    export class Engine {

        private _renderer: PIXI.WebGLRenderer | PIXI.CanvasRenderer;
        private _world: PIXI.Container;
        private _hud:HUD = null;
        private _ticker:PIXI.ticker.Ticker;
        private _activateState:State = null;
        private _tweens = new Tween.TweenManager(this);
        private _signals:Signals.SignalManager = new Signals.SignalManager(this);
        private _stateManager:StateManager;
        private _physicsManager:PhysicsManager
        
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
            let i = new Input(this);

            document.getElementById('app-container').appendChild(this._renderer.view);

            let canvas = document.querySelector('canvas');
            let scale = window.devicePixelRatio;
            let renderer = PIXI.autoDetectRenderer(width * scale, height * scale, canvas);
            canvas.style.width = width + 'px';
            canvas.style.height = height + 'px';

            // create the physicsManager 
            this._physicsManager = new PhysicsManager(this);

            // create the state StateManager
            this._stateManager = new StateManager(this);
            
            // init the ticker
            this._ticker = PIXI.ticker.shared;
            this._ticker.autoStart = true;
            this._ticker.add(this.update, this);
        }

        // gets called on update
        update(time):void {
            this._physicsManager.update();
            this._tweens.update();
            this._stateManager.update();
            this._renderer.render(this._world);
        }

        generateTexture(...params):any {
            let t:Texture | Array<Texture> = [];
            if(params.length > 1) {
                for(let i of params) {
                    t.push(this._renderer.generateTexture(i));
                }
            } else {
                t = this._renderer.generateTexture(params[0]);
            }
            return t;
        }

        goFullscreen() {
            if(document.documentElement.requestFullscreen) {
                document.documentElement['requestFullscreen']();
            } else if(document.documentElement['mozRequestFullScreen']) {
                document.documentElement['mozRequestFullScreen']();
            } else if(document.documentElement.webkitRequestFullscreen) {
                document.documentElement['webkitRequestFullscreen']();
            } else if(document.documentElement['msRequestFullscreen']) {
                document.documentElement['msRequestFullscreen']();
            }
        }

        texture(...params):any {
            let t:Texture | Array<Texture> = [];
            if(params.length > 1) {
                for(let i of params) {
                    t.push(Texture.from(i));
                }
            } else {
                t = Texture.from(params[0]);
            }
            return t;
        }

        public set backgroundColor(val:number) {
            this._renderer.backgroundColor = val;
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

        public get states():StateManager {
            return this._stateManager;
        }

        /**
         * think about refactoring this
         */
        public get hud():HUD {
            if(!this._hud) {
                this._hud = new HUD(this);
            }
            return this._hud;
        }
    }
}

/**
 * Start Ticker
 * Pause Ticker
 * Ticker FPS?
 * Individual State FPS?
 */