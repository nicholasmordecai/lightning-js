/// <reference path="./../reference.d.ts" />

namespace Lightning {

    export class Engine extends EngineHelper {

        protected _renderer: PIXI.WebGLRenderer | PIXI.CanvasRenderer;
        protected _world: PIXI.Container;
        protected _hud:HUD = null;
        protected _ticker:PIXI.ticker.Ticker;
        protected _tweens = new TweenManager(this);
        protected _signals:Signals.SignalManager = new Signals.SignalManager(this);
        protected _stateManager:StateManager;
        protected _physicsManager:PhysicsManager
        
        /**
         * @description Engine constructor
         * 
         * @param {number} width
         * @param {number} height
         * @param {string} canvasId
         */
        constructor(width, height, canvasId:string = 'app') {
            super();

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

            let scale = window.devicePixelRatio;
            this._renderer.resize(width, height);

            // create the physicsManager 
            this._physicsManager = new PhysicsManager(this);

            // create the state StateManager
            this._stateManager = new StateManager(this);
            
            // init the ticker
            this._ticker = PIXI.ticker.shared;
            this._ticker.autoStart = true;
            this._ticker.add(this.update, this);
        }

        /**
         * @description Main entry for every update function. This is called by the ticker on every request frame update
         * 
         * @param {number} time
         * 
         * @returns {void}
         */ 
        update(time):void {
            this._physicsManager.update();
            this._tweens.update();
            this._stateManager.update();
            this._renderer.render(this._world);
        }

        /**
         * @description Start the ticker
         * 
         * @returns {boolean}
         */
        start():boolean {
            this._ticker.start();
            return true;
        }

        /**
         * @description Stop the ticker
         * 
         * @returns {boolean}
         */
        stop():boolean {
            this._ticker.stop();
            return true;
        }
    }
}