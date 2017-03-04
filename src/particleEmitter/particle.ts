/// <reference path="./../reference.d.ts" />

namespace Lightning {
    export class Particle extends Sprite {

        protected _emitter:ParticleEmitter;

        protected _velX:number = 0;
        protected _velY:number = 0;
        protected _gX:number = 0;
        protected _gY:number = 0;

        protected _alphaIncrement:number = null;
        protected _rotationIncrement:number = null;
        protected _scaleIncrement:{x:number, y:number} = null;

        protected _createdAt:number = null;
        protected _lifeSpan:number = null;
        protected _deadTime:number = null;
    
        constructor(texture:PIXI.Texture, emitter) {
            super(texture);
            this._emitter = emitter;
            this.setAnchor(0.5);
        }

        update() {

            if(this._deadTime <= Date.now()) {
                this._emitter.returnToPool(this);
                this.alpha = 1;
                this.scale = new PIXI.Point(1, 1);
                this.rotation = 0;
                this._deadTime = null;
                this._createdAt = null;
                this._lifeSpan = null;
            }

            // update velocity (from gravity)
            this._velX += this._gX;
            this._velY += this._gY;

            // update position
            this.x += this._velX;
            this.y += this._velY;

            // increment alpha
            if(this._alphaIncrement) {
                this.alpha += this._alphaIncrement;
            }

            // increment rotation
            if(this._rotationIncrement) {
                this.rotation += this._rotationIncrement;
            }

            // increment scale
            if(this._scaleIncrement) {
                this.setScale(this.scale.x + this._scaleIncrement.x, this.scale.y + this._scaleIncrement.y);
            }
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
    }
}