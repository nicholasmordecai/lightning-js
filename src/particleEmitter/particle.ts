/// <reference path="./../reference.d.ts" />

namespace Lightning {
    export class Particle extends ParticleBase {
    
        constructor(texture:PIXI.Texture, emitter:ParticleEmitter, minX:number, maxX:number, minY:number, maxY:number) {
            super();
            this.returnToPool = this._returnToPool;
            this.update = this.updateSimple;
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
            this.interactiveChildren = false;
        }

        calculateBounds() {
            this._bounds.clear();
            this._calculateBounds();
            this._lastBoundsID = this._boundsID;
        }

        _returnToPool():void {
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