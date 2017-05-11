/// <reference path="./../reference.d.ts" />

/**
 * A helper class for the 'Game'. It's used for all non essential public functions. 
 * This is mostly used to keep the actual engine class neat, slim and easier to develop
 */

namespace Lightning {
    export class EngineHelper {

        protected _dpr:number;
        protected _renderer: PIXI.WebGLRenderer | PIXI.CanvasRenderer;
        protected _world: Lightning.Group;
        protected _hud:HUD;
        protected _ticker:PIXI.ticker.Ticker;
        protected _stateManager:StateManager;
        protected _device:Device;
        protected _physicsManager:PhysicsManager
        protected _eventEmitter:EventEmitter;
        protected _storageManager:StorageManager;
        protected _serviceManager:ServiceManager;
        protected _tweenManager:TweenManeger;
        protected _scaleManager:Scale;
        protected _debug:Debug;

        public displayInfo() {
            console.log(`%c
 __    _     _   _       _         
|  |  |_|___| |_| |_ ___|_|___ ___ 
|  |__| | . |   |  _|   | |   | . |
|_____|_|_  |_|_|_| |_|_|_|_|_|_  |
        |___|                 |___|
             `, "font-family:monospace");
             console.log('Lightning-js | version : 0.4.5');
        }

        public generateTexture(...params):any {
            let t:Texture | Array<Texture> = [];
            if(params.length > 1) {
                for(let i of params) {
                    t.push(this._renderer.generateTexture(i, PIXI.SCALE_MODES.LINEAR, this._scaleManager.devicePixelRatio));
                }
            } else {
                t = this._renderer.generateTexture(params[0], PIXI.SCALE_MODES.LINEAR, this._scaleManager.devicePixelRatio);
            }
            return t;
        }

        public goFullScreen() {
            this._scaleManager.goFullScreen();
        }

        public texture(...params):any {
            let t:Texture | Array<Texture> = [];
            if(params.length > 1) {
                for(let i of params) {
                    t.push(Texture.from(i), );
                }
            } else {
                t = Texture.from(params[0]);
            }
            return t;
        }

        public enableDebug(game:Engine) {
            this._debug = new Debug(game);
        }

        public recycle(obj:any) {
            obj = null;
        }

        public set backgroundColor(val:number) {
            this._renderer.backgroundColor = val;
        }

        public get world():Lightning.Group {
            return this._world;
        }

        public get width():number {
            return this._renderer.width / this._scaleManager.devicePixelRatio;
        }

        public get height():number {
            return this._renderer.height / this._scaleManager.devicePixelRatio;
        }

        public get center():{x:number, y:number} {
            return {x: this.width * 0.5, y: this.height * 0.5}
        }

        public get renderer():PIXI.CanvasRenderer | PIXI.WebGLRenderer {
            return this._renderer;
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

        public get dpr():number { 
            return this._dpr;
        }

        public set dpr(val:number) {
            this._dpr = val;
        }

        public get storage():StorageManager {
            return this._storageManager;
        }

        public get events():EventEmitter {
            return this._eventEmitter;
        }

        public get ticker():PIXI.ticker.Ticker {
            return this._ticker;
        }

        public service(key:string):Service {
            return this._serviceManager.getService(key);
        }

        public get services():ServiceManager {
            return this._serviceManager;
        }

        public get debug():Debug {
            return this._debug;
        }

        public get tweens():TweenManeger {
            return this._tweenManager;
        }

        public get scale():Scale {
            return this._scaleManager;
        }
        /**
         * @description recursive pattern to loop over every child and recursivly loop over all of it's children and returning a count of them all from the root object.
         * You must specify an object root
         * 
         * Example: 
         * this.game.debug.displayCount(this.game.world);
         * this.game.debug.displayCount(myContainer);
         * 
         * @see {Lightning.Engine}
         * 
         * @param rootObject 
         * @returns {number}
         */
        public displayCount(rootObject:Lightning.DisplayObject):number {
            return ((d) => {
                var c = 0;
                var r = function(d:Lightning.DisplayObject) {
                    c++;
                    for(let i of d['children']) {
                        r(i);
                    }
                }
                r(d);
                return c;
            })(rootObject);
        }

        /**
         * @description recursive pattern to loop over every child and recursivly loop over all of it's children and returning an array of display objects that conform to any references.
         * You may pass multiple references into a spread operator
         * You can specify the starting root object
         * 
         * Example: 
         * this.game.getObjectsByReference(this.game.world, 'alive', 'jimmy', 'fubar');
         * this.game.getObjectsByReference(myContainer, 'onlyOneReference');
         * 
         * @see {Lightning.Engine}
         * 
         * @param rootObject 
         * @returns {number}
         */
        public getObjectsByReference(rootObject:Lightning.DisplayObject, ... refs):Array<Lightning.DisplayObject> {
            return ((d) => {
                let result:Array<Lightning.DisplayObject> = [];
                var r = function(d:Lightning.DisplayObject) {
                    let ref:string = d.globalRef;
                    for(var i of refs) {
                        if(ref === i) {
                            result.push(d);
                        }
                    }
                    for(var t of d['children']) {
                        r(t);
                    }
                }
                r(d);
                return result;
            })(rootObject);
        }

        public sizeof(object:any):number {
            var objectList = [];
            var stack = [object];
            var bytes = 0;

            while ( stack.length ) {
                var value = stack.pop();

                if ( typeof value === 'boolean' ) {
                    bytes += 4;
                }
                else if ( typeof value === 'string' ) {
                    bytes += value.length * 2;
                }
                else if ( typeof value === 'number' ) {
                    bytes += 8;
                }
                else if
                (
                    typeof value === 'object'
                    && objectList.indexOf( value ) === -1
                )
                {
                    objectList.push( value );

                    for( var i in value ) {
                        stack.push( value[ i ] );
                    }
                }
            }
            return bytes;
        }

    }
}