/// <reference path="./../../reference.d.ts" />

/**
 * Physice Lite Group
 * 
 */

namespace Lightning {
    export class LitePhysicsGroup {

        private _active:boolean;
        private _bodies:Array<LitePhysicsBody>;

        constructor() {
            this.bodies = [];
            this._active = true;
        }

        public addBody(...bodies:Array<LitePhysicsBody>):Array<LitePhysicsBody> {
            for(let body of bodies) {
                this._bodies.push(body);
            }
            return bodies;
        }

        public removeBody(...bodies:Array<LitePhysicsBody>):Array<LitePhysicsBody> {
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

        public get bodies():Array<LitePhysicsBody> {
            return this._bodies;
        }

        public set bodies(val:Array<LitePhysicsBody>) {
            this._bodies = val;
        }

        public get active():boolean {
            return this._active;
        }

        public set active(val:boolean) {
            this._active = val;
        }

    }
}
