/// <reference path="./../reference.d.ts" />

namespace Lightning {
    export class Particle extends PIXI.Sprite {

        protected _texture:PIXI.Texture;
        protected _emitter:ParticleEmitter;

        private _minX:number;
        private _maxX:number;
        private _minY:number;
        private _maxY:number;
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
        private _lifeTime:number = null;
    
        constructor(texture:PIXI.Texture, emitter:ParticleEmitter, minX:number, maxX:number, minY:number, maxY:number) {
            super();
            this._texture = texture;
            this._emitter = emitter;
            this.children = null;
            this._minX = minX;
            this._minY = minY;
            this._maxX = maxX;
            this._maxY = maxY;
            this.anchor.set(0.5);

            // check the interaction is turned off completly.. seems to still being called -> processInteractive
        }

        // override functions to make sure that it doesn't check for chilren, visible etc
        renderWebGL(renderer) {
            if(this.renderable) {
                this._renderWebGL(renderer);
            }
        }

        renderAdvancedWebGL(renderer) {
            // add this object to the batch, only rendered if it has a texture.
            if(this.renderable) {
                this._renderWebGL(renderer);
            }

            // double check if this is actually needed. feels like it's only called if the texture is changed, in which case.. don't do it!
            renderer.flush();
        }

        renderCanvas(renderer) {
            if(this.renderable) {
                this._renderCanvas(renderer);
            }
        }

        updateTransform() {
            this._boundsID++;

            this.transform.updateTransform(this.parent.transform);
            // TODO: check render flags, how to process stuff here
            this.worldAlpha = this.alpha * this.parent.worldAlpha;
        }

        destroy() {
            this.removeAllListeners('');
            if (this.parent) {
                this.parent.removeChild(this);
            }
            this.transform = null;
            this.parent = null;
            this._bounds = null;
            this._mask = null;
            this.filterArea = null;
            this.interactive = false;
            this.interactiveChildren = false;
        }

        calculateBounds() {
            this._bounds.clear();
            this._calculateBounds();
            this._lastBoundsID = this._boundsID;
        }


        update(time) {
            // get delta time from update instead of getting date.now //
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


            
            for(let i of this._emitter.gravityWells) {
                let G = 6.5;
                let mass = 50;

                let particleGlobal = this.getGlobalPosition();
                let gravityGlobal = i.getGlobalPosition();

                let d = this.getDistance(particleGlobal.x, particleGlobal.y, gravityGlobal.x, gravityGlobal.y);
                let f = G * (mass * 1) / d
                this._velX += -f;
                this._velY += -f;
            }

            // update velocity (from gravity)
            // this._velX += this._gX;
            // this._velY += this._gY;

            // update position
            this.x += this._velX;
            this.y += this._velY;

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

            // finally, call the update transform function
            if(!this._isDead) {
                this.updateTransform();
                this._lifeTime += time;        
            }
        }

        getDistance = function( x1, y1, x2, y2 ) {
            return ((x1 - x2) * (x1 - x2)) + ((y1 - y2) * (y1 - y2));
        };

        getAcceleration(distance, starMass) {
            return 6.67384 * starMass / (Math.pow(distance, 2));
        }

        returnToPool() {
            this._isDead = true;
            this.renderable = false;
            this.visible = false;
            this._emitter.returnToPool(this);
        }

        public set velocity(velocity:{x:number, y:number}) {
            this._velX = velocity.x;
            this._velY = velocity.y;
        }

        public set gravity(gravity:{x:number, y:number}) {
            this._gX = gravity.x;
            this._gY = gravity.y;
        }

        public set lifeSpan(time:number) {
            this._lifeSpan = time;
            this._deadTime = this._lifeSpan + Date.now();
        }

        public set alphaIncrement(val:number) {
            this._alphaIncrement = val;
        }

        public set rotationIncrement(val:number) {
            this._rotationIncrement = val;
        }

        public set scaleIncrement(scale:{x:number, y:number}) {
            this._scaleIncrement = {x: scale.x, y: scale.y}
        }

        public set createdAt(val:number) {
            this._createdAt = val;
        }

        public set lifeTime(val:number) {
            this._lifeTime = val;
        }

        public get isDead():boolean {
            return this._isDead;
        }

        public set isDead(val:boolean) {
            this._isDead = val;
        }
    }
}