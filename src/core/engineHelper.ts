/// <reference path="./../reference.d.ts" />

/**
 * A helper class for the 'Game'. It's used for all non essential public functions. 
 * This is mostly used to keep the actual engine class neat, slim and easier to develop
 */

namespace Lightning {
    export class EngineHelper {

        protected _renderer: PIXI.WebGLRenderer | PIXI.CanvasRenderer;
        protected _world: PIXI.Container;
        protected _hud;
        protected _ticker:PIXI.ticker.Ticker;
        protected _activateState;
        protected _tweens;
        protected _signals:Signals.SignalManager;
        protected _stateManager:StateManager;
        protected _physicsManager:PhysicsManager

        public generateTexture(...params):any {
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

        public goFullscreen() {
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

        public texture(...params):any {
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

        public get tweens():TweenManager {
            return this._tweens;
        }

        public get signals():Signals.SignalManager {
            return this._signals;
        }

        public get states():StateManager {
            return this._stateManager;
        }

        public set fps(fps:number) {
            this._ticker.FPS = fps;
        }

        public get fps():number {
            return this._ticker.FPS;
        }

        public get minFPS():number {
            return this._ticker.minFPS;
        }

        public get elapsedTime():number {
            return this._ticker.elapsedMS;
        }

        public get deltaTime():number {
            return this._ticker.deltaTime;
        }

        public get lastTime():number {
            return this._ticker.lastTime;
        }

        /**
         * think about refactoring this
         */
        // public get hud():HUD {
        //     if(!this._hud) {
        //         this._hud = new HUD(this);
        //     }
        //     return this._hud;
        // }
    }
}