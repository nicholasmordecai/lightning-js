/// <reference path="./../../reference.d.ts" />

/**
 * Physice Lite Pool
 * 
 */

namespace Lightning {
    export class LitePhysicsCollisionEvent extends EventEmitter {

        private _isEnabled:boolean;
        private _b1:Array<LitePhysicsBody>;
        private _b2:Array<LitePhysicsBody>;

        private _destroyFlag:boolean;

        constructor(objects1:Array<LitePhysicsBody>, objects2:Array<LitePhysicsBody>) {
            super();
            this._isEnabled = true;
            this._destroyFlag = false;
            this._b1 = objects1;
            this._b2 = objects2;

            this.create('collide');
        }

        public destroy() {
            for(let body of this._b1) {
                body.destroyFlag = true;
            }

            for(let body of this._b2) {
                body.destroyFlag = true;
            }
            this._destroyFlag = true;
        }

        public get enabled():boolean {
            return this._isEnabled;
        }

        public set enabled(val:boolean) {
            this._isEnabled = val;
        }

        public get b1():Array<LitePhysicsBody> {
            return this._b1;
        }

        public set b1(val:Array<LitePhysicsBody>) {
            this._b1 = val;
        }

        public get b2():Array<LitePhysicsBody> {
            return this._b2;
        }

        public set b2(val:Array<LitePhysicsBody>) {
            this._b2 = val;
        }
    }
}
