/// <reference path="./../../reference.d.ts" />

/**
 * Physice Lite Pool
 * 
 */

namespace Lightning {
    export class LitePhysicsCollisionEvent extends EventEmitter {

        private _isEnabled:boolean;
        private _oneWayCollision:boolean;
        private _b1:Array<LitePhysicsBody>;
        private _b2:Array<LitePhysicsBody>;
        private _destroyFlag:boolean;
        private _onCollideCallback:Array<{fn: Function, ctx:Object, params:Array<any>}>;

        constructor(objects1:Array<LitePhysicsBody>, objects2:Array<LitePhysicsBody>, oneWayCollision:boolean = false) {
            super();
            this._isEnabled = true;
            this._oneWayCollision = oneWayCollision;
            this._destroyFlag = false;
            this._onCollideCallback = [];
            this._b1 = objects1;
            this._b2 = objects2;
        }

        public onCollide(fn:Function, ctx:Object, ...params) {
            this._onCollideCallback.push({fn, ctx, params});
        }

        public collisionDetected(b1:LitePhysicsBody, b2:LitePhysicsBody) {
            for(let i of this._onCollideCallback) {
                i.fn.apply(i.ctx, [b1, b2, i.params]);
            }
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

        public get oneWayCollision():boolean {
            return this._oneWayCollision;
        }

        public set oneWayCollision(val:boolean) {
            this._oneWayCollision = val;
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

        public get bodies():Array<LitePhysicsBody> {
            return [].concat(this._b1, this._b2);
        }
    }
}
