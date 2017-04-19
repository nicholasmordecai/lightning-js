/// <reference path="./../reference.d.ts" />

namespace Lightning {
    export class ParticleBase extends PIXI.Sprite {

        protected _texture:PIXI.Texture;
        protected _emitter:ParticleEmitter;

        protected _minX:number;
        protected _maxX:number;
        protected _minY:number;
        protected _maxY:number;
        protected _autoCull:boolean = true;

        protected _velX:number = 0;
        protected _velY:number = 0;
        protected _gX:number = 0;
        protected _gY:number = 0;

        protected _alphaIncrement:number = null;
        protected _rotationIncrement:number = null;
        protected _scaleIncrement:{x:number, y:number} = null;

        protected _isDead:boolean = false;
        protected _createdAt:number = null;
        protected _lifeSpan:number = null;
        protected _deadTime:number = null;
        protected _lifeTime:number = null;

        public update:(time:number) => void;
        public returnToPool: () => void;

        constructor() {
            super();
        }

        public updateSimple(time:number) {
            if(this._deadTime <= this._lifeTime) {
                this.returnToPool();    
                return;
            }

            if(this._autoCull) {
                if(this.y > this._maxY || this.y < this._minY || this.x > this._maxX || this.x < this._minX) {
                    this.returnToPool();
                    return;
                }
            }

            // increment alpha
            if(this._alphaIncrement) {
                this.alpha += this._alphaIncrement;
                if(this.alpha <= 0) {
                    this.returnToPool();
                }
            }

            // increment rotation
            if(this._rotationIncrement) {
                this.rotation += this._rotationIncrement;
            }

            // increment scale
            if(this._scaleIncrement) {
                this.scale.x += this._scaleIncrement.x;
                this.scale.y += this._scaleIncrement.y;
            }

            // update velocity (from gravity)
            this._velX += this._gX;
            this._velY += this._gY;

            // update position
            this.x += this._velX;
            this.y += this._velY;

            if(!this._isDead) {
                this.updateTransform();
                this._lifeTime += time;        
            }
        }

        public updateComplex(time:number) {

            if(this._deadTime <= this._lifeTime) {
                this.returnToPool();    
                return;
            }

            for(let i of this._emitter.gravityWells) {
                let mass = i['mass'];
                let particleGlobal = this.getGlobalPosition();
                let gravityGlobal = i.getGlobalPosition();

                // let d = this.getDistance(particleGlobal.x, particleGlobal.y, gravityGlobal.x, gravityGlobal.y);
                let d = 0;

                // if(d < 100) {
                //     this.returnToPool();
                //     return;
                // }

                // let G = 6.5;
                // for(let i of this._emitter.gravityWells) {

                //     let mass = i['mass'];
                //     let particleGlobal = this.getGlobalPosition();
                //     let gravityGlobal = i.getGlobalPosition();

                //     let d = this.getDistance(particleGlobal.x, particleGlobal.y, gravityGlobal.x, gravityGlobal.y);
                //     // if(d < 100) {
                //     //     this.returnToPool();
                //     //     return;
                //     // }
                //     let f = G * (mass * 1) / d

                //     if(particleGlobal.x - gravityGlobal.x < 0) {
                //         this._velX += f;
                //     } else {
                //         this._velX += -f;
                //     }

                //     if(particleGlobal.y - gravityGlobal.y < 0) {
                //         this._velY += f;
                //     } else {
                //         this._velY += -f;
                //     }
                // }

                let f = this._emitter.nGravity * (mass * 1) / d

                if(particleGlobal.x - gravityGlobal.x < 0) {
                    this._velX += f;
                } else {
                    this._velX += -f;
                }

                if(particleGlobal.y - gravityGlobal.y < 0) {
                    this._velY += f;
                } else {
                    this._velY += -f;
                }
            }
        }
    }
}