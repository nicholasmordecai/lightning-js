/// <reference path="./../../reference.d.ts" />

/**
 * TODO
 * 
 * Body acceleration
 * Calculate drag when calculating velocity
 * Create local gravity pools
 * Calculate restitution on bounce
 * Fix for when two bodies become attached 
 *      use AABB collision resolution and check the bodies are still moving towards eachother
 * Fix some bodies passing straight through
 *      I think this is because when a body becomes attached, the maximum amountn of events a being triggered
 * Apply mass to bodies
 * 
 */

namespace Lightning {
    export class LitePhysicsManager extends Plugin {

        protected game:Engine;
        private _enabled:boolean;
        private _paused:boolean;
        private _pools:{[key:string]:LitePhysicsPool};        
        private _collisionEvents:{[key:string]:LitePhysicsCollisionEvent};
        private _worldBounds: { x: number, y: number, width: number, height: number };
        private _gravity:iVector;

        constructor(game: Engine) {
            super(game, true, true);
            this.game = game;
            this._worldBounds = { x: 0, y: 0, width: this.game.width, height: this.game.height };
            this._gravity = {x: 0, y: 0.1};
        }

        /**
         * initalise / reset the properties when enabled, not constructed
         */
        public enablePhysics() {
            this._enabled = true;
            this._pools = {};
            this._collisionEvents = {};
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
                    if(body.collideOnWorldBounds) {
                        this.checkWorldCollide(body);
                    }
                    
                    if(body.gravityEnabled) {
                        this.calculateGravity(body);
                    }
                    
                    this.updatePosition(body);
                }
            }

            for(let i in this._collisionEvents) {
                this.checkCollisions(this._collisionEvents[i]);
                
                for(let body of this._collisionEvents[i].bodies) {
                    if(body.collideOnWorldBounds) {
                        this.checkWorldCollide(body);
                    }
                    
                    if(body.gravityEnabled) {
                        this.calculateGravity(body);
                    }
                    
                    this.updatePosition(body);
                }
            }

            for(let i in this._pools) {
                for(let body of this._pools[i].bodies) {
                    if(body.destroyFlag === true) {
                        body.objRef.destroy();
                        this._pools[i].remove(body);
                    }
                }
            }

            for(let i in this._collisionEvents) {
                for(let body of this._collisionEvents[i].bodies) {
                    if(body.destroyFlag === true) {
                        body.objRef.destroy();
                        this._pools[i].remove(body);
                    }
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

        public createCollisionEvent(key:string, objects1, objects2) {
            if(this._collisionEvents[key] !== null || this._collisionEvents[key] !== undefined) {

                if(objects1 instanceof Array === false) {
                    objects1 = [objects1];  
                }

                if(objects2 instanceof Array === false) {
                    objects2 = [objects2];   
                }

                this._collisionEvents[key] = new LitePhysicsCollisionEvent(objects1, objects2);
                return this._collisionEvents[key];
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

        public collisionEvents(key:string) {
            return this._collisionEvents[key];
        }

        public removeCollisionEvents(key:string) {

        }

        public updatePosition(body:LitePhysicsBody) {
            body.velocity.x += body.deltaG.x;
            body.velocity.y += body.deltaG.y;

            body.x += body.velocity.x;
            body.y += body.velocity.y;

            body.deltaG.x = 0;
            body.deltaG.y = 0;
            body.updateObjectRefPosition();
        }

        private checkWorldCollide(body:LitePhysicsBody) {
            //left
            if(body.x <= this._worldBounds.x) {
                body.velocity.x *= -1;
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

        private calculateGravity(body:LitePhysicsBody) {
            // checks if world gravity has already been applied
            if(body.deltaG.x === 0 && body.deltaG.y === 0) {
                body.deltaG.x = this._gravity.x;
                body.deltaG.y = this._gravity.y;
            }
        }

        private checkCollisions(collisionEvent:LitePhysicsCollisionEvent) {
            for(let i of collisionEvent.b1) {
                for(let t of collisionEvent.b2) {
                    if(this.AABBvsAABB(i, t) === true) {
                        // check to see if the body's collision detection is paused
                        if(!i.pauseCollisionDetection || !t.pauseCollisionDetection) {
                            //this.resolveAABB(i, t);
                            collisionEvent.collisionDetected(i, t);
                        }
                        return true;
                    }
                }
            }
        }
        
        private checkPoolCollisions(pool:LitePhysicsPool) {
            if(pool.bodies.length < 2) return;
            let c:number = 1;
            for(let body of pool.bodies) {
                for(var i = c; i < pool.bodies.length; i++) {
                    // body = the body we're currently on

                    // the body we're checking against
                    let body2 = pool.bodies[i];

                    // check two colisions here
                    if(this.AABBvsAABB(body, body2) === true) {
                        //this.resolveAABB(body, body2);
                    }       
                }
                c++;
            }
        }

        private AABBvsAABB(b1:LitePhysicsBody, b2:LitePhysicsBody) {
            if (b1.x < b2.x + b2.bounds.width &&
                b1.x + b1.bounds.width > b2.x &&
                b1.y < b2.y + b2.bounds.height &&
                b1.bounds.height + b1.y > b2.y) {
                    return true;
            } else {
                return false;
            }
        }

        private resolveAABB(b1:LitePhysicsBody, b2:LitePhysicsBody) {

            let b1KEx:number = 0.5 * b1.mass * (b1.velocity.x * b1.velocity.x);
            let b1KEy:number = 0.5 * b1.mass * (b1.velocity.y * b1.velocity.y);
            let b2KEx:number = 0.5 * b2.mass * (b2.velocity.x * b2.velocity.x);
            let b2KEy:number = 0.5 * b2.mass * (b2.velocity.y * b2.velocity.y);

            let diffx:number = Math.abs(b1KEx - b2KEx);
            let diffy:number = Math.abs(b1KEy - b2KEy);

            if(!b1.static) {
                b1.velocity.x -= Math.sqrt(diffx / b2.mass);
                b1.velocity.y -= Math.sqrt(diffy / b2.mass);
            }

            if(!b2.static) {
                b2.velocity.x -= Math.sqrt(diffx / b1.mass);
                b2.velocity.y -= Math.sqrt(diffy / b1.mass);
            }
        }

        private outOfBounds(body:LitePhysicsBody) {
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