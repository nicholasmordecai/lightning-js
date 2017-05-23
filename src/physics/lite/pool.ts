/// <reference path="./../../reference.d.ts" />

/**
 * Physice Lite Pool
 * 
 */

namespace Lightning {
    export class LitePhysicsPool {

        private _enabled:boolean;
        private _bodies:Array<LitePhysicsBody>;
        private _selfCollide:boolean;
        private _destroyFlag:boolean;

        constructor(selfCollide:boolean) {
            this._enabled = true;
            this._bodies = [];
            this._selfCollide = selfCollide;
            this._destroyFlag = false;
        }

        public add(...bodies:Array<LitePhysicsBody>):Array<LitePhysicsBody> {
            for(let body of bodies) {
                this._bodies.push(body);
            }
            return bodies;
        }

        public destroy() {
            for(let body of this._bodies) {
                body.destroyFlag = true;
            }
            this._destroyFlag = true;
        }

        public remove(...bodies:Array<LitePhysicsBody>):Array<LitePhysicsBody> {
            let removed:Array<LitePhysicsBody> = [];
            for(let body of bodies) {
                for(var i = this._bodies.length -1; i >= 0; i--) {
                    if(this._bodies[i] === body) {
                        removed.push(this._bodies.splice(i, 1)[0]);
                    }
                }
            }
            return removed;
        }

        public get enabled():boolean {
            return this._enabled;
        }

        public set enabled(val:boolean) {
            this._enabled = val;
        }

        public get selfCollide():boolean {
            return this.selfCollide;
        }

        public set selfCollide(val:boolean) {
            this.selfCollide = val;
        }

        public get bodies():Array<LitePhysicsBody> {
            return this._bodies;
        }

        public set bodies(val:Array<LitePhysicsBody>) {
            this._bodies = val;
        }



    }
}
