/// <reference path="./../../reference.d.ts" />

/**
 * Scope Definitions
 * 
 * Pool = An array of physics bodies that all collide with eachother
 * Group = An array of physics bodies that don't collide with eachother
 * 
 * 
 */

namespace Lightning {
    export class LitePhysicsManager extends Plugin {

        protected game:Engine;
        private _enabled:boolean;
        private _paused:boolean;
        private _pools:{[key:string]:Array<DisplayObject>};
        private _groups:{[key:string]:Array<DisplayObject>};
        

        constructor(game:Engine) {
            super(game, true, true);
            this.game = game;

            this._enabled = false;
        }

        /**
         * initalise / reset the properties when enabled, not constructed
         */
        public enable() {
            this._enabled = true;
            this._pools = {};
            this._paused = false;
        }

        public disable() {
            this._enabled = false;
        }

        protected update() {
            if(!this._enabled) return;
            if(this._paused) return;
        }

        public createPool(key:string, ...objects):Array<DisplayObject> {
            if(this._pools[key] !== null || this._pools[key] !== undefined) {
                this._pools[key] = [];
                for(let i of objects) {
                    this._pools[key].push(i);
                }
                return this._pools[key];
            } else {
                console.info('Physics pool with key:', key, 'alread exists');
                return null;
            }
        }

        public pool(key:string) {
            return this._pools[key];
        }


    }
}