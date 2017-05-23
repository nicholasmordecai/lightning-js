/// <reference path="./../../reference.d.ts" />

/**
 * Scope Definitions
 * 
 */

namespace Lightning {
    export class LitePhysicsManager extends Plugin {

        protected game:Engine;
        private _enabled:boolean;
        private _paused:boolean;
        private _pools:{[key:string]:LitePhysicsPool};        
        private _worldBounds: { x: number, y: number, width: number, height: number };

        constructor(game: Engine) {
            super(game, true, true);
            this.game = game;
            this._worldBounds = { x: 0, y: 0, width: this.game.width, height: this.game.height };
        }

        /**
         * initalise / reset the properties when enabled, not constructed
         */
        public enablePhysics() {
            this._enabled = true;
            this._pools = {};
            this._paused = false;
        }

        public disable() {
            this._enabled = false;
        }

        protected update(dt:number) {
            
            if(!this._enabled) return;
            if(this._paused) return;

            for(let i in this._pools) {
                for(let body of this._pools[i].bodies) {
                    // this.outOfBounds(body);
                    this.checkWorldCollide(body);
                    this.updatePosition(body);
                    body.objRef.updateTransform();
                }
            }
        }

        public createPool(key:string, selfCollide:boolean = true, ...objects:Array<LitePhysicsBody>):LitePhysicsPool {
            if(this._pools[key] !== null || this._pools[key] !== undefined) {
                this._pools[key] = new LitePhysicsPool(selfCollide);
                for(let i of objects) {
                    this._pools[key].add(i);
                    return this._pools[key];
                }
                return this._pools[key];
            } else {
                console.info('Physics pool with key:', key, 'alread exists');
                return null;
            }
        }

        public removePool(key:string) {
            this._pools[key].destroy();
        }

        public pool(key:string) {
            return this._pools[key];
        }

        public updatePosition(body:LitePhysicsBody) {
            body.x += body.velocity.x;
            body.y += body.velocity.y;
            body.updateObjectRefPosition();
        }

        private checkWorldCollide(body:LitePhysicsBody) {
            //left
            if(body.x <= this._worldBounds.x) {
                body.velocity.x *= -1;
                console.log('right');
            } 
            //right
            if(body.x >= this._worldBounds.width) {
                body.velocity.x *= -1;
            }
            //down
            if(body.y <= this._worldBounds.height) {
                body.velocity.y *= -1;
            }
            //up
            if(body.y >= this._worldBounds.y) {
                body.velocity.y *= -1;
            }
        }

        private outOfBounds(body:LitePhysicsBody) {
            console.log(body.x, this._worldBounds.x)
            //left
            if(body.x <= this._worldBounds.x) {
                console.log('out of bounds left');
            }
            //right
            if(body.x >= this._worldBounds.width) {
                console.log('out of bounds right')
            }
            //down
            if(body.y >= this._worldBounds.height) {
                console.log('out of bounds down');
            }
            //up
            if(body.y <= this._worldBounds.y) {
                console.log('out of bounds up');
            }
        }
    }
}