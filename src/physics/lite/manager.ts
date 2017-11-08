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
 * move the maths stuff to the maths utils??
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
            this._gravity = {x: 0, y: 0};
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

        private preUpdate() {
            // handle deletion pre update
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

            this.mainUpdate();
        }

        private mainUpdate() {
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

                this.checkPoolCollisions(this._pools[i]);
            }

            // for(let i in this._collisionEvents) {
            //     this.checkCollisions(this._collisionEvents[i]);
                
            //     for(let body of this._collisionEvents[i].bodies) {
            //         if(body.collideOnWorldBounds) {
            //             this.checkWorldCollide(body);
            //         }
                    
            //         if(body.gravityEnabled) {
            //             this.calculateGravity(body);
            //         }
                    
            //         this.updatePosition(body);
            //     }
            // }

            this.postUpdate();
        }

        private postUpdate() {
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

        protected update(dt:number) {            
            if(!this._enabled) return;
            if(this._paused) return;
            this.preUpdate();
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

        public reset() {
            this._pools = {};
            this._collisionEvents = {};
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
            let x: number = body.x;
            let y: number = body.y;

            if(x <= this._worldBounds.x) {
                body._isTouchingLeft = true;
                if(body.velocity.x >= -0.1) {
                    body.velocity.x = 0;
                    body._isAsleepX = true;
                } else {
                    body.velocity.x *= -1;
                }
            } else {
                body._isTouchingLeft = false;
            } 
            
            if(x >= this._worldBounds.width) {
                body._isTouchingRight = true;
                if(body.velocity.x < 0.1) {
                    body.velocity.x = 0;
                    body._isAsleepX = true;
                } else {
                    body.velocity.x *= -1;
                }
            } else {
                body._isTouchingRight = false;
                body._isAsleepX = false;
            } 
            
            if(y <= this._worldBounds.y) {
                body._isTouchingUp = true;
                if(body.velocity.y >= -0.1) {
                    body.velocity.y = 0;
                    body._isAsleepY = true;
                } else {
                    body.velocity.y *= -1;
                }
            } else {
                body._isTouchingUp = false;
                body._isAsleepY = false;
            }

            if(y >= this._worldBounds.height) {
                body._isTouchingDown = true;
                if(body.velocity.y <= 0.1) {
                    body.velocity.y = 0;
                    body._isAsleepY = true;
                } else {
                    body.velocity.y *= -1;
                }
            } else {
                body._isTouchingDown = false;
                body._isAsleepY = false;
            }
        }

        private calculateGravity(body:LitePhysicsBody) {
            // checks if world gravity has already been applied
            if(body.deltaG.x === 0 && body.deltaG.y === 0) {
                if(!body._isAsleepX) {
                    body.deltaG.x = this._gravity.x;
                }
                if(!body._isAsleepY) {
                    body.deltaG.y = this._gravity.y;
                }
            }
        }

        private checkCollisions(collisionEvent:LitePhysicsCollisionEvent) {
            for(let i of collisionEvent.b1) {
                for(let t of collisionEvent.b2) {
                    // if(this.AABBvsAABB(i, t) === true) {
                    //     // check to see if the body's collision detection is paused
                    //     if(!i.pauseCollisionDetection || !t.pauseCollisionDetection) {
                    //         this.resolveAABB(i, t);
                    //         collisionEvent.collisionDetected(i, t);
                    //     }
                    //     return true;
                    // }
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
                    let aabbResult = this.AABBvsAABB(body, body2);
                    if(aabbResult === true) {
                        // console.log(aabbResult)
                        // this.resolveAABB(body, body2);
                    }       
                }
                c++;
            }
        }

        private AABBvsAABB(b1:LitePhysicsBody, b2:LitePhysicsBody): boolean {
            let up: boolean, right: boolean, down: boolean, left: boolean = false;
            let collision: boolean = false;

            let aMinX: number = b1.x;
            let aMaxX: number = b1.x + b1.bounds.width;
            let bMinX: number = b2.x;
            let bMaxX: number = b2.x + b2.bounds.width;

            let aMinY: number = b1.y;
            let aMaxY: number = b1.y + b1.bounds.height;
            let bMinY: number = b2.y;
            let bMaxY: number = b2.y + b2.bounds.height;

            if(aMinX > bMaxX) {
                return false;
            }

            if(aMaxX < bMinX) {
                return false;
            }

            if(aMinY > bMaxY) {
                return false;
            }

            if(aMaxY < bMinY) {
                return false;
            }

            let depthX: number = 0;
            let depthY: number = 0;

            let collisionMatrix = [0, 0, 0, 0, 0, 0, 0, 0];

            if(aMinX < bMinX) {
                collisionMatrix[1] = 1;
                collisionMatrix[7] = 1;
            } else {
                collisionMatrix[5] = 1;
                collisionMatrix[3] = 1;
            }

            if(aMinY < bMinY) {
                collisionMatrix[0] = 1;
                collisionMatrix[6] = 1;
            } else {
                collisionMatrix[2] = 1;
                collisionMatrix[4] = 1;
            }

            let aCenterX: number = aMinX + (b1.bounds.width / 2);
            let aCenterY: number = aMinY + (b1.bounds.height / 2);
            let bCenterX: number = bMinX + (b2.bounds.width / 2);
            let bCenterY: number = bMinY + (b2.bounds.height / 2);

            // let a: number = aCenterX - bCenterX;
            // let b: number = aCenterY - bCenterY;
            // console.log(a, b);

            depthX = Math.abs(aCenterX - bCenterX);
            depthY = Math.abs(aCenterY - bCenterY);

            if(depthX > depthY) {
                b1.velocity.x *= -1;
                b2.velocity.x *= -1;
            } else {
                b1.velocity.y *= -1;
                b2.velocity.y *= -1;
            }

            return true;

            // let fakeResult = {collision: false, up: false, right: false, down: false, left: false};
        }

        private resolveAABB(b1:LitePhysicsBody, b2:LitePhysicsBody) {

            b1.velocity.x *= -1;
            b1.velocity.y *= -1;

            b2.velocity.x *= -1;
            b2.velocity.y *= -1;

            // let b1KEx:number = 0.5 * b1.mass * (b1.velocity.x * b1.velocity.x);
            // let b1KEy:number = 0.5 * b1.mass * (b1.velocity.y * b1.velocity.y);
            // let b2KEx:number = 0.5 * b2.mass * (b2.velocity.x * b2.velocity.x);
            // let b2KEy:number = 0.5 * b2.mass * (b2.velocity.y * b2.velocity.y);

            // let diffx:number = Math.abs(b1KEx - b2KEx);
            // let diffy:number = Math.abs(b1KEy - b2KEy);

            // if(!b1.static) {
            //     b1.velocity.x -= Math.sqrt(diffx / b2.mass);
            //     b1.velocity.y -= Math.sqrt(diffy / b2.mass);
            // }

            // if(!b2.static) {
            //     b2.velocity.x -= Math.sqrt(diffx / b1.mass);
            //     b2.velocity.y -= Math.sqrt(diffy / b1.mass);
            // }
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